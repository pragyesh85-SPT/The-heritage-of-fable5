# W40 — Security Baseline (Every Production App)

Trigger: pre-launch, quarterly audit, after any auth/payment change. This is the
checklist; deep dives live in W21 (rules), W32 (secrets), W41 (auth), W42 (payments).

## The checklist (all items must pass)
1. **Rules:** every Firestore collection + Storage path has explicit rules; default
   deny; no `if true`; deny-cases emulator-tested. (W21)
2. **Secrets:** grep of built frontend bundle finds no keys/tokens; `.env*` gitignored
   everywhere; prod keys only in prod. (W32)
3. **Auth:** users cannot write their own role; admin routes check role server-side
   (claims), not just hidden buttons; password reset/OTP flows can't enumerate users
   ("if an account exists, we've sent..."). (W41)
4. **Money:** amounts computed server-side; webhooks signature-verified; payment
   records immutable from client. (W42)
5. **Input:** every Cloud Function validates its payload shape and rejects extras;
   file uploads restricted by type + size + path (user can only write under their uid).
6. **PII exposure:** Aadhaar/PAN/phone never in URLs, logs, or analytics events;
   KYC documents in Storage paths locked to owner + staff roles.
7. **Dependencies:** `npm audit` critical findings addressed at each release.
8. **Access:** Firebase console access = Pragyesh only (+ named people, least role);
   2-Step Verification ON for the Google account that owns everything — this single
   account is the crown jewels.
9. **Backups exist and were restore-tested.** (W26)
10. **Data protection (India DPDP awareness):** collect only needed personal data,
    have a way to delete a user's data on request, privacy note on the website.

## Procedure
Run top to bottom; write PASS/FAIL per item with evidence (the grep output, the rule
file line); fix FAILs before launch — items 1–4 are launch-blockers, no exceptions.

## Failure this prevents
Each item maps to a real, common, business-ending incident class. The checklist exists
so security doesn't depend on remembering.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]] · [[W26-BACKUPS-AND-DISASTER-RECOVERY]] · [[W32-SECRETS-MANAGEMENT]] · [[W41-AUTH-AND-RBAC]] · [[W42-PAYMENTS-RAZORPAY]]
