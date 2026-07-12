# W42 — Payments (Razorpay) — The Money Path

Trigger: any feature that creates, confirms, refunds, or reports payments.

## The iron rules
1. **The client never decides an amount.** Browser sends product/plan/order ID; the
   server computes price from the catalog. Anything else = customers paying ₹1 for ghee.
2. **A payment is confirmed ONLY by a signature-verified webhook** (or server-side
   fetch of payment status) — never by the client saying "I paid" or by redirect
   success params alone.
3. **Idempotency everywhere:** payment record keyed by `razorpay_payment_id`; webhook
   processing must survive the same event delivered twice (W25 §2).
4. **Payment records are immutable:** client can't write them at all; corrections are
   new records (refund/adjustment), never edits. Money history is append-only.
5. **Order state machine written down:** e.g. created → link_sent → paid → fulfilled →
   (refunded | failed | expired). Every transition has exactly one writer. Put it in
   SCHEMA.md.

## Standard flow (his ecosystem pattern — keep it)
Advisor/customer action → Cloud Run/Function creates Razorpay order or payment link
(prod secret lives only there) → customer pays → Razorpay webhook (signature verified)
→ function writes payment record + updates order status + triggers side effects
(commission calc, invoice, notification) idempotently.

## Refunds
Initiated only from the admin panel by an admin role → function calls Razorpay refund
API → NEW record `refunds/{razorpay_refund_id}` linked to the payment → commission
reversal computed by the same commission engine (never ad-hoc math) → customer notified.

## Testing gate before any payment change goes live
Test-mode run of: successful payment / failed payment / duplicate webhook delivery /
webhook with bad signature (must be rejected) / refund. All five, every time the money
path changes. Then one ₹1–₹10 real transaction in prod, verified end-to-end, refunded.

## Reconciliation
The W33 scheduled job (Razorpay totals vs Firestore records) is part of the payment
system, not optional monitoring. Discrepancy = alert = investigate same day.

## Failure this prevents
Client-set prices, fake "paid" orders, double-processed commissions, edited money
history that no accountant can trust.

## Linked
[[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[W33-MONITORING-AND-ALERTS]]
