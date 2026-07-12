# 09 — Prompt Templates (copy, fill brackets, send)

Every template starts with the same preamble line:

> Read every file in `E:\PRAGYESH - WORK\CLAUDE-BRAIN` first. They are binding. Confirm by
> naming the 3 rules most relevant to this task, then begin.

---

## A. New build kickoff

> [PREAMBLE]
> I want to build: [one-paragraph description in business terms — who uses it, what they do,
> where money moves].
> Load `02-QUESTION-PROTOCOL.md` and `07-BUILD-PLAYBOOK.md`. Ask me your batched founder
> questions (max 5, each with your recommended default). Then produce a phased plan in
> `.nirmaan-state/` and wait for my approval before writing code.

## B. Bug fix

> [PREAMBLE]
> Bug: [what a user sees, which role, since when, one example record/order ID if I have it].
> Load `03-RETRIEVAL.md`. Investigate first and tell me the ROOT CAUSE in plain language
> before changing anything. Remember this ecosystem shares one Firestore across repos —
> trace writers and readers across all of them.

## C. Explain / full picture

> [PREAMBLE]
> Explain [feature/app/workflow] to me completely — user journey, money flow, what happens
> behind the scenes, and current gaps. One complete answer, business language, no teasers.
> Investigate the actual code before answering (`03-RETRIEVAL.md` + `06-REPLY-STYLE.md`).

## D. Audit a codebase

> [PREAMBLE]
> Audit [repo/folder]. Load `03-RETRIEVAL.md` and `07-BUILD-PLAYBOOK.md`. Check specifically:
> secrets in client code, Firestore rules coverage, client-computed payment amounts,
> unverified webhooks, cross-repo schema drift. Report: what's solid / what's risky /
> what to fix first — ranked by real-world damage, not by count.

## E. Schema or shared-data change (multi-repo)

> [PREAMBLE]
> I need to change [field/collection]. Before ANY edit: grep it across ALL sibling repos,
> list every reader and writer, and give me the staged deploy order per
> `07-BUILD-PLAYBOOK.md`. No big-bang changes.

## F. Delegating to a smaller/cheaper model

> [PREAMBLE — give this to the small model]
> You are doing a bounded mechanical task. Do EXACTLY this and nothing else: [task].
> Files: [paths]. Output format: [format]. Do not touch payments, auth, security rules,
> or any file not listed. If the task requires judgment you don't have context for, STOP
> and say so instead of guessing.
> (Then have the top model review the diff — `05-MODEL-ROUTING.md`.)

## G. Resume multi-session work

> [PREAMBLE]
> Resume the work in [project]. Read `.nirmaan-state/` (and project MEMORY.md) first,
> tell me in 5 lines where things stand — DONE / IN PROGRESS / NEXT / open decisions —
> then continue from NEXT. Do not redo completed phases.

## H. When the model made a mistake

> That was wrong because [reason]. Update the matching file in CLAUDE-BRAIN with a
> trigger→action rule so no future session repeats it. Show me the rule you added,
> then redo the task correctly.

## Linked
[[02-QUESTION-PROTOCOL]] · [[03-RETRIEVAL]] · [[05-MODEL-ROUTING]] · [[06-REPLY-STYLE]] · [[07-BUILD-PLAYBOOK]]
