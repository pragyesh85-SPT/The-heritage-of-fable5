# STANDARD · Security — don't get hacked, don't leak data

> **Consult during Build and Verify, and as a dedicated pass before Deploy.** For a product that takes payments or stores user data, security is not optional polish — a single leaked key or injection hole can end the business and harm users. This standard is grounded in the OWASP consensus on what actually goes wrong.
>
> You are not a security firm, and you should say so for high-stakes products (recommend a professional review before handling significant money or sensitive data). But you **must** get the fundamentals right, because most breaches exploit basics.

---

## 1. Secrets management (the most common founder mistake)

- 🔴 **No secret ever in the code or committed to the repo** — API keys, passwords, tokens, connection strings, private keys. All live in **environment variables** or a **secrets manager**.
- 🔴 **Scan before every commit** for accidentally-staged secrets; if one was ever committed, treat it as compromised and **rotate it** (changing the file later does not un-leak it from git history).
- 🔴 **Frontend bundles are public** — never put a secret in client-side code; anything shipped to the browser is readable by anyone. Use server-side calls for anything secret.
- 🟠 Use **least-privilege** keys (restricted scope) and separate keys per environment.
- 🟠 Provide a `.env.example` with **names only**, never values.
- 🟠 Make secret rotation easy and document it.

## 2. Input handling & injection (OWASP: Injection, XSS)

- 🔴 **Parameterized queries / prepared statements** for all database access — never build queries by string-concatenating user input (SQL/NoSQL injection).
- 🔴 **Escape/encode output** rendered into HTML to prevent **XSS**; prefer frameworks' auto-escaping; never `dangerouslySetInnerHTML`/`innerHTML` with unsanitized input.
- 🔴 Never pass user input into shell commands / `eval` / dynamic code (command injection).
- 🟠 Set a **Content-Security-Policy** to limit script sources.
- 🟠 Validate and constrain anything used in file paths (prevent path traversal) and in redirects (prevent open redirect).
- 🟠 Validate uploads (type, size); store outside the web root or in object storage; never execute uploaded files.

## 3. Authentication (OWASP: Identification & Auth failures)

- 🔴 Use a **proven auth system**; do not hand-roll login, sessions, or password hashing.
- 🔴 Hash passwords with a strong, slow, salted algorithm (e.g. argon2/bcrypt/scrypt); never store/log plaintext or weak hashes.
- 🟠 **Rate-limit** login, signup, OTP, and password-reset; lock out / back off on brute force.
- 🟠 Secure session cookies: `HttpOnly`, `Secure`, `SameSite`; sensible expiry; logout invalidates server-side.
- 🟠 Safe password reset (single-use, expiring tokens; no account enumeration).
- 🟡 Offer 2FA / passkeys where risk warrants.

## 4. Authorization (OWASP: Broken Access Control — the #1 category)

- 🔴 **Check permission on the server for every protected action and resource, every time.** Hiding a button or route in the UI is **not** access control — attackers call the API directly.
- 🔴 Enforce **object-level** authorization: a user can only access *their own* records — never trust an ID from the client to be one they're allowed to see (prevents IDOR).
- 🔴 Default-deny: new endpoints are protected unless explicitly public.
- 🟠 Re-check role/ownership on writes, not just reads.
- 🟠 Don't expose admin functionality to non-admins by obscurity alone.

## 5. Data protection & privacy

- 🔴 **HTTPS everywhere** in production; redirect HTTP→HTTPS; no mixed content.
- 🔴 **Never store card data** — use the payment provider's hosted checkout/tokenization (also avoids the heavy PCI burden).
- 🟠 **Minimize PII** — collect only what you need; restrict who/what can read it.
- 🟠 Encrypt sensitive data at rest where the platform supports it; always in transit (TLS).
- 🟠 **No sensitive data in logs or error reports** — scrub tokens, passwords, card numbers, full PII before logging.
- 🟡 Data export/delete path if users may request it; retention limits.

## 6. APIs, webhooks & integrations

- 🔴 **Verify webhook signatures**; reject unsigned/invalid; process idempotently (ignore duplicates).
- 🟠 **Rate-limit** public endpoints; size-limit payloads; time-out slow requests.
- 🟠 Lock down **CORS** to known origins; don't reflect arbitrary origins.
- 🟠 Validate every API input with a schema (same rigor as forms).
- 🟡 Version APIs; deprecate safely.

## 7. Dependencies & supply chain

- 🟠 Use **well-maintained, widely-used** libraries; avoid abandoned or single-maintainer-risk packages on critical paths.
- 🟠 **Scan dependencies** for known vulnerabilities; keep them reasonably current; automate update PRs.
- 🟠 Lock dependency versions for reproducible builds.
- 🟡 Review what a new dependency pulls in before adding it.

## 8. Platform & headers

- 🟠 Set security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`/frame-ancestors, `Referrer-Policy`.
- 🟠 Disable directory listing and verbose server banners; turn off debug/stack traces in production responses.
- 🟠 Keep the runtime and base images patched.

## 9. Error handling & information leakage

- 🔴 **Never show raw stack traces or internal details** to users in production — generic message to the user, full detail to the error tracker.
- 🟠 Don't leak whether an email/username exists (account enumeration) in auth flows.
- 🟠 Fail securely — an error defaults to *deny*, not *allow*.

## 10. The pre-deploy security pass

Before launch, dedicate a pass to:

- [ ] Secret-scan the repo and history; rotate anything ever exposed.
- [ ] Confirm no secrets in the frontend bundle.
- [ ] Spot-check queries for parameterization; test one injection attempt on a key field (should be rejected/escaped).
- [ ] Try to access another user's resource by changing an ID (should be denied — IDOR check).
- [ ] Try a protected API call without/with wrong permissions (should be denied).
- [ ] Confirm HTTPS + redirect + security headers.
- [ ] Confirm webhook signature verification.
- [ ] Confirm logs/error reports contain no secrets or full PII.
- [ ] Run a dependency vulnerability scan; address criticals.
- [ ] For high-stakes (real money/sensitive data): **recommend a professional security review** to the founder, in plain language.

---

## 11. Plain-language framing for the founder

When you find or fix something serious, explain it without alarm or jargon:

> "Right now your payment keys are written inside the code, which is published to your code host — anyone who sees it could use them. I'm moving them into a secure setting that isn't in the code, and you should regenerate those keys in [provider] so the old ones stop working. This is a common issue and quick to fix."

---

## 12. Anti-patterns

- **Secrets in code / frontend** → instant compromise. Env/secrets only; never client-side.
- **UI-only access control** → trivially bypassed via the API. Enforce on the server, per object.
- **String-built queries** → injection; database compromise. Parameterize always.
- **Storing card data** → massive risk + PCI burden. Use hosted checkout.
- **Trusting client-sent prices/totals/roles/IDs** → fraud and data theft. Recompute/verify server-side.
- **Verbose errors in production** → hands attackers a map. Generic to users, detailed to the tracker.
- **Ignoring webhook signatures** → spoofed events (fake "payment succeeded"). Verify and dedupe.
- **Abandoned dependencies on critical paths** → unpatched holes. Choose maintained libs; scan and update.
