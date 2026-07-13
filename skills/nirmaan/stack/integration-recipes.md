# INTEGRATION RECIPES — how to wire the common pieces *safely*

> **Read when building a feature that touches an external service.** Integrations are the #1 breakage source (`standards/reliability-and-edge-cases.md` §5). These are concrete, reusable recipes for the services the founder actually uses — each with the **safety checklist** that makes it production-grade instead of a demo. Always: fetch the provider's **current docs** first (APIs change), use the official SDK, keep keys in env, and use **test mode** during the build.
>
> These describe the *approach and the guardrails*, not copy-paste code (which dates quickly). The guardrails are the point.

---

## Recipe 1 — Payments (Razorpay / hosted checkout)

**Goal:** take money without ever touching card data, and never mark an order paid without proof.

**Flow:** create order server-side (`pending`, with an idempotency key) → open the provider's **hosted checkout** on the client → the provider confirms via a **signed webhook** → verify signature → mark `paid` (idempotently) → show success / send confirmation.

**Safety checklist:**
- [ ] **Amounts in integer minor-units** (paise); never floats. Compute the total **server-side** — never trust a client-sent amount.
- [ ] Order starts `pending`; carries an **idempotency key** so a double-submit reuses the same order (no double charge).
- [ ] **Card data never hits your server** — use hosted/redirect checkout or the provider's tokenization.
- [ ] Confirmation comes from a **signature-verified webhook**, not the client saying "it worked." Reject invalid signatures.
- [ ] Webhook handling is **idempotent** — the same event arriving twice updates the order once.
- [ ] Handle **failure/decline/timeout**: order stays recoverable (`pending`/`failed`), user gets a clear retry; never silently `paid`.
- [ ] **Reconcile** stuck `pending` orders via a scheduled check against the provider (in case a webhook is missed).
- [ ] **Refund** is a first-class action: reverses money and any stock; guarded and logged.
- [ ] Keys in env; **test mode** during build; switch to live only at deploy.

**Common failure if skipped:** client-confirmed "paid" without webhook verification → phantom orders and money mismatches; no idempotency → double charges on double-tap.

---

## Recipe 2 — Notifications (WhatsApp / SMS / email, e.g. order alerts to buyer + admin + adviser)

**Goal:** reliably notify multiple parties, with retries, without blocking the user's action.

**Flow:** the triggering action (e.g. order paid) enqueues a **background job** → the job sends via the provider(s) with retries → delivery status logged. The user's action does **not** wait on the message.

**Safety checklist:**
- [ ] Sending happens in a **durable background job** (retry-with-backoff), **not inline** — a slow/failed message must never block or break checkout.
- [ ] **Idempotent** — a retried job doesn't send duplicate messages (track sent state).
- [ ] **Templates** for each message type; variables validated before send.
- [ ] **Per-recipient handling** — buyer, admin, adviser each succeed/fail independently; one failing doesn't drop the others. (Watch provider free-tier limits on specific legs — diagnose and document.)
- [ ] **Failures are visible** (logged + surfaced to error tracking), and retried — not silently lost.
- [ ] **Consent/anti-spam** respected for marketing messages (transactional is different from promotional); honor opt-outs.
- [ ] Rate within provider limits; back off on throttling.
- [ ] Keys in env; test with safe/sandbox numbers during build.

**Common failure if skipped:** sending inline → a messaging hiccup makes the order itself fail; no retry → notifications silently lost; no idempotency → customers spammed on a retry.

---

## Recipe 3 — AI model (chat, companion, or any LLM feature)

**Goal:** use AI reliably and affordably, treating its output as untrusted.

**Flow:** build a tight prompt with only the needed context (+ memory/RAG if used) → call via a **typed AI SDK** (streaming) → **validate/guard** the output → use it. Cap and monitor cost.

**Safety checklist:**
- [ ] **Model output is untrusted input** (Law 1) — validate/parse it; never let raw model text trigger unsafe actions, DB writes, or commands unchecked.
- [ ] **Cost caps** on tokens per request/user/day; **monitor** spend; never an uncapped loop. Route simple tasks to cheaper/smaller (or local) models.
- [ ] **Timeout + fallback** for the model being slow/down — a graceful message or queue, never a hang or dead air.
- [ ] **Prompt-injection defense** — user/content text can try to hijack instructions; don't grant the model authority it shouldn't have; separate instructions from user content.
- [ ] **Grounding** (RAG) where facts matter; disclaimers where appropriate; **no unqualified medical/financial/legal advice**.
- [ ] **Privacy** of stored prompts/conversations; **AI disclosure** when talking to real people.
- [ ] Streaming UX: partial output, stop button, error-mid-stream handled.
- [ ] Keys in env; cheap model + test prompts during build.

**Common failure if skipped:** uncapped tokens → surprise bill; trusting model output into the system → unsafe actions; no fallback → the feature hangs when the model is slow.

---

## Recipe 4 — Authentication (sign-in)

**Goal:** secure login without hand-rolling it.

**Flow:** use the backend's built-in auth (Supabase) or a dedicated library (Better Auth) for signup/login/sessions/roles → enforce permissions on the server for every protected action.

**Safety checklist:**
- [ ] **Never hand-roll** auth, sessions, or password hashing (Law 3) — use the proven system.
- [ ] **Authorization checked server-side** on every protected route/action, **per object** (a user reaches only their own data — prevents IDOR). UI hiding is not security.
- [ ] Passwords (if any) hashed with a strong algorithm; **never logged/stored in plaintext**.
- [ ] **Rate-limit** login/signup/OTP/reset; back off on brute force.
- [ ] Secure session cookies (HttpOnly, Secure, SameSite); logout invalidates; sensible expiry.
- [ ] Safe password reset (single-use, expiring tokens; no account enumeration).
- [ ] Roles defined; default-deny on new endpoints.

**Common failure if skipped:** UI-only permission checks → anyone calls the API directly and accesses forbidden data; hand-rolled auth → breaches.

---

## Recipe 5 — File uploads (images, documents)

**Goal:** accept files without opening a security hole or breaking on bad input.

**Flow:** validate the file (type, size) → store in **object storage** (not in the web root, not in the DB) → serve safely.

**Safety checklist:**
- [ ] **Validate type and size** server-side; reject oversized or disallowed files with a clear error.
- [ ] Store in **object storage**; never execute uploaded files; never trust the client-sent filename/type.
- [ ] Generate safe, non-guessable storage paths; control access (private vs public deliberately).
- [ ] Strip/handle metadata where privacy matters; scan if untrusted users upload.
- [ ] **Optimize images** (size/compress) for performance on mobile.
- [ ] Handle upload **failure/retry** and progress in the UI.

**Common failure if skipped:** no size limit → memory/disk blow-up; executable upload in web root → remote code execution; unoptimized images → slow mobile app.

---

## Recipe 6 — Third-party data / webhooks inbound (calendars, CRMs, providers calling you)

**Goal:** accept inbound events and external data without being spoofed or broken by bad payloads.

**Safety checklist:**
- [ ] **Verify signatures** on every inbound webhook; reject unsigned/invalid.
- [ ] Treat the payload as **hostile** — validate it with a schema before use (Law 1).
- [ ] Process **idempotently** — duplicates (providers retry) update state once.
- [ ] Respond fast; do heavy work in a **background job** (don't make the provider wait/time out).
- [ ] **Cache** external data you fetch (e.g. a calendar/tithi source) and **fall back to cache** when the source is down, so your app keeps working.
- [ ] Wrap outbound fetches in timeout + retry + graceful failure.
- [ ] Log/trace for debugging (no secrets).

**Common failure if skipped:** unverified webhook → spoofed "payment succeeded"; no idempotency → double-processing; no cache/fallback → your app breaks when an external source has an outage.

---

## How to use these recipes

1. When a phase touches one of these services, open the matching recipe and **build to its checklist** — the checklist items become tasks in `phases.md` and must-pass items in Verify.
2. Always **fetch the provider's current docs** and use the **official SDK** — these recipes are the guardrails, the docs are the specifics.
3. Record the integration choice (and any deviation) in `DECISIONS.md`.
4. **Test the failure path**, not just success — forced decline, timeout, malformed/duplicate payload, service-down.

> The pattern across every recipe is the same four guards: **validate the input, make it idempotent, verify the source, and handle failure gracefully.** Wire those four and integrations stop being the thing that breaks.
