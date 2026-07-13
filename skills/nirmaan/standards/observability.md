# STANDARD · Observability — see what's happening, find breakage before users complain

> **Set up before Deploy; consult during Build (to add the hooks) and Verify.** Observability is how the founder stops "finding out it's broken when a customer messages them." It is the single highest-leverage fix for the founder's stated pain: *right now they're blind.* With error tracking + uptime + analytics wired, breakage becomes visible on a dashboard, instantly.
>
> Tier key: 🔴 must-have before any real launch · 🟠 strongly expected · 🟡 improve over time.

---

## 1. The three pillars (install all three before go-live)

1. **Error tracking** — when something breaks for a real user, *you* find out, with the exact error, where it happened, and enough context to fix it.
2. **Uptime monitoring** — a watchdog pings the site continuously and alerts the founder the moment it's down or unhealthy.
3. **Product analytics** — see how real users actually move through the product (and where they drop off), so the founder can make it genuinely usable and find what to improve.

These are not "later." They go in **before** launch, even before the product is feature-complete. A monitored empty skeleton is the correct first deploy (Phase 0).

---

## 2. Error tracking

- 🔴 An error tracker is wired into both the frontend and backend and is **receiving production errors**.
- 🔴 Each report carries **debuggable context**: the error + stack, the route/action, the environment, a release/version tag — but **never secrets, tokens, passwords, or full card numbers/PII** (scrub before sending).
- 🟠 Errors are **grouped** (so one bug doesn't spam 10,000 identical alerts) and **alerting** is tuned (notify on new or spiking issues, not every occurrence).
- 🟠 Releases are tagged so you can tell *which deploy* introduced an error.
- 🟠 Source maps uploaded (privately) so frontend errors are readable, not minified gibberish.
- 🟡 User-impact context (how many users hit this) to prioritize.

**Plain-language framing for the founder:**
> "I've set up a system that quietly watches your app. If anything breaks for a real customer, I (and you) get the exact details automatically — what broke and where — so we fix it fast instead of hearing about it days later from an angry buyer."

## 3. Uptime & health monitoring

- 🔴 An external uptime monitor checks the live site on a schedule and **alerts the founder** on downtime (email/SMS/WhatsApp/push — whatever the founder will actually see).
- 🔴 The app exposes a **health-check endpoint** the monitor (and the deploy pipeline) can hit to confirm it's truly up (not just returning a page while the database is down).
- 🟠 Monitor the **critical dependencies' reachability** (database, payment gateway, messaging) where feasible, so you know *which* piece failed.
- 🟠 Alerts are **actionable and not noisy** — tuned thresholds, so a single blip doesn't cry wolf.
- 🟡 A simple public/internal status view for the founder.

## 4. Logging

- 🟠 **Structured logs** (machine-readable), with sensible **levels** (debug/info/warn/error) — not random `print` statements.
- 🔴 **No sensitive data in logs** — scrub secrets, tokens, passwords, card numbers, full PII before logging (Law 4).
- 🟠 Logs include a **request/correlation ID** so a single user action can be traced across services.
- 🟠 Log the **decisions and failures** that matter for debugging (e.g. "payment webhook received, signature valid, order X → paid"), not noise.
- 🟡 Centralize logs so they're searchable; set retention.

## 5. Product analytics

- 🟠 Track **key events**: signup, login, the core action (e.g. checkout started / completed / failed), and the main feature interactions.
- 🟠 Build a **funnel** for the core flow so drop-off is visible ("80% start checkout, 40% finish — why?").
- 🟠 Respect **privacy/consent** (cookie/tracking consent where required); prefer privacy-respecting analytics; don't capture PII you don't need.
- 🟡 Cohorts/retention once there are real users; session replay (privacy-masked) to *see* where users struggle.

**Why this matters for the founder specifically:** the recurring advice across the founder's projects is "get real users and watch what they actually do." Analytics is the instrument that makes "usable for anyone" measurable instead of guessed. Without it, every product decision is blind.

## 6. Performance & cost visibility

- 🟠 Basic latency visibility on key endpoints/pages (is the core flow slow?).
- 🟠 Awareness of the **running cost** and any usage that would trip a paid tier (so there's no surprise bill).
- 🟡 Slow-query visibility on the database; bundle-size tracking on the frontend.

## 7. Alerting discipline (so alerts get acted on, not ignored)

- Alert on **what needs a human**: site down, error spike, payment failures rising, a job-queue backing up.
- **Don't** alert on every error occurrence or routine event — alert fatigue means real alerts get missed.
- Route alerts to where the founder **actually looks** (their phone, the channel they check).
- Each alert should say, in plain terms, **what's wrong and what to do** ("Checkout errors are spiking — start a new session and say 'production issue'").

## 8. The pre-launch observability checklist

- [ ] Error tracker live, receiving errors from frontend + backend, secrets scrubbed.
- [ ] Errors grouped; alerting tuned to new/spiking issues.
- [ ] Release/version tagging in place.
- [ ] Uptime monitor live with a real health-check endpoint; alerts reach the founder.
- [ ] Structured, leveled logs with correlation IDs and no sensitive data.
- [ ] Analytics on signup, login, and the core-flow funnel; consent handled.
- [ ] Cost/usage awareness; no silent paid-tier triggers.
- [ ] The founder has been shown **where to look** and **what red vs green means.**

## 9. Handing the dashboards to the founder

The founder should leave launch able to answer, by glancing at a dashboard:
- *Is my app up right now?* (uptime)
- *Is anything breaking for customers?* (errors)
- *Are people actually using it, and where do they give up?* (analytics)

Give them the links, label what "healthy" looks like, and tell them exactly what to do if something is red.

## 10. Anti-patterns

- **Launching with no monitoring** → blind to breakage; the founder's exact historical problem. Wire all three pillars before go-live.
- **Logging secrets/PII** → a data leak inside your own logs. Scrub before logging.
- **Alert on everything** → noise drowns the real signal; alerts get ignored. Alert only on what needs a human.
- **Minified, context-free errors** → unfixable. Upload source maps; attach route/version/context.
- **Analytics that capture PII without consent** → privacy/legal risk. Use privacy-respecting analytics and honor consent.
- **A "health check" that returns OK while the DB is down** → false confidence. Check real dependencies.
