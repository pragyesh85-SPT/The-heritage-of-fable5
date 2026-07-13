# 06 · DEPLOY — Credentials, go-live, and the first hours after

> **Goal:** put the verified product into production safely, get the exact credentials/permissions you need from the founder (and nothing more), confirm it actually works for real users, and confirm you can *see* its health. This is **Founder Checkpoint #3** (credentials).
>
> **Principle:** deployment must be **reproducible** (Law 8) — one documented pipeline, no manual steps a human has to remember. If go-live is a hero act performed once by hand, it will break on the next change.

---

## 6.1 Pre-deploy gate

Do not begin until:
- Release Verify passed with 0 must-fix (`workflow/05-verify.md` §5.7).
- Observability is wired (error tracking + uptime + analytics) — confirm it's ready to receive production data.
- Backups are configured for anything that must never be lost (`standards/data-and-backups.md`).
- The deploy skeleton built in Phase 0 still deploys cleanly.

---

## 6.2 The credential request (how to ask the founder)

The founder hands over accounts/keys at this point — your job is to make it **a clear, exact, numbered list**, in plain language, requesting the **minimum** needed. For each item, say *what it is, why it's needed, where to get it, and exactly what to paste where.*

Template:

```markdown
## To go live, I need these from you (one-time)

1. **Hosting** — [a server / a managed host account]
   - Why: this is where your app runs so the world can reach it.
   - Get it: sign up at [provider]; the smallest plan (~₹[X]/month) is enough to start.
   - Give me: [the access method] — paste it here, or follow these 3 steps to connect it.

2. **Domain** (optional for launch) — e.g. yourbrand.com
   - Why: a professional address instead of a random URL.
   - Get it: buy at [registrar].
   - Give me: the domain name; I'll set up the rest.

3. **Payments** — [Razorpay] account
   - Why: to accept UPI/cards.
   - Get it: create a [Razorpay] account and complete their verification.
   - Give me: the **API keys** from their dashboard (Settings → API Keys). Paste them here; I'll store them safely as environment secrets — they never go in the code.

4. **Notifications** — [email/WhatsApp provider] account
   - Why: order confirmations and alerts.
   - Get it: [provider].
   - Give me: the API key.

I will store every key as an **environment secret**, never in the code or the repo. I only need the minimum above — if you're unsure about any step, I'll walk you through it screen by screen.
```

**Credential hygiene (your obligations):**
- Store **only** in environment variables / the platform's secrets manager. **Never** in code, never committed, never echoed back in chat or logs.
- Request the **least privilege** that works (e.g. a restricted API key, not an account-admin key, where the provider allows).
- Use **test/sandbox** credentials during Build; switch to live keys only here.
- If the founder pastes a secret into chat, use it, store it correctly, and remind them they can rotate it anytime; do not repeat it back.
- Never ask for credentials you don't need.

---

## 6.3 The deploy pipeline (reproducible)

Set up a **one-command / one-push** deploy:

1. **Build** the app in a clean, reproducible way (locked dependency versions).
2. **Run the automated tests** as a gate — a failing test blocks the deploy.
3. **Run database migrations** safely (reversible; backup first).
4. **Deploy** to the host (push-to-deploy or a single command/CI pipeline).
5. **Health check** automatically post-deploy; roll back on failure.

Document this in the repo (`DEPLOY.md` in the project) so any future session repeats it identically. No undocumented manual steps.

---

## 6.4 Go-live sequence

1. **Provision** hosting and configure environment secrets from §6.2.
2. **Connect the domain** and confirm **HTTPS** is active (no insecure HTTP).
3. **Run migrations** against the production database (after a backup).
4. **Deploy** via the pipeline.
5. **Switch payments/notifications to live keys.**
6. **Smoke test in production** (next section).
7. **Confirm monitoring** is receiving data.
8. **Tell the founder it's live**, with the URL and how to watch its health.

---

## 6.5 Production smoke test (prove it works for real)

Immediately after go-live, *you* perform a real run-through on the live site and confirm:

- [ ] The site loads over HTTPS; no certificate warnings.
- [ ] Sign up + log in works with a real account.
- [ ] The **core flow** works end to end with **live** services (e.g. a real small test payment, then refund it).
- [ ] A confirmation notification (email/WhatsApp) actually arrives.
- [ ] The admin/other-role surfaces work.
- [ ] A deliberately wrong action shows the right error (validation still works in prod).
- [ ] Errors show up in the error tracker; the uptime monitor reports "up"; an analytics event registered.
- [ ] Mobile: it works on a phone (your founder's users are often mobile-first).

Record the smoke-test result in `STATE.md`. If anything fails, **roll back** (or fix-forward if trivial and safe) before announcing launch.

---

## 6.6 The first hours and days after launch

- **Watch the dashboards** you set up. Tell the founder exactly where to look and what "healthy" vs "problem" looks like.
- **Set up alerts** so the founder (and you, on the next session) learn of downtime or error spikes automatically — not from a customer complaint.
- **Have a rollback ready.** If a serious problem appears, the documented pipeline lets you revert to the last good version quickly.
- **Capture a post-launch task list** in `phases.md` for the known-limitations and the first round of real-user feedback.

---

## 6.7 Handing the keys of the kingdom to the founder (plainly)

The founder should leave launch knowing, in plain words:
- **The URL**, and that it's live and secure.
- **Where to see health** (the monitoring dashboards) and what to do if something's red ("message me / start a new session and say 'production issue'").
- **What it costs** per month now, and what would change that.
- **What's live vs known-limitations** to improve next.
- That their **credentials are stored safely** and can be rotated anytime.

---

## 6.8 Output of this phase

- Product **live in production**, over HTTPS, with real services.
- Reproducible deploy pipeline documented (`DEPLOY.md`).
- Production smoke test passed and recorded.
- Monitoring confirmed live; alerts configured; backups confirmed.
- `STATE.md` updated: status = LIVE; launch date; post-launch tasks queued.
- End-of-Session Ritual run; handoff written for the next session.

---

## 6.9 Anti-patterns

- **Manual, undocumented deploys** → unrepeatable; break on the next change. Automate and document.
- **Storing secrets in code or repeating them in chat** → leaks. Env secrets only; least privilege.
- **Requesting more access than needed** → risk to the founder. Ask for the minimum.
- **Skipping the production smoke test** → "it worked locally" is not "it works live." Prove it on the real site with real services.
- **Launching without monitoring** → you're blind to breakage. Wire observability before go-live.
- **No rollback plan** → a bad deploy becomes an outage. Keep the last good version one command away.
