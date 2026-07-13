# STANDARD · Performance & Cost — fast enough, cheap enough

> **Consult during Build (don't build in slowness) and Verify.** Two things a lean founder cares about: the product feels fast for real users (often on phones and patchy connections), and it doesn't quietly run up a bill. This standard keeps both in check — without premature over-optimization, which is its own trap.
>
> Tier key: 🔴 must-have · 🟠 strongly expected · 🟡 optimize when it matters.

---

## Part 1 — Performance

### 1. The principle: fast where it counts, don't gold-plate

- Optimize the **hot paths** — the core flow and the screens users hit most. Don't waste effort speeding up a once-a-month admin export.
- **Measure before optimizing.** Guessing at bottlenecks wastes time and adds complexity. Use the observability tools to find what's actually slow.
- **Avoid premature optimization** — it's a top source of needless complexity and bugs (Law: simplest thing that works). Make it correct and clear first; speed it up where measurement shows a real problem.

### 2. Backend & database performance

- 🔴 **No N+1 queries on the hot path** — don't run one query per item in a loop; fetch in a batch/join.
- 🔴 **Index the columns you filter and sort by** (e.g. user_id, status, created_at). A missing index turns fast into unusably slow as data grows.
- 🟠 **Paginate** large lists — never load thousands of rows at once (server and client).
- 🟠 Keep payloads lean — return only the fields the screen needs.
- 🟠 Move slow work **off the request** — generate reports/send emails in background jobs, not while the user waits.
- 🟡 **Cache** expensive, rarely-changing data (e.g. the tithi calendar, a product catalog) — but only after it's a measured need; invalidate sensibly.

### 3. Frontend performance (matters most on phones)

- 🔴 **Optimize images** — correctly sized, compressed, modern formats, lazy-loaded. Unoptimized images are the #1 slowdown on mobile.
- 🟠 Keep the **JavaScript bundle** reasonable — don't ship huge libraries for small needs; split/defer non-critical code.
- 🟠 Show a **skeleton/loading** state so the app feels alive while data loads (perceived speed).
- 🟠 Avoid layout shift (reserve space for images/content so the page doesn't jump).
- 🟡 Preload/prefetch the likely next step; use a CDN for static assets.

### 4. Perceived performance

- Immediate feedback on every action (a tap does *something* at once) often matters more than raw speed — see `standards/ux-and-accessibility.md` §5.
- Optimistic UI where safe makes things *feel* instant.

### 5. Performance check (in Verify)

- [ ] The core flow feels fast on a phone on a normal connection.
- [ ] No N+1 on hot paths; key queries indexed.
- [ ] Large lists paginated; payloads lean.
- [ ] Images optimized + lazy-loaded; bundle not bloated.
- [ ] Slow work runs in background jobs, not in the request.
- [ ] Loading states present; no jarring layout shift.

---

## Part 2 — Cost control (the founder is bootstrapping)

### 6. The principle: lean by default, know what you spend

- Prefer **free tiers, open-source, and self-hostable** that scale up later, over expensive managed convenience (echoes `stack/default-stack.md`).
- **Know the cost of every service** before committing, and flag anything that will charge money as a checkpoint item for the founder.
- **No surprise bills** — set up awareness/alerts so a runaway doesn't quietly rack up charges.

### 7. Where costs hide (watch these)

- 🟠 **AI / LLM tokens** — the most common runaway. Cap usage; cache repeated calls; route simple tasks to cheaper/smaller (or local) models; monitor spend. Never leave an AI loop uncapped.
- 🟠 **Telephony / SMS / WhatsApp** — per-minute/per-message; cap and monitor (especially voice agents).
- 🟠 **Bandwidth / egress** — large media and high traffic on metered hosts; use a CDN, compress assets.
- 🟠 **Database / storage growth** — clean up unused data; right-size; watch backup storage.
- 🟠 **Per-seat / per-MAU pricing** on managed services — understand the curve before it bites.
- 🟡 **Idle paid resources** — don't leave paid servers/services running unused.

### 8. Cost-control tactics

- 🔴 **Hard caps** on anything metered that an attacker or a bug could run up (AI tokens, outbound messages, compute). A loop without a cap is a financial incident waiting to happen.
- 🟠 **Usage monitoring + alerts** so the founder sees spend trends and is warned before a threshold.
- 🟠 **Rate-limit** public and expensive endpoints (also a security measure).
- 🟠 **Right-size**: start on the smallest plan that works; scale when real usage demands, not preemptively.
- 🟡 Cache and batch to reduce per-call costs; reserve/commit pricing only once usage is proven and steady.

### 9. Cost check (before launch and periodically)

- [ ] Every paid service's cost at expected scale is known and within budget.
- [ ] Metered things (AI tokens, messages, compute) have hard caps.
- [ ] Usage/billing alerts are set so there are no surprises.
- [ ] Expensive endpoints are rate-limited.
- [ ] Running on appropriately small plans; no idle paid resources.
- [ ] The founder has been told, in plain terms, what it costs now and what would change that.

### 10. Plain-language framing for the founder

> "Right now it costs about ₹[X]/month and that's mostly [hosting]. The one thing that could spike is the AI usage, so I've put a hard limit on it and set an alert — you'll never get a surprise bill. As you grow, the cost goes up gradually, and I'll tell you before any change matters."

---

## Anti-patterns

- **Premature optimization** → needless complexity and bugs before there's a real performance problem. Measure first.
- **Missing indexes / N+1 queries** → fine in a demo, unusably slow with real data. Index and batch the hot paths.
- **Unoptimized images / bloated bundles** → slow, frustrating mobile experience. Optimize and split.
- **Uncapped AI/messaging/compute** → a bug or abuse becomes a huge bill. Hard caps + alerts, always.
- **Choosing expensive managed services by reflex** → drains a lean budget. Prefer cheap/open/self-hostable that scales.
- **No billing awareness** → surprise charges erode trust and runway. Monitor and alert.
