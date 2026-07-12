# W26 — Backups & Disaster Recovery

Trigger: setting up any production project; "I deleted something"; quarterly review.

## The uncomfortable truth
Firestore has NO undo and NO recycle bin. A bad script or console mis-click destroys data
permanently unless a backup exists. Every production project gets this setup on launch
day, not after the first loss.

## The setup (once per production project)
1. **Enable scheduled Firestore backups** (or scheduled exports to a Cloud Storage
   bucket): daily, retain 7 daily + 4 weekly. Verify the export actually appears in the
   bucket — an unverified backup is a rumor.
2. **Point-in-time recovery (PITR)** on for prod databases if available on the plan.
3. **Storage:** enable object versioning on buckets holding legal/KYC documents.
4. **Code:** Git is the backup — everything committed and pushed (W30). No code lives
   only on the PC.
5. **Config:** `.env` values and Firebase project settings documented in the project's
   PROJECT.md (registry, W80) — secret VALUES in a password manager, not in Git.

## Restore procedure (data loss just happened)
1. STOP all writers touching the affected collections (pause functions / take app down
   if needed) — restores into live traffic get re-corrupted.
2. Assess scope: which collections, which time range, how many docs. One doc → restore
   by hand from backup export. Whole collection → import/restore job.
3. Restore to a TEMP collection or dev project first; verify the data is right; then
   copy into place with a script (dry-run first, per W23).
4. Reconcile the gap: anything written between backup time and loss time is gone —
   recover from side channels (Razorpay dashboard for payments, ShipRocket for orders,
   audit logs) and re-enter.
5. Postmortem line in project memory: what enabled the loss, which rule now prevents it.

## Quarterly drill (15 minutes)
Pick one collection, restore it into dev from the latest backup, open the app against
it. If you've never tested the restore, you don't have backups — you have hope.

## Failure this prevents
Permanent loss of loan records/KYC/orders from one bad script — the single event a
finance business may not survive.

## Linked
[[W23-MULTI-APP-SYNC-RECOVERY]] · [[W30-GIT-DEV-PROD-WORKFLOW]] · [[W80-PROJECT-REGISTRY]]
