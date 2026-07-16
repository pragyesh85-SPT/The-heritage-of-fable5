# W21 — Firestore Security Rules

Trigger: new collection, new role, "permission denied" errors, pre-launch audit.

## The mental model
Rules are the ONLY real security. The UI hiding things is decoration — anyone can call
Firestore directly from the browser console with the user's own token. Every collection
without rules is publicly writable by any logged-in user (or everyone, in test mode).

## Parameters
1. **Default deny.** Start every ruleset with nothing allowed; open paths explicitly.
2. **Role source of truth:** custom claims (set by Cloud Function, can't be self-edited) —
   preferred; or a `users/{uid}` doc with a `role` field that ONLY functions can write.
   NEVER let users write their own role field (classic privilege-escalation hole).
3. **Ownership pattern:** advisor reads own data → `request.auth.uid == resource.data.ownerUid`
   or agentCode looked up from their user doc.
4. **Tenant isolation (Aapka Hisab):** every doc carries `tenantId`; every rule checks
   `request.auth.token.tenantId == resource.data.tenantId`. No cross-tenant reads, ever.
5. **Field-level guards on money:** clients may create orders but must NOT set
   `amount`, `commission`, `status: "paid"` — check
   `!request.resource.data.diff(resource.data).affectedKeys().hasAny(['amount','commission','status'])`
   for client writes; those fields change only via Cloud Functions (Admin SDK bypasses rules).
6. **Immutable collections** (audit logs, payments): `allow create: if false` from client;
   `allow update, delete: if false` for everyone.

## Procedure
1. For each collection in SCHEMA.md write: who creates / reads / updates / deletes, per role.
2. Write rules; test in the **emulator** with one test per cell of that matrix — especially
   the DENY cases (advisor reading another advisor's commissions must fail).
3. Deploy rules BEFORE deploying the feature that needs them.
4. Quarterly + pre-launch: run the audit — list all collections, confirm each has explicit
   rules, hunt for `allow read, write: if true` and expired test-mode timestamps.

## Debugging "permission denied"
1. Reproduce in Rules Playground (Firebase console) with the exact auth + doc.
2. Common causes in order: rule expects a field the doc lacks; role claim not set on this
   user (check token, re-login after claim changes); rule reads another doc (`get()`) that
   doesn't exist; you're testing against the wrong Firebase project (check `.firebaserc`).

## Failure this prevents
Any customer reading all orders, advisors setting their own commission, deleted audit trails.

## Linked
[[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W41-AUTH-AND-RBAC]] · [[W40-SECURITY-BASELINE]]
