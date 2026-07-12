# CLAUDE-BRAIN — Operating System for Any AI Working With Pragyesh

**Purpose:** If the model changes tomorrow (Opus 4.8, Sonnet, anything), load this pack and it
behaves like the model that wrote it. These are not tips — they are binding procedures.

**Owner:** Pragyesh Jain — non-technical founder, builds production software entirely with AI
(see `pragyesh_portfolio.md` in the parent folder). Ships real products: Aapka Hisab (vehicle
finance SaaS), This Is Purest ecosystem (advisor app, admin panel, website, WhatsApp bot),
Printing ATM. Real users, real money (Razorpay), real data.

---

## How to use this pack

1. **Always loaded (paste into CLAUDE.md or the system prompt):**
   - `01-THINKING-ENGINE.md` — how to process every request
   - `06-REPLY-STYLE.md` — how to talk to Pragyesh
   - `08-FINAL-GATE.md` — the checklist run before every answer
2. **Loaded per task type:**

| Task | Load additionally |
|---|---|
| New app / new feature | `02-QUESTION-PROTOCOL.md`, `07-BUILD-PLAYBOOK.md` |
| Bug fix / debugging | `03-RETRIEVAL.md` |
| Audit / review a codebase | `03-RETRIEVAL.md`, `07-BUILD-PLAYBOOK.md` |
| Long multi-session work | `04-MEMORY.md` |
| Deciding which model/agent runs what | `05-MODEL-ROUTING.md` |
| Anything touching money, auth, or user data | `07-BUILD-PLAYBOOK.md` + `08-FINAL-GATE.md` (re-read) |

3. **Task workflows:** `workflows/` holds the per-task procedures (SVG creation,
   Firestore debugging, sync recovery, payments, launch gate, crypto/stock research,
   PC fixes, the project registry system, cheap-model delegation…). Open
   `workflows/INDEX.md`, load the ONE doc matching the task. These are written to be
   executable by any model — or handed to a human developer as-is.

4. **The project registry is LIVE at `_REGISTRY\` (inside this vault)** — INDEX.md +
   per-project cards + `TIP-ECOSYSTEM.md` (the shared-database contract) + audit
   reports. Per W81/W83: every session on an existing project starts by reading its
   card and ends by writing back. The vault entry point is `HOME.md`.

5. **The craft layer — `craft/` (C00–C10):** the secret sauce. Model-agnostic
   techniques for USING intelligence well — epistemics, debugging method,
   first-run-correct code, self-verification, long-task discipline, the failure
   catalog, taste, decision heuristics. Read ONCE in full at the start of a new
   model's tenure (it sets defaults, not per-task steps); re-read `C08-FAILURE-CATALOG.md`
   after any caught mistake.

6. **Kickoff line to give any new model:**
   > "Read every file in E:\PRAGYESH - WORK\CLAUDE-BRAIN before doing anything. These files
   > override your defaults. Confirm you've read them by naming the three rules most relevant
   > to my request, then start."

4. Templates for common requests are in `09-PROMPT-TEMPLATES.md` — copy, fill brackets, send.

## What this pack is NOT

- Not a replacement for project memory. Each project keeps its own memory
  (one brain per project — never mix).
- Not static. When the model makes a mistake and you correct it, tell it:
  "add this to CLAUDE-BRAIN" — it must update the matching file, not create a new one.

## Linked
[[01-THINKING-ENGINE]] · [[02-QUESTION-PROTOCOL]] · [[03-RETRIEVAL]] · [[04-MEMORY]] · [[05-MODEL-ROUTING]] · [[06-REPLY-STYLE]] · [[07-BUILD-PLAYBOOK]] · [[08-FINAL-GATE]] · [[09-PROMPT-TEMPLATES]] · [[C00-READ-ME-FIRST]] · [[C08-FAILURE-CATALOG]] · [[C10-HEURISTICS]] · [[HOME]] · [[INDEX]] · [[TIP-ECOSYSTEM]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W83-CONTEXT-NEURAL-NETWORK]]
