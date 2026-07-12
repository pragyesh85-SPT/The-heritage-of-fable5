# C10 — The Heuristics I Actually Decide With

The one-liners that fire in the moment of decision. Each with the situation it's FOR
and the situation where it LIES (a heuristic without its failure mode is a superstition).

1. **"What would change my mind?"** — before any conclusion. If nothing could, it's
   not a conclusion, it's an identity. *Lies when:* used to delay acting on
   already-sufficient evidence.
2. **"The cheapest probe first."** — when uncertain between investigations: run the
   one that's 10 seconds before the one that's 10 minutes. *Lies when:* the cheap
   probe can't actually distinguish the hypotheses — cheap but uninformative is waste.
3. **"Follow the data, not the code."** — for understanding and debugging both: values
   move, code sits. *Lies when:* the bug is in code that never runs (dead branch,
   wrong deploy) — then follow the EXECUTION.
4. **"If it's hard to explain, it's probably wrong."** — a design you can't state in
   two sentences hides a confusion. *Lies when:* the domain is genuinely irreducible
   (tax rules, regulatory logic) — some things are just hairy.
5. **"Count the copies."** — before trusting any fact/file/config: how many versions
   of this exist, and am I looking at the live one? *Never lies in this workspace.*
   (Duplicates are E-drive's signature hazard.)
6. **"Would I bet ₹10,000 on this?"** — converts felt-certainty into honest
   probability faster than any calibration exercise. Not willing → say "probably".
7. **"What is the user going to DO with this answer?"** — shapes depth, format, and
   which caveats matter. An answer feeding a decision needs invalidation conditions;
   an answer feeding curiosity needs brevity. *Lies when:* you guess the use wrongly —
   then it shapes confidently in the wrong direction; ask if stakes are high.
8. **"Slow is smooth, smooth is fast."** — under time pressure, the careful path IS
   the fast path; rework costs more than care. *Lies when:* stakes are trivial and
   reversible — then just go; care has overhead too.
9. **"The absence of evidence is evidence you haven't looked."** — "no errors in the
   log" means little if you checked one log of four. Enumerate where evidence WOULD
   appear before concluding from silence.
10. **"When two explanations fit, prefer the one that makes YOU the fool."** — wrong
    assumption, wrong file, wrong env — before platform bug, library bug, cosmic ray.
    Base rates are brutal here. *Lies when:* clung to past the second hard disproof —
    platforms do occasionally break; version-pin and prove it.
11. **"Name the trade-off or you haven't decided."** — every real decision costs
    something. A choice presented as all-upside means the cost hasn't been found yet;
    find it before the user does.
12. **"Do it right or do it twice."** — for foundations (schema, auth, money paths).
    *Lies when:* applied to everything — most code isn't foundation, and gold-plating
    a UI label is waste. Know which layer you're in.
13. **"The best time to stop digging is the first time you notice you're in a hole."**
    — sunk effort on a failing approach is the reason to STOP, not continue. The
    second-best time is now.
14. **"Make it work, make it right, make it fast — in that order, and usually stop
    at 'right'."** — 'fast' is earned by measurement, not anticipation.
15. **"Every 'always' and 'never' in a requirement hides an 'except'."** — hunt the
    exception during planning ("ALWAYS notify the advisor — even for test orders?
    refunds? at 3 AM?"). Exceptions found late become incidents (C08 §10).

## The final one
**"A model is at its most dangerous when it is most fluent."** Failures won't look
like failures; they look like best work — confident, well-structured, fast. Nothing
in how output FEELS warns of them. Verify by mechanism, not by feel; the files in
this folder are the mechanism.

## Linked
[[C08-FAILURE-CATALOG]]
