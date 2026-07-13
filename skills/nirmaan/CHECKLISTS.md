# CHECKLISTS — the whole protocol, scannable on one page

> **A consolidated quick-reference.** Every checklist here lives in fuller form in its source file; this page gathers them so the agent (or the founder) can scan the gates at a glance. When in doubt, open the source file. Order follows the build journey.

---

## ✅ Session start (every session) — `workflow/00-bootstrap.md`
- [ ] Read `CLAUDE.md`.
- [ ] Check for `.nirmaan-state/STATE.md` → if present, RESUME (read it first).
- [ ] Check for existing code → if present + breaking, AUDIT.
- [ ] Confirm mode with the founder in one plain sentence.
- [ ] Initialize `.nirmaan-state/` (NEW/AUDIT) or read it (RESUME).

## ✅ Discovery done? — `workflow/01-discovery.md`
- [ ] One-sentence core action captured.
- [ ] Users + roles, success/scale bar, all surfaces/apps + relationships.
- [ ] Money & data summarized with risk flags; integrations listed; hard constraints noted.
- [ ] Unhappy paths for the core flow decided; irreversible actions identified.
- [ ] Archetype(s) detected; v1 out-of-scope pinned.
- [ ] No major unknowns left in the core flow or money/data area.

## ✅ Planning done? (Checkpoint #1) — `workflow/02-planning.md`
- [ ] `phases.md`: phases ordered by dependency, each session-sized, each verifiable.
- [ ] Cross-cutting concerns baked into every phase (no "reliability later" phase).
- [ ] `PROJECT-BRIEF.md` written in plain language.
- [ ] Founder **approved the brief**; approval logged in `DECISIONS.md`.

## ✅ Architecture done? (Checkpoint #2) — `workflow/03-architecture-and-stack.md`
- [ ] Architecture: pieces + connections, data model, boundaries, failure design, environments.
- [ ] Stack chosen from the default (deviations have a recorded reason).
- [ ] Costs noted per service (flag anything paid).
- [ ] Stack explained in plain outcomes; founder **approved**; locked in `.nirmaan-state/stack.md`.
- [ ] Phase 0 will deploy a monitored empty skeleton (not "deploy last").

## ✅ Per-feature, while building — `workflow/04-build.md` · `standards/reliability-and-edge-cases.md`
The **20%** — a feature is not done without all of these:
- [ ] Server-side schema validation; bad input → clear error.
- [ ] Loading / empty / error / no-permission states.
- [ ] Idempotency + disable-in-flight on creates/charges.
- [ ] Server-side permission checks, per object.
- [ ] External calls: timeout + retry-with-backoff + graceful failure.
- [ ] No secrets in code/logs; data changes reversible.
- [ ] Errors → tracker; key action → analytics event.
- [ ] At least one failure path tested.

## ✅ Verify (after each phase + full pass before deploy) — `workflow/05-verify.md`
- [ ] Switched to the skeptical-reviewer stance (ideally a fresh subagent).
- [ ] Automated tests pass; app run manually incl. a failure path; no console/server errors.
- [ ] The 20% present (above); security pass; data-safety pass; regression check.
- [ ] Findings recorded honestly; must-fixes fixed and **re-verified**; 0 must-fix remaining.
- [ ] (Reviewer flagged only correctness/reliability/security/requirements gaps — no nitpick chasing.)

## ✅ Security pass — `standards/security.md`
- [ ] Secret-scan clean (incl. history); none in the frontend bundle; rotate any leaked.
- [ ] Queries parameterized; output escaped; one injection attempt rejected.
- [ ] IDOR check (changing an ID denies access); protected API denies without permission.
- [ ] HTTPS + redirect + security headers; webhooks verify signatures.
- [ ] No secrets/PII in logs; card data never stored; dependency vuln scan done.
- [ ] (High-stakes: recommended a professional review to the founder.)

## ✅ Data & backups — `standards/data-and-backups.md`
- [ ] Schema changes = versioned, reversible migrations; backup before migrating.
- [ ] Multi-step writes transactional; concurrency on shared resources atomic.
- [ ] DB-level constraints enforce integrity; destructive ops guarded; soft-delete where recovery may be needed.
- [ ] Money as integer/decimal, never floats.
- [ ] Backups automated, off-site, and a **restore tested**; `RECOVERY.md` written.

## ✅ Observability (before launch) — `standards/observability.md`
- [ ] Error tracking live (frontend + backend), secrets scrubbed, alerting tuned, releases tagged.
- [ ] Uptime monitor live with a real health-check; alerts reach the founder.
- [ ] Structured, leveled logs with correlation IDs; no sensitive data.
- [ ] Analytics on signup/login/core-flow funnel; consent handled.
- [ ] Founder shown where to look and what red vs green means.

## ✅ UX & accessibility — `standards/ux-and-accessibility.md`
- [ ] New user can complete the core action with no instructions; primary action obvious.
- [ ] Works on a phone; finger-sized tap targets.
- [ ] Loading/empty/error/success states on every screen.
- [ ] Forms: real labels, inline specific validation, preserved input, disabled-while-submitting.
- [ ] Immediate feedback on every action; human, actionable error copy; product voice.
- [ ] Keyboard usable; sufficient contrast; alt text on meaningful images.

## ✅ Performance & cost — `standards/performance-and-cost.md`
- [ ] Core flow feels fast on a phone; no N+1 on hot paths; key queries indexed; lists paginated.
- [ ] Images optimized + lazy-loaded; bundle not bloated; slow work in background jobs.
- [ ] Every paid service's cost known + within budget; hard caps on metered things (AI tokens, messages, compute).
- [ ] Usage/billing alerts set; expensive endpoints rate-limited; no idle paid resources.

## ✅ Deploy (Checkpoint #3) — `workflow/06-deploy.md`
- [ ] Release Verify passed (0 must-fix); observability + backups ready; skeleton still deploys.
- [ ] Credentials requested as an exact, minimal, plain-language list; stored as env secrets (never echoed).
- [ ] Reproducible pipeline: tests gate → backup → migrate → deploy → health-check → rollback ready (`DEPLOY.md`).
- [ ] HTTPS live; live keys switched in.
- [ ] **Production smoke test** on the live site with real services (incl. mobile); passed.
- [ ] Monitoring confirmed receiving data; alerts set; founder handed the dashboards.

## ✅ Iterate & grow (post-launch, each cycle) — `workflow/08-iterate-and-grow.md`
- [ ] Plain-language usage summary delivered (errors, drop-off, feedback, cost).
- [ ] The single highest-value change chosen (breakage → core-flow friction → requested → new features).
- [ ] Change built with the 20%, verified, shipped, confirmed in production; regression test added.
- [ ] Hygiene current: dependencies, backups, monitoring, costs.

## ✅ End-of-session ritual (every session boundary) — `workflow/07-continuity.md`
- [ ] Reconcile `STATE.md` with reality (code wins on conflict); update it (phase/done/in-progress/next/blocked/needs).
- [ ] Append new decisions to `DECISIONS.md`; tick `phases.md`.
- [ ] Commit to git (clear message; `.nirmaan-state/` included; secret-scan clean).
- [ ] Write a dated handoff in `.nirmaan-state/handoffs/` and emit the handoff block to the founder.

---

> These checklists are the protocol's gates in one place. Passing them — not "I wrote the code" — is what "done" means at each stage. The 🔴 items in the source files are non-negotiable; the rest are satisfied or explicitly accepted by the founder as known limitations.
