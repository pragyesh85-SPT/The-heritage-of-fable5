# RESURRECTION — Rebuilding Everything From Zero

Scenario ladder: this PC died / the E: drive is gone / starting fresh on a new
machine / handing the whole system to a new person or model with nothing local.
This doc is the recovery map. It works because of one design fact: **everything
in this system is either pushed to a remote or re-derivable from what is.**

## What lives where (the survival map)
| Asset | Survives PC death via | If lost |
|---|---|---|
| The vault (this) | github.com/pragyesh85-SPT/The-heritage-of-fable5 (public) | clone it back |
| Project source code | each project's GitHub repo (see AUDIT: verify every repo is pushed — that IS the backup) | unpushed work is GONE; W30 exists to make this set empty |
| Production data | Firebase (cloud-side) + W26 backups | Firestore is not on the PC at all |
| Private registry (`_REGISTRY/`) | NOT pushed (private by design) | REBUILDABLE — it was derived from disk + repos in ~1 session (procedure below) |
| Secrets | password manager + Firebase/Cloud config | never on disk legitimately; if a disk with secrets leaks, rotate everything (W32 §5) |
| Chat transcripts | local `.claude/projects/` only | working state is in the registry/state files precisely so transcripts are disposable |

## The resurrection procedure (new machine, in order)
1. **Tools:** install Git, Node, Firebase CLI, gh CLI, Claude Code (or any capable
   agent runtime); `gh auth login` as pragyesh85-SPT.
2. **The vault first:** `git clone https://github.com/pragyesh85-SPT/The-heritage-of-fable5`
   → the `vault/` folder is the operating system; point the model at `vault/HOME.md`
   with the kickoff line from `00-README.md`. Install the repo's `skills/brain` skill.
3. **Code:** clone every project repo (`gh repo list pragyesh85-SPT --limit 100`,
   plus study-pragyesh85's advisor repo) into a work root mirroring the old layout.
4. **Rebuild the private registry:** run W80's procedure over the cloned repos —
   the original registry was BUILT by scanning package.json/.firebaserc/git state
   and grepping Firestore collections (W20); the same scan rebuilds it. Restore the
   `_REGISTRY/` folder inside the vault clone (it's gitignored, stays private).
5. **Re-verify reality:** run the audit (W40 + W43) fresh — do not trust the old
   audit file's findings on a new setup; re-derive them.
6. **Reconnect accounts checklist:** Firebase console access (owner Google account
   + 2FA), Razorpay dashboard, ShipRocket, OpenRouter, WhatsApp bot session
   (re-scan QR — the session token never survives, see tip-ops card), domain/DNS.
7. **Acceptance:** run W100 on whatever model is driving. Only after ≥9/10 does it
   get the standing workload.

## Partial-loss variants
- **Only the vault folder corrupted:** re-clone (step 2); local `_REGISTRY` is on
  E:, untouched.
- **Only the registry lost:** step 4 alone.
- **A project lost locally:** re-clone that repo; its registry card still has the
  URLs/config/gotchas.
- **GitHub account lost:** the disaster with no clean undo — which is why the
  owner account's 2FA + recovery codes (W40 §8) outrank every other security item.

## The design rule this doc enforces (for everything built from now on)
Before calling any new system "done", ask: **"if this machine vanished tonight,
what's the resurrection path?"** If any asset's answer is "it's gone" — push it,
back it up, or write the re-derivation procedure into this file. No asset without
a survival row.

## Linked
[[00-README]] · [[HOME]] · [[W26-BACKUPS-AND-DISASTER-RECOVERY]] · [[W30-GIT-DEV-PROD-WORKFLOW]] · [[W32-SECRETS-MANAGEMENT]] · [[W80-PROJECT-REGISTRY]] · [[W100-VAULT-ACCEPTANCE-TEST]]
