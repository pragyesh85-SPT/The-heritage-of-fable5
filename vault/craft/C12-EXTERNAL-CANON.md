# C12 — External Canon: Field-Proven Practices (Distilled 2026)

Distilled from published agent-engineering research and practice (sources at bottom).
Only DELTAS are included — things the rest of this vault doesn't already say.
Re-distill yearly: the field moves; this page carries a date for that reason.
Last distilled: 2026-07-12.

## 1. The governing principle of context engineering (Anthropic)
"Find the smallest set of high-signal tokens that maximize the likelihood of the
desired outcome." Every context decision — what to load, keep, summarize, discard —
optimizes this ratio. Practical corollaries beyond what W81/W83 already implement:
- **Just-in-time exploration beats pre-loading:** don't front-load files "in case";
  fetch when the task step needs them. An agent exploring on demand outperforms one
  drowning in preparation.
- **Context order matters:** stable instructions first, memory/cards next, task
  material last. Reordering mid-task wastes attention; keep the frame constant.
- **Compaction preserves decisions, discards transcripts:** when compressing history,
  keep architectural decisions, unresolved bugs, and constraints; drop raw tool
  outputs and resolved back-and-forth. (This is the sleep protocol's principle applied
  mid-session.)

## 2. Drift is the dominant failure mode of agentic coding (2026 consensus)
Not generation errors — DRIFT: confident, plausible code that solves a slightly
different problem than intended, discovered in review. Analysis of ~400k agentic
sessions: humans make the planning decisions, agents the execution decisions, and the
strongest predictor of success is how precisely the human FRAMED the work and whether
verification points were requested. Consequences for this vault's use:
- The founder's framing time is the highest-leverage minutes of any session — a
  2-line sharper framing saves hours of rework. Models should ASK for framing
  sharpness (02) rather than compensate with confidence.
- Verification checkpoints belong in the REQUEST ("build X; show me the flow working
  before styling it"), not only at the end.

## 3. Spec-driven development (SDD) — the maturing standard
For any feature beyond trivial: a short, VERSION-CONTROLLED spec is written first and
becomes the source of truth — the code derives from it, not vice versa. The cycle is
instruct → verify → refine, continuously; a spec is never "write once."
Vault integration (the delta beyond C03's contract habit):
- Feature specs live in the repo (`specs/<feature>.md`), 20–60 lines: behavior,
  non-goals, acceptance checks. The W84 envelope's ACCEPTANCE section is generated
  FROM the spec, so small models inherit intent mechanically.
- When output drifts from spec, fix the SPEC first if the spec was wrong — then the
  code. Divergence with an untouched spec is how "nobody knows what's true" starts.
- Spec-writing improves by feedback: phrasing that confused a model once gets
  rewritten in the next spec, not repeated (same loop as template H, applied to specs).

## 4. Conditional skill/context packs (AGENTS.md ecosystem)
The field converged on the same shape this vault uses: composable instruction packs
loaded ONLY when relevant, instead of one giant always-on prompt. Validation, and one
refinement worth adopting: each W-doc's Trigger line is the load condition — keep
triggers precise enough that a model can match them mechanically, and prune any W-doc
whose trigger never fires in 6 months.

## 5. Long-running agent harness lessons
- Agents perform to the quality of their FEEDBACK LOOPS: a task where the agent can
  see results (run tests, load the page, query the DB) reliably outperforms one where
  it flies blind. When delegating, hand over the verification MEANS, not just the task.
- One in-flight change at a time per workspace; parallelism belongs at the level of
  independent tasks (05's rule, confirmed by field data).

## Sources
- anthropic.com/engineering/effective-context-engineering-for-ai-agents
- anthropic.com/engineering/effective-harnesses-for-long-running-agents
- blog.allegro.tech/2026/06/spec-driven-development-best-practices.html
- addyosmani.com/blog/good-spec/
- thebcms.com/blog/spec-driven-development
- github.com/ai-boost/awesome-harness-engineering

## Linked
[[C03-WRITING-CODE]] · [[02-QUESTION-PROTOCOL]] · [[05-MODEL-ROUTING]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[W84-SMALL-MODEL-PROMPT-PACK]]
