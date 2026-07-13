# STANDARD · API Design — clean, predictable, safe interfaces

> **Consult when building the app's own backend API** (the requests the frontend, or another app/role, makes to the server). A well-designed API is easier to build on, harder to break, and safer. Most of the founder's products have a frontend talking to a backend, so these conventions keep that boundary clean and consistent. This is about *your own* API; for talking to *third-party* APIs, see `stack/integration-recipes.md`.
>
> Tier key: 🔴 must-have · 🟠 strongly expected · 🟡 nice.

---

## 1. The principles

- **Predictable beats clever.** Follow common conventions so any developer (or future agent) can guess how it works. Consistency across every endpoint matters more than any single clever choice.
- **The server is the source of truth.** Never trust the client for identity, prices, totals, roles, or permissions — recompute/verify on the server (ties to security + reliability).
- **Every endpoint is a validation + authorization boundary.** No exceptions.
- **Design for the consumer.** The frontend should be able to do what a screen needs in as few, as clear, calls as possible.

## 2. Structure & naming (REST-style default)

- 🟠 **Resource-oriented URLs** with nouns, not verbs: `/orders`, `/orders/{id}`, `/users/{id}/orders` — not `/getOrders` or `/doOrderStuff`.
- 🟠 **HTTP methods carry the verb:** GET (read, no side-effects), POST (create), PUT/PATCH (update), DELETE (remove).
- 🟠 **Consistent casing and plurals** across the whole API (pick one and hold it).
- 🟠 **Nest only where it clarifies ownership** (`/users/{id}/orders`); don't nest deeply for its own sake.
- 🟡 A GraphQL or RPC style is fine if the project calls for it — the same principles (validation, authz, consistency, predictable errors) apply regardless of style.

## 3. Requests & responses

- 🔴 **Validate every request** — params, query, body — with a schema before use (Law 1). Reject bad input with a clear error.
- 🟠 **Consistent response shape.** Decide one envelope and use it everywhere (e.g. a `data` field on success; a consistent `error` object on failure). The frontend should never have to guess the shape.
- 🟠 **Right status codes:** 200/201 success, 400 bad input, 401 not authenticated, 403 not authorized, 404 not found, 409 conflict, 422 validation, 429 rate-limited, 500 server error. Don't return 200 with an error inside.
- 🟠 **Return what the client needs** — not entire database rows; never sensitive fields (password hashes, internal flags, other users' data).
- 🟡 Use the response to help the client (e.g. the created resource on POST).

## 4. Errors (predictable and safe)

- 🔴 **Never leak internals** — no stack traces or DB errors to the client; generic message to the user, full detail to the error tracker (`standards/security.md` §9).
- 🟠 **Consistent error object** — a stable shape with a human-readable message and, where useful, a machine code and field-level validation details, so the frontend can show good messages.
- 🟠 **Validation errors point to the field** so forms can show inline messages (`standards/ux-and-accessibility.md` §4).

## 5. Authorization & safety (every endpoint)

- 🔴 **Authenticate and authorize on the server, per object** — default-deny; a user reaches only what they're permitted to (prevents IDOR). UI checks are not security. → `standards/security.md` §3–4.
- 🔴 **Idempotency** on create/charge endpoints (accept an idempotency key) so retries/double-submits are safe. → `standards/reliability-and-edge-cases.md`.
- 🟠 **Rate-limit** public and expensive endpoints; size-limit payloads; timeout slow work. → `standards/security.md` §6.
- 🟠 **Lock down CORS** to known origins.

## 6. Lists, filtering & large data

- 🟠 **Paginate** list endpoints (never return everything); support sensible filtering/sorting via query params.
- 🟠 Handle the **empty**, **single**, and **very large** cases gracefully.
- 🟡 Allow the client to request only needed fields where it reduces payloads on hot paths.

## 7. Long-running & async work

- 🟠 Don't make the client **wait on slow work** (reports, bulk operations, sending many messages) — accept the request, do it in a **background job**, and let the client check status. → `standards/observability.md`, `stack/integration-recipes.md` Recipe 2.
- 🟠 Webhooks you expose follow the same inbound-safety rules (verify, validate, idempotent, respond fast). → Recipe 6.

## 8. Evolution & stability

- 🟠 **Don't break existing consumers** — once a screen or app depends on a response shape, change it additively (add fields, don't remove/rename in place); if a breaking change is needed, version the API.
- 🟡 Keep a short note of the API's endpoints and shapes (even a simple one) so the frontend, a teammate, or a future session can build against it without guessing. → `standards/git-and-collaboration.md` §5.

## 9. The API checklist (run while building endpoints)

- [ ] Resource-oriented URLs; correct HTTP methods; consistent naming.
- [ ] Every request validated with a schema; bad input → clear, field-level error.
- [ ] Consistent success/error response shape; correct status codes; no 200-with-error.
- [ ] Server-side auth + per-object authorization (default-deny); no sensitive fields leaked.
- [ ] Idempotency on create/charge; rate limits + payload limits on public/expensive endpoints.
- [ ] Lists paginated; empty/single/large handled.
- [ ] Slow work offloaded to background jobs; client can check status.
- [ ] Errors never leak internals; details go to the tracker.
- [ ] Changes are additive/versioned so existing consumers don't break.

## 10. Anti-patterns

- **Verbs in URLs / inconsistent shapes** → unpredictable, hard to build on. Use resource-oriented, consistent design.
- **200 OK with an error inside** → clients can't tell success from failure reliably. Use real status codes.
- **Trusting client-sent identity/price/role** → fraud and data theft. Verify server-side.
- **Returning whole DB rows** → leaks sensitive/other-users' data. Return only what's needed.
- **No pagination on lists** → slow and memory-heavy at scale. Paginate.
- **Making the client wait on slow work** → timeouts and bad UX. Offload to jobs.
- **Breaking response shapes in place** → existing screens/apps break. Change additively or version.
- **Leaking stack traces** → security hole + bad UX. Generic to client, detail to tracker.
