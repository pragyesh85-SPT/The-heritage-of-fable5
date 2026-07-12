# _REGISTRY — the private layer (intentionally empty here)

This layer holds what the other three layers must never hold: **your** concrete
facts — project cards, ecosystem contracts, audit results, credentials-adjacent
notes. It is private by design and is excluded from this public repository.

In the original vault this folder contains one card per project (13 files for
the author's portfolio). You rebuild it for YOUR projects:

1. Read `../workflows/W80-PROJECT-REGISTRY.md` — the full design of this layer.
2. Create one card per project from `PROJECT-CARD-TEMPLATE.md` in this folder.
3. Create an `INDEX.md` — one line per card ("name — what it is — status").
4. If several projects share a database or business, add an ecosystem contract
   note that names which app OWNS each collection/fact (see
   `../workflows/W23-MULTI-APP-SYNC-RECOVERY.md` for why this matters).

Vault docs that reference registry files (e.g. `TIP-ECOSYSTEM`, `AUDIT-*`) are
referencing the author's private instances — treat those mentions as worked
examples of the pattern, not missing files.

**Never publish this layer.** The author's own registry contains a security
audit of live systems; yours will too. Registry = private, always.

## Linked
[[W80-PROJECT-REGISTRY]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[PROJECT-CARD-TEMPLATE]]
