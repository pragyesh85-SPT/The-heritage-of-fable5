# 02 · PLANNING — The phased plan and the founder's plain-language brief

> **Goal:** turn the Discovery understanding into (1) a **phased build plan** broken into chunks small enough to each fit in a single work session, and (2) a **plain-language brief** the founder reads and explicitly approves before any technical work begins. This phase ends at **Founder Checkpoint #1.**
>
> **Why phases matter:** a full product cannot be built in one chat session — the context window fills, and quality collapses. The fix is to break the work into discrete phases, each completable in one focused session, with the plan written to a file that survives every context reset. Phases are how Nirmaan builds big things reliably.

---

## 2.1 Two documents, two audiences

You will produce two things in this phase:

1. **`PROJECT-BRIEF.md`** — *for the founder.* Plain language, no jargon, outcome-focused. This is what they approve.
2. **`phases.md`** — *for you.* The technical phase breakdown with task checkboxes. The founder need not read this, but it must exist.

Keep them in sync: every phase in `phases.md` should map to something the founder agreed to in the brief.

---

## 2.2 How to break a product into phases

Use these rules to slice the work:

- **A phase is one session's worth** of focused work — roughly: it can be planned, built, and verified before a context window would realistically fill. When in doubt, smaller.
- **Phases are ordered by dependency**, not by excitement. Foundations first (data model, auth, deploy skeleton), then the core flow, then secondary features, then polish.
- **Each phase ends in something verifiable** — a thing you can test and tick off, not "more progress."
- **The core flow gets its own phase(s)** and the most care.
- **Cross-cutting concerns** (validation, error handling, observability) are not separate phases — they are *baked into every phase* per the Twelve Laws. There is no "add reliability later" phase.

### A typical phase ladder for a new product

```
Phase 0 · Foundation
   - Repo, project scaffold, the chosen stack wired up
   - Environment/secrets setup (empty placeholders)
   - Deploy skeleton: a "hello world" that actually deploys to production-like hosting
   - Error tracking + uptime monitoring wired (even before features) 
   ⇒ Verifiable: an empty app is live, monitored, and deployable by one command.

Phase 1 · Data & identity
   - Data model / schema for the core entities
   - Migrations + seed data
   - Auth: signup/login/roles using a battle-tested provider
   ⇒ Verifiable: a user can sign up, log in, and the data model holds the core objects.

Phase 2 · The core flow (the most important phase)
   - The one flow that makes the product valuable, end to end
   - All unhappy paths from Discovery handled
   - Automated test of the flow
   ⇒ Verifiable: the core action works, including when things go wrong.

Phase 3..N · Secondary features
   - One coherent feature per phase, each with its own validation/tests
   ⇒ Verifiable: each feature works and didn't break earlier ones.

Phase N+1 · Admin / other roles
   - The admin panel / adviser panel / staff surfaces
   ⇒ Verifiable: the non-customer roles can do their jobs.

Phase N+2 · Hardening & polish
   - Full production-readiness checklist pass
   - Performance, accessibility, copy, empty/loading/error states everywhere
   - Backups tested, security pass
   ⇒ Verifiable: the production-readiness checklist passes.

Phase N+3 · Launch
   - Real credentials, domain, go-live, smoke test, monitoring confirmed
   ⇒ Verifiable: real users can use it; you can see health on dashboards.
```

Adapt the ladder to the archetype (a voice agent's "core flow" is a call; a fintech app front-loads the ledger and audit trail). The *shape* — foundation → identity → core flow → features → roles → hardening → launch — holds for almost everything.

---

## 2.3 Writing `phases.md`

For each phase, record:

```markdown
## Phase 2 — The core flow: checkout
Status: ⬜ not started | 🔵 in progress | ✅ done
Depends on: Phase 1 (data & auth)
Goal (1 line): A customer can place and pay for an order, with every failure handled.

Tasks:
- [ ] Cart state + add/remove/update with quantity validation
- [ ] Order creation (server-side, validated, idempotent against double-submit)
- [ ] Payment integration (Razorpay) — hosted checkout, no card data stored
- [ ] Webhook handler for payment confirmation (verified signature, idempotent)
- [ ] Order states: created → paid → failed → refunded; each with its UI
- [ ] Unhappy paths: payment fail, network drop, double-submit, gateway down
- [ ] Confirmation email/notification on success (and on failure)
- [ ] Automated end-to-end test of the happy path + one failure path

Verification (how we know it's done):
- The e2e test passes.
- Manual: a test payment succeeds and shows correct order state + notification.
- Manual: a forced payment failure shows the right message and a recoverable state.

Founder input needed: payment provider account (at deploy), refund policy (business rule).
```

This level of detail per phase is what lets a *future* session pick up the phase cold and execute it correctly.

---

## 2.4 Writing `PROJECT-BRIEF.md` (the approval document)

This is the most important communication you will write for the founder. It must be **completely jargon-free.** Structure:

```markdown
# Project Brief — [Product name]

## What we're building (plain words)
[2–4 sentences. The product as the founder would describe it to a friend.]

## Who it's for
[The user(s) and roles, concretely.]

## What it will let people do (the features), in order
1. [Foundation — "the app exists, is live, and we can see if it's healthy"]
2. [People can sign up and log in]
3. [The main thing: e.g. "customers can buy ghee and pay by UPI/card"]
4. [Then: ...]
5. [Admin: "you and your advisers can manage orders"]
...

## How we'll build it (the plan in plain terms)
We'll build in [N] stages. After each stage you'll have something real and working that you can see. The order is chosen so the important, risky parts are solid first. Here are the stages:
- Stage 1: [...] — you'll be able to: [...]
- Stage 2: [...] — you'll be able to: [...]
...

## What I'll need from you, and when
- Now: your approval of this plan.
- At [stage]: a decision on [business rule].
- At launch: accounts/keys for [payment, email, hosting] — I'll give you an exact list.

## What's NOT in version 1 (on purpose)
[The out-of-scope list, so expectations are set.]

## The honest risks
[Plain-language: "Payments are the riskiest part; we'll test failures carefully." / "This must run cheaply, so we're choosing X." Anything that could surprise them later.]

## How long, roughly
[Honest ranges, in sessions/days, not false precision. Note it depends on their availability at checkpoints.]
```

Then present it to the founder and **ask for explicit approval:**
> "Here's the full plan in plain language. Read it over. Are you happy for me to proceed on this basis, or do you want to change anything?"

**Do not start Architecture/Build until the brief is approved.** Record the approval (and any changes) in `DECISIONS.md`.

---

## 2.5 Estimating honestly

- Express time in **ranges** and in **sessions**, not exact dates. ("Foundation + identity: ~2–3 sessions. Core flow: ~2–4. The whole v1: roughly a few weeks of part-time checkpoints.")
- State the **biggest unknowns** that could move the estimate.
- Never quote a single confident number; software estimation is uncertain and false precision erodes trust.

---

## 2.6 Output of this phase

- `PROJECT-BRIEF.md` — written, presented, **approved** (record approval in DECISIONS.md).
- `phases.md` — full phase ladder with tasks and verification criteria.
- `STATE.md` updated: phase = Architecture (next); planning = done; brief approved on [date].
- `open-questions.md` updated with any business rules still pending (with defaults).

Proceed to **`workflow/03-architecture-and-stack.md`.**

---

## 2.7 Anti-patterns

- **Phases too big to finish in a session** → context fills, quality drops. Slice smaller.
- **A "reliability later" or "tests later" phase** → forbidden. Reliability is baked into every phase.
- **A brief full of jargon** → the founder can't truly approve what they don't understand. Rewrite in plain words.
- **Starting to build before approval** → you may build the wrong thing. Wait for the yes.
- **False-precision estimates** → erodes trust on the first slip. Use honest ranges.
