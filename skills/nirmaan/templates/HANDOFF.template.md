<!--
  HANDOFF TEMPLATE — the "note to my future self."
  The agent fills this at every session boundary (CLAUDE.md §7) and:
    (a) saves a dated copy in .nirmaan-state/handoffs/{{date}}.md, AND
    (b) outputs the block between === markers to the founder to paste into the next chat.
  Keep it COMPACT but COMPLETE — enough for a fresh agent with ZERO prior context to resume correctly.
  In a file-capable tool, this is a pointer (the real detail is in .nirmaan-state/); in a no-disk chat, this block IS the memory.
-->

=== NIRMAAN HANDOFF — {{PROJECT_NAME}} — {{DATE}} ===

PROJECT IN ONE LINE: {{what it is}}
MODE: {{NEW | AUDIT | RESUME}}

STACK (one line per layer; full detail in .nirmaan-state/stack.md):
- Frontend: {{...}}
- Backend/DB: {{...}}
- Auth: {{...}}
- Payments: {{...}}
- Jobs/Notifications: {{...}}
- Hosting/Deploy: {{...}}
- Observability: {{...}}
- AI (if any): {{...}}

DONE (phase-level):
- {{...}}
- {{...}}

IN PROGRESS:
- {{exact current task and how far along}}

NEXT STEP (do this first):
- {{the single next concrete action}}

BLOCKED / NEED FROM FOUNDER:
- {{credentials? a decision? — list each with the assumed default}}

KEY DECISIONS (don't re-litigate; full log in .nirmaan-state/DECISIONS.md):
- {{the 3–6 decisions that shape the work}}

WATCH OUT FOR (landmines):
- {{a fragile area, a failed approach not to repeat, a tricky integration, a known limitation}}

HEALTH:
- Tests: {{N}} passing. Last deploy: {{...}}. Known issues: {{...}}.

TO RESUME:
- File-capable tool (Claude Code/Cursor): open the project and say
  "Resume Nirmaan — read STATE.md and continue from the next step."
- Plain chat (no files): paste this whole block and add
  "Resume this Nirmaan project from NEXT STEP."

=== END HANDOFF ===
