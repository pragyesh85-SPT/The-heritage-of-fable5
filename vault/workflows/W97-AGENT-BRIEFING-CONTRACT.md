# W97 — Briefing an Agent (The Task Handoff Contract)

Trigger: writing the instructions any agent receives — subagent prompt, swarm task,
SDK system prompt, or a ticket for a human developer. Harness-agnostic. W84 is this
contract specialized for small models; this is the general form for ANY executor.

## The iron law of briefing
**The agent has NOTHING but the brief.** Not your conversation, not your intentions,
not "obviously". Every silent assumption in your head is a decision the agent will
make differently. Write the brief for a competent stranger with amnesia — because
that is literally what an agent is.

## The seven sections (every brief, this order; empty sections stated as empty)
1. **GOAL** — one sentence, outcome-shaped ("chunk file X exists, valid JSON, all
   node refs resolve"), never activity-shaped ("work on the extraction").
2. **CONTEXT** — only what's needed: relevant file paths, the schema, the 5 facts.
   Over-briefing is real: burying the 3 load-bearing rules in 200 lines of backstory
   makes the agent drop rule 2. High-signal tokens only (C12 §1).
3. **BOUNDARIES** — what it must NOT touch/do, stated explicitly (files outside the
   list, deploys, deletes, external sends). Unstated boundaries don't exist.
4. **ACCEPTANCE** — checkable statements the orchestrator will verify (W98). If you
   can't write a checkable acceptance line, the task isn't defined yet — fix that
   before spawning, not after.
5. **OUTPUT** — exact deliverable format and exact destination path. "Write JSON
   matching this schema to this absolute path" survives orchestrator death;
   "return your results" dies with the parent. **Durable outputs to disk, always.**
6. **ESCAPE HATCH** — "if you hit a decision not covered here, STOP and report
   BLOCKED: <what's missing>. Stopping is a correct output." Without written
   permission to stop, every agent guesses (W84 rule, universal).
7. **REPORT** — what to say back: changed/verified/unsure. The UNSURE field is
   mandatory; it's where agent honesty lives.

## Calibration by executor strength (the one thing that varies)
- Frontier model: GOAL + BOUNDARIES can carry judgment ("prefer the existing
  pattern"); acceptance can be principles.
- Mid model: add worked examples; acceptance becomes concrete checks.
- Small model / script: zero judgment calls left in the brief; every decision
  pre-made; acceptance is mechanical (counts, schema validation). See W84.
Same seven sections in all three — only the freedom inside them changes.

## Brief hygiene
- One brief = one deliverable (W96 sizing). Two deliverables = two briefs.
- Self-containment test: could a person with NO access to you execute this from
  the text alone? Read it once as that person before sending.
- Reuse verbatim: a brief that worked is an asset — store it (registry note or
  prompt library) and rerun it unchanged; today's relaunch of three dead agents
  worked precisely because the original briefs were recoverable word-for-word.
- When an agent fails, fix the BRIEF first, executor second: most "agent was dumb"
  failures are briefs that assumed context the agent never had.

## Failure this prevents
Agents solving adjacent problems brilliantly, results that die with a killed
parent, guessed decisions dressed as completions, unrepeatable one-off successes.

## Linked
[[C12-EXTERNAL-CANON]] · [[W84-SMALL-MODEL-PROMPT-PACK]] · [[W96-TASK-DECOMPOSITION-FOR-AGENTS]] · [[W98-AGENT-VERIFICATION]]
