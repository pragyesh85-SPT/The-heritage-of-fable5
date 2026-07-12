# W25 — Cloud Functions & Background Jobs (Writing Them Right)

Trigger: writing/editing any Cloud Function, webhook handler, or scheduled job.

## Parameters per function (decide before writing)
1. **Trigger type:** HTTPS callable (app calls it) / HTTP (webhooks) / Firestore trigger
   (reacts to data) / scheduled. Pick the narrowest that works.
2. **Idempotency — the #1 requirement.** Every trigger CAN fire twice for one event.
   Every function must be safe to run twice: check-before-create, deterministic doc IDs
   (`payments/{razorpayPaymentId}`), or a processed-marker field.
3. **Self-trigger guard:** a Firestore-triggered function writing to its own collection
   must exit early when its own change re-triggers it (compare before/after, or check a
   marker). This is the classic infinite-loop money-burner.
4. **Auth:** callable → verify `request.auth` + role. Webhook → verify signature
   (Razorpay secret) BEFORE reading the payload. HTTP without auth = public endpoint.
5. **Failure behavior:** what happens if this throws halfway? Multi-write operations use
   batched writes/transactions so state is never half-updated.
6. **Region:** keep everything in ONE region (asia-south1 for India) — mismatched regions
   cause silent latency and callable failures.

## Structure rules
- One function = one job. A 300-line do-everything function is undebuggable.
- Log at entry (with key IDs), at each external call, and at exit. When it breaks at
  2 AM the logs are all you have.
- External calls (Razorpay, ShipRocket, OpenRouter) wrapped in try/catch with the error
  logged INCLUDING the response body, and a retry-with-backoff for 429/5xx.
- Secrets from env config, never inline (W32).

## Testing/deploy procedure
1. Run in emulator with a fabricated event first.
2. Deploy to DEV project, fire it with real-shaped data, read the logs.
3. Deploy to prod; watch the logs during the first real executions (don't deploy and walk
   away — the first live event is the real test).

## Failure this prevents
Double-charged/double-shipped orders on retried events, infinite trigger loops, webhooks
accepted from anyone who guesses the URL, half-written orders.

## Linked
[[W32-SECRETS-MANAGEMENT]]
