# 05 — Model Routing

Which model (or subagent) does which work, and how much thinking to spend.

## The routing principle

Route by **blast radius × ambiguity**, never by how big the task looks.
A 3-line change to commission math is top-model work. A 3,000-line boilerplate CRUD
scaffold is small-model work. Ask: **"If the output were subtly wrong, would anyone
notice before it hurt?"** If no → biggest model + verification. If yes (compiler,
tests, or eyeballs catch it immediately) → smaller model is fine.

## The table

| Work | Model | Why |
|---|---|---|
| Architecture, system design, migration plans | **Top model** (Opus/Fable) | Wrong early decisions cost weeks |
| Anything touching money: Razorpay, EMI math, commissions, refunds | **Top model, always** | Subtle errors = real financial loss |
| Firestore security rules, auth, RBAC | **Top model, always** | Silent failure = data breach |
| Cross-repo changes (TIP ecosystem schema) | **Top model** | Breakage appears in a different repo |
| Debugging a weird bug (obvious cause ruled out) | **Top model** | Needs assumption-hunting |
| Standard feature on an established pattern ("add a filter like the existing one") | **Sonnet** | Pattern-following, verifiable |
| Writing tests for existing code | **Sonnet** | Failures are self-announcing |
| UI polish, component styling, animations | **Sonnet** | Visually verifiable instantly |
| Docs, README, commit messages | **Sonnet** | Low blast radius |
| Bulk mechanical work: renames, format conversion, extracting lists from many files, translations, boilerplate | **Haiku** | Speed matters, correctness is checkable |
| Summarizing many files/logs for a bigger model to reason over | **Haiku** (fan-out) | Cheap parallel reading |

## The draft/review pattern (best cost-quality trade)

For medium tasks: **small model drafts → top model reviews the diff.** Review costs a
fraction of generation. Never the reverse (top model drafts, no review, small model
"checks" — small models rubber-stamp).

## Hard rules

1. **Haiku never touches:** payments, auth, security rules, migrations, deletes.
2. **No model deploys or migrates without the diff being reviewed** (by the top model or
   by Pragyesh reading the plain-language summary).
3. **When in doubt, route up.** The cost difference is trivial next to one bad EMI bug.

## Thinking budget (same logic, applied within one model)

- **Extended/deep thinking ON:** the seven hard-thinking triggers in `01-THINKING-ENGINE.md`
  (money, auth, multi-repo, migrations, weird bugs, conflicting requirements, "impossible").
- **Thinking OFF / minimal:** mechanical edits, pattern-following, formatting, lookups,
  anything where the plan is obvious and verification is instant.
- Thinking substitutes for NOTHING observable: if running it answers the question, run it.

## Subagent fan-out (when to parallelize)

- Use parallel subagents when the task splits into independent pieces with no shared
  state: auditing 4 repos, summarizing 50 files, generating N similar components.
- Do NOT parallelize dependent work (schema design → then the code that uses it) — the
  agents will diverge and you'll pay more fixing conflicts than you saved.
- Every subagent gets: a self-contained brief (it has none of your context), the exact
  deliverable format, and the relevant file paths. Vague briefs produce garbage.

## Linked
[[01-THINKING-ENGINE]]
