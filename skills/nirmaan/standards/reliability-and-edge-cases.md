# STANDARD · Reliability & Edge Cases — the catalogue of how things break

> **Consult during Build (for every feature) and Verify.** This is the field guide to the invisible 20% — the specific ways software breaks for real users, and exactly how to prevent each. The founder's previous builds broke because most of this was missing. Treat it as the reliability bible.

---

## 1. The mental model: assume hostility and failure

Two assumptions make software reliable:

1. **Every input is hostile** until validated — users fat-finger, paste garbage, attackers probe, and integrations send malformed data.
2. **Everything fails eventually** — networks drop, services go down, disks fill, two users collide. Design for failure as the normal case, not the exception.

If you build with these two assumptions baked into every feature, you eliminate the majority of production breakage.

---

## 2. Input edge cases (and how to handle each)

For every input field, parameter, upload, and payload, handle:

| Edge case | What happens if ignored | Handle by |
|-----------|------------------------|-----------|
| **Empty / missing** | Crash or corrupt record | Required-field validation; clear error |
| **Wrong type** (text where number expected) | Crash or NaN | Schema type-check; reject with message |
| **Too long / too large** | Memory blow-up, DB error, slow | Max-length / max-size limits |
| **Too small / negative / zero** | Bad math (e.g. negative quantity) | Min/range checks |
| **Wrong format** (email, phone, date) | Downstream failures | Format validation |
| **Unexpected characters / emoji / unicode** | Encoding bugs, injection | Accept unicode safely; escape on output |
| **Injection payloads** (`'; DROP`, `<script>`) | DB wiped, XSS | Parameterized queries; output escaping; CSP |
| **Leading/trailing whitespace** | Duplicate/non-matching records | Trim where appropriate |
| **Duplicate submission** | Two orders, double charge | Idempotency + disable-in-flight |
| **Out-of-range enum** (status the UI never offers) | Invalid state | Allow-list of valid values |
| **Null vs empty vs zero** confusion | Wrong logic | Be explicit about which means what |

**Rule:** validate **server-side** with a schema. Browser validation improves UX but is trivially bypassed; the server is the only place safety is real.

---

## 3. State edge cases (every screen, every list)

For every screen and data view, design these states explicitly — never assume "there's always data and it always loads":

- **Loading** — show a skeleton/spinner; never a frozen blank or a flash of broken layout.
- **Empty** — a helpful "nothing here yet" with a next action; not a broken grid.
- **Partial** — some data loaded, some failed; show what you have + a clear note on the rest.
- **Error** — a human message + retry; never a raw stack trace or a white screen.
- **No permission** — "you don't have access" cleanly; not a half-rendered page or crash.
- **Stale** — data changed elsewhere; refresh or warn rather than acting on stale data.
- **Very large** — 10,000 items: paginate / virtualize; don't render or fetch all at once.
- **Very small** — one item, zero items: layouts must not assume plurality.

---

## 4. Network & timing edge cases

- **Slow network:** every request has a **timeout**; show progress; allow cancel/retry. No infinite spinners.
- **Dropped connection mid-action:** the operation is safe to retry (idempotent) or clearly failed-and-recoverable.
- **Out-of-order responses:** ignore stale responses (e.g. the user typed more since this search fired).
- **Double-click / rapid taps:** disable the control while in-flight; debounce/throttle as needed.
- **Race conditions:** two requests changing the same thing — use transactions, optimistic concurrency, or locks; define who wins.
- **Retries:** use **exponential backoff with jitter**; cap attempts; don't hammer a struggling service.
- **Clock/timezone:** store timestamps in UTC; convert for display; never assume the user's timezone equals the server's.

---

## 5. External-dependency failure (the top breakage source)

For **every** call to a payment gateway, messaging API, email, AI model, telephony, storage, or any third party:

1. **Timeout** every call (don't wait forever).
2. **Retry** transient failures with backoff; **don't** retry non-idempotent calls without an idempotency key.
3. **Fallback or degrade gracefully** — if the AI is down, queue or show a clear message; if email fails, retry later and don't block the order.
4. **Circuit-break** repeated failures so one sick dependency doesn't cascade.
5. **Verify inbound** (webhooks): check signatures; treat payloads as hostile; handle duplicates (idempotent processing).
6. **Never let an external failure corrupt your data** — wrap multi-step operations so a failure leaves a known state, not a half-written one.
7. **Surface the failure** to the error tracker with context (which call, what failed), minus secrets.

**Worked example — payment:**
- Start order in `pending`. Call gateway with an **idempotency key**. On success webhook (signature-verified) → `paid`. On failure → `failed`, show retry. On timeout/no-webhook → leave `pending`, reconcile via a scheduled check; never mark `paid` without confirmation. A double-submit reuses the idempotency key → no double charge.

---

## 6. Concurrency & data-consistency edge cases

- **Two users edit the same record:** last-write-wins silently loses data — instead detect the conflict (version field) and handle it.
- **Inventory / limited resource:** check-then-act races (two buyers, one item) — use atomic decrements or transactions, not read-modify-write.
- **Counters / balances:** never compute from a stale read; update atomically.
- **Money:** use a ledger/transaction pattern; never mutate a balance with a naive read-add-write.

---

## 7. Lifecycle & boundary edge cases

- **First run / brand-new account:** everything empty — must still render and guide.
- **Deletion:** what happens to related data when a user/product/order is deleted? Define cascade vs soft-delete; prevent orphans and dangling references.
- **Account in a weird state:** unverified, suspended, mid-onboarding — handle each.
- **Migration of existing data:** when the schema changes, old rows must still work or be migrated.
- **Limits & quotas:** what happens at the free-tier ceiling of a service? Handle the "quota exceeded" response.
- **Pagination boundaries:** page beyond the last; empty page; changing data while paging.

---

## 8. Defensive coding patterns (apply throughout)

- **Fail fast and loud in development; fail safe and graceful in production.** Don't swallow errors silently anywhere.
- **Guard clauses** at the top of functions for invalid states; return early with clear errors.
- **Never trust client-sent identity, prices, totals, or roles** — recompute/verify on the server.
- **Make illegal states unrepresentable** where possible (types/enums that can't hold a bad value).
- **Idempotency keys** on anything that creates or charges.
- **Transactions** around multi-write operations so they're all-or-nothing.
- **Timeouts and limits everywhere** — requests, loops, queue sizes, payload sizes.
- **Log decisions and failures** with enough context to debug, never with secrets.

---

## 9. The per-feature reliability checklist (run while building each feature)

- [ ] Inputs validated server-side with a schema; bad input → clear error.
- [ ] Loading / empty / error / no-permission states implemented.
- [ ] Double-submit and retries are safe (idempotent; control disabled in-flight).
- [ ] External calls have timeout + retry-with-backoff + graceful failure.
- [ ] Multi-step writes are transactional / leave a recoverable state on failure.
- [ ] Permissions enforced on the server.
- [ ] Errors reported to the tracker (no secrets); key action emits an analytics event.
- [ ] At least one failure path tested, not just the happy path.

> If you can't tick all eight for a feature, it is **not done** — no matter how good the happy path looks. This checklist is the difference between the founder's old broken builds and reliable software.

---

## 10. Anti-patterns

- **Validating only in the browser** → bypassed in seconds; the #1 corruption source.
- **Happy-path-only screens** → blank/broken UI the moment data is empty or a call fails.
- **Swallowing errors** (`catch {}` that does nothing) → invisible failures, impossible debugging.
- **No timeouts** → one slow dependency hangs the whole app.
- **Naive read-modify-write on shared data** → lost updates, oversold inventory, wrong balances.
- **Marking success before confirmation** (e.g. `paid` before the webhook) → phantom orders, money mismatches.
- **Ignoring duplicates on webhooks** → double-processing.
- **Assuming the network is fast and reliable** → it isn't; design for slow and flaky.
