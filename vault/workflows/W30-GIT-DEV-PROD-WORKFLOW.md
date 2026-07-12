# W30 — Git: Managing Development vs Production

Trigger: any repo without this structure; "how do I not break prod while building".

## The structure (simple on purpose — solo founder + AI, not a 50-dev team)
- **`main` = what is live in production.** Nothing reaches main except tested work.
- **`dev` = integration branch.** Daily AI-assisted work lands here.
- **Feature branches** (`feature/marketplace-onboarding`) only for big/risky work;
  small fixes go straight to dev.
- **Tags = releases.** Every prod deploy gets `v1.4.0` + one-line notes. Rollback =
  redeploy the previous tag (this replaces `_TIP_ROLLBACK_` folder copies — folders
  lie, tags don't).

## The flow
1. Work on `dev` → commit in small, described steps ("Add commission floor rule" not
   "changes").
2. Test on the DEV Firebase project (W31).
3. Ready for prod: merge dev → main, tag, deploy from main, verify live (W50 gate).
4. Hotfix for live bug: branch from `main`, fix, deploy, then merge back into dev too
   (or dev re-breaks it on the next release).

## Hard rules
- Commit + push at least at the end of every working session. Unpushed code on one PC
  is not backed up.
- `.gitignore` ALWAYS covers: `.env*`, `serviceAccount*.json`, `node_modules`,
  `firebase-debug.log`. If a secret was ever committed: rotate the secret (history
  keeps it forever — removal is not enough).
- Never force-push `main`. Never commit directly to `main` except merge/hotfix.
- Multi-repo ecosystems: when a change spans repos, use the SAME branch name and tag
  version in all of them, and note in each commit message which sibling repos are part
  of the change ("part of schema-v2 with tip-admin, tip-wa-bot").
- Before ANY deploy: `git status` must be clean — never deploy uncommitted code (you
  can't roll back to a state that was never recorded).

## For the AI doing the work
- Commit only when asked or when the session ends per the rules above; write messages
  describing WHY, ending with the standard co-author line.
- Before merging to main, show Pragyesh the plain-language change list.

## Failure this prevents
Live app broken by half-finished work, un-rollbackable deploys, secrets in public
history, "which version is live?" mysteries.

## Linked
[[W31-ENVIRONMENTS-DEV-STAGING-PROD]] · [[W50-PRODUCTION-LAUNCH-GATE]]
