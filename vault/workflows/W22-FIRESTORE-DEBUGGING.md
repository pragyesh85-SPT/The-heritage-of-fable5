# W22 — When Firestore "Breaks" (Debugging Procedure)

Trigger: data not showing, writes failing, function not firing, app suddenly broken.

## Step 0 — before touching anything
1. **Confirm which Firebase project you're looking at.** `cat .firebaserc` + check the
   config in the app. Half of "my data vanished" = looking at dev while data is in prod,
   or two sibling apps pointed at different projects.
2. **What changed recently?** Last deploy, last rules change, last schema change (git log
   across ALL sibling repos, not just this one). Bugs follow changes.

## Symptom → cause table (check in this order)

| Symptom | Most likely causes, in order |
|---|---|
| `permission-denied` | Rules (see W21 debugging); user's role claim missing; wrong project |
| `failed-precondition: requires an index` | Missing composite index — the error contains the exact creation URL; click it, wait for build |
| Data exists in console but UI shows nothing | Query filters don't match actual field values (case, type: "5" vs 5); listener attached before auth ready; error swallowed in empty catch |
| Writes seem lost | Write went to the other project/env; offline persistence queued it; a Cloud Function overwrote it after (check function logs) |
| Cloud Function not firing | Not deployed (check console Functions list); wrong region called; trigger path typo (`orders/{id}` vs `order/{id}`); function crashed on cold start — READ THE LOGS |
| Function fires but wrong result | Logs first (`firebase functions:log` or console) — never guess; check payload shape vs what code expects (schema drift from a sibling app, see W23) |
| `resource-exhausted` / quota | Billing/quota page; runaway loop (function writing to the collection that triggers it — the classic infinite loop); see W24 |
| Everything slow | Unindexed big queries; fetching whole collections instead of limits; N listeners per row |

## The procedure
1. Reproduce once yourself; capture the exact error string (browser console + network tab).
2. Read logs BEFORE forming theories: browser console → Cloud Functions logs → Firebase
   console usage graphs.
3. Form ONE hypothesis, test it with the smallest possible probe (a temporary log line, a
   console query), confirm or kill, next hypothesis. No shotgun fixes.
4. Fix at the root: if data is wrong, find WHO WROTE it wrong (audit logs / updatedAt /
   function logs), fix the writer, THEN repair the data (W23 repair procedure).
5. After fix: exercise the flow end-to-end in the running app, and check the OTHER apps
   sharing the database still work.

## Hard rules
- Never "fix" by loosening security rules to `if true` — that converts a bug into a breach.
- Never edit production data by hand in the console without noting doc ID + old value
  first (paste them into the chat/notes — that's your undo).
- A function writing to a collection that triggers itself needs a guard condition — check
  this on EVERY new trigger.

## Failure this prevents
Hours lost debugging the wrong environment, rules loosened in panic, root causes patched
at the symptom layer so they return next week.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W24-SCALING-AND-TRAFFIC]]
