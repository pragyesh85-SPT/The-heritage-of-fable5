# W31 — Environments: Dev vs Production in Firebase

Trigger: new project setup; any project currently testing against production data.

## The rule
**Two Firebase projects per product minimum:** `myapp-dev` and `myapp-prod`.
Testing against prod data is how test orders reach real customers and real records get
corrupted. If a current project has only prod (common in the older TIP repos), creating
dev is the first infrastructure task before any risky work.

## Setup procedure
1. Create `<app>-dev` Firebase project; enable the same services (Firestore, Auth,
   Functions, Storage, Hosting).
2. `.firebaserc` gets both aliases:
   `{ "projects": { "default": "myapp-dev", "prod": "myapp-prod" } }`
   — default MUST be dev, so a lazy `firebase deploy` hits dev, never prod by accident.
3. App config: env files (`.env.development` / `.env.production`) select the Firebase
   config; the build mode picks the file. NEVER a hand-edited config constant that
   someone forgets to switch back.
4. Seed dev with realistic fake data (a seed script in the repo: 3 advisors, 20 orders,
   every status value). Refresh it when schema changes.
5. Payments in dev = Razorpay TEST keys only. Prod keys never enter dev config.
6. Visible marker: dev builds show a colored "DEV" badge in the UI corner, so a
   screenshot always tells you which env you're looking at.

## Deploy commands (make wrong-target deploys hard)
- Dev: `firebase deploy` (default alias).
- Prod: `firebase deploy -P prod` — used only from `main`, clean tree, after the W50 gate.

## Multi-app ecosystems
All sibling apps of one product point at the SAME pair (all at tip-dev, all at tip-prod).
An ecosystem where app A tests on prod while app B tests on dev creates fake "sync"
bugs (W23 step 4).

## Failure this prevents
Test orders SMS-ing real customers, "deploy" hitting prod at midnight, data corruption
during development, unreproducible bugs because dev data is nothing like prod.

## Linked
[[W23-MULTI-APP-SYNC-RECOVERY]] · [[W50-PRODUCTION-LAUNCH-GATE]]
