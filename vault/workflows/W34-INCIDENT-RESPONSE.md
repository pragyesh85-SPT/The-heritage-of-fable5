# W34 — Production Is Down / Money Is Wrong (Incident Response)

Trigger: live app broken, payments failing, data being corrupted RIGHT NOW.

## Order of operations (do not reorder)

### 1. Stop the damage (first 5 minutes)
- Data being corrupted → pause the writing function / disable the feature flag / take
  the app to maintenance mode. A down app is better than one destroying records.
- Payments failing → check Razorpay status page FIRST (their outage ≠ your bug), then
  your webhook function logs.
- Do NOT start fixing root cause while damage is ongoing.

### 2. Restore service the cheapest way (next 15 minutes)
- Last deploy caused it → **roll back first, debug later**: redeploy the previous git
  tag (W30). Rollback is not defeat; it's the fastest fix.
- Not deploy-related → W22 symptom table with logs.
- External provider down → show a graceful degraded mode if possible ("payments back
  shortly — order saved, pay via link later") rather than a dead screen.

### 3. Assess the blast radius (before announcing "fixed")
- Time window: from first bad event to stop. Query what happened in that window:
  orders created? payments taken? messages sent?
- Money check: reconcile Razorpay vs Firestore for the window (W33 job, run manually).
- List affected customers/records into a file. "Fixed" without this list means silent
  victims.

### 4. Repair data (W23 repair procedure — dry-run script, logged undo)

### 5. Postmortem (10 minutes, same day)
Write 5 lines into project memory: what broke / root cause / how it was detected /
what was repaired / the ONE rule or alert that prevents recurrence. Then actually add
that rule/alert now, not "later".

## Communication rule
If customers or advisors were visibly affected, Pragyesh sends a short honest note
("payment links were failing 2–4pm; all pending orders are safe and processed") —
drafted by the AI, sent by him. Silence costs more trust than the outage.

## Failure this prevents
Debugging for an hour while corruption spreads, "fixed" incidents with unpaid orders
still buried, the same outage repeating monthly.

## Linked
[[W22-FIRESTORE-DEBUGGING]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W30-GIT-DEV-PROD-WORKFLOW]] · [[W33-MONITORING-AND-ALERTS]]
