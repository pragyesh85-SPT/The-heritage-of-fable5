# 07 — Build Playbook (Pragyesh's Stack & Standards)

Derived from every shipped project in `pragyesh_portfolio.md`. These are his de-facto
standards — follow them unless he says otherwise, so every new project feels like his.

## Default stack (don't re-litigate this per project)

| Layer | Default | Use instead when… |
|---|---|---|
| Frontend | React 19 + Vite + Tailwind | Next.js 14+ only if SEO/public content matters (e.g. brand website, Printing ATM customer app) |
| Backend | Firebase: Firestore + Cloud Functions v2 + Auth + Storage + Hosting | Cloud Run for anything needing secrets/long-running (Razorpay link generation lives here) |
| Payments | Razorpay (links + orders) | UPI-multi-mode for kiosk-style products |
| Logistics | ShipRocket API | — |
| In-app AI | OpenRouter (Gemini / GPT-4o-mini) | — |
| Charts / motion / PDF | Recharts / Framer Motion / jsPDF | — |
| State | Zustand or plain context | — |
| Tests | Vitest, mandatory for money math (commission engine precedent) | — |

## Non-negotiables in every app (his pattern, observed across all projects)

1. **Mobile-first PWA.** His users are field agents on cheap Androids with weak networks.
   Test at 360px width. Big touch targets. Works on 3G.
2. **India locale everywhere:** INR with Indian digit grouping (₹1,00,000), DD/MM/YYYY,
   Aadhaar/PAN field validation, +91 phone handling.
3. **RBAC from day one.** Every app grows roles (Aapka Hisab has 5). Design the role enum
   and Firestore rules on day one even if V1 has 2 roles.
4. **Admin panel visibility.** Every entity a customer/advisor creates must be visible and
   controllable from the admin side. If admin can't see it, it doesn't ship.
5. **Audit logs for money and data changes** — immutable, written by Cloud Functions, never
   by the client (Aapka Hisab pattern).
6. **OTP flows** for phone verification and pickups — he uses them everywhere.

## Security rules (violations here have burned real projects)

1. **No secrets in client code, ever.** Razorpay keys, OpenRouter keys, ShipRocket tokens
   → Cloud Functions/Cloud Run env only. Grep the frontend for `key`, `secret`, `sk_`
   before every deploy.
2. **Firestore security rules are the actual auth.** UI hiding is decoration. Every
   collection needs explicit rules; default-deny. Test rules with the emulator before deploy.
3. **Payment amounts are computed server-side.** The client sends a product/plan ID; the
   server decides the price. Never trust an amount from the browser.
4. **Webhooks verify signatures** (Razorpay webhook secret) before acting.

## The multi-repo trap (TIP ecosystem — his biggest recurring risk)

Advisor app, admin panel, website, WA-bot, and ops tools **share one Firestore**.
Procedure for ANY schema/field change:
1. Grep the field name across ALL sibling repos before changing it.
2. List every reader and writer of that field in the change plan.
3. Deploy order: writers that ADD the new shape first, readers second, removal of the old
   shape last — never in one big bang.
4. After deploy, open each affected app and exercise the touched flow once.

## Deploy procedure

1. Build locally, zero errors/warnings that matter.
2. Run tests if they exist (money math must have them).
3. Show Pragyesh a plain-language summary of what changes for users.
4. Deploy to Firebase Hosting/Functions. Then LOAD THE LIVE URL and click through the
   changed flow. Deploy without live verification = not deployed.
5. Anything touching production data gets a rollback note: what to run/restore if it goes
   wrong (the `_TIP_ROLLBACK_` folder pattern exists for a reason).

## Multi-session builds

Use the `.nirmaan-state/` pattern: phased plan on disk, checkpoint after every phase,
plain-language founder checkpoint before irreversible steps. Any session must be
resumable by a fresh model from the state files alone.

## Linked
[[W50-PRODUCTION-LAUNCH-GATE]] · [[W90-SYSTEM-ARCHITECTURE]] · [[C03-WRITING-CODE]]
