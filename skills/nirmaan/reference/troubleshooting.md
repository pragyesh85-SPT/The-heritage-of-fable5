# TROUBLESHOOTING — common problems, likely causes, and fixes

> **Consult when something is going wrong in the build or in production.** A fast index from symptom → likely cause → fix, drawn from the failures that hit AI-built products most. Each entry points to the standard that prevents it. For *process* problems (stuck fixes, full chats), see `playbook/common-scenarios.md`; for *deciding* what to do, see `reference/decision-trees.md`.

---

## Build-time problems

**"The app won't build / won't start."**
- Likely: a dependency version mismatch; a missing environment variable; a syntax/type error.
- Fix: read the actual error message (don't guess); check `.env` placeholders are set; ensure dependency versions are locked; fix the first error before the cascade. → `workflow/04-build.md`.

**"It worked, now a change broke something that used to work."**
- Likely: a regression; a shared piece changed; no test caught it.
- Fix: re-run the test suite; use git to see what changed; revert if needed; **add a regression test** for the broken behavior so it can't return. → `standards/testing.md` §7.

**"The AI keeps writing code that uses an API wrongly."**
- Likely: it's working from memory of an outdated API.
- Fix: **fetch the provider's current docs** (a docs tool/MCP if available); use the official SDK; re-test against test mode. → `stack/integration-recipes.md`.

**"I fixed it three times and it's still broken."**
- Likely: the context is polluted with failed attempts; the real cause hasn't been found.
- Fix: **two-strike rule** — stop patching, re-state the problem from first principles, try a different approach or a fresh session with a clean prompt; ask the founder if it's their decision. → `playbook/common-scenarios.md` §C, `reference/decision-trees.md` Tree 5.

---

## Data problems

**"Some records are garbage / half-empty / corrupted."**
- Likely: missing **server-side validation**; bad input got saved.
- Fix: add schema validation at the boundary; reject bad input; clean/migrate the bad rows. → `standards/reliability-and-edge-cases.md` §2.

**"We got two orders / the customer was charged twice."**
- Likely: a non-idempotent write + a double-submit or a retry.
- Fix: add an **idempotency key**; disable the button in-flight; enforce a uniqueness constraint at the database. → `stack/integration-recipes.md` Recipe 1.

**"Inventory went negative / two people bought the last item."**
- Likely: a read-modify-write **race condition**.
- Fix: use an atomic decrement or a transaction with the right constraints, not read-then-write. → `standards/reliability-and-edge-cases.md` §6.

**"The money numbers are slightly off."**
- Likely: money stored/computed as **floats**.
- Fix: use integer minor-units (paise/cents) or fixed decimal; define rounding rules. → `standards/data-and-backups.md` §4.

**"We lost data / a bad change wiped something."**
- Likely: no backups, or an unsafe destructive operation.
- Fix: restore from backup (you tested this, right?); going forward — automated tested backups, reversible migrations, guarded/soft deletes, `RECOVERY.md`. → `standards/data-and-backups.md`.

---

## Security problems

**"A secret/API key got committed to the repo."**
- Likely: it was put in the code instead of env.
- Fix: **rotate the key immediately** (deletion from a file doesn't un-leak history); move it to env/secrets; add a secret-scan before commits. → `standards/security.md` §1.

**"Someone accessed data that wasn't theirs."**
- Likely: missing per-object authorization (IDOR), or UI-only permission checks.
- Fix: enforce ownership/permission **on the server for every action and resource**; test by changing an ID. → `standards/security.md` §4.

**"The site shows a scary error page with code details to users."**
- Likely: debug/verbose errors enabled in production.
- Fix: generic message to users, full detail to the error tracker; turn off stack traces in production responses. → `standards/security.md` §9.

---

## Reliability / runtime problems

**"The app hangs / spins forever sometimes."**
- Likely: an external call with **no timeout**, or an infinite wait on a slow service.
- Fix: add timeouts to every external call; retry-with-backoff; show a clear error + retry on failure. → `standards/reliability-and-edge-cases.md` §4–5.

**"When [payment/WhatsApp/AI] is down, the whole feature breaks."**
- Likely: no graceful failure / no fallback; the external call is inline and blocking.
- Fix: wrap calls with timeout + fallback; move non-critical work (notifications) to background jobs so it never blocks the core action. → `stack/integration-recipes.md`.

**"Users see a blank/broken screen when there's no data or an error."**
- Likely: missing loading/empty/error states.
- Fix: implement the four states on every screen. → `standards/ux-and-accessibility.md` §3.

**"A 'paid' order has no payment / a fake payment got through."**
- Likely: trusting the client instead of a **signature-verified webhook**; not handling duplicates.
- Fix: confirm payment only via verified webhook; process idempotently; reconcile stuck pendings. → `stack/integration-recipes.md` Recipe 1.

---

## Production / operations problems

**"The site is down."**
- Fix: check the uptime monitor + error tracker for what failed; if it followed a deploy, **roll back** to the last good version first, then diagnose. Don't debug live while users suffer. → `workflow/06-deploy.md`, `playbook/common-scenarios.md` §F.

**"Errors spiked right after a deploy."**
- Likely: the new release introduced a bug.
- Fix: roll back; read the error tracker (releases are tagged); reproduce locally; write a failing test; fix; re-deploy. → `workflow/08-iterate-and-grow.md` §8.4.

**"We got a surprise bill."**
- Likely: an uncapped metered service (AI tokens, messages, compute) or unmonitored usage.
- Fix: add **hard caps** and billing/usage **alerts**; rate-limit expensive endpoints; right-size plans. → `standards/performance-and-cost.md` Part 2.

**"It's gotten really slow as data grew."**
- Likely: missing database indexes or N+1 queries; unpaginated lists; unoptimized images.
- Fix: index filtered/sorted columns; batch queries; paginate; optimize images — **after measuring** where the slowness is. → `standards/performance-and-cost.md` Part 1.

**"Notifications aren't arriving / customers got spammed with duplicates."**
- Likely: sending inline (lost on failure) or non-idempotent jobs (duplicates on retry).
- Fix: send via durable, idempotent background jobs with retries and delivery logging. → `stack/integration-recipes.md` Recipe 2.

---

## Process / continuity problems

**"A new chat doesn't know what the last one did."**
- Likely: state wasn't written to files, or `STATE.md` is stale.
- Fix: run the end-of-session ritual every time; keep `STATE.md` current; resume by reading it. → `workflow/07-continuity.md`.

**"The notes say it's done but the code says otherwise."**
- Rule: **the code wins.** Reconcile, fix the notes, continue from reality. → `workflow/00-bootstrap.md` §0.4.

**"Scope keeps growing and we never ship."**
- Fix: pin v1 out-of-scope; push additions to a post-launch phase; ship the solid core first. → `playbook/common-scenarios.md` §G, `workflow/08-iterate-and-grow.md`.

---

## How to use this guide

1. Match the **symptom**, confirm the **likely cause** against the actual evidence (error messages, logs, the tracker) — don't fix by guessing.
2. Apply the **fix**, then **re-verify** it worked (and add a regression test for bugs).
3. Open the linked standard to prevent the whole class of problem next time.

> Notice the pattern: nearly every entry traces back to a skipped piece of the "20%" — validation, idempotency, failure handling, server-side permissions, backups, or monitoring. Build those in from the start and most of this list never happens.
