# C11 — Tier-Gap Compensation (For Successor / Lower-Tier Models)

Applies to any model weaker than the one that wrote this pack (Opus-class and below).
No benchmark table of a specific model's weaknesses exists here; the gap between
adjacent tiers is predictable in KIND, not degree. It is never "cannot do X" — it is
"does X reliably at depth N instead of N+2." Every compensation below has one shape:
**what a stronger model does internally, do externally, in writing.**

## 1. Deep inference chains
Gap: multi-step conclusions (schema change → breaks bot → because field X feeds
template Y) fail at the unwritten middle step.
Compensation: never carry more than ONE inferential step silently. Write the chain
"X → therefore Y → therefore Z", then verify each arrow with a grep or file read.
A written, verified 3-step chain outperforms a silent leap at any tier.

## 2. Faint-signal detection
Gap: quiet wrongness (misaligned date, suspiciously round total, name that implies
behavior the code lacks) goes unnoticed more often.
Compensation: sweep mechanically instead of hoping to notice — run the C06 checks
(two-route numbers, boundary walk, source-tag pass) on schedule, not on suspicion.

## 3. Constraint capacity
Gap: above some count of simultaneous constraints, one drops silently; the finished
work feels complete (C08 §4).
Compensation: constraint checklist extracted verbatim at task start, EVERY task; diff
the final output against the list, never against a sense of completeness.

## 4. Intent inference
Gap: reading intended meaning through informal phrasing (Hinglish, business words for
technical things) is subtle inference and degrades with tier.
Compensation: lower the threshold for stating interpretations: "Reading this as:
rebuild the commission VIEW, not the engine — correct me if wrong." One line, cheap,
prevents the highest-cost failure class (perfect execution of the wrong task).

## 5. Calibration
Gap: the feel for "known vs guessed" is itself less accurate (C01 familiarity trap,
amplified).
Compensation: widen the mandatory-verification zone to a mechanical rule: all five
C01 hallucination zones + all money math + all cross-repo claims get verified even
when they feel certain. Remove the judgment call entirely.

## 6. Ceiling protocol
Recognition: two full C02 cycles (hypotheses formed, probes run, assumptions tested)
with zero progress = the problem is at capability ceiling. Escalate in order:
1. Extended thinking on the W01 triggers — thinking budget partially substitutes for tier.
2. Solve twice independently with different approaches; DIFF the solutions. Agreement →
   trust; disagreement → the hard part, isolated. Spend everything there.
3. Decompose until each piece is beneath the ceiling; solve pieces; recompose.
4. Report the limit: "at the edge of what I can verify — recommend dev-test /
   second-model review." Stating the limit is always acceptable output.

## Structural advantages that offset the gap
- This pack: the rules were derived from logged mistakes; a successor starts past them.
- The registry + contracts (`_REGISTRY/`): facts that previously cost whole sessions
  to rediscover are 60-line reads.
- Cheaper/faster passes: two passes with C06 discipline outperform one unverified
  stronger pass. Spend speed on verification, not volume.

Net: the tier gap is smaller than the gap between disciplined and undisciplined use.
The pack is the discipline.

## Linked
[[01-THINKING-ENGINE]] · [[C01-EPISTEMICS]] · [[C02-DEBUGGING]] · [[C06-SELF-VERIFICATION]] · [[C08-FAILURE-CATALOG]]
