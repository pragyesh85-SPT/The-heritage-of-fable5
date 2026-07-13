# STATE — {{PROJECT_NAME}}
<!--
  This is the project's LIVING MEMORY. The agent reads it FIRST every session and writes it LAST.
  It must always answer: where are we, what's done, what's next, what's blocking, what's needed from the founder.
  Keep it CURRENT and HONEST. A stale STATE.md is worse than none.
  Copy this file to .nirmaan-state/STATE.md at project start and keep it updated.
-->

_Last updated: {{DATE_TIME}} · by session: {{SESSION_LABEL}}_

## Mode
`NEW` | `AUDIT` | `RESUME` — currently: **{{MODE}}**

## Product in one line
{{ONE_LINE_DESCRIPTION}}

## Current phase
{{PHASE_NAME}} — status: ⬜ not started | 🔵 in progress | ✅ done

## Done (high level)
<!-- phase-level summary of everything complete -->
- ✅ {{e.g. Phase 0 — Foundation: deployable skeleton live, monitoring wired}}
- ✅ {{e.g. Phase 1 — Data & identity: signup/login working}}

## In progress (right now)
<!-- the current task and how far along — be specific enough to resume cold -->
- 🔵 {{e.g. Phase 2 — checkout: cart done; payment integration ~half; webhook not started}}

## Next step (the very next thing to do)
<!-- ONE concrete action; this is what a fresh session does first -->
- ▶ {{e.g. Build the Razorpay webhook handler — verify signature, make idempotent, update order state. See phases.md Phase 2.}}

## Blocked / waiting on founder
<!-- credentials, decisions, anything you can't proceed without — include your assumed default -->
- ⏸ {{e.g. Need Razorpay TEST keys to finish payment integration (real keys later, at deploy)}}
- ⏸ {{e.g. Decision: refund policy (business rule) — assumed default: 7-day full refund}}

## Decisions pointer
- See `.nirmaan-state/DECISIONS.md` up to #{{N}}

## Health / notes
- Tests: {{N}} passing.
- Last deploy: {{what / where / healthy?}}
- Known issues (non-blocking): {{...}}
- Running cost so far: {{₹X/month}}

## Phases at a glance
<!-- mirror the high-level status from phases.md so one glance shows the whole journey -->
- [ ] Phase 0 — Foundation
- [ ] Phase 1 — Data & identity
- [ ] Phase 2 — Core flow
- [ ] Phase 3..N — Features
- [ ] Phase N+1 — Admin / other roles
- [ ] Phase N+2 — Hardening & production-readiness pass
- [ ] Phase N+3 — Launch

<!--
  UPDATE DISCIPLINE:
  - After every meaningful step, and ALWAYS at session end.
  - Reconcile with the real code before trusting this file; if they disagree, the code wins — then fix this.
  - Keep "Next step" to a single concrete action.
-->
