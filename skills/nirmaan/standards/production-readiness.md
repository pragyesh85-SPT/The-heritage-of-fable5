# STANDARD · Production Readiness — the master "is this real?" checklist

> **Consult during Release Verify and before Deploy.** This is the single bar that separates "works on my laptop" from "safe for real strangers to use." A product passes only when every 🔴 item is satisfied and every 🟠 item is satisfied or explicitly accepted as a known limitation by the founder.
>
> Tier key: 🔴 must-have for any real launch · 🟠 strongly expected · 🟡 good practice / improve over time.

---

## 1. Functionality & correctness

- 🔴 The **core flow works end-to-end** in production-like conditions with real (test-mode) services.
- 🔴 Every listed feature in the brief actually works; nothing is a dead button.
- 🔴 **Unhappy paths handled** for every feature: loading, empty, error, no-permission, offline, partial-failure.
- 🟠 Irreversible actions have confirmation + a recovery/undo path.
- 🟠 The product works on the **devices your users actually use** (mobile-first if your users are mobile).
- 🟡 Pleasant defaults, sensible empty states, helpful microcopy.

## 2. Input validation & data integrity

- 🔴 **Every** input validated **server-side** with a schema; bad input rejected with a clear error, never silently accepted or crashed.
- 🔴 No way to corrupt or bypass core data via crafted requests.
- 🔴 Writes that can be retried/double-submitted are **idempotent** (no duplicate orders/charges).
- 🟠 Uploaded files validated for type/size; stored safely; never executed.
- 🟠 Numbers, dates, currency handled with correct types and rounding (money never in floats where it matters).

## 3. Authentication & authorization

- 🔴 Auth uses a **battle-tested system** (not hand-rolled).
- 🔴 **Every protected action checks permission on the server**, every time — UI hiding is not security.
- 🔴 Passwords (if any) are hashed with a modern algorithm; never stored or logged in plaintext.
- 🟠 Session expiry/refresh handled; logout actually invalidates.
- 🟠 Sensible rate-limiting on auth endpoints (block brute force).
- 🟡 2FA / passkeys available where the risk warrants.

## 4. Security (summary — full list in `standards/security.md`)

- 🔴 **No secrets in code or repo**; all in env/secrets manager; secret-scan clean.
- 🔴 No injection exposure (SQL/NoSQL/command/script); inputs parameterized & escaped.
- 🔴 HTTPS everywhere in production; no mixed/insecure content.
- 🔴 Webhooks verify signatures; inbound data treated as hostile.
- 🟠 Security headers set; dependencies scanned for known vulnerabilities.
- 🟠 No sensitive data (tokens, card numbers, passwords) in logs or error reports.
- 🟠 PII minimized and access-controlled; card data never stored (use hosted checkout).

## 5. Reliability & resilience (full list in `standards/reliability-and-edge-cases.md`)

- 🔴 External calls (payments, messaging, AI, etc.) have **timeouts, retries-with-backoff, and graceful failure**.
- 🔴 The system reaches a **known, recoverable state** on partial failure.
- 🟠 No infinite hangs, no unhandled promise rejections, no silent swallowing of errors.
- 🟠 Graceful behavior under slowness; no single dependency takes the whole app down without a clear message.
- 🟡 Backpressure / queueing for spiky load where relevant.

## 6. Testing (full list in `standards/testing.md`)

- 🔴 Automated tests cover the **core flow** and any irreversible/money action, including a failure path.
- 🟠 Tests for the other key features; tests run as a gate in the deploy pipeline.
- 🟠 A test for each bug fixed (so it can't regress).
- 🟡 Reasonable coverage of edge cases identified in Discovery.

## 7. Observability (full list in `standards/observability.md`)

- 🔴 **Error tracking** live and receiving production errors with debuggable context (no secrets).
- 🔴 **Uptime monitoring** with alerts to the founder.
- 🟠 **Product analytics** on key actions (so usage and drop-off are visible).
- 🟠 Structured logs, sensibly leveled, no sensitive data.
- 🟡 Basic performance/latency visibility.

## 8. Data & backups (full list in `standards/data-and-backups.md`)

- 🔴 Anything that "must never be lost" is **backed up**, and a restore has been **tested** at least once.
- 🔴 Schema changes via **versioned, reversible migrations**.
- 🟠 Destructive operations guarded; deletes are soft where recovery may be needed.
- 🟠 A documented recovery procedure for the worst case.

## 9. Performance & cost

- 🟠 Pages/actions respond acceptably under expected load (no obviously O(n²) on the hot path; key queries indexed).
- 🟠 Assets optimized (images sized/compressed; no shipping huge bundles needlessly).
- 🟠 Running cost understood and within the founder's budget; no surprise paid-tier triggers.
- 🟡 Caching where it clearly helps; pagination on large lists.

## 10. Deployment & operations

- 🔴 **Reproducible deploy** — one pipeline/command, documented in `DEPLOY.md`; no undocumented manual steps.
- 🔴 A **rollback** path to the last good version.
- 🟠 At least two environments (local + production); secrets per environment.
- 🟠 Migrations run safely in the pipeline (backup first; reversible).
- 🟡 A staging/preview environment for changes before production.

## 11. Accessibility & UX basics

- 🟠 Inputs have real labels; forms are keyboard-usable; focus states visible.
- 🟠 Sufficient color contrast; meaningful images have alt text.
- 🟠 Error messages are human, specific, and tell the user what to do next.
- 🟡 Respects reduced-motion; readable type sizes; sensible tab order.

## 12. Legal / compliance / trust (flag, don't pretend to be a lawyer)

- 🟠 Privacy policy & terms present if collecting personal data or taking payments.
- 🟠 Consent where required (cookies/tracking, recording, marketing messages).
- 🟠 Archetype-specific duties handled or flagged (voice: AI disclosure & recording consent; fintech: audit trail; health: no medical claims).
- 🟡 Data export/delete path if users may request it.

## 13. Content & polish

- 🟠 No lorem ipsum, no placeholder text, no broken images in production.
- 🟠 Copy is in the product's voice and free of obvious errors.
- 🟡 Favicon, social preview, basic SEO meta where it's a public site.

---

## How to use this checklist

1. In **Release Verify**, walk every item. Mark ✅ / ⬜ / N/A in a `verify-report.md`.
2. **0 unresolved 🔴** is the hard gate to Deploy.
3. Every 🟠 is either satisfied or **explicitly accepted** by the founder as a known limitation (recorded in `DECISIONS.md`).
4. 🟡 items become post-launch tasks in `phases.md`.
5. Re-run after fixes — never assume a fix passed without re-checking.

> The founder's apps broke historically because most of §2, §5, §6, §7, and §8 were absent. These are not "nice to have" — they *are* the product's reliability. Treat the 🔴s as sacred.
