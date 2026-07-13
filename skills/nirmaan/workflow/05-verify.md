# 05 · VERIFY — The back-and-forth self-checking loop

> **Goal:** before anything is called "done," *you* check it — hard, like a skeptical reviewer — then fix what you find, then check again. This is the **"back and forth, back and forth"** the founder explicitly asked for. It runs after every build phase, and again as a full pass before Deploy.
>
> **Why it exists:** agents (and humans) declare victory too early — "I wrote the code" feels like "it works," but it isn't. Verify is the discipline that closes that gap. It is **mandatory**, not optional.

---

## 5.1 The two levels of Verify

1. **Phase Verify** — after each build phase, against that phase's verification criteria. Fast, focused.
2. **Release Verify** — before Deploy, the full `standards/production-readiness.md` pass across the whole product.

Both use the same loop.

---

## 5.2 The Verify loop

```
   ┌──────────────────────────────────────────────┐
   │ 1. SWITCH HATS: become the skeptical reviewer  │
   │ 2. RUN the checks (automated + manual)         │
   │ 3. RECORD findings honestly (don't hide them)  │
   │ 4. TRIAGE: must-fix vs optional                │
   │ 5. FIX the must-fixes (back in Build)          │
   │ 6. RE-RUN the checks                           │
   │ 7. Repeat until must-fixes = 0                 │
   └──────────────────────────────────────────────┘
```

### On "switching hats"
When you verify, deliberately adopt an adversarial stance: *assume the code is broken and try to prove it.* This is more effective than re-reading your own work approvingly. If your environment supports a separate review agent/subagent, use it — a fresh reviewer with clean context catches what the builder's polluted context misses.

### On the reviewer's scope (avoid over-engineering)
A reviewer asked to "find problems" will always find some, even in sound work — and chasing every one leads to over-engineering (needless abstractions, defensive code, tests for impossible cases). So instruct the review (and yourself) to **flag only issues that affect correctness, reliability, security, or the stated requirements.** Treat the rest as optional notes, not must-fixes.

---

## 5.3 What to check (the Verify checklist)

Run these for Phase Verify (scoped to the phase) and all of them for Release Verify.

### A. Does it actually work?
- [ ] Automated tests for this work pass.
- [ ] You **ran the app** and exercised the feature yourself — the happy path works end to end.
- [ ] You exercised at least one **failure path** and it behaved correctly (clear error, recoverable state).
- [ ] No console errors, no unhandled promise rejections, no server 500s in normal use.

### B. The 20%, present?
- [ ] Every input is validated **server-side**; bad input is rejected cleanly.
- [ ] Loading / empty / error / no-permission states exist and look right.
- [ ] Double-submit and retries are safe (idempotent); buttons disable in-flight.
- [ ] Protected actions are enforced on the server, not just hidden in the UI.
- [ ] External calls have timeouts, retries, and graceful failure.
- [ ] Errors report to the tracker; key actions emit analytics events.

### C. Security pass (per `standards/security.md`)
- [ ] No secrets in code or committed; secret-scan clean.
- [ ] No obvious injection (SQL/NoSQL/command/script) — inputs parameterized and escaped.
- [ ] AuthZ checked on every protected route/action.
- [ ] No sensitive data in logs.
- [ ] Webhooks verify signatures.

### D. Data safety (per `standards/data-and-backups.md`)
- [ ] Schema changes are migrations (versioned, reversible).
- [ ] Destructive operations are guarded and recoverable.
- [ ] Nothing the founder said "must never be lost" can be lost by this change.

### E. The "did I break the past?" check (regression)
- [ ] Previously-working features still work (re-run their tests; spot-check the core flow).
- [ ] No new dependency broke an old one.

### F. Quality & clarity
- [ ] Code is simple, named clearly, consistent with the codebase; no dead/commented-out code, no stray TODOs.
- [ ] User-facing copy (especially errors) is clear and in the product's voice.
- [ ] Basic accessibility: labels, keyboard, contrast, alt text.

---

## 5.4 Recording findings honestly

In `STATE.md` (or a `verify-report.md` for a release pass), record what you found and its status:

```markdown
## Verify — Phase 2 (checkout) — [date]
Must-fix:
- [x] Double-submit created two orders → added idempotency key. Re-verified: fixed.
- [x] Payment-fail showed a blank page → added error state + retry. Re-verified: fixed.
Optional (noted, not blocking):
- [ ] Could add a richer empty-cart illustration later.
Result: PASS (0 must-fix remaining).
```

**Do not hide or downplay findings.** An honestly-surfaced flaw fixed now is cheaper than a hidden one found by a customer. If you cannot fix something, say so plainly and record it as a known limitation for the founder.

---

## 5.5 The fix discipline (avoid the correction spiral)

- Fix must-fixes by returning to Build, then **re-run the checks** — never assume a fix worked without re-verifying.
- **After two failed attempts at the same fix, stop the spiral.** Repeated failed corrections pollute context and rarely converge. Instead: re-state the problem cleanly from first principles, write down what you've learned, and take a fresh approach (or, in a long session, start a fresh session with a clean, well-written prompt that incorporates the learnings). Escalate to the founder if it's a decision only they can make.

---

## 5.6 Telling the founder where things stand

After a Verify pass, update the founder in plain language — briefly, and without dumping the whole checklist:

> "Phase 2 (checkout) is built and checked. It works, including when a payment fails or someone double-taps. I found and fixed two issues during testing. Moving on to [next]."

For the Release Verify before launch:

> "Full quality pass done. The production-readiness checklist passes. Here's what's solid, and here are [N] small known limitations we can improve later. I'm ready to deploy when you are — I'll then need [the credential list]."

---

## 5.7 Gate to Deploy

You may proceed to Deploy **only when**:
- All phases are ✅ in `phases.md`.
- A full Release Verify against `standards/production-readiness.md` passes with **0 must-fix** items.
- Any remaining items are explicitly recorded as accepted known-limitations the founder is aware of.

If not, loop back to Build. **Deploying an unverified product recreates the founder's original problem.**

Update `STATE.md`: phase = Deploy (next); verify = passed on [date].
Proceed to **`workflow/06-deploy.md`.**

---

## 5.8 Anti-patterns

- **Skipping Verify to "save time"** → ships breakage; this is the exact failure mode Nirmaan exists to prevent.
- **Re-reading your own code approvingly** instead of trying to break it → misses real bugs. Switch hats / use a fresh reviewer.
- **Chasing every reviewer nitpick** → over-engineering. Fix correctness/reliability/security/requirements; defer the rest.
- **Assuming a fix worked** → always re-run the checks.
- **The correction spiral** → after two failed tries, reset the approach; don't keep patching.
- **Hiding findings** → erodes trust and ships bugs. Be honest.
