# GLOSSARY — every technical term, in plain language

> **Two uses:** (1) the **founder** can look up any word the agent uses and instantly understand it; (2) the **agent** uses these plain-language definitions when explaining things, so it never talks over the founder's head. If the agent must use a technical term with the founder, it should give the plain meaning alongside — this file is the reference for how.
>
> Organized by theme. Definitions are deliberately simple, not exhaustive.

---

## The basics

- **Frontend** — the part of the app people see and tap (screens, buttons). Runs in the browser/phone.
- **Backend** — the part people don't see; it runs on a server, holds the logic, and talks to the database.
- **Database** — where the app's data lives permanently (users, orders, logs). Think of it as a very reliable, structured set of tables.
- **Server** — a computer (usually rented in a data centre) that runs your backend and serves your app to the world.
- **API** — the doorway through which the frontend (or another app) asks the backend to do things ("get my orders", "log a fast"). A defined set of requests it accepts.
- **Stack** — the full set of tools/technologies used to build the app, top to bottom.
- **Repo (repository)** — the folder holding all the app's code, usually tracked with **git**.
- **Git** — a system that records every change to the code, so you can see history and undo mistakes. **GitHub** is a popular place to store git repos online.
- **Deploy** — to publish your app so the world can use it (put it onto a live server).
- **Environment** — a copy of the app set up for a purpose: **local** (on the builder's machine), **staging/preview** (a test copy), **production** (the live one real users hit).

## Reliability & quality

- **Production-grade** — built to a standard where real strangers can rely on it, not just a demo. The whole point of Nirmaan.
- **MVP / prototype** — a rough, minimal version to test an idea; not built to last. (Nirmaan builds the full thing, not this.)
- **Edge case** — an unusual but real situation (empty input, double-tap, a service being down) that breaks software if not handled.
- **The "happy path"** — the normal, everything-goes-right flow. The opposite is the **unhappy path** (failures, empties, errors) — where most breakage lives.
- **Validation** — checking that incoming data is sensible and safe before using it (e.g. an email is really an email, a quantity isn't negative).
- **Idempotent** — an action that's safe to repeat: doing it twice has the same effect as once (so a double-tap doesn't create two orders or charge twice).
- **Migration** — a recorded, reversible change to the database's structure (e.g. adding a column), done safely instead of by hand.
- **Backup** — a saved copy of your data so it can be restored if something goes wrong.
- **Rollback** — reverting to the previous working version after a bad change.
- **Test (automated)** — code that checks your app still works, run automatically so you catch breakage before users do.
- **Regression** — when a change accidentally breaks something that used to work. Tests catch these.

## Security

- **Secret / API key** — a password-like string that lets your app use a paid service (payments, messaging). Must be kept hidden, never in the code.
- **Environment variable / secrets manager** — the safe place to keep secrets, outside the code.
- **Authentication (auth / login)** — proving who a user is (signing in).
- **Authorization (permissions)** — deciding what a signed-in user is allowed to do/see.
- **Injection** — an attack where bad input is crafted to trick your database or app into doing something harmful. Prevented by validation + safe queries.
- **XSS (cross-site scripting)** — an attack that injects malicious scripts into your pages. Prevented by escaping output.
- **IDOR** — an attack where someone changes an ID in a request to access data that isn't theirs. Prevented by checking ownership on the server.
- **HTTPS** — the secure (padlock) version of web traffic; encrypts data between the user and your app. Mandatory in production.
- **Webhook** — a message a service (like a payment gateway) sends your app to notify it of an event ("payment succeeded"). Must be verified so fakes are rejected.
- **PII (personally identifiable information)** — data that identifies a person (name, phone, email). Handle with care; collect the minimum.

## Money & payments

- **Payment gateway** — the service that actually processes payments (e.g. Razorpay). 
- **Hosted checkout** — the gateway handles the card/UPI entry on its own secure page, so your app never touches card data (much safer).
- **UPI** — India's instant bank-to-bank payment system (PhonePe/GPay/etc.).
- **Reconciliation** — checking that your records of money match the provider's/bank's records.
- **Minor units** — money stored as whole numbers (paise/cents) to avoid rounding errors, instead of decimals/floats.

## AI & automation

- **LLM (large language model)** — the kind of AI that understands and generates text (what powers chat/agents).
- **Agent** — an AI set up to take actions and complete multi-step tasks, not just chat.
- **Token** — the unit AI models are billed in (roughly chunks of words). More tokens = more cost.
- **RAG (retrieval-augmented generation)** — giving the AI your own documents to ground its answers in facts, instead of relying on its memory.
- **Memory (for AI)** — storing what a user told the AI before, so it remembers across sessions.
- **Guardrails** — rules/checks that keep an AI on-task, on-policy, and safe.
- **Local model** — an AI model that runs on your own hardware (offline, private, cheaper at scale).
- **STT / TTS** — speech-to-text (turning voice into words) and text-to-speech (turning words into voice). Used in voice agents.
- **MCP (Model Context Protocol)** — a standard way to connect AI tools to external data/services (e.g. so the agent can read current docs or your calendar).
- **Prompt** — the instruction you give an AI.
- **Context window** — how much an AI can "hold in mind" at once. When it fills, it forgets — which is why Nirmaan writes state to files.

## Building & operations

- **Boilerplate / starter** — a pre-built project skeleton with common pieces (auth, billing) already wired, to save time.
- **Component (UI)** — a reusable piece of interface (a button, a card, a form). **shadcn/ui** provides these.
- **CRUD** — Create, Read, Update, Delete — the basic operations of an admin/data tool.
- **CDN** — a network that serves your app's files quickly from locations near each user.
- **Background job / queue** — work done outside the user's request (sending emails, reports), with automatic retries.
- **Observability** — being able to *see* what your app is doing and when it breaks (errors, uptime, usage).
- **Error tracking** — a tool that records every error real users hit, with details to fix it (e.g. Sentry).
- **Uptime monitoring** — a watchdog that checks your site is up and alerts you if it's down (e.g. Uptime Kuma).
- **Analytics (product)** — seeing how users actually use your app and where they drop off (e.g. PostHog).
- **Logs** — timestamped records of what the app did, used for debugging.
- **CI/CD** — automation that tests and deploys your code reliably each time you change it.
- **VPS** — a cheap rented virtual server you can host your app on.
- **PaaS** — a platform that makes deploying easy (push your code, it handles the rest); **Coolify**/Dokploy are self-hosted ones.
- **Self-hosted / open-source** — software you run yourself (more control, often free) rather than renting as a service.

## Nirmaan-specific terms

- **Nirmaan** — this build skill/protocol; the operating manual for your AI dev team.
- **`.nirmaan-state/`** — the hidden folder holding the project's memory (status, decisions, plan) so work continues across chats.
- **STATE.md** — the living "where are we" file; the agent reads it first, updates it last.
- **DECISIONS.md** — the append-only log of every choice and why.
- **phases.md** — the build plan broken into session-sized stages with checkboxes.
- **Handoff (block)** — the note the agent writes at the end of a session so the next one can resume; you paste it forward.
- **Checkpoint** — a point where the agent pauses for you: approve the plan, approve the stack, hand over credentials.
- **The "20%"** — the invisible work (validation, error handling, real auth/payments, tests, monitoring) that makes software reliable, which AI skips unless told to bake it in.
- **Archetype** — a kind of product (e-commerce, voice agent, fintech, etc.) with its own known pitfalls.

---

> If the founder ever hears a word not in this list and feels lost, the right response from the agent is always: **stop and explain it in one plain sentence.** The founder should never have to pretend to understand jargon to keep things moving.
