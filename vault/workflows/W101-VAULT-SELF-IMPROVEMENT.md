# W101 — Vault Self-Improvement Loop (The Brain Upgrading Itself)

Trigger: "upgrade/improve the brain/vault", quarterly maintenance, after any W100
probe run, or whenever a recall miss happens (a needed fact wasn't in the vault,
or took more than 2 hops from HOME/ROUTER to find).

## The loop: SIGNAL → RULE → VERIFY → PRUNE
Nothing improves without a signal. "I have a cool idea for the vault" is NOT a
signal — ideas wait for a failure to justify them.

1. **SIGNAL — only four sources count as evidence:**
   - **a.** Pragyesh corrects a mistake → template H (09) rule into the matching file.
   - **b.** A W100 probe fails → re-point the model at the failed doc; if the doc
     itself was ambiguous, the DOC gets fixed, not just the model.
   - **c.** A recall miss → fix the title, the link, or add a ROUTER row so the
     next lookup is ≤2 hops. The fix lives in the retrieval surface, not in hope.
   - **d.** `tools\vault-doctor.ps1` reports a defect (broken wikilink, orphan
     file, missing `## Linked` footer, W-doc absent from the index, stale
     `assumed` note).
2. **RULE — the smallest edit that prevents recurrence**, made in the file a
   future session will already be loading. Update in place; a new file only for a
   genuinely new task type (then: W-doc + INDEX line + ROUTER row, all three).
3. **VERIFY — cold-start test (W91):** a fresh session given only HOME + ROUTER
   must reach the right file in ≤2 hops for the case that triggered the change.
   If it can't, the edit went in the wrong place.
4. **PRUNE — every improvement pass must also delete or merge something:**
   orphan notes, probes every model passes (W100), duplicated rules, dead links.
   The vault ends each quarter the same size or smaller unless genuinely new
   task types appeared. A brain that only grows is a landfill with an index.

## The doctor (the automated half of the loop)
```
powershell -ExecutionPolicy Bypass -File "E:\PRAGYESH - WORK\CLAUDE-BRAIN\tools\vault-doctor.ps1"
```
Checks: broken `[[wikilinks]]` · orphan files (nothing links to them) · missing
`## Linked` footers (core/craft/workflows) · W-docs absent from
`workflows\INDEX.md` · registry notes stuck at `confidence: assumed`.
Run it: at every quarterly pass, after adding or renaming any vault file, and
before any "the vault is healthy" claim — a health claim without the doctor's
output is vibes (C01).

## Metrics ledger (append one row per pass — trends beat impressions)
| date | md files | doctor defects | W100 score (model) | wake-up ≤2k tokens? | notes |
|---|---|---|---|---|---|
| 2026-07-16 | 99 | 32 found → 1 left (Brain\ junk, deletion pending owner OK) | — (Fable 5, not yet probed) | yes | W101 pass 1: ROUTER + doctor + notes index; 15 footers added, bahi-khata indexed, 1 broken link fixed |

## The upgrade ladder (evidence gates — never jump a rung on impressiveness)
- **Rung 0 (current):** manual linked-Markdown vault + ROUTER + doctor. Correct
  until a W91 threshold is actually hit — at ~100 files, embeddings retrieve
  plausible-but-wrong chunks while ROUTER retrieves the exact right doc.
- **Rung 1:** `/graphify` to BOOTSTRAP a new project's first notes (W83) instead
  of writing them by hand. Adopt per project when hand-writing is the bottleneck.
- **Rung 2:** embeddings / GraphRAG / Letta (options listed in W83) — ONLY after
  two LOGGED fuzzy-recall failures that titles/links/ROUTER rows could not fix,
  or >~5,000 notes (W91). Files remain the source of truth; any index is
  derived, rebuildable, never authoritative.

## Failure this prevents
A brain that only ever grows; upgrades driven by fashion instead of failures;
"self-improving" meaning "someone occasionally remembers to tidy up"; a vector
database bought to solve what a ROUTER row solves.

## Linked
[[HOME]] · [[ROUTER]] · [[09-PROMPT-TEMPLATES]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[W91-MEMORY-ARCHITECTURE]] · [[W100-VAULT-ACCEPTANCE-TEST]]
