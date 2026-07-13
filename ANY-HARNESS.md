# Using the Heritage With Any Harness

Claude Code, OpenCode, Hermes, Open Claw, Nemo Claw, a custom Agent-SDK build, or
a bare LLM with file access — the heritage is plain Markdown + two skills; nothing
here depends on one vendor's runtime.

## Setup (once per machine, any harness)
1. `git clone https://github.com/pragyesh85-SPT/The-heritage-of-fable5`
2. Register the skills with your harness:
   - **Claude Code:** copy `skills/brain` and `skills/neuron` into `~/.claude/skills/`
   - **Any other harness:** point its skill/command/plugin mechanism at the same
     two `SKILL.md` files — they are plain instructions, not code; if the harness
     has no skill system, paste the SKILL.md content as the first message.
3. No skill system at all? The one-line fallback that always works:
   > "Read `vault/HOME.md` in the cloned repo and follow its load order. Confirm
   > by naming the 3 rules most relevant to my task, then begin."

## The two commands
- **`/brain`** — loads the OPERATING SYSTEM: HOME → operating parameters → the one
  workflow doc matching the task. The vault is 90+ files but wikilink-indexed, so
  a session loads ~3–5 files (~3k tokens), not the corpus. The graph IS the
  low-token trick: hubs (HOME, INDEX files) route to exactly the needed node.
- **`/neuron`** — builds/loads the PER-PROJECT memory: a `.neuron/` vault inside
  the repo (HUB card, wikilinked FILE-MAP of every file, decision log, atomic
  notes). Wake ≤3k tokens; every session writes decisions back; `link` mode wires
  integrated repos (shared database ecosystems). Travels with `git clone`.

## The intended session shape, on any harness
`/brain` (how to behave) → `/neuron` (what this project is) → work → `/neuron sync`
(write decisions back) — so session N+1 starts smarter than session N, on any
runtime, with no vendor lock.

## Verifying a new harness/model actually runs the system
Run `vault/workflows/W100-VAULT-ACCEPTANCE-TEST.md` — ten unannounced probes,
score ≥9/10 before trusting it with standing work.

## Visual mode
Open `vault/` (and any repo's `.neuron/`) as an Obsidian vault — the wikilinks
render as the interactive graph. Purely optional; every file reads fine as text.
