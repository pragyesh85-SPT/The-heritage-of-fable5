# W80 — The Project Registry (Local "Second Brain" Design)

Trigger: setting this up (once), onboarding any new project, quarterly cleanup.
Purpose: EVERY project on this PC describable to any model — big, small, or a cheap
one like a DeepSeek-class model — in under ~150 lines of context.

## Design (deliberately boring: plain Markdown, no database, no tools required)

```
E:\PRAGYESH - WORK\CLAUDE-BRAIN\_REGISTRY\
  INDEX.md            ← one line per project: name, status, one-line what-it-is
  <project-slug>.md   ← one card per project, fixed schema below
  notes\              ← atomic linked notes per project (see W83)
```
Plus: the folder opens as an Obsidian vault (it's just Markdown — Obsidian graph and
links work natively; link related projects as [[tip-advisor-app]]).

## The project card schema (FIXED — every card, same order, ≤150 lines)
```markdown
# <Project Name>
status: live | building | paused | dead        updated: 2026-07-12
one-liner: what it is, in one sentence
## Live
urls: ...                    firebase-projects: <dev-id> / <prod-id>
## Repos
paths on disk + git remotes + which branch is prod
## Stack
the 5-line version (frontend / backend / payments / integrations)
## Data
the 5 most important Firestore collections + one line each; link to repo SCHEMA.md
## Siblings
other apps sharing this database (the W23 blast-radius list)
## Money
how money flows in one paragraph; which keys exist (names only, W32)
## Current state
what phase, what's in progress, next milestone (absolute dates)
## Gotchas
the 3–7 landmines a newcomer must know ("commission engine is the only writer of
commission fields", "old advisor panel is frozen, hotfix only")
```

## Update triggers (this is what keeps it alive)
- Deploy to prod → update `Current state` + `updated`.
- Schema/money-flow change → update `Data`/`Money`.
- Any W34 postmortem → add the rule to `Gotchas`.
- Session end on a project → the AI updates that project's card as part of wrap-up.
**A registry updated "sometimes" is worse than none — stale cards teach wrong facts.
The card update is part of finishing work, like committing.**

## Relationship to the other memory layers (three layers, no overlap)
1. **Registry card** (`_REGISTRY/<slug>.md`) — WHAT the project is. Cross-project,
   loadable by anything.
2. **Project memory** (per-project Claude memory / vault) — durable FACTS and feedback
   for that project (W04 rules; one brain per project).
3. **Working state** (`.nirmaan-state/` in the repo) — WHERE the current multi-session
   task stands.
A new session loads 1 + 3 (and 2's index) — see W81. Never duplicate content across
layers; link instead.

## Failure this prevents
Every new chat re-exploring the codebase for 20 minutes, cheap models hallucinating
project facts, knowledge dying with a chat session, 40 projects only you can navigate.

## Linked
[[04-MEMORY]] · [[INDEX]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W32-SECRETS-MANAGEMENT]] · [[W34-INCIDENT-RESPONSE]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W83-CONTEXT-NEURAL-NETWORK]]
