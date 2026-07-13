# 04 · BUILD — Production discipline, phase by phase

> **Goal:** write the actual product, one phase at a time, to a production standard — not a prototype. Every phase obeys the Twelve Laws. Every phase ends verifiable. You build, you verify (Phase 05), you loop.
>
> **The rule that governs this phase:** *features are the easy 80%; the invisible 20% — validation, error handling, real auth/payments, tests, observability — is what makes software survive real users.* You build the 20% **into** every feature, never "later."

---

## 4.1 The per-phase build loop

For the current phase (from `phases.md`), run this loop:

```
1. Re-read the phase's goal, tasks, and verification criteria.
2. Re-read the relevant standards for what you're about to build:
      - touching data?         → standards/data-and-backups.md
      - building a form/API?   → standards/reliability-and-edge-cases.md + security.md
      - building the core flow? → all of the above + testing.md
3. Build the feature WITH its 20% baked in (see 4.2).
4. Write/extend automated tests for it (standards/testing.md).
5. Run the tests. Run the app. Actually exercise the feature, including a failure path.
6. Tick the tasks in phases.md. Update STATE.md.
7. Hand to Phase 05 (Verify). If Verify fails, loop back to 3.
8. Commit to git with a clear message.
```

Never move to the next phase with the current one's verification unmet.

---

## 4.2 The 20% you bake into EVERY feature

For each feature/screen/endpoint you build, you are not done until all of these are handled. This is the heart of reliability — internalize it.

### A. Input validation (Law 1)
- Validate **every** input with a schema (Zod or equivalent) at the **server** boundary — not just the browser. Browser validation is UX; server validation is safety.
- Define exact rules: required/optional, type, min/max length, format, allowed values, numeric ranges.
- Reject bad input with a **clear, specific** error message and a safe status code. Never crash, never silently accept.
- Sanitize anything that will be displayed (prevent script injection) or used in a query (prevent injection).

### B. The unhappy-path states (Law 2)
For every screen and action, implement and visibly handle:
- **Loading** — a spinner/skeleton, never a frozen blank.
- **Empty** — a helpful "nothing here yet" state, not a broken layout.
- **Error** — a human message + a way to retry or recover, never a raw stack trace.
- **No permission** — a clear "you can't do this" rather than a half-rendered page or a crash.
- **Offline / slow** — a timeout with a retry, not an infinite hang.
- **Partial failure** — if step 3 of 5 fails, the system is left in a known, recoverable state.

### C. Idempotency & double-action safety
- Buttons that trigger writes are disabled while in-flight.
- Server operations that can be retried (orders, payments, messages, webhooks) carry an idempotency key so a repeat doesn't double-charge or double-create.
- Webhooks verify their signature and ignore duplicates.

### D. Auth & permission checks (Law 3)
- Every protected action checks identity **and** permission **on the server**, every time. Hiding a button in the UI is not security.
- Sessions handled by the chosen battle-tested system; never hand-rolled.

### E. Money & data care (Laws 4, 7)
- No secrets in code; read from environment.
- No card data stored — use hosted checkout.
- Any data write goes through a versioned migration; destructive operations are guarded and reversible.
- Log enough to debug, but **never log secrets, tokens, full card numbers, or passwords.**

### F. Observability hooks (Law 6)
- Errors are reported to the error tracker with enough context to debug (but no secrets).
- Key actions emit a basic analytics event (so the founder can later see usage and drop-off).

### G. Accessibility & copy basics
- Real labels on inputs; keyboard usable; sufficient contrast; alt text on meaningful images.
- User-facing text is clear, kind, and in the product's voice — especially error messages.

> If you find yourself building a feature and skipping any of A–F "to save time," **stop.** That skip is precisely how the founder's previous builds broke. The 20% is not optional polish; it is the product's reliability.

---

## 4.3 Code quality rules (so the codebase stays workable)

- **Simplicity first.** The simplest design that meets the requirement. No speculative abstraction, no premature optimization, no framework the product doesn't need.
- **Small, named pieces.** Functions and components do one thing and are named for what they do. A future session (or a different agent) must be able to read the code and understand intent.
- **Consistency.** Follow one set of conventions across the codebase (the stack's idioms). Don't mix styles.
- **No dead code, no commented-out blocks left lying around, no TODOs without a tracked task.**
- **Comments explain *why*, not *what*.** The code says what; comments say why a non-obvious choice was made.
- **Dependencies are deliberate.** Add a library only when it earns its place; prefer well-maintained, widely-used ones (see `reference/100-repos.md`). Avoid abandoned or single-maintainer-risky packages for critical paths.
- **Keep files focused and reasonably sized.** A 2,000-line file is a future bug farm.

---

## 4.4 Working with the curated 100 (installing tools)

- The 100 in `reference/100-repos.md` are a **menu.** For each phase, install only the few the phase needs.
- Prefer the **default stack** choices; pull alternatives from the reference only when the archetype or a recorded reason calls for it.
- When you add a dependency, note it (and why) in `DECISIONS.md`.
- Never bulk-install or clone large swaths of the list "to have them." Lean dependencies = fewer breakages and faster builds.

---

## 4.5 Git discipline (your safety net and your memory)

- **Commit frequently** — after each working sub-task, with a clear message describing the change.
- A clean commit history is also a **record of progress** that survives context resets and complements `STATE.md`.
- Before any risky change, ensure recent work is committed so it can be restored.
- Never commit secrets (Law 4); a secret-scan runs before commit.

---

## 4.6 Handling external integrations (the usual breakage source)

When wiring a payment gateway, messaging API, AI model, telephony, or any third party:

1. **Read its current docs** (fetch them; don't rely on memory — APIs change). Use a docs-fetching tool/MCP if available.
2. **Use the official SDK** where one exists.
3. **Wrap every call** in: timeout + retry-with-backoff + error capture + a fallback or graceful failure.
4. **Verify signatures** on inbound webhooks; treat all inbound data as hostile (Law 1).
5. **Test the failure case**, not just success — force a decline, a timeout, a malformed payload.
6. **Keep credentials in env**; use the provider's *test* mode during Build, real keys only at Deploy.

---

## 4.7 Building across multiple sessions

A phase that's larger than expected may itself span sessions. If so:

- Keep `phases.md` task checkboxes precise so a fresh session resumes mid-phase exactly.
- At session end, run the End-of-Session Ritual (`CLAUDE.md` §7).
- A new session reads `STATE.md` + the phase tasks and continues. The plan and the code on disk are the source of truth, not the chat history.

---

## 4.8 Output of each build phase

- The feature(s) built with the full 20% baked in.
- Automated tests for the feature, passing.
- `phases.md` tasks ticked; `STATE.md` updated; `DECISIONS.md` updated for any choices.
- A clean git commit.
- Handed to Verify (Phase 05), then on to the next phase.

---

## 4.9 Anti-patterns (the breakage list)

- **Happy-path-only code** → breaks the instant a user does something unexpected. Build the unhappy paths.
- **UI-only validation/permissions** → trivially bypassed. Enforce on the server.
- **Hand-rolled auth/payments/crypto** → breaches and bugs. Use proven systems.
- **Secrets in code** → an incident waiting to happen. Use env vars; scan before commit.
- **"I'll add tests later"** → later never comes; regressions pile up. Test as you build the core flows.
- **Over-engineering** → unnecessary abstractions the founder didn't ask for; slows everything and adds bugs. Keep it simple.
- **Declaring done without running it** → the #1 false-victory trap. "Done" = tested and exercised, including a failure path.
- **Relying on memory for third-party APIs** → they change; fetch current docs.
