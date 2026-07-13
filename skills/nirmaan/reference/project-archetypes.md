# PROJECT ARCHETYPES — recipes for the kinds of products the founder builds

> **Read the matching archetype(s) during Discovery and Architecture.** A product is often a *combination* (e.g. "e-commerce + admin + WhatsApp automation"). Each archetype lists: its core flow, its special edge cases, its stack notes (overrides to `stack/default-stack.md`), its non-negotiables, and its compliance flags. These exist so you don't rediscover, from scratch, the well-known pitfalls of each product type.
>
> The founder explicitly noted this must cover *anything* — "a voice agent, an automatic call generator, finance software, or something else." The seven archetypes below span that range; mix and match.

---

## 1 · E-commerce / D2C (e.g. This Is Purest)

**Core flow:** browse catalog → add to cart → checkout → **pay** → order confirmed → fulfilment → (returns/refunds).

**Special edge cases (beyond the usual):**
- **Payment failure mid-checkout** — order stays `pending`, clear retry, never `paid` without a confirmed (signed) webhook.
- **Double-submit / refresh** on pay — idempotency key; no duplicate orders or charges.
- **Inventory races** — two buyers, one unit left — atomic stock decrement, not read-modify-write (oversell is a real-world disaster).
- **Price/total tampering** — never trust client-sent prices or totals; recompute server-side.
- **Out-of-stock / discontinued** items in a cart at checkout time.
- **Coupon/discount** abuse — validate, limit, prevent stacking exploits.
- **Address/shipping** validation; serviceability by pincode (India).
- **Refund/cancel** — irreversible; guarded; correct money + stock reversal.

**Stack notes:** Default stack + **Razorpay** (UPI/cards, hosted checkout, **never store card data**). Use **Medusa** as the commerce backbone if order/cart/payment logic is non-trivial (vs hand-building). Catalog **search** (Meilisearch/Typesense) once the catalog grows. **Notifications** (Novu / transactional email + WhatsApp) for order updates to buyer + admin + adviser. **Admin panel** (Refine/Appsmith) for orders, products, fulfilment.

**Non-negotiables:** money correctness (integer/decimal, never floats); signed-webhook payment confirmation; stock integrity; order state machine with every failure handled; transactional emails actually delivered; backups of orders/customers.

**Compliance flags:** privacy policy + terms; GST/invoice requirements (India) — flag to the founder; clear refund/return policy; consent for marketing messages (WhatsApp/SMS).

---

## 2 · Voice / telephony agent (e.g. an automatic call generator, inbound support voice bot)

**Core flow:** a call connects (inbound or outbound) → **speech-to-text** → an **AI brain** decides a response → **text-to-speech** replies → loop, with call state → log + (optional) action/handoff.

**Special edge cases:**
- **Latency** — voice must feel real-time; budget every hop (STT → LLM → TTS) and stream; a 4-second pause kills the experience.
- **Barge-in / interruption** — the caller talks over the bot; handle gracefully.
- **Misheard input / silence / background noise** — confirm critical details ("did you say…?"); handle no-input timeouts.
- **Call drops mid-flow** — persist state so a reconnect or follow-up isn't lost.
- **The AI being slow or down** — a fallback ("let me connect you to a person / call you back"), never dead air.
- **Looping / stuck** conversations — turn limits and an escape to a human.
- **Cost runaway** — per-minute telephony + per-token LLM + TTS; cap and monitor.
- **Hostile/abusive callers, robocall detection.**

**Stack notes:** a **telephony provider** (programmable voice) for the call leg; **STT** and **TTS** (hosted for quality, or **whisper.cpp/Piper** locally for cost/privacy); an **AI brain** via a typed AI SDK with tight prompts and **guardrails**; **state** persisted per call; **logging/transcripts** stored (with consent) for review. Often a **Python** service for the audio pipeline + a TypeScript app for the dashboard.

**Non-negotiables:** real-time-feel latency; a graceful fallback for every failure (no dead air); strict cost caps with monitoring; conversation state that survives drops; transcripts logged for audit; guardrails so the AI stays on-task and on-policy.

**Compliance flags (critical — raise in Discovery):**
- **AI disclosure** — many jurisdictions require disclosing that the caller is talking to an AI. Default to disclosing.
- **Recording consent** — get consent before recording/storing audio.
- **Calling regulations** — outbound cold-calling, calling-hours, and do-not-call rules are heavily regulated. Strongly prefer **inbound or explicitly consented** outbound (this matches the founder's "inbound-only, AI discloses itself" instinct). Flag any outbound cold-calling plan as a legal risk to confirm.

---

## 3 · Fintech / finance software

**Core flow:** varies (payments, lending, accounting, trading tools, wallets) but always centers on **money movement and/or financial records** with **exactness** and an **audit trail**.

**Special edge cases:**
- **Correctness is absolute** — a rounding or off-by-one bug is real money lost. Money as **integer minor-units or fixed decimal**, never floats. Define rounding rules explicitly.
- **Ledger integrity** — use **double-entry / immutable ledger** patterns; balances are derived from transactions, never mutated in place.
- **Idempotency everywhere** — a retried transfer must not double-move money.
- **Reconciliation** — match your records against the provider's (gateway/bank); handle mismatches and pending/stuck states.
- **Concurrency on balances** — atomic, transactional; no race that double-spends.
- **Partial failures across systems** — money must never be "sent but not recorded" or vice versa; use sagas/compensating actions.
- **Reversals/refunds/chargebacks** — model them as first-class transactions.

**Stack notes:** Default stack with **extra rigor**. Strong relational DB (Postgres) with **DB-level constraints** and transactions; an **append-only audit log** of every financial event; **Hyperswitch/Razorpay** for the payment leg; **never store card data**; heavy automated **tests** for money math and state transitions.

**Non-negotiables:** an immutable **audit trail** of every transaction; idempotent money operations; reconciliation; integer/decimal money; transactional consistency; the most thorough testing of any archetype.

**Compliance flags (raise early, recommend experts):** financial regulation is serious — KYC/AML where applicable, RBI/payment-aggregator rules (India), data protection, possibly licensing. You are **not** the founder's compliance advisor — say so plainly and **recommend professional/legal review** before handling real money at scale.

---

## 4 · Internal tool / admin panel

**Core flow:** an authenticated staff user performs **CRUD** over data, views **dashboards**, runs **actions/exports**, across **roles**.

**Special edge cases:**
- **Roles & permissions** — different staff see/do different things; enforce **server-side**, per object.
- **Bulk actions** — guarded, reversible where possible, run in transactions; a fat-finger bulk delete is a disaster.
- **Large data views** — pagination/virtualization; don't load 100k rows.
- **Concurrent edits** by two staff — conflict handling.
- **Audit** — who changed what, when (especially for sensitive data).
- **Exports** — large CSV/report generation as a **background job**, not a request that times out.

**Stack notes:** a CRUD framework (**Refine/React Admin**) or low-code (**Appsmith/ToolJet/Budibase/NocoDB**) over the existing database. Reuse the main app's auth/roles. Charts via **Tremor**.

**Non-negotiables:** strict server-side authorization per role/object; guarded destructive/bulk operations; audit logging for sensitive changes; pagination on big lists.

**Compliance flags:** access to PII must be role-limited and logged; export of personal data handled per privacy expectations.

---

## 5 · Content / SaaS product

**Core flow:** sign up → onboard → use the **core feature** → (subscribe/upgrade) → ongoing use; often **multi-tenant** (many customers, isolated data).

**Special edge cases:**
- **Tenant isolation** — a tenant must **never** see another's data; enforce on every query (a top SaaS breach class).
- **Subscription/billing lifecycle** — trial → active → past-due → cancelled → reactivated; handle failed renewals, proration, dunning, webhook-driven state.
- **Plan limits & feature gating** — enforce server-side; handle the "limit reached" state gracefully.
- **Onboarding empty states** — brand-new accounts have no data; guide them.
- **Account/team management** — invites, roles, removing members and their access.

**Stack notes:** Default stack; a production-grade **boilerplate** (multi-tenancy, billing, team management) can save weeks if it fits. **Subscription billing** via the payment provider's billing product; **better-auth/Supabase auth** with org/role support. **Analytics** (PostHog) on activation and retention is essential here.

**Non-negotiables:** airtight tenant isolation; correct subscription state driven by signed webhooks; server-side limit/feature enforcement; clean onboarding; usage analytics.

**Compliance flags:** privacy policy/terms; data export & deletion; consent for tracking; SOC2-style expectations if selling B2B (flag for later).

---

## 6 · AI chat / companion product (e.g. a spiritual companion, an assistant)

**Core flow:** user sends a message → (retrieve context/memory) → **LLM** responds (streamed) → conversation continues, with **memory** across sessions and **guardrails**.

**Special edge cases:**
- **Model output is untrusted input** — validate/guard anything the model produces that flows into your system (Law 1 applies to AI output); never let it trigger unsafe actions unchecked.
- **Hallucination & wrong/harmful advice** — ground with **RAG** where facts matter; add disclaimers; for health/spiritual content, avoid medical claims and keep guidance general.
- **Memory** — persist per-user context (Mem0/pgvector) and feed it back relevantly; handle privacy of stored conversations.
- **Cost & rate** — token cost per message; cap, cache, and choose model size by need; handle the model being slow/down with a graceful message.
- **Safety** — guardrails against abuse, prompt-injection from user content, and off-policy responses.
- **Streaming UX** — partial responses, stop button, error mid-stream.

**Stack notes:** typed **AI SDK** (Vercel AI SDK) for streaming/tool-use; a **memory layer**; **RAG** over the founder's documents when grounding is needed; optional **local models** (Ollama/llama.cpp) for cost/privacy/offline; consider **model routing** (cheap model for simple turns, stronger for hard ones) to control cost.

**Non-negotiables:** guard model outputs and inputs; cost caps + monitoring; graceful model-down handling; privacy of stored conversations; clear AI disclosure; no unqualified medical/financial/legal advice.

**Compliance flags:** AI disclosure; data/privacy for stored chats; content-safety for the audience (extra care if minors could use it).

---

## 7 · Automation / agency backend (e.g. the founder's autonomous-agency vision)

**Core flow:** an inbound request/trigger → a **pipeline** of steps (some AI, some integrations) → **human-approval gates** at key points → execution → result/handoff, with **logging** throughout.

**Special edge cases:**
- **Every step can fail** — durable jobs with retries-with-backoff; a failed step doesn't silently drop the whole job; resumable pipelines.
- **Human-in-the-loop gates** — the system **pauses and waits** for approval at defined checkpoints (e.g. before sending money or messages to real people), then resumes. State persists across the wait.
- **Idempotency** — a re-run or retry doesn't duplicate side-effects (double emails, double payments).
- **Integration fragility** — third-party APIs change/break; wrap, monitor, and alert.
- **Cost & rate limits** across many AI/API calls — cap and track.
- **Auditability** — a full trace of what the automation did and why, for review and trust.

**Stack notes:** an automation/workflow engine (**n8n/Activepieces/Windmill**) or a durable job runner (**Trigger.dev/Inngest**); **agent frameworks** (LangGraph/CrewAI) where multi-step AI reasoning is needed — prefer **controllable** ones; **Firecrawl/browser-use** for web tasks; strong **observability** and an **approval-gate** mechanism.

**Non-negotiables:** durable, resumable pipelines; explicit human-approval gates that persist state across the wait (this matches the founder's locked "human approval gates, collect-only payments, AI discloses itself" decisions); idempotent side-effects; full audit trail; cost caps; alerting on failures.

**Compliance flags:** AI disclosure to anyone the automation contacts; consent and anti-spam rules for outbound messaging; payment handling kept collect-only/with-gates per the founder's policy; data protection for anything processed.

---

## How to use an archetype

1. Identify the archetype(s) in Discovery; note all that apply (most real products combine 2–3).
2. In Architecture, apply the archetype's **stack overrides** on top of `stack/default-stack.md`.
3. Pull the archetype's **special edge cases** into `phases.md` so they're explicitly built and tested — these are the failures that define each product type.
4. Surface the archetype's **compliance flags** to the founder in plain language, early.
5. Hold the archetype's **non-negotiables** as must-fix items in Verify.

> The point of archetypes: you should never ship a payment flow that ignores idempotency, a voice agent with dead-air on failure, a fintech app with float money, or a SaaS with leaky tenant isolation — because each archetype names exactly those traps up front.
