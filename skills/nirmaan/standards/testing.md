# STANDARD · Testing — catch breakage before users do

> **Consult during Build (write tests as you build) and Verify.** Tests are how "it works" stops being a hope and becomes a fact you can re-check on every change. For a lean founder, the goal is **not** 100% coverage — it's **confidence on the flows that matter**, cheaply maintained.

---

## 1. The testing philosophy for a lean product

- **Test the things that hurt when they break:** the core flow, money/irreversible actions, auth, and anything a customer touches daily.
- **Don't test trivia:** chasing 100% coverage wastes effort and produces brittle tests. Aim for *meaningful* coverage of *important* behavior.
- **A test for every bug:** when you fix a bug, add a test that would have caught it. This is the highest-value testing you can do — it stops regressions permanently.
- **Tests are a gate, not a formality:** they run in the deploy pipeline; a failing test blocks the deploy.
- **Tests are also documentation** of how the system is supposed to behave — keep them readable.

---

## 2. The test pyramid (how much of each)

```
        /\        End-to-end (E2E)  — few, high-value: the core flow through the real UI
       /  \       Integration       — some: API + DB + a feature working together
      /----\      Unit              — many, fast: pure logic, validation, calculations
     /______\
```

- **Unit (many, fast):** test pure functions — validation rules, price/total calculations, date logic, state transitions, formatting. Cheap to write, fast to run, catch logic bugs early.
- **Integration (some):** test a feature across layers — an API endpoint that validates input, writes to the DB, and returns the right thing; permission checks; error responses.
- **E2E (few, precious):** drive the **real app in a browser** through the critical journeys — signup → login → core action (e.g. checkout) → confirmation. These are slower and more brittle, so keep them to the few journeys that define the product.

---

## 3. What MUST have tests (non-negotiable)

- 🔴 The **core flow**, end-to-end, happy path **and** at least one failure path (e.g. checkout success + payment-declined).
- 🔴 **Money / irreversible actions** — charges, refunds, deletions, transfers — including the failure and double-submit cases.
- 🔴 **Auth** — signup, login, logout, and that a protected action is **denied** without permission.
- 🔴 **Input validation** on the core entities — that bad/empty/oversized input is rejected.
- 🟠 Each **secondary feature's** main behavior.
- 🟠 **Idempotency** — a repeated request doesn't double-create/charge.
- 🟠 **Webhook handling** — valid signature accepted, invalid rejected, duplicate ignored.

---

## 4. What to test for each feature (the per-feature test set)

When you build a feature, write tests covering:

- **Happy path:** the normal successful case.
- **Validation:** empty, wrong-type, too-long, out-of-range, malformed → all rejected with clear errors.
- **Permission:** allowed user succeeds; disallowed user is denied (server-side).
- **Failure:** the external dependency fails/times out → graceful handling, recoverable state.
- **Edge:** empty list, single item, large list, boundary values.
- **Idempotency:** double-submit/retry is safe (where the action creates/charges).

---

## 5. Practical guidance

- **Write the test close to building the feature**, not "later." Later, the context is gone and regressions have already crept in.
- **Make tests deterministic** — no reliance on real time, real network, or real third-party services. Use fakes/mocks for externals; use a test database; freeze time where needed; use generated fake data for realism.
- **Keep tests independent** — each sets up and tears down its own state; no order dependence.
- **Name tests for the behavior** they verify ("rejects an order with negative quantity"), so a failure tells you what broke.
- **Fast feedback** — unit/integration tests should run in seconds so you actually run them often.
- **Run the whole suite before declaring a phase done and before every deploy.**

---

## 6. Manual verification still matters

Automated tests don't replace *actually using the thing*:

- After building, **run the app and click through** the feature yourself — including a failure path.
- Before launch, do the **production smoke test** (`workflow/06-deploy.md` §6.5) on the live site with real services.
- Check it on a **real phone** if your users are mobile.
- Try to **break it on purpose** (the Verify "switch hats" stance).

---

## 7. Regression discipline

- Re-run the full suite after any change; a green suite is your "didn't break the past" signal.
- When something breaks in production, first **write a failing test** that reproduces it, then fix until green. The bug can never silently return.
- Keep flaky tests out — a test that fails randomly trains everyone to ignore failures. Fix or remove it.

---

## 8. Test data & environments

- Use a **separate test database**; never run tests against production data.
- Use **test/sandbox** credentials for third parties during testing (e.g. the gateway's test mode).
- Seed realistic data; cover the empty-state and the large-state.

---

## 9. Anti-patterns

- **"I'll add tests later"** → later never comes; regressions accumulate silently. Test the core flow as you build it.
- **Chasing 100% coverage** → brittle, low-value tests; wasted effort. Cover what matters.
- **Testing against real third parties / real time** → flaky, slow, occasionally destructive. Use fakes and a test DB.
- **Only testing happy paths** → the failures are exactly what break in production. Test failure and edge cases.
- **Ignoring flaky tests** → erodes trust in the whole suite. Fix or delete them.
- **Declaring done without running the suite** → false victory. Green suite + manual run = done.
