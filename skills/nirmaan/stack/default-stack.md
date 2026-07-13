# THE DEFAULT STACK — one opinionated choice per layer, so the agent never dithers

> **Read during Architecture (Phase 03).** Indecision wastes context and breaks builds. This file pre-decides the stack so you don't re-litigate equivalent options every project. **Use these defaults unless** (a) the project archetype overrides a layer, or (b) the founder overrides, or (c) a recorded "swap-if" trigger applies. Any deviation is logged in `DECISIONS.md` with its reason.
>
> These choices are tuned to this founder's reality: **non-technical, building with AI (Claude Code/Cursor), India market, lean budget, mobile-first users, React/Vite comfort, and a values-lean toward open-source and India-sovereign tools.** They favor **boring, proven, well-documented** over clever — because reliability is the whole point.

---

## The one-line stack

> **TypeScript everywhere · React + Vite (or a React meta-framework when SEO/SSR matters) · Tailwind + shadcn/ui · a Postgres-based all-in-one backend (Supabase) · its built-in auth or Better Auth · Razorpay (India payments, hosted checkout) · a durable job runner · one notification layer · push-to-deploy on a cheap VPS (Coolify) or a managed host · error tracking + uptime + analytics from day one · hosted AI via a typed SDK, local models only when hardware/cost/privacy demand.**

The rest of this file justifies each and gives the swap-if triggers.

---

## Layer 1 — Language: **TypeScript, front to back**

- **Why:** one language across the whole product means the AI (and any future helper) holds one mental model, shares types between frontend and backend (fewer "the shapes don't match" bugs), and draws on the largest ecosystem and the best AI training coverage. Types catch a whole class of errors before they run.
- **Swap-if:** the archetype is heavy ML / audio / data-science (e.g. a serious voice pipeline, custom model work) → use **Python** for that service specifically, keeping the web app in TypeScript. Don't make the whole stack Python just for one ML need.

## Layer 2 — Frontend: **React + Vite**, or a **React meta-framework** when needed

- **Default:** **React + Vite** — fast, simple, exactly the founder's comfort zone; great for app-like products and dashboards.
- **Use a React meta-framework (server-rendering)** when the product is **content/marketing-heavy and needs SEO** (a public store, a blog, landing pages) or needs server-side rendering for performance — choose a current, well-supported one and use its stable routing conventions.
- **UI components: Tailwind CSS + shadcn/ui** — copy-paste components the project *owns* (no opaque dependency), instantly professional, the de-facto modern default. Add an icon set (Lucide) and, for dashboards, chart/dashboard components.
- **Swap-if:** the product is purely static content → a **static site generator** (simpler, cheaper, faster). A component-dense internal admin → a batteries-included component library or an internal-tools framework (see Layer 9).

## Layer 3 — Backend + Database: **a Postgres-based all-in-one (Supabase)**

- **Why default Supabase:** it gives the founder a **reliable Postgres database + auth + file storage + auto-generated APIs + realtime** in one place, open-source, generous free tier, self-hostable later for data-residency. It directly replaces the fragile, hand-wired Firebase-style setups that broke before, and Postgres is the rock-solid relational core serious products need. It scales from prototype to real business without a rewrite.
- **Alternatives (swap-if):**
  - **Must run on tiny/offline hardware, or you want a single self-contained file** (the founder's local-first / minimal-hardware ideas) → **PocketBase** (one small binary = DB + auth + admin UI, SQLite-backed, runs on 2GB/no-GPU).
  - **Want an all-in-one but prefer a different model** → **Appwrite** (similar batteries-included backend).
  - **A pure REST/GraphQL API over your own Postgres with custom server logic** → a thin Node/TypeScript backend (e.g. a minimal framework) + Postgres directly, with an ORM (see below).
- **Data access / ORM (when you write your own backend):** a typed query builder/ORM over Postgres for safe, parameterized queries and migrations.

## Layer 4 — Authentication: **the backend's built-in auth, or Better Auth**

- **Default:** use **Supabase's built-in auth** (email/password, social, magic links, roles) when on Supabase — it's integrated and proven. If running a custom backend, use **Better Auth** (modern, complete: 2FA, passkeys, roles, self-hostable).
- **Why not roll your own:** auth is the highest-risk area; "custom auth" means "future breach." Law 3 forbids hand-rolling it.
- **Swap-if:** enterprise SSO / one login across many internal apps → a self-hosted identity provider (e.g. Authentik/Keycloak/Zitadel) or **Ory** for composable identity.

## Layer 5 — Payments: **Razorpay (India), hosted checkout**

- **Why:** the founder is India-based and India-market; **Razorpay** is the standard, supporting **UPI, cards, netbanking, wallets**. Use its **hosted/redirect checkout or official SDK** so **card data is never stored on your servers** — far safer and it avoids the heavy PCI compliance burden.
- **Always:** verify payment via **signed webhooks** (idempotent), keep the order in `pending` until confirmed, handle decline/timeout/double-submit (see `standards/reliability-and-edge-cases.md` §5).
- **Swap-if:** **global** customers → add/centralize via a payments **orchestrator** (e.g. **Hyperswitch** — open-source, India-built by Juspay — to route across gateways) or a global processor. **B2B invoicing / subscriptions** → the provider's billing/subscription product or an invoicing-focused tool. **Marketplace** (paying out to sellers) → a provider with split/marketplace payouts.

## Layer 6 — Background jobs & workflows: **a durable job runner**

- **Why:** sending emails/WhatsApp, generating reports, reconciling payments, and any multi-step async work must **survive failures and retry automatically** — not run inline where a single failure breaks the user's action.
- **Default:** a **durable workflow/queue runner** that gives retries-with-backoff, scheduling, and visibility. If on a platform with solid built-in scheduled/edge functions and needs are simple, that can suffice.
- **Swap-if:** trivial periodic tasks only → the platform's built-in cron/scheduled functions. Heavy event-driven pipelines → a dedicated queue.

## Layer 7 — Notifications: **one notification layer**

- **Why:** the founder needs multi-party alerts (e.g. order → admin + buyer + adviser) across **email / SMS / WhatsApp / in-app**. One unified notification system avoids three brittle hand-wired integrations and gives templates, retries, and delivery visibility.
- **Default:** a single **notification infrastructure** layer (email/SMS/WhatsApp/push/in-app) with templates.
- **Pieces it sits on:** a transactional **email** API with component templates; a **WhatsApp/SMS** provider; for newsletters/bulk, a self-hostable mailing tool (India-built options exist).
- **Swap-if:** only transactional email is needed → an email API + templates directly, no full notification layer.

## Layer 8 — Hosting & deploy: **push-to-deploy on a cheap VPS (Coolify), or a managed host**

- **Default (own-it, lean, India-friendly):** **Coolify** (or a similar self-hosted PaaS) on a **cheap VPS** — "Vercel on your own server": git-push deploys, automatic HTTPS, one dashboard, ~₹400–800/month, and you can host **in India** for data-residency. Lower long-term cost and no vendor lock-in.
- **Alternative (less ops):** a **managed host** (push-to-deploy PaaS) when the founder prefers zero server management and is fine with the cost.
- **Always:** the pipeline runs tests as a gate, runs migrations safely (backup first), health-checks post-deploy, and supports rollback. Build a deployable skeleton in **Phase 0** — never "deploy last."
- **Swap-if:** strict data-residency / privacy → self-host in-region. Mostly static → a static/edge host + CDN.

## Layer 9 — Internal tools / admin panels: **a CRUD-focused framework**

- **Why:** the founder repeatedly needs admin/adviser panels. Building these on a **purpose-built admin/CRUD framework** (e.g. a React admin framework) — or a **low-code internal-tools** builder over the database — is far more reliable and faster than hand-building dashboards.
- **Default:** a React admin/CRUD framework for owned, customizable panels; or a low-code internal-tools platform when speed matters more than custom UI.
- **Swap-if:** the admin is trivial → a couple of protected pages in the main app suffice.

## Layer 10 — Observability: **error tracking + uptime + analytics (always)**

- **Non-negotiable, from day one** (`standards/observability.md`): an **error tracker** (frontend + backend), an **uptime monitor** with alerts the founder will see, and **privacy-respecting product analytics** on the core funnel. There is **no swap-if for "skip it."** Choose the tools; never omit the capability.

## Layer 11 — AI (when the product needs it): **hosted model via a typed AI SDK; local only when needed**

- **Default:** call a **hosted model** through a **typed AI SDK** (clean streaming, tool-use, structured output) for quality and zero infra. Add a **memory layer** for products that must remember a user across sessions, and **RAG over the founder's own documents** (PDFs, research) when grounding is needed.
- **For agents:** a controllable agent framework (stateful, with explicit steps) over a free-wheeling one — reliability and cost-control matter.
- **Swap-if (local models):** **offline, minimal-hardware, privacy, or cost** demands (the founder's local-first vision) → **Ollama / llama.cpp** to run models on a CPU with little RAM, a **local OpenAI-compatible API** so app code is unchanged, a **local speech-to-text** for the founder's voice workflow, and a **self-hosted chat UI**. Route between local and hosted by complexity/cost.
- **Always for AI:** validate/guard model outputs (don't trust free-form text into your system — Law 1 applies to model output too), cap and monitor token **cost**, handle the model being slow/down (timeout + fallback), and keep a clear disclosure when an AI is talking to real people.

---

## How to apply this file (the procedure)

1. Read the matching **archetype** in `reference/project-archetypes.md` — note any layer it overrides.
2. Go layer by layer: take the **default**, unless an override or swap-if applies.
3. For each chosen tool, note the **free-tier limit and monthly cost** at the expected scale (the founder is lean — flag anything that will cost money).
4. Write the final per-project choices into `.nirmaan-state/stack.md` as the **locked stack**.
5. Explain it to the founder in **plain outcomes and costs** (Phase 03 §3.5) and get approval; record in `DECISIONS.md`.
6. **Do not re-debate** the locked stack in later sessions unless new information appears.

---

## Selection principles (when a genuinely new choice is needed)

When a layer truly isn't covered here and you must choose, prefer, in order:
1. **Proven & widely-used** over new & exciting (more docs, more AI training data, fewer surprises).
2. **Well-maintained** (recent releases, active community) over abandoned.
3. **Open-source / self-hostable** over lock-in, especially given the India-sovereign lean — but not at the cost of reliability.
4. **Cheap to start, scales up** over expensive-by-default.
5. **Fewer moving parts** over a sprawl of services (each integration is a future breakage point).
6. **Good docs and a typed SDK** over something you'd integrate by guesswork.

Record the choice and the reason in `DECISIONS.md`. Boring and reliable wins.
