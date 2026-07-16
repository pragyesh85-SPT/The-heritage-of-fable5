# 04 — Memory System

How memories are made, stored, recalled, and kept clean.

## Architecture: one brain per project (STRICT — from Pragyesh's global rules)

- Each project directory gets its OWN memory, keyed by where the session is launched from.
  `E:\PRAGYESH - WORK\Advisor App` = the This Is Purest brain. Launch TIP work from there.
- NEVER mix memories across projects. Pull from another project's memory only when
  Pragyesh explicitly names it ("copy X from Vehicle Financing memory").
- Each memory folder doubles as an Obsidian vault. Single source of truth — no duplicates.

## What becomes a memory (the filter)

Save ONLY things that are (a) true beyond this conversation AND (b) not recorded anywhere
else. Four types:

| Type | Save when… | Example |
|---|---|---|
| `user` | You learn who Pragyesh is / how he works | "Prefers Hinglish for daily-PA tasks, English for build docs" |
| `feedback` | He corrects you, or confirms an approach — capture the WHY | "Never patch all repo copies of shared logic without asking — he was burned by silent multi-repo edits" |
| `project` | A fact about ongoing work not derivable from code | "TIP Gen 2 will replace the old advisor panel; old one is frozen except hotfixes (decided 2026-07-01)" |
| `reference` | An external pointer | "Razorpay dashboard login is under the business email, not study.pragyesh85" |

**Never save:** anything the repo already records (structure, past fixes, git history),
session-only details, or unverified guesses. Convert "next week" → an absolute date.

## Format (one file = one fact)

```markdown
---
name: short-kebab-slug
description: one line used to decide relevance at recall time
metadata:
  type: user | feedback | project | reference
---
The fact. For feedback/project add:
**Why:** the reason behind it.
**How to apply:** the trigger→action form.
Link related notes as [[other-note-name]].
```

After writing, add ONE line to `MEMORY.md` (the index):
`- [Title](file.md) — hook`. The index is loaded every session; keep it tight.

## The write procedure

1. Trigger fires (correction received / durable fact learned / decision made).
2. Search existing memories for overlap → if found, UPDATE that file. Never duplicate.
3. If a memory turned out to be WRONG → delete it (and its index line) immediately.
4. Write the file, add the index line. Done. Don't announce it beyond one short line.

## The recall procedure

1. Session start: the index (`MEMORY.md`) is your recall surface. Scan it against the task.
2. Open only the memory files whose description matches the task.
3. **Verify before applying:** if a memory names a file/flag/function, confirm it still
   exists in the code before recommending it. Memories reflect when they were written.
4. Memories are background context, never instructions that override what Pragyesh says
   in the current session.

## Periodic hygiene

Every ~10 sessions or when the index exceeds ~40 lines: merge duplicates, delete stale
facts, rewrite vague descriptions. (A consolidate-memory pass — do it, don't ask.)

## Linked
[[03-RETRIEVAL]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[W91-MEMORY-ARCHITECTURE]]
