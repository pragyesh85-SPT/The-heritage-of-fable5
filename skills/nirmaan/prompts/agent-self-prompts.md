# AGENT SELF-PROMPTS — the prompts the agent runs on itself

> **For the agent, not the founder.** These are internal prompts the agent uses at key moments — to review its own work like a skeptic, generate a handoff, check itself before claiming done, and structure planning. Use them (or a subagent with them) to get the discipline of a second mind. They operationalize the standards into concrete self-instructions.

---

## 1. The skeptical-reviewer prompt (run in Verify)

Use this to switch from builder to adversary (ideally as a separate review agent/subagent with fresh context — it catches what the builder's polluted context misses):

```
You are a skeptical senior reviewer. Assume this code is broken and try to prove it.
Review ONLY for issues that affect correctness, reliability, security, or the stated requirements —
do NOT raise stylistic nitpicks or suggest extra abstractions (that causes over-engineering).

Check specifically:
- Inputs: is EVERY input validated server-side? Find one that isn't.
- States: are loading / empty / error / no-permission states all handled? Find a missing one.
- Idempotency: can a double-submit or retry double-create or double-charge? Try it.
- Permissions: is every protected action checked on the SERVER, per object? Find a UI-only check or an IDOR.
- External calls: timeout + retry + graceful failure present? What happens if the service is down/slow?
- Data: any non-reversible/unsafe DB change? Any secret in code or logs?
- Failure: pick the most likely failure path and trace what the user sees and what state results.
- Regression: could this have broken an earlier feature?

For each issue: state it, where it is, why it matters (plainly), and the fix. Rank must-fix vs optional.
If you find nothing real, say so plainly — don't invent problems.
```

## 2. The "am I about to skip the 20%?" self-check (run while building each feature)

Before calling any feature complete, ask yourself:

```
For this feature, have I baked in ALL of:
[ ] Server-side schema validation; bad input rejected with a clear error?
[ ] Loading / empty / error / no-permission states?
[ ] Idempotency + disable-in-flight on writes that create/charge?
[ ] Server-side permission checks, per object?
[ ] Timeout + retry + graceful failure on every external call?
[ ] No secrets in code/logs; data changes reversible?
[ ] Error reported to the tracker; key action emits an analytics event?
[ ] At least one FAILURE path tested, not just the happy path?
If any box is unchecked, the feature is NOT done. Go back and bake it in before moving on.
```

## 3. The handoff-generation prompt (run at session end)

To produce the carry-forward memory (`templates/HANDOFF.template.md`):

```
Write a NIRMAAN HANDOFF block so a fresh agent with ZERO other context can resume correctly.
Be compact but complete. Include:
- the project in one line, and the mode
- the locked stack (one line per layer)
- everything DONE (phase-level)
- what's IN PROGRESS and exactly how far
- the single NEXT STEP, concretely
- what's BLOCKED / needed from the founder (each with an assumed default)
- the KEY DECISIONS that shape the work (so they aren't re-litigated)
- LANDMINES (fragile areas, failed approaches not to repeat, known limitations)
- HEALTH (tests passing, last deploy, known issues)
Then state the one line to resume in a file-capable tool vs a no-disk chat.
First reconcile against the actual code/repo — if the notes and code disagree, the code wins; fix the notes.
```

## 4. The plan-generation prompt (run in Planning)

To turn the approved understanding into a phased plan (`workflow/02-planning.md`):

```
Break this product into phases, each completable in ONE focused session, ordered by dependency.
For each phase: a one-line goal, a checklist of concrete tasks, and explicit verification criteria
(how we KNOW it's done). Foundation/identity/deploy-skeleton first; the core flow early and with the
most care; cross-cutting concerns (validation, error handling, observability) baked into EVERY phase,
never a separate "reliability later" phase. Keep phase checkboxes precise enough that a fresh session
could resume mid-phase. Then write the founder-facing PROJECT-BRIEF in plain, jargon-free language
with what they'll be able to do after each stage, what you need from them and when, what's out of scope,
the honest risks, and rough time/cost in ranges.
```

## 5. The discovery-interview prompt (run in Discovery)

To extract a real blueprint from a vision (`workflow/01-discovery.md`):

```
Interview the founder to turn their vision into a precise blueprint. Ask a few questions at a time,
in plain language, ALWAYS offering a sensible default they can just approve. Cover: the one-sentence
core action; the user(s) and roles; the success/scale bar; every screen/surface and how multiple apps
relate; money and data (with risk flags); integrations; hard constraints; and — critically — the
UNHAPPY PATHS for the core flow (payment fail, network drop, double-submit, bad input, concurrency,
external service down, abuse) and any irreversible actions. Detect the archetype(s). Pin down what's
OUT of scope for v1. Don't build anything yet; produce understanding written to PROJECT-BRIEF.md.
Do not proceed with major unknowns in the core flow or money/data area.
```

## 6. The audit-recon prompt (run in Audit mode)

To reverse-engineer an existing product (`audit/audit-existing-project.md`):

```
Reverse-engineer this existing codebase WITHOUT changing any code. Determine: how many apps/surfaces
and their purposes; the real stack and versions (flag abandoned/outdated); how the apps connect; the
data model as it exists; and reconstruct the product's CONCEPT (what it lets a user do, the roles) and
its PERSONA/philosophy (the intended feeling/voice) from naming, routes, copy, and design. Then confirm
with the founder that you've understood their intent. Next, audit against the Nirmaan standards and list
flaws by severity (🔴 critical / 🟠 major / 🟡 minor), each with location and plain-language impact and a
fix direction. Pay special attention to: secrets in code, UI-only permissions, missing server-side
validation, non-idempotent writes, unhandled external failures, no migrations/backups, no monitoring,
and tangled multi-app coupling.
```

## 7. The "is this done?" gate (run before claiming completion of anything)

```
Before I tell the founder this is done:
- Did the automated tests pass? Did I actually RUN it and exercise a failure path?
- Is the 20% present (see self-check #2)?
- Did I check I didn't break earlier features?
- Did I update STATE.md / phases.md / DECISIONS.md and commit?
If any answer is no, it is NOT done. "I wrote the code" is not "it works."
```

## 8. The over-engineering check (run when tempted to add complexity)

```
Am I about to add an abstraction, framework, pattern, or feature the founder did NOT ask for and the
product does NOT need right now? If so, STOP. Use the simplest thing that meets the requirement.
Complexity is a cost paid forever — in bugs, maintenance, and the next session's confusion.
Add it only when a real, present need justifies it.
```

---

## How the agent uses these

- Run the relevant self-prompt at its moment: discovery → #5; planning → #4; audit → #6; building each feature → #2 and #8; verifying → #1; finishing anything → #7; ending a session → #3.
- Prefer running the **reviewer (#1)** as a separate pass/subagent with fresh context — a builder reviewing itself in a polluted context is the weakest form of review.
- These don't replace the detailed phase files; they're the concise self-instructions that put those files into practice.
