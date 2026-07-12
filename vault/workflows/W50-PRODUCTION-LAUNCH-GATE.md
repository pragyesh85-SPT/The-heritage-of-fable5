# W50 — Production Launch Gate

Trigger: "let's go live", first deploy of a new product, major version release.
This is the gate between "it works on my machine" and real users with real money.

## The gate — every item PASS with evidence, or no launch

**Security & data**
1. W40 security baseline: items 1–4 pass (rules, secrets, auth, money).
2. W26 backups scheduled AND one restore tested.
3. W31 dev/prod separation exists; launch deploys from `main`, tagged (W30).

**Money**
4. W42 payment testing gate passed, including the real ₹1–10 prod transaction + refund.
5. Invoice/commission math verified against 3 hand-computed examples.

**Reliability**
6. W33 alerts live: function errors, billing budget, reconciliation job, uptime check.
7. The critical path (signup → order → pay → confirm) exercised on a real cheap Android
   phone on mobile data — not just desktop Chrome.
8. Empty-state day-one experience checked: what does a brand-new user with zero data
   see? (Apps tested only with dev data often crash or look broken when empty.)

**Operations**
9. Registry PROJECT.md updated (W80): live URLs, project IDs, keys list, current version.
10. Rollback rehearsed once: redeploy previous tag on dev, confirm it works. Know the
    command before you need it at midnight.
11. Legal minimum on the website: contact info, privacy note, refund policy (payment
    gateways and customers both expect these).

**People**
12. Pragyesh has done one full run-through as a real user and said "yes, ship".

## Launch-day procedure
1. Deploy at a LOW-traffic hour, never right before being unavailable.
2. Watch function logs + first real transactions for the first hour.
3. Soft-launch when possible: 2–3 friendly advisors/users for 2 days before announcing.

## After launch (first week)
Daily: check alerts inbox, reconciliation result, and any user complaint verbatim.
Fix small UX papercuts immediately — first-week impressions decide adoption of
advisor-facing tools.

## Failure this prevents
Launch-night data breaches, unrollbackable broken releases, payment bugs found by
customers, "it worked in dev" as an epitaph.

## Linked
[[W26-BACKUPS-AND-DISASTER-RECOVERY]] · [[W30-GIT-DEV-PROD-WORKFLOW]] · [[W31-ENVIRONMENTS-DEV-STAGING-PROD]] · [[W33-MONITORING-AND-ALERTS]] · [[W40-SECURITY-BASELINE]] · [[W42-PAYMENTS-RAZORPAY]] · [[W80-PROJECT-REGISTRY]]
