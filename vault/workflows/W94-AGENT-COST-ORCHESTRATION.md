# W94 — Multi-Agent Work at Minimum Cost, Full Quality

Trigger: any task big enough to spawn multiple agents (audits, migrations, bulk
analysis, large refactors) where doing it all on a top-tier model would burn
serious money. This is W82's theory turned into an orchestration recipe.

## The one principle everything follows
**Put the intelligence in the SOP, not in the executor.** A cheap model
following a precise SOP written by a top-tier model outperforms a top-tier
model improvising — because the SOP embodies the expensive model's judgment
once, then gets executed N times at cheap-model prices. The vault itself is
this principle at civilization scale.

## The cost math (why this works)
N parallel big-model agents ≈ N × full price, with correlated blind spots.
1 big-model planning pass + N cheap executors + 1 big-model merge ≈ 10–25% of
that cost — and often BETTER coverage, because lanes with fixed checklists
don't skip the boring checks that improvising geniuses skip.

## Procedure
1. **Big model writes the lane map.** Split the task into lanes that are
   DISJOINT (no lane's answer depends on another's) and JUDGMENT-FREE inside
   (every decision pre-made by the checklist). If a lane can't be made
   judgment-free, it stays with the big model — that's the routing test.
2. **One W84 envelope per lane**, containing: the exact input files (nothing
   more), the checklist with pass/fail wording, the output schema — findings as
   `{location, evidence (quoted), severity, suggested fix, confidence}` — and
   the escape hatch ("if a decision isn't covered, STOP and list it under
   UNSURE"). The UNSURE section is mandatory in the schema; it's where cheap-
   model honesty lives.
3. **Redundancy only where errors are expensive.** For high-stakes lanes (money
   path, auth), run TWO cheap agents independently on the same envelope and
   diff the findings: agreement → likely real; disagreement → escalate that
   item (only that item) to the big model. Two cheap agents + arbitration is
   still ~⅓ the cost of one big agent, with better error-catching than either
   alone. Low-stakes lanes run single.
4. **Workers run parallel, write to files, never converse** (W93 rule).
5. **Big model merges:** dedupe, rank by severity × confidence, then SPOT-CHECK
   before believing — re-verify the top 3 findings and 2 random ones against
   the actual code/data. Spot-check failure rate >20% → that lane's envelope
   was bad; fix the envelope and rerun the lane (don't hand-patch results).
6. **Write back** (W83): lane map + envelope fixes go to the registry so the
   next audit starts from a better SOP. The SOPs compound; the spend doesn't.

## What must never be delegated down
Writing the lane map · anything in the forbidden zone (W82 §6) · final
severity calls on money/auth findings · the merge. Cheap models FIND; they
never DECIDE or FIX in place.

## Worked example
"Check the security of the advisor app" → don't spawn 6 Opus agents. Big model
loads W43, instantiates its 6 lanes as envelopes with the app's actual file
lists, fans out to DeepSeek/Haiku-class workers (auth lane doubled per step 3),
merges and spot-checks. Full recipe: W43.

## Failure this prevents
$100 multi-agent runs that a $12 orchestration matches; cheap-agent findings
accepted unverified; the same audit re-planned from zero every quarter.

## Linked
[[W82-CHEAP-MODEL-LEVERAGE]] · [[W84-SMALL-MODEL-PROMPT-PACK]] · [[W93-AGENT-ARCHITECTURE]] · [[W43-SECURITY-AUDIT-SOP]] · [[05-MODEL-ROUTING]] · [[W35-COST-CONTROL]] · [[W83-CONTEXT-NEURAL-NETWORK]]
