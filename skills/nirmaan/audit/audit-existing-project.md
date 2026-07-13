# AUDIT — Rescuing and auditing an existing product

> **Use this when** the founder attaches Nirmaan to a codebase that **already exists and is breaking** (e.g. This Is Purest, or any of the three existing web apps). Your job: understand what the product *actually is*, find what's wrong, and give the founder an honest recommendation — **rebuild from scratch, or keep-and-fix** — then execute the approved path.
>
> **The founder's explicit ask:** "It will analyze everything and audit everything. What are the flaws? What's the concept of the product if it's multi-application? What's the persona/philosophy? Then suggest the best method to make it actually workable — should I rebuild all three apps, or continue by debugging/changing the codebase?" This file delivers exactly that.

---

## AUDIT.0 — Set up and stance

1. Initialize `.nirmaan-state/` (per `workflow/00-bootstrap.md` §0.3) if not present. Your findings get written here, not just spoken.
2. Adopt a **diagnostic, non-judgmental stance.** The founder built this with AI as a non-developer; it breaking is expected and is *why you're here.* Never condescend. The goal is a path forward, not a critique of the past.
3. **Read-only first.** In the reconnaissance and audit stages you **do not change code.** You observe, map, and diagnose. Changes come only after the founder approves a path.

---

## AUDIT.1 — Reconnaissance: what is this, actually?

Reverse-engineer the product from the code and any docs. Produce `.nirmaan-state/audit/recon.md`.

### A. Inventory
- **How many applications/surfaces** are here? (Customer app, admin panel, adviser panel, a worker, a marketing site?) List each, its folder, and its apparent purpose.
- **The stack in reality:** languages, frameworks, libraries, database, hosting hints (config files, lockfiles, env templates). Note versions and anything abandoned/outdated.
- **Entry points:** where each app starts; how they're served; how they talk to each other and to external services.
- **External services** referenced: payment, messaging, email, AI, analytics, storage.

### B. Reconstruct the concept (the founder asked for this)
From the routes, screens, data model, and copy, infer and write down:
- **What the product lets a user do** (the core action) — in one sentence.
- **The user(s) and roles** the code implies.
- **The relationship between the apps** if multi-application (e.g. "customer app places orders → admin panel manages them → adviser panel handles customer guidance; all share one database").
- **The data model** as it exists: the core entities and relationships.

### C. Reconstruct the persona / philosophy (the founder asked for this)
From naming, copy, design, and domain, infer the product's intended *feeling and philosophy* — e.g. "a premium, trust-driven desi-cow ghee D2C brand; the voice is pure, traditional, health-and-heritage oriented." State it, then **confirm with the founder**: "Here's the concept and the spirit I'm reading from the code — did I get your intent right?" This alignment is essential before recommending anything.

---

## AUDIT.2 — The audit: what's wrong and how bad

Now diagnose against the Nirmaan standards. Produce `.nirmaan-state/audit/findings.md`, organized by severity. For each finding: **what it is, where, why it matters (plain language), and the fix direction.**

Run the product through these lenses (consult the matching standards files):

### A. Does it run and work? (smoke test the reality)
- Can you build and run it locally? Record what breaks just trying.
- Walk the **core flow** (e.g. checkout). Where does it actually fail? Capture the exact failure.
- Look for the classic break causes below (AUDIT.3).

### B. Reliability & edge cases (`standards/reliability-and-edge-cases.md`)
- Is input **validated server-side**, or can bad/empty/huge input break it?
- Are loading/empty/error/no-permission states handled, or do users hit blank/broken screens?
- Double-submit / retries safe? Idempotency on orders/payments/webhooks?
- External calls wrapped with timeouts/retries/fallbacks, or do they hang/crash when a service is slow?

### C. Security (`standards/security.md`) — highest priority for a live store
- **Secrets in the code or committed to the repo?** (Extremely common; an immediate incident if so.)
- AuthZ enforced on the **server**, or only hidden in the UI (bypassable)?
- Injection exposure (SQL/NoSQL/command/script)? Inputs parameterized/escaped?
- Webhooks verifying signatures? Sensitive data in logs?
- For an e-commerce app: is card data ever touched/stored (should never be)?

### D. Data safety (`standards/data-and-backups.md`)
- Are there **backups**? Could orders/users be lost?
- Are schema changes done via reversible migrations, or ad-hoc and dangerous?
- Any destructive operations without guards?

### E. Observability (`standards/observability.md`)
- Any error tracking / uptime / analytics at all? (Usually none — which is why the founder "finds out when it's already broken.")

### F. Production-readiness & quality (`standards/production-readiness.md`, code-quality in `04-build.md`)
- Deploy: reproducible, or a manual hero act?
- Code health: gigantic files, duplicated logic, dead code, no tests, risky/abandoned dependencies?
- The "missing 20%" overall: how much of the breakage traces to skipped validation/error-handling/tests?

### G. Architecture sanity
- Is the multi-app split coherent, or are responsibilities tangled?
- Shared database vs duplicated data? Consistent conventions across the three apps, or three different styles?

Severity tiers for `findings.md`:
- 🔴 **Critical** — security holes, data-loss risk, the core flow broken, secrets leaked. Fix-or-rebuild before real use.
- 🟠 **Major** — frequent breakage, missing validation/error handling on key flows, no monitoring/backups.
- 🟡 **Minor** — quality, polish, small UX gaps, optional improvements.

---

## AUDIT.3 — The usual suspects (what breaks AI-built apps)

Check these specifically — they cause most non-developer-built breakage:

1. **No server-side validation** → garbage/empty input crashes things or corrupts data.
2. **Happy-path-only** → any deviation (failed payment, slow network, empty list) shows a blank/broken screen.
3. **UI-only permission checks** → anyone can hit the API directly and do forbidden things.
4. **Secrets committed** → keys in the repo or in the frontend bundle.
5. **Non-idempotent writes** → double-submits create duplicate orders/charges.
6. **Unhandled external failures** → when the gateway/WhatsApp/AI is slow or down, the app hangs or crashes.
7. **No migrations / unsafe data changes** → schema drift, data loss.
8. **No tests** → every change silently breaks something else.
9. **No monitoring** → breakage is invisible until a customer complains.
10. **Manual deploys** → each deploy risks a new break; no rollback.
11. **Outdated/abandoned dependencies** → known vulnerabilities, sudden incompatibilities.
12. **Tangled multi-app coupling** → a change in one app unexpectedly breaks another.

---

## AUDIT.4 — The decision: rebuild vs. keep-and-fix (the founder's core question)

This is the judgment the founder is paying you for. Decide per-application (the answer can differ across the three apps), using these signals.

**Lean toward KEEP-AND-FIX when:**
- The core concept and data model are sound; breakage is mostly the missing 20% (validation, error handling, tests, monitoring) bolt-on-able without rewriting everything.
- The stack is reasonable and current.
- There's meaningful working functionality worth preserving.
- Findings are mostly 🟠/🟡, with 🔴s that are contained and fixable.

**Lean toward REBUILD (from scratch, on the Nirmaan stack) when:**
- Architecture is fundamentally tangled; fixes keep breaking other things.
- The stack is outdated/abandoned or wrong for the need.
- Security/data foundations are broken at the root (e.g. auth/payments hand-rolled, no migrations, data model can't support the product).
- The cost to fix approaches or exceeds the cost to rebuild cleanly — and a rebuild would be markedly more reliable and maintainable.
- 🔴 findings are pervasive and structural.

**Often the right answer is a HYBRID**, and you should say so when true:
- Keep the parts that are sound (e.g. the marketing site, the data the founder can't lose) and **rebuild the broken core** (e.g. checkout) cleanly.
- Or: **strangle-fig** approach — stand up a clean new app alongside, migrate flows one at a time, retire the old. Lower risk than a big-bang rewrite, preserves what works.

### Present the recommendation to the founder (plain language)

Produce a short, honest recommendation doc and walk the founder through it:

```markdown
## What I found, and what I recommend (plain version)

### What your product is
[The concept + persona you confirmed in AUDIT.1, restated.]

### The honest state
- It [works partially / breaks at the core flow] because of [the missing 20%: validation, error handling, no monitoring, etc.] — not because your idea is wrong.
- The most serious issues: [1–3 critical items in plain words, e.g. "API keys are exposed in the code — anyone could find them; this must be fixed immediately."]

### My recommendation (per app)
- **Customer app:** [Keep-and-fix / Rebuild / Hybrid] — because [reason in plain words].
- **Admin panel:** [...]
- **Adviser panel:** [...]

### Why this path (not the other)
[Plain trade-off: time, cost, risk, reliability. "Fixing the customer app would take longer than rebuilding it cleanly because its foundations are tangled; but your admin panel is sound and just needs the safety pieces added."]

### What it would take, roughly
[Honest ranges in sessions/days. What I'd need from you and when.]

### The very first thing, regardless of path
[Usually: rotate any leaked secrets + add monitoring, so we stop the bleeding and can see what's happening — this week.]
```

Then ask: **"Which path do you want for each app?"** Record the decision in `DECISIONS.md`.

---

## AUDIT.5 — Executing the approved path

- **If KEEP-AND-FIX:** create a phased plan (like `workflow/02-planning.md`) where the phases are *remediations* ordered by severity — 🔴 first (security/data/core flow), then 🟠 (reliability, monitoring, tests), then 🟡. Apply the same Build → Verify loop and standards as a new build. Add tests *around* existing behavior before refactoring it, so you don't break what works.
- **If REBUILD:** run the full new-build workflow from `workflow/01-discovery.md` (you already have most of Discovery from recon — confirm and fill gaps), reusing the confirmed concept/persona and salvageable assets (content, designs, data). Migrate the data the founder must keep.
- **If HYBRID:** plan the keep vs rebuild boundary explicitly; if using strangle-fig, route flow-by-flow and keep both running until cutover.

In all cases: **stop the bleeding first.** Before deep work, handle anything 🔴 that endangers real users or data right now (rotate leaked secrets, take a backup, add monitoring).

---

## AUDIT.6 — Output of the audit

- `.nirmaan-state/audit/recon.md` (what the product is, concept, persona, architecture).
- `.nirmaan-state/audit/findings.md` (flaws by severity, each with location + plain-language impact + fix direction).
- Recommendation presented and a **path chosen per app**, recorded in `DECISIONS.md`.
- `STATE.md` updated to reflect the chosen path and the first remediation/build phase.
- The bleeding stopped (any live-critical 🔴 handled or scheduled immediately).

Then proceed into the relevant workflow (planning + build, or rebuild) under the normal Nirmaan standards.

---

## AUDIT.7 — Anti-patterns

- **Judging the founder** for a broken app → never. Diagnose and chart a path; they hired AI as a non-developer, which is the whole point.
- **Changing code during recon/audit** → you'll lose the diagnosis and risk new breakage. Read-only until a path is approved.
- **Big-bang rewrite by reflex** → often riskier and slower than targeted fixes or a hybrid. Choose per app, on evidence.
- **Skipping concept/persona confirmation** → you might fix the wrong product. Confirm intent first.
- **Not stopping the bleeding** → leaving leaked secrets or data-loss risk in place while planning. Handle live-critical 🔴 immediately.
- **Recommending without honest cost/risk** → the founder can't choose well. Give plain trade-offs and ranges.
