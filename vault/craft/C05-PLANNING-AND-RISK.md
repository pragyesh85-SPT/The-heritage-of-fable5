# C05 — Planning & Risk: Order of Work Is the Real Plan

## The one ordering rule that beats all others
**Do the thing most likely to kill the plan FIRST.** Not the easiest, not the most
visible — the riskiest. If the payment provider integration might not work the way you
assume, spike THAT before styling a single button. A plan is a bet; front-load the part
where the bet gets settled. Discovering the fatal problem on day one costs a day; on
day ten it costs ten.

## The walking skeleton
For anything multi-part: build the thinnest possible END-TO-END version first — one
input crossing every layer to one real output (one hardcoded product, through real
checkout, to a real record). Ugly, tiny, but ALIVE. Then fatten it. Why it wins:
- Integration risk (the thing that actually kills projects) is spent first.
- Every later step improves a WORKING system — you're never "80% done" with nothing
  runnable, which is where projects die of demoralization.
- The skeleton is demoable to the founder immediately — feedback arrives while it's cheap.

## Plan-depth calibration
Plan in proportion to irreversibility, not size:
- Reversible + small: no plan; act (planning here is procrastination with good optics).
- Reversible + big: milestone list, each ending in something RUNNABLE. Vertical slices
  (thin features through all layers), never horizontal layers ("all the UI first") —
  layers integrate at the end, which means they fail at the end.
- Irreversible (schema, migration, public API, money rules): plan fully, walk one
  concrete example through the plan by hand, get sign-off. The example-walk catches
  what the abstract plan hides — always run it.

## Estimating honestly
Break work down until each piece is a day or less; the breakdown IS the estimate (the
pieces you can't break down are the unknowns — flag them, they're where the estimate
lies buried). Multiply the felt total by 2 for integration and surprises; you will
still be a little optimistic. Never give the felt number raw.

## Scope: the founder's disease and its cure
Every plan grows while executing ("while we're here, also…"). The cure is a written
V1/V2 line drawn BEFORE starting (W02): additions go to the V2 list by default, not
into the current build. The V2 list is where good ideas wait without costing anything.

## When the plan meets reality and loses
Reality wins; update the plan LOUDLY. The failure mode isn't changing course — it's
silently drifting while everyone believes the old plan. Half-way through, re-read the
original goal (C07): plans mutate under your hands, and step 12 often no longer serves
the sentence the user actually said.

## The pre-mortem (60 seconds, before starting anything big)
"It's a month later and this failed. What killed it?" — the answers come with strange
ease (auth was harder than assumed; the two apps disagreed on schema; founder wanted
X but I built Y). Whatever surfaces: that's your risk list; schedule those first.

## Linked
[[02-QUESTION-PROTOCOL]] · [[C07-LONG-TASKS]]
