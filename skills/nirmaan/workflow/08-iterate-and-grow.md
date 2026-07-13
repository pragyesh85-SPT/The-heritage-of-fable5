# 08 · ITERATE & GROW — what happens after launch

> **Read this once the product is LIVE.** Building and launching is the start, not the finish. This phase is the loop that turns a launched product into a *used* one: watch real users, fix what hurts, add what's needed, and resist building features nobody asked for. It runs indefinitely, in short cycles, across many sessions — using the same memory and standards as the build.
>
> **The discipline this phase enforces (and the founder's own recurring lesson):** *get real users and learn from them before building more.* The biggest risk after launch is not too few features — it's building more features into a product almost nobody uses yet. This phase keeps the focus on real usage.

---

## 8.1 The post-launch loop

```
   OBSERVE real usage ──► LEARN what's working / where users struggle / what breaks
        ▲                          │
        │                          ▼
   SHIP small, verified ◄──── DECIDE the single most valuable next change
        change                     │
        └──────────────────────────┘
```

Each turn of the loop is small and verified — never a big-bang "v2." Every change still goes through Build → Verify before it reaches the live product. Update `STATE.md` and `DECISIONS.md` each cycle, exactly as during the build.

---

## 8.2 OBSERVE — let the data and users talk

Use the observability you wired before launch (`standards/observability.md`):

- **Errors** (Sentry): what's actually breaking for real users, and how often. Fix high-frequency/high-impact errors first.
- **Uptime**: is it staying up? Any recurring downtime or slow periods?
- **Analytics** (PostHog): where do users drop off in the core flow? What do they actually use vs ignore? Where do they get stuck?
- **Direct feedback**: what are users (and the founder's team, e.g. advisers handling customers) actually saying? Complaints are gold — they point straight at what to fix.
- **Cost/usage**: is anything trending toward a bill spike?

Summarize for the founder in plain language each cycle:
> "Since launch: 120 people signed up, 80 completed the core action. The biggest drop-off is at [step] — 30 people start it and stop. Two errors are hitting a handful of users on [screen]. Nothing's down. Here's what I'd fix first."

---

## 8.3 LEARN & DECIDE — pick the one most valuable change

From what you observed, choose the **single highest-value next change.** Prioritize in this order:

1. **🔴 Breakage real users are hitting** — errors, failures, anything blocking the core action. Always first.
2. **🟠 Friction in the core flow** — the biggest drop-off point; the thing making the product hard to actually use. (This is usually higher value than any new feature.)
3. **🟠 Top user-requested fixes/improvements** that serve the core purpose.
4. **🟡 New features** — only once the product is genuinely usable, used, and the core flow is smooth. And only features that real usage or users justify, not speculative ones.

Resist the pull to build the exciting new thing while the core experience still leaks users. State the trade-off to the founder plainly and recommend the highest-value item; let them decide.

---

## 8.4 SHIP — change a live product safely

Changing a product that **real users now depend on** demands more care than the initial build:

- **Small, isolated changes** — one coherent change per cycle, easy to verify and to roll back. Avoid sweeping refactors on a live product unless there's a real reason.
- **Full Build → Verify** still applies — validation, tests, the 20%. A "quick fix" shipped unverified is how live products break.
- **Add a regression test** for every bug you fix so it can't return.
- **Backup before data/schema changes**; use reversible migrations; use the expand→contract pattern so the live app never breaks mid-deploy (`standards/data-and-backups.md` §1).
- **Deploy via the reproducible pipeline** with a rollback ready (`workflow/06-deploy.md`).
- **Watch the dashboards right after each deploy** — confirm errors didn't spike and the change works in production (a mini smoke test).
- **Don't break existing users** — preserve their data and flows; if behavior changes meaningfully, communicate it.

---

## 8.5 Growing the product over time (without bloating it)

As real demand appears, the product grows — handled as normal Nirmaan phases appended to `phases.md`:

- **New features** get the full treatment: discovery (what exactly, for whom, edge cases) → plan → build with the 20% → verify → ship. A feature added carelessly to a live product is a new source of breakage.
- **Keep it simple as it grows** — resist accumulating half-used features and complexity. Each addition is a maintenance and breakage cost forever. The simplest product that serves users wins.
- **Revisit the stack only when a real limit is hit** — not for novelty. Record any change and its reason in `DECISIONS.md`.
- **Scale when usage demands it** — add caching, indexes, bigger plans, or background processing in response to measured load, not preemptively (`standards/performance-and-cost.md`).
- **Watch costs as you grow** — more users means more spend; keep the caps and alerts current.

---

## 8.6 Keeping a live product healthy (ongoing hygiene)

- **Dependencies**: keep them reasonably current; apply security updates; re-scan periodically (`standards/security.md` §7).
- **Backups**: confirm they're still running and still restore (re-test occasionally).
- **Monitoring**: keep alerts tuned and pointed where the founder will see them; add monitoring for new critical flows.
- **Tech debt**: when a part keeps causing bugs, schedule a focused cleanup (with tests around it first) rather than patching endlessly.
- **Documentation**: keep `STATE.md`, `DECISIONS.md`, `DEPLOY.md`, and `RECOVERY.md` current so any future session (or teammate) stays oriented.

---

## 8.7 The founder's role after launch

Largely unchanged, just lighter and recurring:
- **Read the plain-language usage summary** each cycle and pick priorities (or let the agent recommend).
- **Approve** anything that costs money or changes a business rule.
- **Carry context** between sessions via the handoff, same as during the build.
- **Bring real user feedback** to the agent — what customers/advisers are saying is the most valuable input of all.

---

## 8.8 Output of each iteration cycle

- A plain-language usage summary delivered to the founder.
- The one highest-value change shipped, verified, and confirmed in production.
- A regression test for any bug fixed.
- `STATE.md` / `DECISIONS.md` / `phases.md` updated; handoff written.
- Costs and monitoring still healthy.

---

## 8.9 Anti-patterns

- **Building features while the core flow still leaks users** → polishing a product nobody finished using. Fix the core experience first.
- **Shipping "quick fixes" to a live product unverified** → breaks the thing real users now depend on. Full Build→Verify, always.
- **Big-bang "v2" rewrites of a working product** → high risk, often unnecessary. Iterate in small, safe steps.
- **Ignoring the dashboards** → you stop learning from real usage; problems hide. Observe every cycle.
- **Letting features and complexity pile up** → an unmaintainable, bug-prone product. Add deliberately; keep it simple.
- **Forgetting cost as usage grows** → a surprise bill at scale. Keep caps and alerts current.
- **Letting backups/dependencies/monitoring rot** → a healthy launch decays into a fragile mess. Keep up the hygiene.
