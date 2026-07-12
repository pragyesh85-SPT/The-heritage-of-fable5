# W23 — Interconnected Apps Lost Sync (Shared Firestore Recovery)

Trigger: "advisor app shows X, admin panel shows Y", totals don't match, one app broke
after another was deployed. Applies to the TIP ecosystem (advisor + admin + website +
WA-bot on one Firestore) and any future multi-app project.

## The mental model
With a shared database there is no "sync" system to break — there is ONE truth in
Firestore and N apps reading/writing it. "Lost sync" always means one of:
(a) an app WRITES a shape the others don't expect (schema drift),
(b) an app READS with a filter that no longer matches the data,
(c) duplicated/denormalized fields updated in one place but not the other,
(d) apps pointed at different Firebase projects.

## Diagnosis procedure
1. **Pick ONE concrete mismatched record** (one order ID). Open it raw in the Firestore
   console. The raw document is the truth; both apps are just renderers of it.
2. Decide: is the DOCUMENT wrong, or is one APP's reading of it wrong?
   - Document correct → the misreading app has a query/render bug. Fix that app.
   - Document wrong → find the writer: check `updatedAt`, audit logs, Cloud Function
     logs around that timestamp; grep the written field name across ALL repos to list
     possible writers.
3. Check schema drift: `git log` on all sibling repos since things last worked. A rename
   like `advisorCode` → `agentCode` in one repo while others still write the old field
   is the classic cause.
4. Confirm all apps use the same Firebase project ID (config in each repo).

## Repair procedure (order matters)
1. **Stop the bleeding first:** fix/pause the bad WRITER before repairing data, or the
   corruption regrows behind you.
2. Write a repair script (Node + Admin SDK) — never hand-edit hundreds of docs. The script
   MUST: run in dry-run mode first printing what it WOULD change; log every doc ID + old
   value to a file (that's the undo); run on 5 docs first, verify, then full run.
3. Re-verify from BOTH apps' point of view (open both UIs, compare the same records).
4. Prevention entry: add the drifted field to `SCHEMA.md` with its writer list; add the
   staged-deploy rule (W30) to the plan next time.

## Prevention rules (enforce always)
- SCHEMA.md in a shared location is the contract; every field change PRs against it first.
- One field, one writer — where possible, exactly one app/function owns writing each field.
- Staged deploys: writers that support BOTH shapes → then readers → then remove old shape.
- A weekly (or pre-launch) consistency check script: recompute 3 key invariants
  (e.g., commission totals vs orders, subscription status vs payment records) and
  report mismatches. Cheap to run, catches drift early.

## Failure this prevents
Week-long ghost hunts across four repos, repairing data while a bad writer re-corrupts it,
hand-edits with no undo.

## Linked
[[W30-GIT-DEV-PROD-WORKFLOW]]
