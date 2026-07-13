# W96 — Breaking Work Into Agent Tasks

Trigger: a job is too big for one session/agent and must be split across several.
Harness-agnostic: applies to Claude Code subagents, claude-flow swarms, LangGraph,
CrewAI, cron-driven scripts, or human contractors — the rules are about the WORK,
not the runner. Companions: W93 (one agent's anatomy), W94 (cost), W97 (briefing).

## The independence test (the only valid split line)
Two pieces may become two agents ONLY if, during execution, neither needs the
other's in-progress thinking. Test: "can I write both briefs COMPLETELY before
either starts?" If brief B depends on what agent A discovers, it's not parallel —
it's sequential (A finishes → its output becomes part of B's brief).
Corollary: dependent work split "for speed" runs SLOWER — the coordination and
conflict repair cost more than the parallelism saves.

## Valid split shapes (choose one; don't invent hybrids)
1. **Fan-out over data** — same procedure, disjoint inputs (per repo, per file
   batch, per account). Safest shape; conflicts impossible by construction.
2. **Pipeline** — stages with a defined artifact between them (extract → merge →
   analyze). Split at artifact boundaries ONLY; each stage's output schema is the
   next stage's input contract, written down before stage 1 runs.
3. **Perspectives on one artifact** — N read-only reviewers (security, cost,
   correctness) over the same input, one merger. Reviewers never write; only the
   merger writes. (Write-write on one artifact is the forbidden shape.)

## Sizing rules
- One agent-task = one deliverable, verifiable in ONE step by the orchestrator.
  If verifying it needs a checklist of five different things, it's five tasks.
- Size to the runner's reliable horizon, not its maximum: a task should fit
  comfortably — context near the limit degrades exactly like C07 describes.
- Prefer 5 boring tasks over 2 heroic ones: retry cost = one small task, not half
  the job. (Today's lesson: a killed 7-agent batch lost only the unfinished 3
  because each chunk was independently sized and wrote its own file.)

## The decomposition procedure
1. Write the END artifact spec first (what does "assembled and done" look like).
2. Cut backward from it into pieces along one split shape above.
3. For each piece write: deliverable, input files, output path, acceptance check.
4. **Collision map:** list every file/resource each piece touches; any overlap →
   redraw the cut or serialize those two pieces. No exceptions.
5. Name the MERGE owner before starting — assembling is a task too, with its own
   brief; unowned merges are where fan-outs die.
6. Dry-run one piece end-to-end before launching the fleet: the first piece
   debugs the BRIEF, cheaply. Then launch the rest unchanged.

## Deterministic joints
Wherever two agents' outputs must combine, make the joint deterministic: shared
ID schemes (same input → same ID, so duplicates merge instead of colliding),
fixed schemas, exact file paths. Agents may be creative INSIDE a task; the
boundaries between tasks are contracts, not suggestions.

## Failure this prevents
Parallel agents deadlocked on each other's undecided outputs, write conflicts on
shared files, N outputs nobody can assemble, re-running a whole job because one
oversized piece died at 90%.

## Linked
[[C07-LONG-TASKS]] · [[W93-AGENT-ARCHITECTURE]] · [[W94-AGENT-COST-ORCHESTRATION]] · [[W97-AGENT-BRIEFING-CONTRACT]]
