# KICKOFF PROMPTS — copy, paste, go

> These are the **exact things the founder pastes** to start or continue work. Copy the block for your situation into Claude Code (or Cursor / a Claude chat) in the project folder. The agent does the rest. Keep this file handy — it's the founder's "remote control."
>
> **Setup reminder:** the `nirmaan/` folder must be in the project (as the root files or a `.nirmaan/` subfolder, with `CLAUDE.md` reachable at the project root). For a brand-new project, start in an empty folder with `nirmaan/` copied in. For an existing project, copy `nirmaan/` into it.

---

## ▶ PROMPT 1 — Start a NEW project (build from scratch)

Paste this when beginning something new:

```
You are operating under the Nirmaan protocol. Read CLAUDE.md first, then follow it.

MODE: NEW PROJECT.

Here is my idea, in my own words:
[Describe what you want, however roughly. A few sentences is fine — e.g. "an app where people can log their daily fasts, see streaks, follow a Hindu tithi calendar, and chat with an AI companion." Don't worry about being technical.]

Now:
1. Set up your memory (.nirmaan-state/) per workflow/00-bootstrap.md.
2. Interview me (workflow/01-discovery.md) — ask me the questions you need, a few at a time, in plain language, and suggest sensible defaults I can just approve. Include the edge cases and failure cases I won't think of.
3. Then give me the plain-language plan and the stack for my approval BEFORE you build anything.
4. Build to a fully-working, production-grade standard — not an MVP or prototype. Bake in validation, error handling, real auth/payments, tests, and monitoring as you go.
5. Pause for me only at: approving the plan, approving the stack, handing over credentials at launch, and any business decision only I can make.
6. Keep STATE.md, DECISIONS.md, and phases.md updated so we can continue across sessions.

Start with discovery. Ask me your first questions.
```

---

## ▶ PROMPT 2 — AUDIT / fix an EXISTING project (e.g. This Is Purest)

Paste this in a project that already has code and is breaking:

```
You are operating under the Nirmaan protocol. Read CLAUDE.md first, then follow it.

MODE: AUDIT / RESCUE. There is existing code here that breaks / isn't reliable enough.

Follow audit/audit-existing-project.md:
1. Set up your memory (.nirmaan-state/). Stay read-only until I approve a path — don't change code yet.
2. Reconnaissance: tell me what this product actually IS — how many apps, the stack, the data model, how the apps relate, and the concept + the persona/philosophy you read from the code. Confirm with me that you've understood my intent.
3. Audit everything: find the flaws, by severity (critical / major / minor) — reliability, security, data safety, missing monitoring, the missing "20%", architecture issues. Plain-language impact for each.
4. Give me your honest recommendation PER APP: rebuild from scratch, keep-and-fix, or a hybrid — with reasons, rough effort, and what you'd need from me.
5. Tell me the very first thing to do regardless of path (e.g. stop the bleeding on anything critical).

Then wait for me to choose the path for each app before you change anything.

[Optional: paste anything you can tell me about the product — its purpose, what's breaking, what you've noticed. And if the repo is on GitHub, here's the URL: __________ ]
```

---

## ▶ PROMPT 3 — RESUME a project from a previous session

Paste this when continuing work in a **new chat** on a project that already has `.nirmaan-state/`:

```
You are operating under the Nirmaan protocol. Read CLAUDE.md, then read .nirmaan-state/STATE.md, phases.md, and DECISIONS.md, and the latest note in .nirmaan-state/handoffs/.

MODE: RESUME.

1. Reconcile the notes with the actual code (trust the code if they disagree; note any discrepancy).
2. Summarize, in plain language: what's done, what's in progress, the exact next step, and anything you need from me.
3. Then continue from the next step. Don't redo completed phases.

[If you have a handoff block from the last chat, paste it below this line:]
```

---

## ▶ PROMPT 4 — WRAP UP a session (save state + get the handoff)

Type this near the end of a working session, or when the chat is getting long:

```
Wrap up this session per CLAUDE.md §7:
1. Reconcile and update .nirmaan-state/STATE.md (phase, done, in-progress, exact next step, blockers, what you need from me).
2. Append any new decisions to DECISIONS.md and tick completed tasks in phases.md.
3. Commit to git with a clear message.
4. Write a dated handoff note into .nirmaan-state/handoffs/.
5. Then give me the HANDOFF BLOCK to paste into my next chat, and tell me exactly how to resume.
```

---

## ▶ PROMPT 5 — EXTRACT context from an old/full chat (no-disk fallback)

If you're in a **plain Claude chat** (no file access) that's getting full, and you need to carry everything forward, paste this:

```
This chat is getting long and I need to continue in a new one. Produce a NIRMAAN HANDOFF BLOCK that captures everything a fresh agent needs with no other context:
- the project in one line, and the mode
- the stack we chose (each layer, one line)
- everything that's DONE
- what's IN PROGRESS and how far
- the single NEXT STEP, concretely
- what's BLOCKED / what you need from me (with assumed defaults)
- the KEY DECISIONS so they aren't re-litigated
- any LANDMINES / failed approaches not to repeat

Format it between === markers, compact but complete. Then tell me the one line to add after pasting it into the new chat.
```

---

## ▶ PROMPT 6 — Quick "just continue" (file-capable tools)

If you're in Claude Code on the project and just want to pick up where you left off, you don't even need the full resume prompt. Just say:

```
Resume Nirmaan — read STATE.md and continue from the next step.
```

The agent reads its own notes and carries on.

---

## How to choose which prompt

| Situation | Use |
|-----------|-----|
| Brand-new idea, nothing built | **Prompt 1** |
| Existing app that breaks / needs review | **Prompt 2** |
| Coming back to a project in a new chat | **Prompt 3** (or **Prompt 6** in Claude Code) |
| Ending a session / chat getting long | **Prompt 4** |
| Stuck in a full plain chat, need to move | **Prompt 5** |

---

## The founder's whole job, summarized

1. **Pick the right prompt** above and paste it.
2. **Answer the agent's plain-language questions** (with the defaults it offers).
3. **Approve** the plan and the stack when asked.
4. **Hand over credentials** at launch (the agent gives an exact list).
5. **Carry the handoff** between chats (Prompt 4 → paste into the next session).
6. **Unblock** the occasional business question.

Everything else — the engineering, the reliability, the testing, the deploy — is the agent's responsibility, done to the Nirmaan standard.
