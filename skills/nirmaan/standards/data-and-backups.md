# STANDARD · Data & Backups — never lose what the founder can't afford to lose

> **Consult whenever you touch the database or any persistent store.** Orders, user accounts, fasting logs, transactions — the things the founder identified as "must never be lost" in Discovery — are sacred. This standard ensures data changes are safe and reversible, and that a disaster is recoverable.
>
> Tier key: 🔴 must-have · 🟠 strongly expected · 🟡 improve over time.

---

## 1. Migrations — change the schema safely

- 🔴 **Every schema change is a versioned migration file** committed to the repo — never an ad-hoc manual change to the live database.
- 🔴 Migrations are **reversible** (a down-migration or a clear rollback path) so a bad change can be undone.
- 🔴 **Back up before running a migration** in production.
- 🟠 Migrations are **forward-compatible** during a deploy: write them so the old and new code can both run briefly (expand → migrate → contract), avoiding downtime and breakage mid-deploy.
- 🟠 Test migrations on a copy/staging before production.
- 🟠 Never edit a migration that has already run in production — add a new one.
- 🟡 Keep migrations small and focused; one logical change each.

**The expand–contract pattern (for zero-downtime changes):**
1. **Expand:** add the new column/table (nullable/optional) without removing the old.
2. **Backfill + dual-write:** populate the new, write to both old and new.
3. **Switch:** move reads to the new.
4. **Contract:** once nothing uses the old, remove it in a later migration.

This avoids the classic "renamed a column and the live app crashed" disaster.

## 2. Backups — assume the worst will happen

- 🔴 **Automated, scheduled backups** of every store holding data that must not be lost (database, uploaded files/object storage).
- 🔴 **A restore has been tested at least once.** A backup you've never restored is a hope, not a backup.
- 🟠 **Off-site / separate location** — backups not stored only on the same server that could fail.
- 🟠 **Retention policy** — keep enough history to recover from a problem discovered days later (e.g. daily for N days, weekly for N weeks).
- 🟠 **Point-in-time recovery** where the platform supports it, for the critical database.
- 🟠 Backups of **secrets/config** stored securely and separately (so a rebuild is possible) — never in plaintext in the repo.
- 🟡 Periodic automated restore drills.

**Plain-language framing for the founder:**
> "I've set up automatic daily backups of your orders and customer data, stored in a separate place, and I've tested that we can actually restore them. So even in a worst case — a server dies, a bad change slips through — we can bring your data back."

## 3. Destructive operations — guard and make recoverable

- 🔴 **Deletes and destructive updates are guarded** — confirmation required for user-initiated ones; double-check + backup for admin/maintenance ones.
- 🟠 Prefer **soft-delete** (mark as deleted, keep the row) for anything that might need recovery (orders, accounts) instead of hard-deleting.
- 🟠 **Cascade rules are explicit** — deleting a parent must not silently orphan or wrongly wipe related data; define what happens to children.
- 🟠 **Bulk/maintenance operations** run inside a transaction where possible, are tested on a copy first, and are preceded by a backup.
- 🔴 Never run an untested destructive query against production data. Ever.

## 4. Transactions & consistency

- 🔴 **Multi-step writes are atomic** — wrap them in a transaction so a failure leaves no half-written state (e.g. create order + decrement stock + record payment succeed together or not at all).
- 🟠 Handle **concurrency** on shared/limited resources with atomic operations or proper locking (see `standards/reliability-and-edge-cases.md` §6) — no naive read-modify-write on inventory, balances, or counters.
- 🟠 Enforce **integrity at the database level** — constraints (unique, not-null, foreign keys, checks), not just in application code, so bad data can't slip in through any path.
- 🟡 Use the right types (money as integer minor-units or fixed-precision decimal — never floats for currency).

## 5. Data quality & privacy

- 🟠 **Validate before persisting** (Law 1) so the store never fills with garbage.
- 🟠 **Minimize stored PII** — collect and keep only what's needed; restrict access.
- 🔴 **Never store card data** — tokenize via the payment provider's hosted checkout.
- 🟠 Encrypt sensitive fields at rest where supported; always TLS in transit.
- 🟠 Provide a path to **export and delete** a user's data if they may request it (privacy expectations/laws).
- 🟡 Define data retention — don't keep sensitive data forever without reason.

## 6. Seed & test data

- 🟠 Maintain **seed data** so a fresh environment (and a new session) can run the app meaningfully.
- 🟠 Use a **separate test database**; never run tests or experiments against production data.
- 🟡 Anonymize any production-derived data used for testing.

## 7. The data-safety checklist (run whenever touching data)

- [ ] Schema change is a versioned, reversible migration (not manual).
- [ ] Production backup taken before the migration.
- [ ] Multi-step writes are transactional (all-or-nothing).
- [ ] Concurrency on shared resources handled atomically.
- [ ] DB-level constraints enforce integrity.
- [ ] Destructive ops guarded; soft-delete where recovery may be needed; cascades explicit.
- [ ] No card data stored; sensitive data scrubbed from logs.
- [ ] Backups automated, off-site, and a restore has been tested.
- [ ] Money uses integer/decimal types, never floats.

## 8. Disaster recovery — have a written plan

Document, in the project (`RECOVERY.md`), in plain steps:
- Where backups live and how to restore them.
- How to roll back a bad migration.
- How to roll back a bad deploy (link to `DEPLOY.md`).
- Who/what to do if the database is down or data looks corrupted.

A recovery plan written *before* a crisis is worth ten times one improvised during it.

## 9. Anti-patterns

- **Manual, unversioned schema changes** → drift, unrepeatable environments, data loss. Always migrations.
- **Backups that are never tested** → discovering at the worst moment that they don't restore. Test a restore.
- **Backups on the same server as the data** → one failure loses both. Store off-site.
- **Hard-deleting recoverable data** → irreversible mistakes. Prefer soft-delete; back up before bulk deletes.
- **Naive read-modify-write on inventory/balances** → lost updates, oversold stock, wrong money. Use atomic ops/transactions.
- **Floats for money** → rounding errors that compound. Use integer minor-units or fixed decimal.
- **Untested destructive queries on production** → catastrophe. Test on a copy; back up first.
- **No recovery plan** → a recoverable incident becomes a disaster. Write `RECOVERY.md` in advance.
