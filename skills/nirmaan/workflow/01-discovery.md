# 01 · DISCOVERY — Understand the real product before touching code

> **Goal of this phase:** convert the founder's vision into a precise, written understanding of *what* you are building, *for whom*, and *under what constraints* — including the edge cases the founder hasn't thought of. You produce no product code here. You produce **understanding**, written to `.nirmaan-state/`.
>
> **Why this matters:** most broken software is built on a misunderstanding, not bad code. Twenty minutes of good questions here prevents weeks of wrong work. The founder thinks in vision and outcomes; your job is to extract the specifics that vision implies.

---

## 1.1 The mindset: interview, don't transcribe

The founder will give you a vision in a few sentences ("an app that lets people log their fasts and see streaks", "a voice agent that calls leads"). **Do not start building from that.** A vision is a destination, not a blueprint. Your job is to ask the questions that turn it into a blueprint — including the unglamorous ones the founder won't volunteer.

Interview in **plain language**. Ask about goals, users, the core action, money, data, and failure. Ask a few questions at a time, never a wall. Offer your own sensible default with each question so the founder can just confirm:

> "When someone fails to log a fast for a day, should their streak reset to zero, or do they get a one-day grace? (Most apps give a grace day — shall we?)"

---

## 1.2 The Discovery questionnaire (adapt to the project)

Work through these areas. Skip what's obviously irrelevant; probe what's unclear. Record answers in `PROJECT-BRIEF.md` as you go.

### A. The core
1. **In one sentence, what does this product let a person do?** (The "core action.")
2. **Who is the user?** Be concrete: their device, their tech-comfort, their language, their context (on the move? in a shop? at a desk?).
3. **What does success look like** in 3 months? (Used by N people? N orders? N calls handled?) This sets the bar for scale.
4. **What is the single most important flow** — the one that, if it breaks, the product is worthless? (e.g. checkout, the call, the fast-log.) This flow gets the most testing.

### B. Scope and surfaces
5. **What are the screens/surfaces?** List every page/screen a user touches. (This becomes the build checklist.)
6. **Is there more than one app?** (Customer app + admin panel + adviser panel? A web app + a worker/automation? A public site + a dashboard?) Map them and how they relate.
7. **Who are the *other* users** besides the end customer? Admins, staff, partners? Each role implies different permissions and screens.
8. **What's explicitly OUT of scope** for v1? (Pin this down — it's how you avoid endless building.)

### C. Money and data (the high-risk areas)
9. **Does money change hands?** How (one-time, subscription, marketplace)? Which provider/region? (India → UPI/cards via Razorpay; etc.) Refunds?
10. **What data do we store about users?** Any sensitive data (payments, health, identity, location)? This drives security and compliance.
11. **What must never be lost?** (Orders, logs, user accounts.) These get backups and extra care.
12. **What are the business rules** only you know? (Pricing tiers, eligibility, who-sees-what, limits, regional rules.)

### D. Integrations and the outside world
13. **What external services must it talk to?** (Payment gateway, WhatsApp/SMS, email, calendar, a CRM, a telephony provider, an AI model, a maps API.)
14. **Any existing systems** it must fit into? (An existing Notion, a spreadsheet, an existing database, an existing brand site.)
15. **Any hard constraints?** (Must run on cheap hardware? Must be India-hosted? Must work offline? Must be a particular language?)

### E. The unhappy paths (the part founders skip — you must not)
16. For the core action, walk through failure with the founder in plain terms:
    - What if the **payment fails** halfway? What should the user see and what state should the order be in?
    - What if the **network drops** mid-action?
    - What if the user **double-taps / double-submits**?
    - What if a field is **empty, huge, or garbage**?
    - What if **two people act at once** on the same thing?
    - What if an external service (WhatsApp, the AI, the gateway) is **down or slow**?
    - What's the **abuse** scenario — someone trying to cheat, spam, or break it on purpose?
17. **Irreversible actions:** which actions can't be undone (delete account, cancel order, send money)? These need confirmation steps and recovery paths.

### F. The intangibles (concept & persona)
18. **What's the feeling/philosophy** of the product? (Calm and spiritual? Fast and transactional? Trustworthy and premium?) This guides design and copy.
19. **Whose product does it resemble**, and how is it different? (One or two reference products.)

---

## 1.3 Detecting the archetype

From the answers, classify the product into one or more **archetypes**, then read the matching section of `reference/project-archetypes.md` during Architecture. Common ones:

- **E-commerce / D2C** — catalog, cart, checkout, payments, orders, fulfilment, admin.
- **Voice / telephony agent** — inbound or outbound calls, speech-to-text, an AI brain, text-to-speech, call state, logging, compliance (consent, disclosure).
- **Fintech / finance software** — accounts, transactions, ledgers, strict correctness, audit trails, heavy compliance.
- **Internal tool / admin panel** — CRUD over data, roles, dashboards, exports.
- **Content / SaaS** — accounts, subscriptions, a core feature, billing, multi-tenancy.
- **AI chat / companion product** — conversation, memory, model routing, guardrails, cost control.
- **Automation / agency backend** — pipelines, jobs, integrations, human-approval gates.

A product is often a *combination* (e.g. "e-commerce + admin panel + WhatsApp automation"). Note all that apply.

---

## 1.4 Special handling: voice agents, fintech, and anything touching real people or money

If the archetype is **voice**, **fintech**, or otherwise high-stakes, raise these *now*, in Discovery, in plain language — they change everything downstream:

- **Voice agents:** Does the law in your market require the agent to **disclose it's an AI**? Do you need **consent to record**? Are there **calling-time / do-not-call** rules? Outbound cold-calling is heavily regulated in many places — confirm the intended use is inbound or consented. (This mirrors a sound "AI discloses itself, inbound-preferred" policy.)
- **Fintech:** Are you **handling/storing money or just reading data**? Storing card data triggers heavy compliance (PCI) — almost always avoid it by using a provider's hosted checkout. Do you need an **audit trail** of every transaction? (Yes, always, for finance.)
- **Health/spiritual/wellness:** avoid medical claims; keep guidance general; note any duty-of-care.

You are not the founder's lawyer, and you say so — but you **flag these so they aren't discovered after launch.**

---

## 1.5 Output of this phase

Before leaving Discovery, `.nirmaan-state/PROJECT-BRIEF.md` must contain, in plain language:

- The one-sentence core action.
- The user(s) and roles.
- The success bar (implied scale).
- The list of surfaces/apps and how they relate.
- Money & data summary (with risk flags).
- The integrations list.
- Hard constraints.
- The unhappy-path decisions for the core flow.
- The concept/persona.
- The archetype(s).
- Explicit out-of-scope list for v1.

Update `STATE.md`: phase = Planning (next), discovery = done, and list any unanswered items in `open-questions.md` with your recommended defaults.

**Do not proceed to Planning with major unknowns in the core flow or the money/data area.** Everywhere else, fill gaps with stated defaults and move on.

---

## 1.6 Anti-patterns to avoid in Discovery

- **Building during Discovery.** No code. Understanding only.
- **Accepting vagueness on the core flow.** "Users can pay" is not enough — *how, which provider, what on failure.*
- **Interrogating the founder.** Batch questions; offer defaults; keep it conversational.
- **Ignoring roles.** "There's also an admin" doubles your surfaces — capture it now, not in week three.
- **Skipping the unhappy paths** because they're tedious. They are the entire reason past builds broke.

When the brief is solid and approved-in-spirit, proceed to **`workflow/02-planning.md`.**
