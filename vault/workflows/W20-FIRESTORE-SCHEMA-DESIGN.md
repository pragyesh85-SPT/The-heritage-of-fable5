# W20 — Designing a Firestore Database

Trigger: "configure a database / new collection / model this data".

## The core principle
**Model around QUERIES, not entities.** First write down every screen and ask "what does
this screen need in ONE query?" — then design collections so each screen is one query.
Firestore has no joins; a schema designed like SQL dies in the UI.

## Parameters to decide (in this order)
1. **List the queries.** "Admin sees today's orders", "advisor sees own commissions",
   "staff sees loans of their branch". Each becomes a collection + index decision.
2. **Top-level vs subcollection:** data queried ACROSS parents → top-level with a parent
   field (`orders` with `agentCode`, queryable for admin AND per-advisor). Data only ever
   read WITH its parent → subcollection (`loans/{id}/documents`).
3. **Denormalize deliberately:** copy display fields (customerName onto the order) so
   lists render in one query. RULE: every denormalized field gets a line in
   `SCHEMA.md` saying who writes it and who refreshes it on change.
4. **Document IDs:** auto-IDs by default. Human-meaningful IDs (agentCode, phone) only
   when uniqueness IS the business rule. Never sequential IDs at scale (hotspotting).
5. **Every document gets:** `createdAt`, `updatedAt` (server timestamps), `status` (as a
   defined enum — write the allowed values down), and `schemaVersion: 1` (makes future
   migrations sane).
6. **Money as integers** (paise). Never floats.
7. **Counters/aggregates** (total sales, order counts): don't count with queries at scale;
   maintain a counter doc updated by Cloud Function; remember 1 write/sec/doc limit —
   use sharded counters if hotter than that.
8. **Document size:** hard 1 MB limit. Arrays that grow forever (status history, logs)
   → subcollection, not an array field.

## Procedure
1. Write `SCHEMA.md` in the repo: every collection, every field, type, who writes it,
   who reads it, allowed status values. THIS FILE IS THE CONTRACT between the
   interconnected apps — every sibling repo change starts by reading it.
2. Get Pragyesh's yes on the entity list and money flow (not on field names).
3. Create security rules for every collection at the same time as the schema (W21) —
   default deny.
4. Add composite indexes as queries demand them (the error message gives the exact
   creation link).

## Failure this prevents
Screens that need N queries per row, join-shaped schemas, silent 1MB document deaths,
sibling apps disagreeing about what `status: "done"` means.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]]
