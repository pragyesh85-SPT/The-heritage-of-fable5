# W82 — Getting Real Work From Cheap Models (DeepSeek/Haiku class)

Trigger: using a low-cost model for project work, alone or under a bigger model.

## What cheap models are actually bad at (design around these)
1. Judgment with incomplete information → they guess confidently.
2. Holding many constraints at once → they drop rule #7 of 10.
3. Knowing when to stop → they "helpfully" exceed scope.
4. Self-verification → they declare success without checking.

## The compensating system (this is what the whole CLAUDE-BRAIN enables)
1. **Narrow the task until judgment is unnecessary.** "Fix the commission bug" → NO.
   "In `commissionEngine.js`, `calculateCommission()` returns X for input Y; expected Z
   per SCHEMA.md line N. Fix ONLY that function. Don't touch other files." → YES.
2. **Feed the fixed context pack, nothing more:** registry card (W80) + the specific
   files + the ONE workflow doc that applies. More context = more places to get lost.
3. **Demand a fixed output schema:** "Return: (a) files changed, (b) diff, (c) how you
   verified, (d) anything you were unsure about." Field (d) is where their honesty
   lives — always include it.
4. **Give an escape hatch, explicitly:** "If this requires a decision not covered by
   the instructions, STOP and ask — do not guess." Without written permission to stop,
   cheap models always guess.
5. **Verification is external:** run the tests / render the output / review the diff
   yourself or with a stronger model (W05 draft/review pattern). Never accept a cheap
   model's own "it works".
6. **Forbidden zone regardless of instructions** (from W05): payments, auth, security
   rules, migrations, deletes, anything cross-repo.

## Task suitability list
GOOD: boilerplate components from an example, format conversions, extracting/
summarizing many files, test scaffolds, translations, seed data, doc drafts,
repetitive refactors with an exact recipe.
BAD: debugging unknowns, architecture, anything in the forbidden zone, tasks whose
spec contains the word "appropriately".

## The registry connection
The whole W80/W81 system is what makes a DeepSeek-class model useful across your 40
projects: the card + fixed loading order + one workflow doc gives it exactly the
context it can't be trusted to find itself.

## Failure this prevents
Cheap-model output that looked fine and cost a weekend, scope explosions, confident
hallucinated project facts.

## Linked
[[05-MODEL-ROUTING]] · [[W80-PROJECT-REGISTRY]] · [[W81-CONTEXT-LOADING-PROTOCOL]]
