# WORKED EXAMPLE — Nirmaan building a real product, end to end

> **Read this to see the whole protocol in action on one concrete project.** It's a model, not a script — your real project differs — but it shows exactly how the phases, the founder checkpoints, the state files, and the cross-chat handoffs fit together. Where you see `[Founder]` and `[Agent]`, that's the dialogue; where you see file blocks, that's what gets written to `.nirmaan-state/`.
>
> **The example project:** a simple fasting-tracker web app — log a fast, see a streak, view a Hindu *tithi* calendar. (Chosen because it's small enough to show fully, and it touches data, auth, a core flow, and an admin view — the common shape.)

---

## Session 1 — Discovery → Planning → Architecture (no code yet)

**[Founder]** *(pastes Prompt 1)* "I want an app where people log their daily fast, see their streak, and see today's tithi. There's also me — I want to see how many people are fasting."

**[Agent]** reads `CLAUDE.md`, detects **NEW** mode, creates `.nirmaan-state/`, then interviews (a few questions at a time, with defaults):

> "Got it. A few quick things so I build the right thing:
> 1. When someone misses a day, does their streak reset to zero, or get a one-day grace? *(Most apps give one grace day — shall we?)*
> 2. How do people log — one tap 'I fasted today', or do they enter details (start/end time, type of fast)? *(I'd start with one-tap and add detail later.)*
> 3. The tithi calendar — show just today's tithi, or a full month? *(Start with today + the next few days?)*
> 4. Sign in with phone number, email, or Google? *(Phone/Google is easiest for Indian users on mobile.)*
> 5. Your admin view — just a count of active fasters, or per-user detail? *(Start with counts + a simple list.)*"

**[Founder]** "1: grace day yes. 2: one-tap to start. 3: today plus next few days. 4: Google + phone. 5: counts and a list is fine."

**[Agent]** asks the failure/edge questions plainly:

> "Two more, about when things go wrong:
> - If someone taps 'I fasted' twice quickly, we should count it once — agreed? *(Yes, I'll make it safe.)*
> - The tithi data — should it work even if an outside calendar service is down? *(I'll cache it so the app still works offline-ish.)*"

**[Founder]** "Yes and yes."

**[Agent]** writes `PROJECT-BRIEF.md` (plain language) and presents it:

```markdown
# Project Brief — Upwas Tracker (example)

## What we're building
A simple, mobile-friendly app where someone taps once a day to log that they fasted,
sees their current streak (with a one-day grace if they miss), and sees today's and the
next few days' tithi. You get a small admin view showing how many people are fasting and a list.

## What it will let people do (in order)
1. The app is live and we can see if it's healthy.
2. People sign in (Google or phone).
3. People tap once a day to log a fast and see their streak.
4. People see today + the next few days' tithi.
5. You see a count of active fasters and a simple list.

## How we'll build it (stages)
- Stage 1 (Foundation): the empty app is live, secure, and monitored.
- Stage 2 (Login): people can sign in with Google or phone.
- Stage 3 (Core — fast log + streak): the main thing works, double-taps are safe.
- Stage 4 (Tithi): today + next few days, works even if the outside service is down.
- Stage 5 (Admin): your counts + list.
- Stage 6 (Hardening + launch): full quality pass, then live with your accounts.

## What I'll need from you
- Now: approve this plan.
- At launch: a Google sign-in setup, a phone-OTP provider, and a hosting account — I'll give exact steps.

## Not in v1
- Detailed fast types, social features, notifications/reminders. (We can add later.)

## Honest risks
- The tithi calendar depends on outside data; we'll cache it so the app never breaks if that's down.

## Cost & time
- Running cost to start: ~₹0–500/month (free tiers cover early use).
- Time: roughly 4–6 short sessions for v1, depending on your availability at checkpoints.
```

> "That's the plan in plain words — happy for me to proceed, or change anything?"

**[Founder]** "Go ahead."  → **Checkpoint #1 passed.** Agent logs the approval in `DECISIONS.md`.

**[Agent]** moves to Architecture, reads `stack/default-stack.md` + the relevant archetypes (this is *AI companion-ish + admin*, mostly a straightforward app), and presents the stack as outcomes:

> "Here's how I'll build it (plain version):
> - The app people see: React, fast and mobile-friendly.
> - Where data lives: a reliable database that won't lose anyone's logs (Supabase, free to start).
> - Login: Supabase's proven Google + phone sign-in — not hand-built (that's where hacks happen).
> - Tithi data: fetched from a calendar source and **cached**, so it works even if that source is down.
> - Hosting: a cheap server with push-button deploys and automatic HTTPS (~₹400/month) — or a free managed host to start.
> - From day one: error-tracking + an uptime watchdog + simple analytics, so you can see if it's healthy and how it's used.
> Cost to start: near zero. Approve and I'll start building?"

**[Founder]** "Approved."  → **Checkpoint #2 passed.** Stack locked in `.nirmaan-state/stack.md`; approval in `DECISIONS.md`.

**[Agent]** runs the End-of-Session Ritual and outputs a handoff:

```
=== NIRMAAN HANDOFF — Upwas Tracker — Day 1 ===
PROJECT IN ONE LINE: One-tap fasting tracker with streaks + tithi + a small admin view.
MODE: NEW
STACK: React+Vite / Supabase (DB+auth) / Supabase Google+phone auth / cached tithi source /
       Coolify or managed host / Sentry+Uptime Kuma+PostHog.
DONE: Discovery complete; brief approved; stack approved & locked.
IN PROGRESS: nothing (about to start Phase 0).
NEXT STEP: Build Phase 0 — deployable empty skeleton with monitoring wired.
BLOCKED/NEED FROM FOUNDER: nothing yet (credentials at launch).
KEY DECISIONS: grace-day streak; one-tap log; today+few-days tithi; Google+phone login; counts+list admin; double-tap must be safe; tithi cached for resilience.
WATCH OUT FOR: tithi source reliability (cache it); make the log idempotent.
TO RESUME: open project, say "Resume Nirmaan — read STATE.md and continue."
=== END HANDOFF ===
```

`STATE.md` now says: phase = Phase 0 (next); discovery/planning/architecture = done.

---

## Session 2 (next day, fresh chat) — Phase 0 + Phase 1

**[Founder]** *(new chat, pastes Prompt 6)* "Resume Nirmaan — read STATE.md and continue from the next step."

**[Agent]** reads `CLAUDE.md` → `STATE.md` → confirms:

> "Welcome back. We've finished discovery, the plan, and the locked stack. Next is Stage 1: getting an empty, secure, monitored version of the app live. No input needed from you yet — I'll go build it and report back."

**[Agent]** builds **Phase 0** (per `workflow/04-build.md`): scaffolds React+Vite + Supabase, sets up env/secrets placeholders, wires Sentry + Uptime Kuma + PostHog, and deploys a "hello world" to a free host with HTTPS and a health-check. Verifies it deploys and the monitor reports "up." Ticks Phase 0 in `phases.md`. Updates `STATE.md`.

> "Stage 1 done: an empty version of your app is live at [url], over HTTPS, and I can see it's healthy on the dashboards. Moving to login."

**[Agent]** builds **Phase 1** (data + auth): a `users` table and a `fast_logs` table (with the right constraints — a user can have at most one log per day, enforced at the database level), Supabase Google + phone sign-in, and the signed-in/signed-out states. Writes tests: signup works, a protected action is denied when logged out. Verifies. Updates state.

> "Stage 2 done: people can sign in with Google or phone, and the data model safely holds one log per person per day. I tested that you can't log a fast without being signed in. Next is the main feature."

End-of-session ritual → handoff written. `STATE.md`: phase = Phase 2 (next).

---

## Session 3 — Phase 2 (the core flow) with the 20% baked in

**[Agent]** *(resumes)* builds the **fast-log + streak** core flow, applying the per-feature 20% (`workflow/04-build.md` §4.2):

- **Validation:** the log endpoint validates server-side (valid user, today's date, no duplicate) with a schema.
- **Idempotency:** tapping "I fasted" twice in a second reuses the same day's log — counted once (the DB one-per-day constraint + an idempotent upsert).
- **States:** loading spinner while saving; a clear "logged ✓ — streak: 5 days" success; an error state with retry if the save fails; the not-signed-in state redirects to login.
- **Streak logic:** computed correctly including the one-day grace; tested with tricky cases (logged yesterday, missed one day, missed two days, logged twice).
- **Observability:** a `fast_logged` analytics event; errors report to Sentry.
- **Tests:** an end-to-end test (sign in → log → see streak) + unit tests for the streak math + a double-tap test.

**[Agent]** hands to **Verify** (`workflow/05-verify.md`), switches to the skeptical-reviewer stance, and finds two issues:

```markdown
## Verify — Phase 2 (fast log + streak) — Day 3
Must-fix:
- [x] Streak counted a double-log as +2 across midnight boundary → fixed: streak counts distinct days, added a test. Re-verified: fixed.
- [x] Save error showed a blank toast → added a real error message + retry. Re-verified: fixed.
Optional (noted): nicer streak animation later.
Result: PASS (0 must-fix remaining).
```

> "Stage 3 (the main feature) is built and checked. Tapping once logs your fast and shows your streak, with the grace-day rule. I tested double-taps, missed days, and save failures — all handled. Found and fixed two issues while testing. Next: the tithi calendar."

State updated; handoff written.

---

## Session 4 — Phase 3 (tithi, with resilience) + Phase 4 (admin)

**[Agent]** builds the **tithi** feature: fetches today + next few days from the calendar source **through a background job that caches the result**, so the app shows tithi from cache even if the source is down (the resilience decision from Discovery). Wraps the external call in timeout + retry + fallback-to-cache. Tests the "source down → cache served" path explicitly.

Then the **admin** view: a protected, role-checked page showing a count of active fasters and a simple list — server-side authorization so a normal user can't reach it (tested: non-admin is denied). Pagination on the list for when it grows.

> "Stages 4 and 5 done: tithi shows today + the next few days and keeps working even if the outside source is down (I tested that). Your admin view shows active-faster counts and a list, locked to you. One more stage — the full quality pass — then we go live."

---

## Session 5 — Phase 5 (hardening) → Phase 6 (launch)

**[Agent]** runs the full **Release Verify** against `standards/production-readiness.md`: validation everywhere, security pass (secret-scan clean, IDOR check on the admin endpoint, HTTPS), data backups configured + a restore tested, mobile check, accessibility basics, copy cleanup. Records a `verify-report.md` with 0 must-fix.

> "Full quality pass done — the production-readiness checklist passes. There are two small known limitations (no reminders yet, basic streak animation) we can improve later. I'm ready to launch when you are. To go live I need three things from you:"

```markdown
## To go live, I need (one-time):
1. Hosting — sign up at [host]; smallest plan (~₹400/mo) or the free tier. Give me [access]. 
2. Google sign-in — create a Google OAuth app (I'll walk you through the 4 steps); give me the two keys.
3. Phone OTP — create a [provider] account; give me the API key.
I'll store all keys as secure secrets, never in the code. That's all I need.
```

**[Founder]** *(creates accounts, pastes keys)* → **Checkpoint #3 passed.** Agent stores them as env secrets (never echoes them back), runs the reproducible deploy, runs migrations after a backup, switches to live keys, and does the **production smoke test**: signs in for real on the live site, logs a fast, sees the streak, confirms the admin view, confirms Sentry/Uptime/PostHog are receiving data, checks it on a phone.

> "You're live at [url]. It's secure (HTTPS), works on mobile, and I've tested the whole flow with real sign-in. Here's where to watch its health: [uptime link] (is it up?), [Sentry link] (anything breaking?), [PostHog link] (how people use it). If anything ever goes red, start a new session and say 'production issue'. Running cost right now: ~₹400/month. Want me to queue the reminders feature next?"

`STATE.md`: status = **LIVE**; post-launch tasks queued. Final handoff written.

---

## What this example demonstrates

- **The founder spoke plain language the whole time** — approved a plan and a stack, answered a few business/edge questions, pasted credentials once. No code, ever.
- **The 20% was baked in, not bolted on** — validation, idempotency, error states, resilience, tests, monitoring appeared inside every feature. That's why nothing "worked then broke."
- **Five short sessions composed into one coherent product** — because the plan and state lived in files, each fresh chat resumed perfectly. The size of the product wasn't limited by the size of a chat.
- **Verify caught real bugs before users did** — the skeptical-reviewer pass found the streak double-count and the blank error, fixed before launch.
- **Launch was reproducible and monitored** — credentials handled safely, a real smoke test on the live site, dashboards handed to the founder.

Your real projects (a store, a voice agent, a finance tool) are bigger and have their own archetype traps — but the *shape* is identical. This is what "the AI builds the whole thing, you direct" actually looks like in practice.
