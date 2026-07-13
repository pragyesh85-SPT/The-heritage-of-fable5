# W98 — Verifying Agent Work (Self-Checks + Orchestrator Gates)

Trigger: any agent output about to be accepted — subagent result, swarm lane,
generated artifact, contractor delivery. Harness-agnostic.
Principle (inherits C06): an agent's confidence about its own work is not evidence.
Verification is LAYERED — each layer catches what the one below can't see.

## Layer 1 — Self-verification (built into the agent's own brief)
The brief ends with a verify step the agent runs on ITSELF before reporting:
- Mechanical checks it can run: parse the JSON it wrote, run the tests, re-read
  the output file from disk (not from memory of writing it), count against the
  input ("21 files listed → all 21 processed? name the skipped").
- The mandatory UNSURE list (W97 §7): what it guessed, what it couldn't confirm.
- Self-verification catches execution slips. It CANNOT catch a misunderstood
  brief — the agent verifies against its own (mis)reading. That's Layer 2's job.

## Layer 2 — Orchestrator acceptance gate (never skipped, never delegated)
On every result, in order — cheap checks first:
1. **Existence & shape:** the artifact is at the promised path, parses, matches
   schema. (Today's precedent: 7 "running" agents left 0-byte outputs — a report
   without an artifact on disk is a rumor.)
2. **Acceptance lines from the brief**, one by one, against the ARTIFACT — not
   against the agent's report of the artifact.
3. **Read the UNSURE field first**, then spot-check the rest informed by it.
4. **Sample by risk:** mechanical fan-out → inspect 1 in N deeply; judgment tasks
   → read the whole diff; money/auth/irreversible → full review, no sampling.
5. **Cross-boundary probe:** did it touch anything outside its BOUNDARIES?
   (`git status` / file mtimes across the collision map from W96.)

## Layer 3 — Independent verification (for outputs that matter)
- **Two-route:** a second agent (or a script) recomputes the answer a DIFFERENT
  way; compare. Disagreement = the hard part, isolated (C11 §6.2).
- **Adversarial reviewer:** a reviewer agent briefed ONLY to find what's wrong —
  never the same agent that produced it, and not sharing its context (shared
  context = shared blind spots).
- **Reality check:** for anything user-facing, exercise the flow itself (load the
  page, hit the endpoint). Agents inherit C08 §6 — their tests passing ≠ working.

## Verdicts (the only three)
ACCEPT (all gates pass) · REWORK (gate failed → fix the brief per W97 hygiene,
re-run; two REWORKs on the same task = wrong decomposition or wrong executor tier,
escalate per W96/05) · ESCALATE (agent reported BLOCKED, or the failure implicates
the plan itself → back to the human/planner, not another retry).

## Bookkeeping (what makes fleets debuggable)
Per task, record one line: agent, brief version, verdict, gate that failed.
Patterns in this ledger are the real output — "lane 3 fails schema twice a week"
is a brief bug you can fix once; without the ledger it's forever "agents are flaky".

## Failure this prevents
Rumor-results accepted because the report sounded complete, misunderstood briefs
"verified" by their own misreader, one polluted lane silently corrupting a merge,
serial rework with no learning.

## Linked
[[C06-SELF-VERIFICATION]] · [[C08-FAILURE-CATALOG]] · [[C11-TIER-GAP-COMPENSATION]] · [[W96-TASK-DECOMPOSITION-FOR-AGENTS]] · [[W97-AGENT-BRIEFING-CONTRACT]]
