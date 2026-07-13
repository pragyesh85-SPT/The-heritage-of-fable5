# STANDARD · Git & Collaboration — version control as a safety net and a second memory

> **Consult during Build and whenever multiple people/sessions touch the project.** Git is two things at once: a **safety net** (undo any mistake, roll back any bad change) and a **second memory** (the commit history records what happened, complementing `STATE.md`). Good git hygiene is part of what makes a build recoverable and a team workable — including the founder's setup where a teammate (e.g. research/delegation) is involved.
>
> Tier key: 🔴 must-have · 🟠 strongly expected · 🟡 nice.

---

## 1. Why git matters here (in plain terms)

- **Undo button:** any change can be reverted; a broken state can be rolled back to the last good one. Without this, a bad change can be unrecoverable.
- **Memory:** the history of commits is a record of what was built and when — a teammate or a future session can read it to understand the project's evolution.
- **Safe collaboration:** more than one person (or session) can work without overwriting each other, if branches and merges are used sensibly.
- **Deploy backbone:** the reproducible deploy (Law 8) is usually driven by git (push-to-deploy); a clean history makes releases and rollbacks reliable.

The founder doesn't need to operate git — the agent does — but the founder benefits directly: nothing is ever truly lost, and any mistake is reversible.

## 2. Commit discipline

- 🔴 **Commit frequently** — after each working sub-task, not in giant once-a-day dumps. Small commits = precise rollbacks and a readable history.
- 🔴 **Each commit leaves the code in a working state** — never commit something that doesn't build/run (so any commit is a safe rollback point).
- 🟠 **Clear messages** that say what changed and why, in plain language ("Add idempotency to order creation to prevent double charges"), not "wip" or "fixes."
- 🟠 **One logical change per commit** — don't mix an unrelated fix into a feature commit.
- 🔴 **Never commit secrets** (Law 4) — run a secret-scan before committing; if a secret ever lands in history, rotate it (history persists).
- 🟠 **Commit the state files** (`.nirmaan-state/`) too — so the project's memory travels with the repo and any session/teammate can pick up.

## 3. Branching (keep it simple)

- 🟠 **Main is always deployable** — it should always be in a working, releasable state.
- 🟠 **Work on a branch** for a feature/phase, then merge to main when it's built and verified (especially once the product is live and others rely on main).
- 🟡 For a solo founder early on, committing carefully to main can be fine; introduce branches as soon as the product is live or a second person is involved.
- 🟡 **Preview/staging from a branch** lets changes be checked before they hit production.

## 4. Reviewing changes before they land

- 🟠 Before merging anything significant, run the **Verify** loop (`workflow/05-verify.md`) — tests pass, the 20% is present, no regressions.
- 🟠 Where a review step exists (a teammate, or a reviewer subagent), have it **flag only correctness/reliability/security/requirements gaps**, not stylistic nitpicks (avoid over-engineering).
- 🟠 Tests run as a **gate** in the pipeline — a failing test blocks the merge/deploy.

## 5. Working with a teammate (e.g. research/delegation, or another builder)

The founder works with at least one team member. To collaborate cleanly:

- 🟠 **The state files are the shared source of truth** — `STATE.md` (status), `DECISIONS.md` (choices), `phases.md` (plan). A teammate (or their session) reads these to get oriented, exactly like a resuming agent.
- 🟠 **Small, frequent, well-described commits** make it easy for others to follow and to avoid conflicts.
- 🟠 **Communicate via the repo, not memory** — decisions, todos, and handoffs live in files, so nothing depends on one person remembering.
- 🟠 **Divide work along phase/branch lines** so two people aren't editing the same thing; merge and verify.
- 🟡 A short `CONTRIBUTING`/`README` note on how to run, test, and deploy lets a teammate (or a new agent) start without re-asking.
- 🟡 For delegated tasks, the `/day`-style planning and delegation log the founder uses can reference the same phases/state, keeping AI work and human work in one picture.

## 6. Checkpoints, tags, and recovery

- 🟠 **Tag releases** (or note the deployed commit) so you always know what's live and can roll back to a specific known-good version.
- 🟠 Before a risky change, ensure recent work is committed (a clean restore point). Many tools also keep automatic checkpoints — know how to restore.
- 🔴 The **rollback path** (revert to the last good version) is documented in `DEPLOY.md` and actually works (Tree 8 / `workflow/06-deploy.md`).

## 7. The git checklist (run during Build/Verify)

- [ ] Frequent, working-state commits with clear, plain-language messages.
- [ ] One logical change per commit; no unrelated mixing.
- [ ] Secret-scan clean; no secrets in history.
- [ ] `.nirmaan-state/` committed so memory travels with the repo.
- [ ] Main stays deployable; significant work branched and verified before merge.
- [ ] Tests gate the merge/deploy; reviewer (if any) flags only real gaps.
- [ ] Releases tagged/noted; a working rollback exists.

## 8. Anti-patterns

- **Giant infrequent commits** → rollbacks are blunt, history is useless. Commit small and often.
- **Committing broken code** → no safe rollback point. Keep each commit working.
- **Vague messages ("wip", "fix")** → no one (including future-you) can tell what happened. Say what + why.
- **Secrets in history** → permanent leak even after deletion. Scan before commit; rotate if leaked.
- **Not committing the state files** → the project's memory doesn't travel; teammates/sessions start blind. Commit `.nirmaan-state/`.
- **Everyone editing main directly once live** → overwrites and broken production. Branch, verify, merge.
- **No tags / no rollback** → a bad deploy becomes an outage with no quick way back. Tag releases; keep rollback ready.
