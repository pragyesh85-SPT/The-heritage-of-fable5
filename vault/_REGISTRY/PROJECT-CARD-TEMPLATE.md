# <project-name> — <one-line: what it is and for whom>

Status: <live / building / paused> · Stack: <e.g. React + Firebase> ·
Repo: <path or URL> · Last verified: <YYYY-MM-DD>

## What this is (3 lines max)
<What the product does, who uses it, what stage it's at.>

## Architecture one-pager (from W90)
- Entities & owners: <entity → which app/service owns writes to it>
- Consistency boundaries: <what must be correct NOW vs eventually>
- Components: <the moving parts, fewest possible>
- **Money path:** <exactly where money/irreversible actions flow — strictest rules apply here>
- Deviations from default stack + written reason: <or "none">

## Ground truth a model must know before touching this project
- <fact 1 — e.g. "commissions are calculated in Cloud Function X, nowhere else">
- <fact 2 — e.g. "the admin panel and advisor app share the `users` collection; admin owns it">
- <fact 3>

## Current state / open threads
- <YYYY-MM-DD> <decision made or work in flight>

## Mistakes that became rules here (template H)
- <date> <what went wrong → the rule that now prevents it>

## Linked
[[<ecosystem-contract-if-any>]] · [[<related-project-card>]]
