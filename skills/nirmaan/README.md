# NIRMAAN — Master Build Skill for AI Agents
### निर्माण · "construction / creation"
### A reusable operating manual that turns any capable AI coding agent (Claude Code, Cursor, etc.) into a disciplined, full-stack production team — while you stay the non-technical director.

---

## Who this is for

You are a **founder with vision, not a developer** — and you don't want to become one. You have ideas. You point an AI agent at them. The agent builds. But today the result *works once and then breaks*, because the agent builds the visible features and skips the invisible 20% (validation, error handling, real auth/payments, testing, monitoring, repeatable deploys) that keeps software alive for real users.

**Nirmaan fixes that** by giving the agent a permanent set of rules, a fixed workflow, quality gates it cannot skip, and — critically — a way to **remember across many chat sessions** so a large product can be built over days or weeks without losing the plot.

You never write code. You do four things:

1. **Allow** — approve the plan and the stack when the agent presents them in plain language.
2. **Provide credentials & permissions** — when the agent reaches deployment, it asks you for accounts/keys; you paste them.
3. **Carry context between chats** — when one chat fills up, the agent writes a short handoff. You start a new chat and paste it (or just tell the agent to read the project files). The agent picks up exactly where it left off.
4. **Unblock** — answer the occasional question only you can answer (business rules, brand, priorities).

That's it. Everything else is the agent's job.

---

## What Nirmaan is (and is NOT)

**It IS:** a folder of detailed markdown instructions — a "skill" / "constitution" / playbook. Knowledge and process. Lightweight (a few megabytes of text). You drop it into any project and point your agent at `CLAUDE.md`.

**It is NOT:** a giant pile of cloned code. You asked earlier whether to merge 100 repos into one — you cannot, and you shouldn't. Those 100 are different *kinds* of things (tools, whole apps, books, and direct rivals like Medusa-vs-Saleor-vs-Vendure). Merging them produces gigabytes of conflicting code that means nothing as a unit and drowns the agent — which is the exact unreliability you're escaping. A master builder doesn't carry the whole hardware store into the garage; he carries a **playbook** that says which tools to use, in what order, to what standard. Nirmaan is that playbook. The 100 repos live inside it as a *curated reference* (`reference/100-repos.md`) that the agent consults and installs **only the few each project actually needs.**

---

## Why it's built as many files, not one 5,000-line file

You asked for something huge and ultra-detailed — and it is (the whole skill is well over 5,000 lines). But it is deliberately **split into many focused files** instead of one monster file, for a reason that comes straight from how these agents actually work in 2026:

> An agent's output quality is a direct function of its **context quality**. If you stuff 5,000 lines into the one file it reads on every turn, you *dilute* its attention — it filters, forgets, and misses the rule that mattered. The winning pattern is **progressive disclosure**: a short "router" file (`CLAUDE.md`, kept lean) that the agent always reads, which then tells it *which* detailed file to open *for the phase it's in right now*. Big total. Small working set. That is how you get both depth and reliability.

So: the depth you wanted is all here. It's just organized so the agent loads the right 300 lines at the right moment, not all 5,000 at once.

---

## The two modes

### Mode A — Build a new product from scratch
You point the agent at Nirmaan and say "new project." It runs the full sequence:

```
DISCOVERY → PLANNING → ARCHITECTURE & STACK → [your approval]
→ BUILD ⇄ VERIFY (loop) → DEPLOY (asks you for credentials) → LIVE
```

It explains the entire plan to you in **non-technical language and waits for your "yes"** before it goes deep technically. It builds a *fully working stack*, not a prototype. It checks its own work and loops back until it's solid. Then it asks for credentials and ships.

### Mode B — Rescue / audit an existing product (e.g. This Is Purest)
You attach Nirmaan to a codebase that already exists and is breaking. It:

1. **Reverse-engineers the product** — what it actually is, its concept, its "persona/philosophy," how the applications connect.
2. **Audits everything** — finds the flaws, the missing 20%, the security holes, the reliability gaps.
3. **Asks you** the questions only you can answer.
4. **Gives you the honest call:** rebuild these apps from scratch, *or* keep the codebase and fix/refactor it — with reasons.
5. Then executes whichever path you approve, using the same standards as Mode A.

---

## How to use it (step by step, non-technical)

1. **Get the folder onto your machine.** Unzip `nirmaan/` somewhere permanent (e.g. `~/nirmaan`).
2. **For a NEW project:** create an empty project folder, copy the contents of `nirmaan/` into it (or into a `.nirmaan/` subfolder and copy `CLAUDE.md` to the root). Open Claude Code in that folder.
3. **For an EXISTING project:** copy `nirmaan/` into the existing project (as `.nirmaan/`), and copy/merge `CLAUDE.md` to the root. Open Claude Code in that folder.
4. **Paste the right kickoff prompt** from `prompts/kickoff-prompts.md` (there's one for *new*, one for *audit*, one for *resume*).
5. **Let the agent lead.** It will interview you, plan, and pause for your approvals. Say yes / no / change-this in plain words.
6. **When a chat gets long**, type: *"Wrap up: update STATE.md and DECISIONS.md, then give me the handoff prompt."* Start a new chat, paste the `resume` kickoff prompt, and the agent reads its own notes and continues.
7. **At deploy time**, it gives you an exact, numbered list of what accounts/keys to create and where to paste them.

---

## What's in this folder

```
nirmaan/
├── README.md ............................ this file (for you, the founder)
├── CLAUDE.md ............................ the agent reads this FIRST — laws + router
├── FAQ.md ............................... straight answers to your real questions
├── CHECKLISTS.md ....................... every phase gate on one scannable page
│
├── workflow/ ............................ the step-by-step build process
│   ├── 00-bootstrap.md .................. how the agent starts: detect mode, the master loop
│   ├── 01-discovery.md .................. interview you, understand the real product
│   ├── 02-planning.md ................... the phased plan + your plain-language brief
│   ├── 03-architecture-and-stack.md ..... design the system, choose the stack
│   ├── 04-build.md ...................... production build discipline (the 20%, applied)
│   ├── 05-verify.md ..................... the back-and-forth self-checking loop
│   ├── 06-deploy.md ..................... credentials, go-live, post-launch
│   ├── 07-continuity.md ................. THE KEY FILE: memory across chats, handoffs, resume
│   └── 08-iterate-and-grow.md .......... post-launch: real users, safe improvements, growth
│
├── audit/
│   └── audit-existing-project.md ........ the rescue playbook for broken products
│
├── standards/ ........................... the non-negotiable quality bars
│   ├── production-readiness.md .......... the master "is this real?" checklist
│   ├── reliability-and-edge-cases.md .... how software breaks, and how to prevent it
│   ├── security.md ...................... OWASP-based hardening
│   ├── testing.md ....................... what to test and how
│   ├── observability.md ................. error tracking, uptime, analytics
│   ├── data-and-backups.md .............. migrations, backups, never lose data
│   ├── ux-and-accessibility.md .......... usability, mobile-first, human copy
│   ├── performance-and-cost.md .......... fast enough, cheap enough (hard cost caps)
│   ├── api-design.md .................... clean, safe design of your app's own API
│   └── git-and-collaboration.md ......... version control + working with a teammate
│
├── stack/
│   ├── default-stack.md ................. the ONE opinionated stack + "swap this if…" notes
│   └── integration-recipes.md .......... safe-wiring recipes (payments, AI, notifications…)
│
├── reference/
│   ├── 100-repos.md ..................... the curated 100, tagged by purpose
│   ├── project-archetypes.md ............ recipes: voice agent, finance app, e-commerce, SaaS…
│   ├── archetype-deep-dives.md ......... example data models, phase ladders, failure lists
│   ├── decision-trees.md ............... step-by-step logic for the recurring judgment calls
│   ├── worked-example.md ............... a full end-to-end example build
│   ├── glossary.md ..................... every technical term, in plain language
│   ├── tech-explainers.md .............. how the pieces work, explained simply
│   └── troubleshooting.md .............. symptom → likely cause → fix
│
├── playbook/
│   └── common-scenarios.md ............. handling the situations that don't fit the clean flow
│
├── prompts/
│   ├── kickoff-prompts.md .............. YOUR ready-to-paste prompts: new / audit / resume
│   └── agent-self-prompts.md ........... the prompts the agent runs on itself
│
└── templates/ ........................... files the agent copies into each project
    ├── STATE.template.md ................ the living "where are we" file (the memory)
    ├── PROJECT-BRIEF.template.md ........ the plain-language plan you approve
    ├── DECISIONS.template.md ............ every decision + why (so nothing is re-litigated)
    └── HANDOFF.template.md .............. the between-chats handoff note
```

---

## The honest promise

This will make your AI build **dramatically more reliably** and reach "real, deployed, working" far more often than today. It removes most of the breakage and most of the re-explaining.

What it will **not** do is make every build 100% perfect and 100% hands-off, every single time. Even the best agent in 2026 still needs a human at a few checkpoints — approve the plan, approve the stack, hand over credentials, occasionally unblock. **That is not a flaw. It is the design.** Those few checkpoints are exactly *why* the result won't silently break, and they're the same "human-approval-gate" model you already chose for your agency vision. Nirmaan's job is to make those checkpoints **few, clear, and in your language** — and to make everything between them the agent's responsibility, done to a production standard.

You bring the vision and the four words: *allow, provide, carry-context, unblock.* The agent brings the engineering. That's the deal.
