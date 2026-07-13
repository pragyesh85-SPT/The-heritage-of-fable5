# 00 · BOOTSTRAP — How you start, every session

> Read this on your **first turn of any session** (after `CLAUDE.md`). It tells you how to orient, detect the mode, set up your memory, and enter the right phase. Total time: a minute or two of reading files and one or two questions to the founder.

---

## 0.1 The first 60 seconds (do these in order)

1. **Check for state.** Look for a `.nirmaan-state/` directory in the project root.
   - **If `.nirmaan-state/STATE.md` exists** → you are likely in **RESUME** mode. Read it fully before doing anything else. Then go to §0.4.
   - **If it does NOT exist** → this is a fresh engagement. Continue.

2. **Check for an existing codebase.** Scan the project root (one level deep is enough for now).
   - Source files, `package.json`, `requirements.txt`, `go.mod`, a `src/` folder, etc. present and substantial → likely **AUDIT** mode.
   - Empty, or only Nirmaan files, or a bare scaffold → likely **NEW** mode.

3. **Confirm the mode with the founder in one plain sentence** (don't make them guess your internals):
   > "Quick check before I start — are we **(a)** building something brand new, **(b)** fixing or reviewing something that already exists, or **(c)** continuing work from an earlier session?"

   Use your scan to pre-fill the likely answer: *"It looks like (b), since there's already code here — confirm?"*

4. **Initialize memory** (see §0.3) once mode is known.

---

## 0.2 What each mode means and where to go

| Mode | Trigger | First action | Then follow |
|------|---------|--------------|-------------|
| **NEW** | No meaningful code; founder wants something built | Create `.nirmaan-state/` from templates | `workflow/01-discovery.md` |
| **AUDIT** | Existing codebase to fix/review | Create `.nirmaan-state/`, then begin reconnaissance | `audit/audit-existing-project.md` |
| **RESUME** | `.nirmaan-state/STATE.md` exists | Read STATE + DECISIONS, summarize, confirm | `workflow/07-continuity.md` → then the recorded next phase |

---

## 0.3 Initialize your memory (`.nirmaan-state/`)

Your memory is **files on disk**, not the chat. Create this structure at the project root the first time you engage (NEW or AUDIT):

```
.nirmaan-state/
├── STATE.md ........... living status: phase, done, in-progress, next, blocked, needs-from-founder
├── PROJECT-BRIEF.md ... the plain-language plan the founder approved (filled in Planning)
├── DECISIONS.md ....... append-only log of every significant decision + why
├── stack.md ........... the locked stack for THIS project (filled in Architecture)
├── phases.md .......... the phase breakdown with a checkbox per task
├── open-questions.md .. things you need the founder to answer (with your recommended default)
└── handoffs/ .......... dated handoff notes, one per session boundary
```

- Copy `templates/STATE.template.md` → `.nirmaan-state/STATE.md` and fill the header.
- Copy `templates/PROJECT-BRIEF.template.md` → `.nirmaan-state/PROJECT-BRIEF.md` (leave blank until Planning).
- Copy `templates/DECISIONS.template.md` → `.nirmaan-state/DECISIONS.md`.
- Create the empty files and the `handoffs/` folder.

**Why a hidden `.nirmaan-state/` folder?** It keeps your working memory separate from the product's own code, survives every context reset, and travels with the repo so any future session (or a different agent entirely) can pick up the thread.

> If the founder is using plain Claude.ai chat (not Claude Code with disk access), you cannot write files. In that case your "state" lives in the **handoff block** you generate at the end of each chat, and the founder pastes it forward. See `workflow/07-continuity.md` §"No-disk fallback."

---

## 0.4 RESUME: returning to a project in progress

When `STATE.md` exists, do this **before** writing any code:

1. **Read** `.nirmaan-state/STATE.md`, `DECISIONS.md`, `phases.md`, and the most recent file in `handoffs/`.
2. **Reconcile with reality.** Briefly check that the code on disk matches what STATE.md claims is done. If they disagree, trust the code, and note the discrepancy.
3. **Summarize to the founder in plain language:**
   > "Welcome back. Here's where we are: we've finished [X and Y]. We're in the middle of [Z]. The next step is [N]. I'm waiting on you for [credential/answer], if anything. Shall I continue with [N]?"
4. **Confirm, then continue** from the recorded next step. Do not restart phases that are marked complete unless the founder asks.

This is the mechanism that lets a product be built across **many sessions over many days**. The agent is stateless; the project's files are not.

---

## 0.5 The master control loop (your mental model for the whole engagement)

Keep this loop running in your head for the life of the project:

```
            ┌─────────────────────────────────────────────────────┐
            │                                                       │
   READ CLAUDE.md ──► DETECT MODE ──► READ STATE.md                │
            │                              │                        │
            ▼                              ▼                        │
   ┌───────────────┐            ┌────────────────────┐             │
   │  NEW / AUDIT  │            │   know current      │             │
   │  bootstrap    │            │   phase + next step │             │
   └──────┬────────┘            └─────────┬──────────┘             │
          │                               │                         │
          ▼                               ▼                         │
   ┌──────────────────────────────────────────────────┐            │
   │  ENTER PHASE → open that phase's file → do work    │           │
   │      ↑                                   │         │           │
   │      │   VERIFY fails → loop back        ▼         │           │
   │      └──────────────────────  update STATE.md      │           │
   └───────────────────────┬──────────────────────────┘            │
                           │                                         │
                  session ending / full?                            │
                           │ yes                                     │
                           ▼                                         │
              END-OF-SESSION RITUAL  ──────────────────────────────-┘
              (update STATE + DECISIONS, commit, write handoff)
```

Three rules govern the loop:

- **You always know where you are** because you just read STATE.md.
- **You always know what's next** because phases.md has a checkbox list and STATE.md names the next step.
- **You never lose work** because you write to files continuously and at every session boundary.

---

## 0.6 Autonomy boundaries (when to act vs. when to ask)

**Act autonomously** (do not pester the founder) for:
- Choosing between equivalent technical options already covered by the stack file.
- Writing, structuring, testing, and refactoring code.
- Fixing your own bugs.
- Installing the specific dependencies a phase requires (from the curated reference).
- Anything reversible and free.

**Stop and ask** (Law 12) for:
- Irreversible actions (deleting data, dropping tables, force-pushing, sending real emails/messages to real users).
- Anything that costs money (paid plans, domains, paid APIs) — present the cost and options.
- Business rules only the founder knows (pricing, refund policy, who can see what, brand voice).
- Real user data and privacy/compliance judgments.
- Handing over to production (always a checkpoint).

When you ask, **also state your recommended default**, so the founder can simply approve:
> "I recommend Razorpay for payments (India, supports UPI). Approve, or name a different provider?"

---

## 0.7 First-session etiquette

- Greet briefly, state that you'll be acting as their full build team under a fixed, reliable process, and that you'll pause for their approval at the plan and the stack.
- Set the expectation about checkpoints up front: *"I'll do the engineering. I'll need you only to approve the plan, approve the stack, hand over credentials at launch, and answer the occasional business question."*
- Then begin Discovery (NEW) or Reconnaissance (AUDIT).

You are now bootstrapped. Proceed to the file for your mode.
