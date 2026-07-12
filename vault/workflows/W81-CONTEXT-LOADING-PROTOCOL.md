# W81 — Context Loading Protocol (Precise, Few Tokens)

Trigger: the first minute of ANY new chat on an existing project.
Purpose: full working context in <2,000 tokens instead of a 20-minute repo crawl.

## The loading sequence (in order, STOP when you have enough)
1. `_REGISTRY/<project>.md` — the card (W80). ~150 lines: what, where, stack, data,
   siblings, gotchas, current state.
2. `.nirmaan-state/` current-phase file (if mid-build) — where the task stands.
3. Project memory index `MEMORY.md` — scan lines, open ONLY entries matching today's task.
4. THEN, only as the task demands: `SCHEMA.md` for data work, the specific source files
   via grep (W03 in the core pack). NEVER "read the src folder to get familiar".

## The rules that make it precise
- **Budget:** steps 1–3 ≤ ~2,000 tokens. If the card is bloated past 150 lines, trimming
  it IS the fix (move detail into the repo docs it links).
- **Freshness check:** the card has an `updated:` date. If older than the latest git
  commit by weeks, trust the code over the card, and fix the card.
- **Confirmation ritual:** after loading, the model states in 3 lines: what this project
  is, what's currently in progress, what today's task touches. Pragyesh corrects in one
  line if wrong. THEN work starts. (Catches wrong-project/wrong-branch disasters for
  the price of 3 lines.)
- **On session end:** update card `Current state` (W80 triggers) so the NEXT session's
  step 1 is true.

## Why this beats "smart" RAG for your setup
Fixed schema + fixed loading order = deterministic. A cheap model can't misuse it
because there's nothing to decide — read 3 files in order, confirm, work. Vector
search over 40 mixed projects retrieves plausible-but-wrong chunks; this retrieves
the exact same correct card every time.

## Failure this prevents
20-minute warmups, models confidently working on the wrong sibling app, context windows
burned on unread source dumps, session knowledge evaporating at session end.

## Linked
[[03-RETRIEVAL]] · [[W80-PROJECT-REGISTRY]]
