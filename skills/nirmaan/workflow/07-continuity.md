# 07 · CONTINUITY — Memory across chats, handoffs, and resuming

> **This is the file that solves your biggest problem:** *a whole product can't be built in one chat.* Chats fill up and the agent forgets. Nirmaan fixes this by keeping the project's memory in **files on disk** and by generating a **handoff** the founder can carry into the next chat. The agent is disposable; the project's memory is not.
>
> **The core idea (from 2026 agent practice):** never let a long session be the only record of what was decided and done. Write progress to files continuously. A plan/state file on disk *survives any number of context resets.* When a session ends, the agent writes a note "to its future self." A new session reads that note (and the files) and continues exactly where it left off.

---

## 7.1 The two ways memory persists

**Primary — files on disk (Claude Code, Cursor, anything with file access):**
The `.nirmaan-state/` directory *is* the memory. As long as the agent reads it at the start of a session and writes to it continuously, continuity is automatic. The chat history barely matters — the truth is on disk and in git.

**Fallback — the handoff block (plain Claude.ai chat, no file access):**
If the agent can't write files, its memory must travel as text the founder copies forward. At the end of each chat the agent emits a **handoff block**; the founder pastes it into the next chat. Lossier than files, but it works. See §7.6.

Most of your serious building should happen in a file-capable tool (Claude Code) precisely so memory is robust. Use plain chat only for quick thinking.

---

## 7.2 `STATE.md` — the living status file (read first, write last)

This single file answers, at any moment: *where are we, what's done, what's next, what's blocking, what do we need from the founder.* It is the first thing a session reads and the last thing it writes.

It must always contain (template in `templates/STATE.template.md`):

```markdown
# STATE — [Project name]
_Last updated: [date/time] · by session: [short id/label]_

## Mode
NEW | AUDIT | RESUME — currently: [ ]

## Current phase
[e.g. Phase 2 — Core flow: checkout] · status: 🔵 in progress

## Done (high level)
- ✅ Phase 0 — Foundation (deployed empty skeleton, monitoring wired)
- ✅ Phase 1 — Data & identity (signup/login working)

## In progress (right now)
- 🔵 Phase 2 — checkout: cart done; payment integration half-built; webhook not started

## Next step (the very next thing to do)
- ▶ Build the Razorpay webhook handler (verify signature, idempotent) — see phases.md Phase 2

## Blocked / waiting on founder
- ⏸ Need: Razorpay TEST keys to finish payment integration (real keys later, at deploy)
- ⏸ Decision: refund policy (business rule) — default assumed: 7-day full refund

## Recent decisions (pointer)
- See DECISIONS.md entries up to #14

## Health / notes
- Tests: 18 passing. Last deploy: skeleton on [host], healthy.
- Known issues: none blocking.
```

**Update discipline:** after every meaningful step, and always at session end. A stale `STATE.md` is worse than none — it misleads the next session. Keep it honest and current.

---

## 7.3 `DECISIONS.md` — append-only decision log

Every significant choice + its reason, so nothing is re-argued across sessions and a future agent understands *why* the product is the way it is (template in `templates/DECISIONS.template.md`):

```markdown
# DECISIONS — [Project name]   (append-only; never edit past entries)

### #12 — [date] — Payments: Razorpay (hosted checkout)
Why: India market, supports UPI + cards; hosted checkout means we never store card data (safer, avoids PCI burden).
Alternatives considered: Stripe (weaker India/UPI), custom (forbidden by Law 3).
Decided by: agent default + founder approval.

### #13 — [date] — Streak resets with a 1-day grace
Why: founder business rule; reduces user frustration.
Decided by: founder.
```

This is also where founder approvals at checkpoints are recorded (plan approved, stack approved, credentials provided).

---

## 7.4 `phases.md` — the plan that survives resets

The phase ladder with per-task checkboxes (built in Planning). Because it lives on disk, a brand-new session can read it and execute the next unchecked task correctly, even mid-phase. Keep checkboxes **precise** — "payment integration" is too coarse; "webhook handler: verify signature ✅ / idempotency ⬜ / order-state update ⬜" lets a fresh session resume exactly.

---

## 7.5 The end-of-session ritual (run every time a session ends or fills)

When the founder says "wrap up," or you sense the context is getting large, or you're about to stop:

1. **Reconcile** `STATE.md` with reality (does the code match what you claim is done?). Fix any drift.
2. **Update** `STATE.md`: phase, done, in-progress, the precise next step, blockers, needs-from-founder.
3. **Append** any new decisions to `DECISIONS.md`.
4. **Tick** completed tasks in `phases.md`.
5. **Commit** to git with a clear message (file-capable tools). The commit log is a second memory.
6. **Write a dated handoff** into `.nirmaan-state/handoffs/` (template in `templates/HANDOFF.template.md`).
7. **Emit the handoff block to the founder** (§7.6) so they can paste it into the next chat — *especially* important if they might continue in a different tool or plain chat.

Tell the founder, plainly:
> "I've saved our progress. To continue later: open a new session here and paste this, or just say 'continue' and I'll read my notes."

---

## 7.6 The handoff block (the "note to my future self")

This is the thing the founder copies between chats. Generate it at session end. Keep it **compact but complete** — enough for a fresh agent with zero prior context to resume correctly. Format (also in `templates/HANDOFF.template.md`):

```markdown
=== NIRMAAN HANDOFF — [Project name] — [date] ===

PROJECT IN ONE LINE: [what it is]
MODE: [NEW/AUDIT/RESUME]
STACK: [the locked stack, one line each layer] (full detail in .nirmaan-state/stack.md)

DONE:
- [phase-level summary of everything complete]

IN PROGRESS:
- [exact current task and how far along]

NEXT STEP (do this first):
- [the single next action, concretely]

BLOCKED / NEED FROM FOUNDER:
- [credentials? a decision? — list with assumed defaults]

KEY DECISIONS (so you don't re-litigate):
- [the 3–6 decisions that shape the work] (full log in .nirmaan-state/DECISIONS.md)

WATCH OUT FOR:
- [any landmine: a fragile area, a failed approach not to repeat, a tricky integration]

TO RESUME: open the project, read CLAUDE.md → .nirmaan-state/STATE.md → phases.md, then continue from NEXT STEP.
=== END HANDOFF ===
```

When the founder pastes this into a new file-capable session, you should **still read the on-disk files** as the source of truth — the block is the pointer; the files are the detail. When pasted into a no-disk chat, the block *is* the memory.

---

## 7.7 Resuming a session (the RESUME mode in detail)

At the start of a resuming session:

1. Read `CLAUDE.md`, then `.nirmaan-state/STATE.md`, `phases.md`, `DECISIONS.md`, and the latest `handoffs/` note (and the pasted handoff block, if any).
2. **Verify against reality:** glance at the code/repo to confirm what STATE claims. Trust the code over the notes if they conflict; record the discrepancy.
3. **Summarize to the founder** in plain language and confirm the next step (see `workflow/00-bootstrap.md` §0.4).
4. **Continue** from the recorded next step. Do not redo completed phases.

The founder's only job in resuming: paste the handoff (or just say "continue") and confirm the summary. Everything else is automatic.

---

## 7.8 Generating the "extract my context" prompt (what the founder asked for)

The founder wants the agent to *give them a prompt that pulls the full context out of the old chat.* Two cases:

**A. File-capable tool (preferred):** the "prompt" is trivial because the context is on disk. Tell the founder:
> "To continue, start a new session in this project and say: **'Resume Nirmaan — read STATE.md and continue from the next step.'** That's all. I'll read my own notes."

**B. Plain chat (no disk):** you must generate the full handoff block (§7.6) as the carry-forward, *plus* a one-line instruction:
> "Copy everything between the === markers above. In your next chat, paste it and add: **'Resume this Nirmaan project from NEXT STEP.'**"

If the founder is in an *old, full chat* and needs you to summarize it for transfer, run this internally and output a handoff block:
> Summarize this session into a Nirmaan handoff block: the project, stack, what's done, what's in progress, the exact next step, blockers, key decisions, and landmines. Be compact but complete enough for a fresh agent to resume with no other context.

---

## 7.9 Keeping memory from rotting

- **One source of truth.** `STATE.md` is canonical for status; `DECISIONS.md` for choices; `phases.md` for the plan; git for the code. Don't duplicate status across files.
- **Update at boundaries, not constantly-and-then-never.** Every meaningful step + every session end.
- **Prune the chat, not the files.** When a session gets long, it's fine to start fresh — the files carry forward. Don't try to keep one mega-chat alive; that's the anti-pattern.
- **Date everything.** Handoffs and STATE updates carry timestamps so the latest is unambiguous.
- **If notes and code disagree, code wins** — then fix the notes.

---

## 7.10 Why this makes big builds possible

With this system, the size of the product is no longer limited by the size of a chat:

- Build Phase 0 today, close the chat. Build Phase 1 tomorrow in a fresh chat — the agent reads STATE.md and continues. Build Phase 2 next week. Each session is short, focused, and high-quality (small working context), yet they compose into a large, coherent product.
- A *different* agent, or a teammate, or future-you can pick up the project months later and be oriented in minutes.
- The founder never re-explains the project. The project explains itself, from its own files.

That is the whole point of Nirmaan's memory: **continuity without the founder having to hold it in their head.**

---

## 7.11 Anti-patterns

- **Letting the chat be the only memory** → everything lost when it fills. Write to files.
- **Stale `STATE.md`** → misleads the next session worse than having nothing. Keep it current.
- **One never-ending mega-chat** → context bloat, degraded output. Use fresh sessions; let files carry state.
- **Vague checkboxes** → a fresh session can't resume mid-phase. Be precise.
- **Re-litigating settled decisions** → wastes sessions. Check DECISIONS.md first.
- **Trusting notes over code when they conflict** → builds on a false picture. Verify against reality; code wins.
