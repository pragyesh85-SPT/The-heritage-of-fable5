# W43 — Application Security Audit SOP (agent fan-out edition)

Trigger: "check the security of <app>" on any project YOU own. This is the
worked instance of W94's orchestration — the lane map is pre-written so no
model has to re-invent it. Baseline hygiene lives in W40; this doc is the
active hunt.

## The six lanes (disjoint by design — run in parallel)
| # | Lane | The single question | Feed the agent |
|---|---|---|---|
| 1 | AuthZ / RBAC | can role A do role B's action? | route list + rules/middleware + role definitions |
| 2 | Input & injection | does any user string reach a query/command/HTML unescaped? | all input handlers, API endpoints |
| 3 | Secrets & config | is any credential in code, bundle, logs, or client-readable config? | repo tree, env handling, build output |
| 4 | Dependencies | known CVEs, abandoned packages, install scripts? | lockfiles + `npm audit`/`pip-audit` output |
| 5 | Business logic / money | can the flow be abused in-order-but-unintended? (negative amounts, replayed webhooks, double-submit, self-referral) | payment + commission + ledger flows, W42 |
| 6 | Client exposure | what does the shipped bundle reveal? Firestore reads that rules don't restrict? | built client code, Firestore rules (W21) |

## Per-lane envelope (fill W84's template with this)
- Checklist wording is pass/fail: "For EACH route in the list, state which roles
  can reach it and quote the check that enforces it. A route with no quoted
  check = finding." No "look for problems" phrasing — enumerate, don't vibe.
- Output schema: `{lane, location (file:line), evidence (quoted code), attack
  story (one sentence: who does what), severity (see rubric), suggested fix,
  confidence (high/med/low)}` + mandatory UNSURE list.
- Escape hatch: "If you cannot see a file you need, STOP and name it. Do not
  infer its contents."
- Lanes 1 and 5 are money/auth → run doubled per W94 §3.

## Severity rubric (pre-made so cheap models don't decide)
CRITICAL: money moves wrong, or any user reads/writes another tenant's data.
HIGH: auth bypass on one role, secret exposed, injection reachable.
MEDIUM: needs an unlikely precondition, or leaks non-sensitive internals.
LOW: hygiene (headers, verbose errors, outdated-but-unexploited dep).

## Merge & verify (big model, never skipped)
1. Dedupe across lanes (one bug often surfaces in lanes 1 AND 6).
2. Reproduce every CRITICAL/HIGH against the real code before reporting —
   an unreproduced finding is a rumor. Log false positives back into the lane's
   envelope wording (W94 §6).
3. Report to the founder in attack stories, not jargon: "an advisor can mark
   another advisor's EMI as collected" — with the fix, its cost, and what
   breaks if unfixed. Ranked CRITICAL→LOW; fixes for CRITICAL proposed but
   executed per the forbidden-zone rule (top-tier model + explicit approval).

## Cadence & scope guard
Full six-lane run: pre-launch (W50 requires it) and after any auth/payment
change. Quarterly: lanes 3, 4, 6 only (cheap, mostly mechanical). This SOP
audits YOUR OWN apps — pointing it at systems you don't own is off-limits.

## Failure this prevents
"Security check" that was one model skimming for 10 minutes; six Opus agents
finding the same top-3 issues six times at 6× price; criticals reported in
language the founder can't act on.

## Linked
[[W40-SECURITY-BASELINE]] · [[W41-AUTH-AND-RBAC]] · [[W42-PAYMENTS-RAZORPAY]] · [[W21-FIRESTORE-SECURITY-RULES]] · [[W94-AGENT-COST-ORCHESTRATION]] · [[W84-SMALL-MODEL-PROMPT-PACK]] · [[W50-PRODUCTION-LAUNCH-GATE]]
