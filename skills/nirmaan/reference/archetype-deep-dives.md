# ARCHETYPE DEEP-DIVES — concrete data models, phase ladders, and failure lists

> **Companion to `reference/project-archetypes.md`.** That file gives the concepts; this one gives **concrete starting points** — an example data model, an example phase ladder, and the top failures to test — for each archetype. Use these as a head start, then adapt to the founder's specifics. They exist so you don't design a standard product type from a blank page.

---

## 1 · E-commerce / D2C — concrete starting point

**Example data model (entities → key fields):**
- `users` (id, name, phone, email, role, created_at)
- `products` (id, title, slug, description, price_minor_units, currency, stock_qty, is_active, images[])
- `carts` (id, user_id, status) · `cart_items` (id, cart_id, product_id, qty, unit_price_snapshot)
- `orders` (id, user_id, status[pending|paid|failed|cancelled|refunded], total_minor_units, currency, address_id, created_at, idempotency_key)
- `order_items` (id, order_id, product_id, qty, unit_price_snapshot)
- `payments` (id, order_id, provider, provider_ref, status, amount_minor_units, raw_webhook_id, created_at)
- `addresses` (id, user_id, line1, line2, city, state, pincode, phone)
- DB constraints: unique idempotency_key per order; stock_qty never negative (check); price stored as integer minor-units.

**Example phase ladder:**
- P0 Foundation (deploy skeleton + monitoring) → P1 Data+auth (users, products, login) → P2 Catalog + cart (browse, add/remove, qty validation) → P3 **Checkout + payment** (order state machine, Razorpay hosted checkout, signed webhook, idempotency, all failures) → P4 Orders + notifications (confirmation to buyer/admin/adviser) → P5 Admin panel (orders, products, fulfilment) → P6 Hardening + launch.

**Top failures to test:** payment-fail leaves order recoverable (not `paid`); double-submit → one order; oversell race (two buyers, one unit); client-sent price ignored; out-of-stock at checkout; coupon abuse; webhook duplicate ignored; refund reverses money + stock.

---

## 2 · Voice / telephony agent — concrete starting point

**Example data model:**
- `calls` (id, direction[inbound|outbound], from, to, status, started_at, ended_at, recording_consent_bool, cost_minor_units)
- `call_turns` (id, call_id, speaker[caller|agent], transcript, audio_ref, latency_ms, created_at)
- `call_outcomes` (id, call_id, intent, action_taken, handed_to_human_bool, notes)
- `agent_configs` (id, name, system_prompt, voice, max_turns, disclosure_text)

**Example phase ladder:**
- P0 Foundation + monitoring → P1 Telephony connect (a call connects, plays a greeting incl. **AI disclosure**) → P2 STT→LLM→TTS loop (streamed, low-latency, one real exchange) → P3 **Resilience** (barge-in, silence/no-input, AI-down fallback, turn limits, drop recovery) → P4 State + transcripts + cost caps + logging → P5 Outcomes/handoff to human → P6 Hardening + compliance + launch.

**Top failures to test:** AI slow/down → graceful fallback, never dead air; caller interrupts (barge-in); silence/no-input timeout; misheard → confirm critical details; call drops → state preserved; cost cap stops a runaway loop; consent captured before recording; disclosure played.

**Compliance (must raise):** AI disclosure required; recording consent; outbound-calling/do-not-call rules → prefer inbound/consented.

---

## 3 · Fintech / finance — concrete starting point

**Example data model (ledger-style):**
- `accounts` (id, owner_id, type, currency, created_at) — **no mutable balance column**
- `ledger_entries` (id, account_id, transaction_id, direction[debit|credit], amount_minor_units, created_at) — **append-only**; balance = sum of entries
- `transactions` (id, type, status, idempotency_key, external_ref, created_at) — immutable record of intent
- `audit_log` (id, actor, action, entity, before, after, created_at) — append-only
- Money as integer minor-units (or fixed decimal); never floats. DB constraints enforce double-entry balance (sum of debits = sum of credits per transaction).

**Example phase ladder:**
- P0 Foundation + monitoring → P1 Accounts + identity + **audit log** → P2 **Ledger core** (double-entry, balance-from-entries, idempotent transactions) → P3 Money movement (provider integration, reconciliation, pending/stuck handling) → P4 Reversals/refunds as first-class transactions → P5 Reporting/statements (as background jobs) → P6 Hardening + heavy testing + compliance review.

**Top failures to test:** retried transfer doesn't double-move money (idempotency); balance never goes wrong under concurrent ops; "sent but not recorded" impossible (transactional/saga); reconciliation catches a provider mismatch; rounding rules correct to the minor unit; reversal restores exact state.

**Compliance (must raise + recommend experts):** KYC/AML where applicable; RBI/payment-aggregator rules (India); licensing; data protection. Recommend professional/legal review before real money at scale.

---

## 4 · Internal tool / admin panel — concrete starting point

**Example shape:** reuses the main app's `users`/roles; adds nothing new structurally — it's CRUD + dashboards + actions over existing entities, gated by role.

**Example phase ladder:**
- P0 (often part of the main app) → P1 Role model + protected admin shell → P2 CRUD over the core entities (with server-side per-object authorization) → P3 Dashboards/metrics (Tremor) → P4 Bulk actions (guarded, transactional, reversible) + exports (background jobs) → P5 Audit logging for sensitive changes → P6 Hardening.

**Top failures to test:** non-admin denied at the API (not just hidden in UI); IDOR — can't access another tenant's/user's record by changing an ID; bulk delete guarded + reversible; large list paginated; export of 100k rows runs as a job, not a timing-out request; sensitive changes audited.

---

## 5 · Content / SaaS — concrete starting point

**Example data model:**
- `organizations` (id, name, plan, status) · `memberships` (id, org_id, user_id, role)
- `users` (id, email, ...) · `subscriptions` (id, org_id, provider_ref, status[trialing|active|past_due|cancelled], current_period_end)
- core feature entities **scoped by org_id** (every row carries org_id; every query filters by it)
- `usage_counters` (id, org_id, metric, period, count) for plan limits

**Example phase ladder:**
- P0 Foundation + monitoring → P1 Auth + orgs + membership/roles → P2 **Tenant isolation** baked into the data layer (every query org-scoped) → P3 The core feature (org-scoped) → P4 Billing lifecycle (trial→active→past_due→cancelled via signed webhooks) + plan limits enforced server-side → P5 Team management (invites, roles, removal) → P6 Hardening + activation analytics + launch.

**Top failures to test:** a user from org A can never read org B's data (the #1 SaaS breach — test it directly); failed renewal → correct `past_due` handling + dunning; plan-limit reached → graceful gating, enforced server-side; removed member loses access immediately; brand-new org has guided empty states.

---

## 6 · AI chat / companion — concrete starting point

**Example data model:**
- `conversations` (id, user_id, created_at) · `messages` (id, conversation_id, role[user|assistant], content, tokens, created_at)
- `memories` (id, user_id, content, embedding_vector, created_at) — long-term recall (pgvector/Mem0)
- `documents` + `chunks` (for RAG over the founder's content) · `usage` (id, user_id, period, tokens, cost_minor_units)

**Example phase ladder:**
- P0 Foundation + monitoring → P1 Auth + conversation/message model → P2 **Chat core** (typed AI SDK, streaming, stop button, error-mid-stream handling) → P3 Memory (persist + retrieve per user, privacy-aware) → P4 RAG over the founder's docs (grounding where facts matter) → P5 Guardrails + cost caps + model routing → P6 Hardening + content-safety + launch.

**Top failures to test:** model down/slow → graceful message, never a hang; model output that flows into the system is validated (treat as untrusted input); prompt-injection from user content can't trigger unsafe actions; token cost capped + monitored; stored conversations are private; no unqualified medical/financial advice; clear AI disclosure.

---

## 7 · Automation / agency backend — concrete starting point

**Example data model:**
- `jobs` (id, type, status[queued|running|waiting_approval|done|failed], payload, idempotency_key, created_at)
- `job_steps` (id, job_id, step_name, status, attempts, result, error, created_at)
- `approval_gates` (id, job_id, step_name, status[pending|approved|rejected], decided_by, decided_at)
- `integrations_log` (id, job_id, provider, request, response, created_at) — audit/trace
- `costs` (id, job_id, provider, amount_minor_units)

**Example phase ladder:**
- P0 Foundation + monitoring → P1 Inbound trigger + job model → P2 **Durable pipeline** (steps with retry/backoff, resumable, idempotent side-effects) → P3 **Human-approval gates** (pause-and-wait at checkpoints, state persists across the wait, resume on approval) → P4 Integrations (wrapped, monitored, alerting) → P5 Cost caps + full audit trace → P6 Hardening + compliance (disclosure, anti-spam) + launch.

**Top failures to test:** a failed step doesn't drop the whole job (retry/resume); re-run doesn't duplicate side-effects (no double email/payment — idempotency); the pipeline truly pauses at an approval gate and resumes correctly after approval, with state intact; an integration outage alerts rather than silently failing; cost cap halts a runaway; full trace exists for review.

**Compliance:** AI disclosure to anyone contacted; consent/anti-spam for outbound; payments collect-only/with-gates per the founder's policy.

---

## How to use the deep-dives

1. Take the matching archetype's **data model** as a first draft; adjust entities/fields to the founder's specifics, then confirm.
2. Take the **phase ladder** as the spine of `phases.md`; resize phases to fit single sessions.
3. Put the **top failures to test** directly into the relevant phases' verification criteria — these are the exact things that break each product type, so they must be explicitly built and tested, not assumed.
4. Surface the **compliance** items to the founder early, in plain language.
