# INDEX — the whole skill at a glance

> A one-line map of every file in Nirmaan, so the agent (and the founder) can navigate fast. The agent always *starts* at `CLAUDE.md`; this index is for finding the right detailed file quickly. Files are loaded **on demand** — never all at once (that's the point).

## Start here
- **`CLAUDE.md`** — the constitution + router. The agent reads this first, every session. Laws, mode detection, the master sequence, the map to everything else.
- **`README.md`** — founder-facing overview: what Nirmaan is, how you use it, the honest promise.
- **`FAQ.md`** — straight answers to the real questions.
- **`INDEX.md`** — this file.
- **`CHECKLISTS.md`** — every phase gate on one scannable page.

## The build process (in order) — `workflow/`
- **`00-bootstrap.md`** — how to start: detect NEW / AUDIT / RESUME, set up memory, the master loop.
- **`01-discovery.md`** — interview the founder; turn vision into a precise blueprint; find the edge cases.
- **`02-planning.md`** — break it into session-sized phases; write the plain-language brief (Checkpoint #1).
- **`03-architecture-and-stack.md`** — design the system; lock the stack (Checkpoint #2).
- **`04-build.md`** — production build discipline; bake the "20%" into every feature.
- **`05-verify.md`** — the back-and-forth self-checking loop; the skeptical reviewer.
- **`06-deploy.md`** — credentials (Checkpoint #3), reproducible deploy, production smoke test.
- **`07-continuity.md`** — THE memory file: state on disk, handoffs, resuming across chats.
- **`08-iterate-and-grow.md`** — post-launch: observe real usage, ship safe improvements, grow without bloat.

## Rescuing an existing product — `audit/`
- **`audit-existing-project.md`** — reverse-engineer the product, audit by severity, recommend rebuild / keep-and-fix / hybrid per app, then execute.

## The quality bars — `standards/`
- **`production-readiness.md`** — the master "is this real?" checklist (the hard gate to launch).
- **`reliability-and-edge-cases.md`** — the catalogue of how software breaks and how to prevent each.
- **`security.md`** — OWASP-based hardening (secrets, injection, auth, access control).
- **`testing.md`** — what to test and how, for a lean product.
- **`observability.md`** — error tracking + uptime + analytics, so breakage is visible.
- **`data-and-backups.md`** — migrations, backups, transactions; never lose data.
- **`ux-and-accessibility.md`** — usability, mobile-first, the four states, human copy.
- **`performance-and-cost.md`** — fast where it counts; hard cost caps for a bootstrapper.
- **`api-design.md`** — clean, safe design of the app's own backend API.
- **`git-and-collaboration.md`** — version control as safety net + memory; working with a teammate.

## The tools — `stack/`
- **`default-stack.md`** — the ONE opinionated default stack + "swap this if…" triggers.
- **`integration-recipes.md`** — safe-wiring recipes (payments, notifications, AI, auth, uploads, webhooks).

## Knowledge & navigation — `reference/`
- **`100-repos.md`** — the curated 100 tools/libraries/learning resources (a menu, installed selectively).
- **`project-archetypes.md`** — recipes for 7 product types (voice, fintech, e-commerce, SaaS, etc.).
- **`archetype-deep-dives.md`** — concrete data models, phase ladders, and failure lists per archetype.
- **`decision-trees.md`** — step-by-step logic for the recurring judgment calls.
- **`worked-example.md`** — a full end-to-end example build.
- **`glossary.md`** — every technical term, in plain language.
- **`tech-explainers.md`** — how the pieces actually work, explained simply.
- **`troubleshooting.md`** — symptom → likely cause → fix.

## When things don't fit the clean flow — `playbook/`
- **`common-scenarios.md`** — founder changes their mind, an API broke, a fix won't take, a chat fills up, a production incident, and more.

## Prompts — `prompts/`
- **`kickoff-prompts.md`** — the founder's ready-to-paste prompts: new / audit / resume / wrap-up / extract-context.
- **`agent-self-prompts.md`** — the prompts the agent runs on itself: reviewer, handoff, self-checks, planning, discovery, audit.

## Files the agent copies into each project — `templates/`
- **`STATE.template.md`** — the living "where are we" file (the project's memory).
- **`PROJECT-BRIEF.template.md`** — the plain-language plan the founder approves.
- **`DECISIONS.template.md`** — the append-only log of every decision + why.
- **`HANDOFF.template.md`** — the between-chats handoff note.

---

**The reading rule:** the agent reads `CLAUDE.md` always, the file for its current phase, and the specific standard/recipe/reference it needs *right now* — not the whole library. Depth lives across all these files; the working set stays small. That is what makes the agent both thorough and reliable.
