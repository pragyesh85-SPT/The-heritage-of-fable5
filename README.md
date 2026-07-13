# The Heritage of Fable 5

**An inheritance vault: everything one frontier AI model knew about doing real
production work for a real founder — written down so that any model, of any
size and any price, can do the work just as well.**

This is not a prompt collection. It is a complete, battle-tested **operating
system for AI-assisted software work**: 70+ interlinked documents that turn
judgment into procedure, so the intelligence lives in the *system* and the
executor — Claude, GPT, DeepSeek, a local model, or a human — just follows it.

> *"Put the intelligence in the SOP, not in the executor. A cheap model
> following a precise SOP written by a top-tier model outperforms a top-tier
> model improvising."* — W94

## Why this exists

Frontier models are expensive and, one day, each of them is gone — replaced,
deprecated, priced out. Everything a model "knew" about your projects, your
standards, and its own working methods evaporates with it. This vault is the
countermeasure: the author asked Claude Fable 5 to extract its complete working
knowledge — its procedures, its failure catalogs, its taste, and even **its own
thinking patterns** (`craft/C13-HOW-I-THINK.md`) — into a form that transfers.

The result compounds in the other direction too: with this structure, a
low-cost model (DeepSeek-class, Haiku-class) becomes genuinely useful for
production work, because every place it would need judgment, the vault already
made the decision.

## The four layers

| Layer | Path | Question it answers | When loaded |
|---|---|---|---|
| **Craft** | `vault/craft/` (C00–C14) | how to use intelligence well | once per model "tenure" |
| **Core** | `vault/00–10` | how to behave for this user | every session |
| **Workflows** | `vault/workflows/` (W10–W100) | how to do THIS specific task | one per task |
| **Registry** | `vault/_REGISTRY/` | what exists (your projects) | per project — **private, template provided** |

Plus, at the vault root: `RESURRECTION.md` (rebuild the entire system from zero)
and `GRAPH.html` (a self-contained interactive view of the vault's link graph —
regenerate anytime with `tools/makegraph.js`).

Entry point: **[`vault/HOME.md`](vault/HOME.md)**. Every session starts there.
The design rule that makes it work with any context size: *index always loaded,
bodies just-in-time* — a session loads ~3–5 files, never all 70.

## What's inside (highlights)

**Craft — transferable intelligence (`vault/craft/`)**
- `C13-HOW-I-THINK` — the generating function: the ten thinking patterns that
  produced every other document, plus the meta-procedure for writing new ones
- `C08-FAILURE-CATALOG` — how AI-assisted work actually goes wrong
- `C11-TIER-GAP-COMPENSATION` — running this vault on a weaker model: where the
  gap shows and the mechanism that buys each piece back
- `C01–C10` — epistemics, debugging, writing code, reading systems, planning &
  risk, self-verification, long tasks, taste, heuristics

**Workflows — one procedure per task type (`vault/workflows/`)**
- *Creating:* UI without AI slop (W13), UX design (W14), charts & dashboards
  (W15), AI features inside products (W16), components, SVG, PDFs
- *Backend:* Firestore schema/rules/debugging, multi-app sync, scaling,
  functions, backups, **production data migration (W27)** (W20–W27)
- *Operations:* git flow, environments, secrets, monitoring, live incidents,
  cost control (W30–W35)
- *Security:* baseline, auth/RBAC, payments, and **W43 — a six-lane application
  security audit SOP designed for cheap-agent fan-out**
- *Architecture:* systems (W90), memory systems (W91), RAG (W92), agents (W93),
  **multi-agent orchestration at minimum cost (W94)**, harness design (W95)
- *Agent operations:* task decomposition (W96), the briefing contract (W97),
  layered verification (W98), governance & the owner-consent gate (W99)
- *Knowledge system:* project registry, context loading under 2k tokens, cheap
  model leverage, the linked-note network, small-model prompt envelopes (W80–W84)
- **W100 — the vault acceptance test:** ten unannounced probes that verify a
  model is actually *operating* this system before you trust it with real work

**Skills & commands — one-command execution (`skills/`, `commands/`)**
- `/brain` — boots any session into the vault: load contract → route to the one
  matching workflow → work → write learnings back
- `/neuron` — per-project context "neural network": a `.neuron/` vault inside
  any repo (bootstrap / wake / sleep / link / status / rebuild) so a new chat
  gets full project memory in <3k tokens, and it travels with `git clone`
- `/no-slop` — anti-slop gates for all UI/UX/copy: a 20-pattern banned list,
  genre archetypes, a numeric token recipe, the trust layer, and an audit mode
- Plus the full toolbox: `graphify` (knowledge graphs), `nirmaan` (build
  protocol), `full-picture`, `research`, and orchestration commands
  (`builder`, `planing`, `checkcode`, `feature`) — catalog in
  [`skills/INDEX.md`](skills/INDEX.md)

**Any harness** — [`ANY-HARNESS.md`](ANY-HARNESS.md): the same system on
OpenCode, Hermes, custom Agent-SDK builds, or a bare LLM with file access.

## Quick start

**With Claude Code:**
1. Clone this repo. Copy `vault/` wherever you keep your work (it is also a
   valid Obsidian vault — open the folder in Obsidian to see the graph).
2. Copy `skills/brain/` into `~/.claude/skills/`, and edit the vault path
   inside `SKILL.md` to your location.
3. Rebuild `vault/_REGISTRY/` for your own projects — see the README and
   template inside that folder. **This layer stays private; never commit it.**
4. Type `/brain` at the start of any session.

**With any other model or harness:**
Paste `vault/HOME.md` as the session's first context and follow its load order;
`vault/workflows/W95-HARNESS-DESIGN.md` shows how to wire the vault into a
custom harness (the vault maps onto all seven harness components). Delegating
to small models? Use the ready envelopes in `W84`.

**Reading order if you're just curious:**
`HOME.md` → `craft/C00-READ-ME-FIRST.md` → `craft/C13-HOW-I-THINK.md` →
`workflows/W94-AGENT-COST-ORCHESTRATION.md`.

## The document shape (every workflow follows it)

**Trigger** (when to load this) → **Parameters** (decisions pre-made) →
**Procedure** (numbered, judgment-free steps) → **Verification** (the check
that proves it worked) → **Failure this prevents** (why the doc exists).
Cross-references are `[[wikilinks]]` — the vault is a connected graph, not a
pile of files.

## Adapting it

Some documents carry worked examples from the author's real portfolio (Indian
fintech: Firebase stack, Razorpay payments, vehicle-finance and e-commerce
domains). That specificity is deliberate — a rule you can't instantiate with
real names is a rule you don't actually hold. Swap the examples for your own;
the procedures underneath are stack-agnostic, and `C13`'s meta-procedure tells
you how to grow new workflow docs for task types the vault doesn't cover yet.

The vault is designed to be *living*: mistakes become rules (template H in
`09-PROMPT-TEMPLATES.md`), sessions write back what they learned (W83), and
external research gets re-distilled yearly (C12).

## Provenance & license

Written by **Claude Fable 5** (Anthropic) across working sessions in July 2026,
at the request of and in collaboration with **Pragyesh** ([@pragyesh85-SPT](https://github.com/pragyesh85-SPT)),
who open-sourced it so that anyone — regardless of which model they can
afford — can work with frontier-grade discipline.

Licensed under the [MIT License](LICENSE). Use it, fork it, feed it to your
models.
