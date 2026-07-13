# W99 — Agent Governance: When to Spawn, When to Ask, When to Kill

Trigger: the moment BEFORE any agent is created. W93 asks "does this need an agent
at all?"; this doc governs the decision, the owner's role, and the kill rules.
Harness-agnostic.

## The spawn ladder (try each rung before the next)
1. **Do it inline** — default. One session with the vault beats a spawned agent
   for anything under ~30 minutes: no context re-derivation, no handoff loss.
2. **Script it** — steps known in advance → a script (with an LLM call at judgment
   points if needed). Deterministic, testable, free to re-run. (W93 step 0.)
3. **One agent** — solution path unknown, work self-contained, brief writable in
   full (W97). Background it only if you genuinely don't need the result to
   continue.
4. **Multiple agents** — only when the independence test passes (W96) AND the
   work exceeds one runner's reliable horizon. Fleets are the LAST rung, not the
   impressive first move.
Spawning has real costs the ladder guards against: each agent starts cold (pays
full context re-derivation), multiplies token spend, and adds a verification
burden (W98) that lands on YOU.

## Which kind of agent (match runner to task, not to fashion)
- **Read-only explorer** — search/summarize/audit; cannot write; cheapest to
  verify (nothing to undo). Default kind whenever the deliverable is knowledge.
- **Executor** — writes artifacts inside strict boundaries; W97 brief; mid or
  small model per 05/W82.
- **Reviewer** — adversarial read of someone else's artifact (W98 L3); never
  reviews its own producer's context.
- **Long-runner/daemon** — cron jobs, watchers (W25 rules: idempotent, status
  doc, dead-man alert). The only kind that outlives a session on purpose.
A task needing two kinds = two agents (W96), not one hybrid with mixed powers.

## When the OWNER must be asked before spawning (the consent gate)
Ask the human who owns the work — before creating the agent — when ANY of:
1. The fleet will spend real money beyond trivial (tokens, API fees, compute) —
   state the estimate and get a yes.
2. Any agent would touch production data, deploy, send anything outward, or act
   under the owner's identity (his GitHub, his WhatsApp, his email). W08 §6
   applies to agents exactly as to you — delegation doesn't launder permissions:
   **an agent may never do what its creator would need permission to do.**
3. The decomposition embodies a business decision (what's in scope, what order,
   which product) rather than a technical one — W02's founder/model line.
4. The work will outlive the session (daemons, scheduled jobs) — standing
   processes on someone's infrastructure are theirs to approve.
Otherwise: spawn without asking, but LOG it (below). Asking about rung-1 trivia
is noise; not asking about money/production/identity is a violation.

## Budget and kill rules (set at spawn time, not during the fire)
- Every agent gets: token/money cap, wall-clock cap, iteration cap (W93 §4).
- Kill immediately when: caps hit · stuck detector fires (same action, same
  result, twice) · output drifting outside BOUNDARIES · the plan it serves has
  changed (orphaned agents burn budget serving dead plans).
- Killed ≠ lost: durable outputs (W97 §5) mean a killed fleet resumes from disk —
  reconstruct briefs, relaunch only the missing pieces (today's TIP-graph
  recovery is the worked example).

## The spawn log (one line per agent, kept with the task state)
`when · kind · brief-ref · caps · why this rung of the ladder`.
The log is what lets the owner audit "what did my AI create while I slept" — and
what lets session N+1 take over a fleet without forensics.

## Failure this prevents
Agent sprawl (fleets as a reflex), money spent without consent, agents acting on
the owner's identity unasked, immortal daemons nobody remembers, dead fleets that
take their work with them.

## Linked
[[02-QUESTION-PROTOCOL]] · [[08-FINAL-GATE]] · [[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[W82-CHEAP-MODEL-LEVERAGE]] · [[W93-AGENT-ARCHITECTURE]] · [[W96-TASK-DECOMPOSITION-FOR-AGENTS]] · [[W97-AGENT-BRIEFING-CONTRACT]] · [[W98-AGENT-VERIFICATION]]
