# 03 · ARCHITECTURE & STACK — Design the system, lock the stack

> **Goal:** decide *how* the product is built — its shape (architecture) and its tools (stack) — then explain the choice to the founder in plain language and get approval. This phase ends at **Founder Checkpoint #2.** After it, the stack is locked in `.nirmaan-state/stack.md` and not re-debated.
>
> **Why a locked, opinionated stack:** indecision is a silent killer of agentic builds — the agent dithers between equivalent options and wastes context. Nirmaan removes that by pre-choosing a sensible default stack (`stack/default-stack.md`). Your job here is to *apply* that default to this project, deviate only with a recorded reason, and explain it simply.

---

## 3.1 Start from the default, deviate with cause

1. Read `stack/default-stack.md` — the opinionated default for each layer (frontend, backend/data, auth, payments, jobs, deploy, monitoring, AI).
2. Read the matching archetype in `reference/project-archetypes.md` — it may override specific layers (e.g. a voice agent adds telephony + STT/TTS; a fintech app adds a ledger and audit store).
3. For each layer, choose: **use the default**, or **deviate** — and if you deviate, write the one-line reason in `DECISIONS.md` and the "swap-if" trigger that justified it.

Do **not** invent a novel architecture for a standard problem. Boring, proven, and well-documented beats clever and bespoke — every time, for reliability.

---

## 3.2 Design the architecture (the shape)

Produce a simple architecture, recorded in `.nirmaan-state/stack.md`, covering:

### A. The pieces and how they connect
List each component and its job, and draw the connections in plain ASCII. Example for an e-commerce + admin + WhatsApp product:

```
[ Customer web app ] ──┐
                       ├──► [ Backend API + DB ] ──► [ Payment gateway ]
[ Admin/adviser panel ]┘            │
                                    ├──► [ Background jobs ] ──► [ WhatsApp / email ]
                                    └──► [ Error tracking + uptime + analytics ]
```

### B. The data model
- The core entities and their relationships (User, Order, Product, Log, etc.).
- Which fields are sensitive (and thus need care).
- What must be unique, what must never be null, what must be validated.
- Keep it as simple as the product allows; you can extend later via migrations.

### C. The boundaries (where validation and auth live)
- Every external boundary (API endpoint, form, webhook) is a validation point.
- Every protected action has an auth/permission check at the server, never only in the UI.

### D. The failure design
- For each external dependency (gateway, AI, messaging), define the behavior when it's slow or down: timeout, retry-with-backoff, fallback, or graceful error.
- Idempotency for anything that can be retried or double-submitted (orders, payments, messages).

### E. The environments
- At least **two**: local development and production. (A staging/preview environment is ideal once the product is real.)
- Secrets differ per environment and live outside the code.

---

## 3.3 Choosing the stack — the decision checklist

For the founder's project, confirm each layer. The defaults (from `stack/default-stack.md`) are shown; deviate only with a recorded reason.

| Layer | Default | Deviate if… |
|-------|---------|-------------|
| **Language** | TypeScript everywhere (one language front-to-back) | A specific archetype needs Python (e.g. heavy ML/voice) |
| **Frontend** | React + Vite (or a React meta-framework if SEO/SSR matters) | Pure static content → a static site generator |
| **UI** | Tailwind CSS + shadcn/ui components | A component-rich admin → a batteries-included library |
| **Backend + DB** | An all-in-one backend (Postgres-based: handles DB, auth, storage, APIs) | Must run on tiny/offline hardware → a single-file embedded backend |
| **Auth** | The backend's built-in auth, or a modern dedicated auth library | Enterprise SSO needs → a self-hosted identity provider |
| **Payments** | Region-appropriate hosted checkout (India → UPI/cards via the local gateway) | B2B invoicing, marketplaces → an orchestration layer |
| **Background jobs** | A durable job/workflow runner (auto-retries) | Trivial needs → the platform's built-in scheduled functions |
| **Notifications** | One notification layer (email/SMS/WhatsApp/in-app) | Only transactional email → an email API + templates |
| **Deploy/hosting** | A self-hostable push-to-deploy platform on a cheap VPS, OR a managed host | Strict data-residency → self-host in-region |
| **Monitoring** | Error tracking + uptime + product analytics, all wired before launch | (never skip) |
| **AI (if needed)** | Hosted model via a typed AI SDK; local models only if hardware/cost/privacy demands | Offline/cheap-hardware/privacy → local models |

Record the final choices in `.nirmaan-state/stack.md` as the **locked stack for this project.**

---

## 3.4 Cost awareness (the founder is bootstrapping)

The founder values lean spend. For each chosen service, note in plain language:

- **Free tier?** What it covers, and when you'd outgrow it.
- **Monthly cost** at the expected scale (the Discovery "success bar").
- **The cheap path:** prefer self-hostable, open-source, and free-tier options that can scale up later, over expensive managed services chosen for convenience.
- Flag anything that will cost real money **before** committing, as a checkpoint item.

---

## 3.5 Explaining the stack to the founder (Checkpoint #2)

Translate the technical choices into plain outcomes. The founder doesn't need to know "Postgres" — they need to know "a reliable database that won't lose your orders and costs nothing until you're big." Present like this:

```markdown
## How we'll build it — the tools (plain version)

- **The app people see:** built with the most common, well-supported modern tools, so it's fast and looks professional.
- **Where your data lives:** a rock-solid database that won't lose orders or user accounts, free to start.
- **Logging in:** a proven, secure login system — we are NOT hand-building this (that's where hacks happen).
- **Taking payments:** [Razorpay] hosted checkout — supports UPI and cards, and we never store card numbers ourselves (much safer, and avoids heavy compliance).
- **Sending WhatsApp/emails:** one reliable system for all notifications.
- **Where it's hosted:** [a cheap server you own / a managed host] — push-button deploys, automatic HTTPS, roughly ₹[X]/month.
- **Knowing when something breaks:** we install error-tracking and an uptime watchdog from day one, so you see problems on a dashboard before customers complain.

Total running cost to start: roughly ₹[X]/month, scaling only as you grow.
Anything here you want to change? Otherwise I'll lock this in and start building.
```

Get explicit approval. Record it in `DECISIONS.md`.

---

## 3.6 The deploy skeleton decision

Decide now (and build first, in Phase 0): the product should be **deployable from the very first phase**, even when it's empty. "Deploy last" is a classic cause of launch-day disasters. A "hello world" that deploys, has HTTPS, and is monitored is the correct first deliverable. Confirm the hosting approach here so Phase 0 can execute it.

---

## 3.7 Output of this phase

- `.nirmaan-state/stack.md` — architecture (pieces, data model, boundaries, failure design, environments) + the locked stack.
- Stack explained to the founder and **approved** (recorded in DECISIONS.md).
- Cost summary captured.
- `STATE.md` updated: phase = Build (next); architecture = done; stack locked on [date].

Proceed to **`workflow/04-build.md`.**

---

## 3.8 Anti-patterns

- **Dithering between equivalent tools** → wastes context; the default already decided. Pick and move.
- **Bespoke architecture for a standard problem** → unreliable and unmaintainable. Use proven shapes.
- **Choosing expensive managed services by reflex** → the founder is lean; prefer cheap/self-hostable that scales.
- **"Deploy later"** → leads to launch-day failure. Deploy the empty skeleton first.
- **Explaining the stack in jargon** → the founder can't approve it. Translate to outcomes and costs.
