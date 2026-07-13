# W27 — Production Data Migration (Changing Shape Without Losing Truth)

Trigger: renaming/restructuring fields on LIVE data, moving collections,
importing legacy data (Excel → Firestore), merging duplicate records, or any
"update all documents" moment. Completes the W2x set: W23 repairs corruption;
this doc CHANGES SHAPE on purpose. The most dangerous routine operation in
this stack — Firestore has no undo (W26).

## The invariants (define BEFORE writing the script)
Write down 2–4 statements that must be equally true before and after:
"sum of all EMI receipts unchanged" · "order count per advisor unchanged" ·
"every subscription has exactly one active plan". The migration is DEFINED by
its invariants; a script without them is vandalism with good intentions.

## The procedure (no step is optional)
1. **Snapshot first:** trigger a Firestore export/backup NOW (W26), verify it
   landed. This is the undo that doesn't otherwise exist.
2. **Write the script** (Node + Admin SDK, in the repo under `migrations/`
   with a date-numbered name — migrations are code history, never console
   hand-edits):
   - Idempotent: re-running skips already-migrated docs (check a
     `schemaVersion` or the new field's presence).
   - Batched (≤400 writes/batch), rate-gentle, logs every doc ID + old value
     to a file (the fine-grained undo).
   - Has `--dry-run` printing counts + 5 sample transformations. Dry-run
     output is reviewed by eyes before any real run.
3. **Sequence for live systems (the W23 staged-deploy dance):** deploy code
   that READS BOTH shapes → migrate data → deploy code that WRITES new shape →
   (days later) remove old-shape tolerance. Never migrate under writers that
   only know the old shape.
4. **Run on dev project first** with prod-shaped seed data; verify invariants.
5. **Prod run:** 5 docs → verify by hand → 5% → verify invariants by SCRIPT →
   full run → invariants again → app smoke test on real screens (both apps if
   shared DB).
6. **Record it:** migration note in the registry (what/when/counts/invariant
   results/undo file location). Delete nothing old for 30 days (rename/flag
   instead — `_deprecated` fields are free; deleted truth is not).

## Legacy imports (Excel/old-system → Firestore)
Same procedure plus: normalize at the boundary (phone formats, DD/MM dates,
paise), reject-don't-guess on unparseable rows (a `rejects.csv` for human
review beats silently invented data), and import behind a `source:"import-
2026-07"` tag so a bad batch is findable and reversible as a unit.

## Merging duplicates (customers, products)
Pick survivor by rule (oldest/most-complete), re-point all references
(grep the collection map in SCHEMA/TIP-ECOSYSTEM for every field that stores
the loser's ID), write a `mergedInto` tombstone on the loser — never delete it.

## Failure this prevents
The unrecoverable Sunday-night migration, half-migrated data under live
writers, imports that invented phone numbers, duplicate merges that orphaned
half the order history.

## Linked
[[W23-MULTI-APP-SYNC-RECOVERY]] · [[W26-BACKUPS-AND-DISASTER-RECOVERY]]
