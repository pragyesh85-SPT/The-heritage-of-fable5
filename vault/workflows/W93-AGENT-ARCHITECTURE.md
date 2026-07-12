# W93 — Architecting an Agent System

Trigger: any "build an AI that does X on its own" request — automations, coding
agents, research agents, ops bots. Companion: W94 (cost orchestration), W95
(the harness around agents).

## Step 0 — does this need an agent?
An agent is justified ONLY when the solution path is unknown at write time. If
the steps can be listed in advance, write a script that calls an LLM at the
judgment points — cheaper, testable, debuggable. "Agent" chosen for fashion is
the backend equivalent of UI slop.

## The anatomy (every agent is exactly these five; design each on purpose)
1. **Model** — routed by task difficulty (05-MODEL-ROUTING), not by habit.
2. **Tools** — few and orthogonal (each does ONE verifiable thing). A tool's
   result must be checkable by the agent: "search returned 0 rows" beats "done".
   Ten sharp tools beat thirty overlapping ones — overlapping tools make cheap
   models thrash.
3. **Loop** — perceive → decide → act → CHECK RESULT → repeat. The check step is
   what separates an agent from an expensive random walk.
4. **Stop conditions** — all three, always: success test (externally verifiable),
   budget cap (iterations AND tokens/money), and stuck detector (same action
   twice with same result → stop and report, don't loop).
5. **Memory** — state lives in FILES the agent reads/writes (W91), not in the
   chat transcript. Files survive restarts, context compaction, and model swaps.

## Guardrails (non-negotiable, from the ecosystem contract)
Forbidden zone regardless of instructions: payments, auth, security rules,
migrations, deletes, cross-repo writes (W82's list). Agents PROPOSE these;
humans or a top-tier model with explicit approval execute them. Every action an
agent can take must be one it can also undo, or it doesn't get the tool.

## Single agent until proven insufficient
Multi-agent is justified by exactly two things: (a) independent parallel lanes
over disjoint inputs (fan-out, W94), or (b) role separation where one agent's
output is another's input under a different objective (drafter→reviewer,
builder→tester). "Team of agents" as a vibe multiplies cost and error
correlation while halving debuggability.

## Orchestrator shape (when multi-agent is earned)
Planner (big model, writes the lanes and SOPs) → workers (cheap models, one
envelope each per W84) → merger (big model, dedupes/verifies/decides). Workers
never talk to each other — all coordination through the planner's written SOP
and the file system. Chatting agents = compounding hallucinations.

## Verification
Before shipping: run the agent on 3 tasks where YOU know the answer, including
1 impossible task — it must stop and say so, not fabricate success. An agent
that can't fail loudly is not deployable.

## Failure this prevents
Agents that burn $40 looping on a stuck step; multi-agent systems nobody can
debug; automations that touch the money path because nobody wrote the forbidden
zone down.

## Linked
[[05-MODEL-ROUTING]] · [[W82-CHEAP-MODEL-LEVERAGE]] · [[W84-SMALL-MODEL-PROMPT-PACK]] · [[W91-MEMORY-ARCHITECTURE]] · [[W94-AGENT-COST-ORCHESTRATION]] · [[W95-HARNESS-DESIGN]] · [[C07-LONG-TASKS]]
