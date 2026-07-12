# W32 — Secrets: Keys, Tokens, Passwords

Trigger: any integration (Razorpay, ShipRocket, OpenRouter, service accounts); audits.

## Classification — what is a secret
Razorpay key_secret + webhook secret, ShipRocket token, OpenRouter API key, service
account JSONs, SMTP/WhatsApp tokens, admin passwords. NOT secrets: Firebase client
config (apiKey etc. — it's public by design; security comes from rules, W21).

## The rules
1. **Secrets live in exactly two places:** the runtime's secret store (Cloud Functions
   secrets / Cloud Run env vars) and the password manager / one encrypted note that
   Pragyesh controls. Nowhere else — not in code, not in Git, not in Firestore docs,
   not in the frontend bundle, not in chat logs.
2. **Frontend never holds a secret.** Anything the browser needs a secret for goes
   through a Cloud Function/Cloud Run endpoint (this is the existing Razorpay-link
   pattern — keep it).
3. **Per-environment keys:** dev uses test keys; prod keys exist ONLY in prod config.
4. **One integration = one key** where the provider allows it, so one leak ≠ rotate
   everything.
5. **If a secret ever touched Git or a shared file: rotate it immediately.** Deleting
   the file/commit does not unleak it.

## Audit procedure (pre-launch + quarterly)
1. Grep every frontend `dist`/`src` for: `key_secret`, `sk_`, `Bearer `, `token`,
   `password`, provider names. Check the BUILT bundle too, not just source.
2. `git log -S "key_secret"` style history search on each repo once.
3. Confirm `.gitignore` covers `.env*` and `serviceAccount*.json` in every repo.
4. List all active keys in the registry PROJECT.md (name + where used + last rotated —
   never the value).

## Failure this prevents
A leaked Razorpay secret = attacker can fake payment confirmations; a leaked service
account = full database read/write. These are business-ending, not bugs.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]]
