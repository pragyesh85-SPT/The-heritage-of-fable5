# W41 — Authentication & Role Design

Trigger: new app, new role, "make an admin panel", login issues.

## Parameters to decide first
1. **Login methods by audience:** field agents/customers → phone OTP first (his users);
   internal staff/admin → Google sign-in; never invent custom password systems.
2. **The role enum:** write ALL roles day one, even future ones
   (Aapka Hisab precedent: superAdmin, tenantAdmin, branchManager, staff, fieldAgent).
   Adding roles later to a 2-role system is a rewrite; defining them early is free.
3. **Role storage:** custom claims set by a Cloud Function (admin-triggered), because
   claims can't be self-edited and are readable in security rules without extra reads.
   Mirror in `users/{uid}` doc for UI display only.
4. **Who grants roles:** exactly one path — an admin action in the admin panel calling
   a function that verifies the CALLER's role first. No self-serve role selection at
   signup, ever (signup role is always the lowest).

## Standard flows (reuse, don't reinvent)
- **New user:** auth signup → function creates `users/{uid}` with default role +
  profile → app waits for that doc before first render (avoids the "logged in but no
  profile" flash/crash).
- **Role change:** admin panel → callable function (verifies caller is admin) → sets
  claim + doc → target user must re-login or refresh token; SHOW that requirement in
  the admin UI ("takes effect on their next login") or you'll debug it as a ghost bug.
- **Multi-tenant:** `tenantId` in the claim; every query filters by it; every rule
  checks it (W21 §4).
- **Deactivating someone:** `disabled` flag via Admin SDK + claim removed — deleting
  their auth record orphans their history; disable, don't delete.

## Session/UX rules
- Auth state listener gates the router; never render data screens before auth resolves.
- OTP flows: rate-limit sends (cost + abuse), 5-min expiry, don't reveal whether a
  number is registered.

## Failure this prevents
Role-escalation via self-edited role fields, "admin panel open to anyone with the URL",
ghost bugs from stale claims, orphaned data after user deletion.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]]
