---
name: neuron
version: 1.0.0
description: Build, wake, and maintain a per-project context "neural network" — a .neuron/ vault inside any repo (or linked set of repos) that gives any AI session full project context in <3k tokens without rereading the codebase. Triggers - /neuron (auto-detect bootstrap-or-wake), /neuron link, /neuron sync, /neuron status, /neuron rebuild.
---

# /neuron — Per-Project Context Neural Network

One command, five modes. The vault lives IN the repo (`.neuron/`), so it travels
with `git clone` to any machine and any harness. Wikilinked Markdown → Obsidian
renders the visual graph natively. Protocol authority: CLAUDE-BRAIN W83 (wake/sleep),
W80 (card schema), C14 (code outranks notes).

## Mode routing (decide from the user's words)
- `/neuron` — detect state: no `.neuron/` → BOOTSTRAP; exists → WAKE.
- `/neuron link <path...>` — declare integrated repos (shared DB/ecosystem).
- `/neuron sync` — run SLEEP (write-back) now.
- `/neuron status` — health report (staleness, coverage, orphans). Read-only.
- `/neuron rebuild` — re-scan everything, PRESERVING notes/ and DECISIONS.md
  (regenerate only HUB facts + FILE-MAP). Never delete human/decision content.

## The vault structure (create exactly this)
```
<repo>/.neuron/
  HUB.md          ← the project card: what/stack/data/money/state/gotchas (≤150 lines)
  FILE-MAP.md     ← every source file, one line each, wikilinked (the visual layer)
  DECISIONS.md    ← append-only decision log (date · decision · why · files touched)
  notes/          ← atomic notes per subsystem/incident (W83 shape, 10-40 lines)
  meta.json       ← {"neuronVersion":"1.0.0","lastSyncCommit":"<sha>","lastSyncAt":"<iso>","linkedRepos":[]}
```

## BOOTSTRAP (no vault exists)
1. **Scan cheap-first:** manifests (package.json etc.), configs (.firebaserc,
   firebase.json), entry points, router, functions list, README. Git: last 20
   commits for trajectory.
2. **If `graphify-out/` exists or /graphify is installed:** use its graph to seed
   notes (concepts → notes, communities → note clusters). If NOT available: skip
   silently — manual scan is sufficient; never block on a missing tool.
3. **Write HUB.md** per W80 card schema. Facts only from scan; unknowns as
   `TODO: verify` — never invented (C01).
4. **Write FILE-MAP.md:** one line per source file:
   `- [[src/logic/commission.js]] 🟢 — commission engine, ONLY writer of commission fields (2026-07-12)`
   Glyphs: 🟢 active · 🟡 stale >90 days · 🔴 gotcha attached · ⚪ generated/vendor.
   EXCLUDE always: node_modules, dist, build, .next, .git, binaries, lockfiles.
   **Big-repo rule:** >800 source files → per-file lines only for `src`-class dirs;
   everything else as directory rollup lines. HUB stays ≤150 lines regardless.
5. **Seed 3–7 notes** for the load-bearing subsystems (money path, auth, data
   model), each linking back to [[HUB]].
6. **Write meta.json** with current HEAD sha. No git repo? Set `lastSyncCommit:null`,
   use file mtimes for staleness, and RECOMMEND `git init` (W30) once, don't nag.
7. **Monorepo:** one root HUB + one sub-hub per app (`notes/app--<name>.md`),
   root FILE-MAP split by app section.
8. Commit `.neuron/` to git by default (context should travel). If the repo is
   PUBLIC and HUB/notes contain business-sensitive facts, ask the owner once:
   commit vs gitignore. Never store secret VALUES in any vault file (W32) —
   key NAMES only.

## WAKE (vault exists — run at session start, target ≤3k tokens)
1. Read meta.json → **staleness check:** `git diff --name-only <lastSyncCommit>..HEAD`.
   Changed files → update those FILE-MAP lines + HUB current-state BEFORE trusting
   the vault (a stale line loaded as truth is worse than no line). >200 files
   changed or lastSyncCommit missing → say so and offer `/neuron rebuild`.
2. Read HUB.md fully. Read FILE-MAP section headers (not every line). Follow
   wikilinks into notes/ ONLY where titles match today's task (2-hop max).
3. If meta lists linkedRepos: read each sibling's HUB.md too (never their full maps)
   + the ecosystem note. Any schema-shaped task → W23 blast-radius rule applies.
4. Confirm in 3 lines: what this project is · current state · what today's task
   touches. Wrong → owner corrects in one line; fix the vault immediately.
5. **Conflict rule (C14):** wherever code contradicts a vault note, code wins and
   the note is corrected NOW, not later.

## SLEEP (write-back — run before ending ANY session that touched the project)
1. `git diff --name-only <lastSyncCommit>..HEAD` (+ working tree) → for each
   changed file: update its FILE-MAP line (one-liner + date; add 🔴 if a gotcha
   was learned).
2. Append to DECISIONS.md: every decision made this session —
   `2026-07-12 · Switched EMI rounding to banker's · avoids paise drift on ledger · [[src/emi.js]]`.
   Decisions only — not activity logs. No decisions made → append nothing.
3. New durable learning that isn't code-derivable → note in notes/ (update-beats-
   create: search existing notes first).
4. Update HUB current-state + meta.json (new HEAD sha, timestamp).
5. Concurrency: DECISIONS.md is append-only (safe); FILE-MAP/HUB are
   last-write-wins — two simultaneous sessions on one repo: the second to sleep
   re-runs step 1 first. Rare enough; never lock.

## LINK (integrated repos)
1. Owner names the repos. Write `linkedRepos` (relative or absolute paths) into
   EACH repo's meta.json (bidirectional).
2. Create/update `notes/ecosystem--<name>.md` in the PRIMARY repo: shared
   database/API, the shared-collection table (W20 SCHEMA style), one-writer-per-
   field rules, staged-deploy order. Sibling repos get a stub note linking to it.
3. New repo joining an existing ecosystem: bootstrap it, then link — never link
   an unbootstrapped repo.

## STATUS (read-only health report)
Report: vault version · last sync (commit + age) · files changed since ·
FILE-MAP coverage (mapped/total source files) · notes count + orphans (no
inbound links) · linked repos + their last-sync ages · 🔴 gotcha count.
Verdict line: HEALTHY / STALE (wake will auto-heal) / REBUILD RECOMMENDED.

## Edge cases (handle without asking)
- Empty/new repo → minimal HUB ("greenfield"), FILE-MAP grows as files appear.
- Non-code project (docs, video, designs) → same structure; FILE-MAP maps assets.
- `.neuron/` exists but from an older neuronVersion → migrate additively (add
  missing files), never destructive.
- Vault found mid-task (owner ran /neuron late) → WAKE now, note the gap.
- Owner asks a question answerable from HUB/notes → answer from vault, cite the
  note, do NOT open source files (that's the entire point).

## Failure this prevents
20-minute re-orientation per chat; decisions living only in dead transcripts;
agents reading 50 files to learn what one HUB line says; integrated repos
breaking each other blind; context that dies with a machine.
