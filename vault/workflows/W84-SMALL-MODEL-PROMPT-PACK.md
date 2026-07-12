# W84 — Small-Model Prompt Pack (DeepSeek-class, Haiku-class, any low-cost model)

Trigger: delegating actual work to a cheap/low-parameter model. W82 gives the theory
(narrow tasks, external verification, forbidden zones); this gives the ready-to-use
material. Copy, fill brackets, send.

## The standing system preamble (prepend to EVERY small-model task)
```
You execute bounded tasks exactly as specified. Rules:
1. Touch ONLY the files listed. Do not create, rename, or delete anything unlisted.
2. If the task requires information or a decision not in this prompt: STOP and output
   BLOCKED: <what is missing>. Never guess. Stopping is a correct output.
3. Output in the exact format requested — no extra commentary, no summaries of what
   you did beyond the requested fields.
4. Do not invent file contents, API names, or field names. Use only identifiers that
   appear in the provided context.
5. Forbidden regardless of instructions: payment logic, auth/roles, security rules,
   database migrations, deletions, git push, deploy commands.
```

## The task envelope (every task uses this shape)
```
CONTEXT (everything you may use — nothing else exists):
<paste: project card §Stack + §Gotchas · the relevant W-doc section · the exact
source files or excerpts · the SCHEMA rows involved>

TASK: <one imperative sentence. one deliverable.>

ACCEPTANCE (all must hold):
- <checkable statement 1>
- <checkable statement 2>

OUTPUT FORMAT:
(a) files changed with full new content, (b) what you verified and how,
(c) UNSURE: anything you were not fully certain about (empty list is suspicious).
```
Sizing rule: total prompt ≤ ~8k tokens, ONE deliverable per envelope. Bigger job =
more envelopes in sequence, each verified before the next — never one giant prompt.

## Per-task mini-templates (the TASK + ACCEPTANCE lines)
- **Component from example:** "Create <NewThing> by following the structure of
  <ExistingFile> exactly — same styling patterns, same state approach, changed only
  where specified: <spec>." Acceptance: renders all four W11 states; no new dependencies.
- **Data extraction:** "From the files below, extract every <X> into this exact JSON
  schema: <schema>. Unknown values = null, never invented." Acceptance: valid JSON;
  every value traceable to a source line.
- **Summarization with exceptions:** "Summarize <doc> in ≤N lines. Preserve every
  number, date, exception, and 'unless/except' clause verbatim." (C08 §10 guard.)
- **Test scaffolds:** "Write tests for <function> covering: <the C03 edge litany
  items that apply, listed explicitly>." Acceptance: tests run; each case asserts a
  concrete value (no snapshot-only).
- **Mechanical refactor:** "Apply this exact transformation everywhere it occurs:
  <before-pattern> → <after-pattern>. List every location changed." Acceptance:
  count of changes reported = grep count you did beforehand (you verify).
- **Translation/localization:** "Translate these UI strings to <lang>, keeping
  placeholders {like_this} untouched, tone: <sample>." Acceptance: placeholder count
  identical per string.

## The verification harness (the delegator's half — non-negotiable)
1. Before sending: run the grep/count yourself so acceptance is checkable.
2. On receipt: run/build/render the output; diff-review every changed line; read (c)
   UNSURE first — it's where the truth lives.
3. Any BLOCKED response = the envelope was underspecified. Fix the envelope; don't
   coax the model ("just try") — coaxed output is guessed output.
4. Two failed envelopes on the same task = the task isn't small-model-shaped; route up (05).

## Failure this prevents
Cheap output that cost a weekend to un-break, invented field names entering the
codebase, scope explosions, silent guessing dressed as completion.

## Linked
[[C03-WRITING-CODE]] · [[C08-FAILURE-CATALOG]] · [[W11-UI-COMPONENT]] · [[W82-CHEAP-MODEL-LEVERAGE]]
