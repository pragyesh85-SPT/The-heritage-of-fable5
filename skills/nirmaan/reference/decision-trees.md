# DECISION TREES — concrete logic for the recurring judgment calls

> **Consult when facing one of these decisions.** These turn the protocol's principles into step-by-step logic the agent can follow consistently, instead of deciding ad-hoc each time. They encode judgment the founder is relying on. Each tree ends in an action, and most point back to the relevant file.

---

## Tree 1 — Should I act autonomously, or ask the founder? (Law 12)

```
Is the action IRREVERSIBLE (delete data, send to real users, move money, force-push)?
├─ YES → ASK (offer a recommended default).
└─ NO → Does it COST MONEY (paid plan, domain, paid API, more compute)?
        ├─ YES → ASK (state the cost + options).
        └─ NO → Does it depend on a BUSINESS RULE only the founder knows
                 (pricing, refund policy, who-sees-what, brand voice, limits)?
                ├─ YES → ASK (offer your best-guess default).
                └─ NO → Does it touch REAL USER DATA or a SECURITY/LEGAL/COMPLIANCE judgment?
                        ├─ YES → ASK (or flag and recommend an expert).
                        └─ NO → ACT autonomously; note it in STATE.md/DECISIONS.md.
```
When you ask, **always include a recommended default** so the founder can just approve. When in genuine doubt, a quick plain-language check beats a costly wrong assumption.

---

## Tree 2 — Existing project: rebuild, keep-and-fix, or hybrid? (per app)

```
Run the audit first (audit/audit-existing-project.md). Then, PER APP:

Is the CONCEPT + DATA MODEL fundamentally sound?
├─ NO  → lean REBUILD.
└─ YES → Is the STACK reasonable and current (not abandoned/wrong-for-the-need)?
         ├─ NO  → lean REBUILD (or rebuild this app on the Nirmaan stack).
         └─ YES → Are the SECURITY/DATA FOUNDATIONS broken at the root
                   (hand-rolled auth/payments, no migrations, model can't support the product)?
                  ├─ YES → lean REBUILD of the broken core.
                  └─ NO  → Is the breakage mostly the MISSING 20%
                            (validation, error handling, tests, monitoring) — bolt-on-able?
                           ├─ YES → KEEP-AND-FIX (remediate by severity: 🔴→🟠→🟡).
                           └─ MIXED → HYBRID: keep the sound parts, rebuild the broken ones
                                       (often via strangle-fig: new alongside old, migrate flow-by-flow).
```
Always: **stop the bleeding first** (rotate leaked secrets, back up, add monitoring) before deep work. Present per-app recommendations with plain trade-offs; the founder chooses; log it.

---

## Tree 3 — AI: hosted model or local model?

```
Is there a HARD constraint — must run OFFLINE, on MINIMAL hardware, or data must stay PRIVATE/on-prem?
├─ YES → LOCAL (Ollama/llama.cpp + a local OpenAI-compatible API + local STT/TTS).
└─ NO  → Is COST at expected volume a serious concern AND the task simple/high-volume?
         ├─ YES → ROUTE: cheap/small or local model for simple/bulk turns, hosted strong model for hard ones.
         └─ NO  → HOSTED model via a typed AI SDK (best quality, zero infra).
```
Either way: validate model output, cap + monitor cost, handle model-down with a fallback, disclose AI to real people (`stack/integration-recipes.md` Recipe 3).

---

## Tree 4 — Is this phase actually DONE? (the anti-false-victory gate)

```
Did the AUTOMATED TESTS for this work pass?
├─ NO  → NOT DONE. Fix.
└─ YES → Did I RUN the app and exercise the feature myself, including a FAILURE path?
         ├─ NO  → NOT DONE. Go run it.
         └─ YES → Is the 20% present (server-side validation, the four states,
                   idempotency, server-side permissions, external-call failure handling,
                   observability hooks)?
                  ├─ NO  → NOT DONE. Bake it in.
                  └─ YES → Did I check I didn't BREAK earlier features (regression)?
                          ├─ NO  → NOT DONE. Re-run prior tests / spot-check the core flow.
                          └─ YES → DONE. Tick phases.md, update STATE.md, commit.
```
"I wrote the code" is never "done." Tested + exercised + 20% present + no regressions = done.

---

## Tree 5 — A fix isn't working. What now? (the two-strike rule)

```
How many times have I tried to fix THIS same issue?
├─ 1st or 2nd attempt → Try again with a clear, specific change.
└─ 2 attempts FAILED → STOP patching (context is now polluted).
        → Re-state the problem from first principles in writing (symptom, tried, learned).
        → Is it a decision only the founder can make?
           ├─ YES → ASK the founder.
           └─ NO  → New hypothesis + different approach,
                    OR start a FRESH session with a clean prompt that includes what was learned.
        → Once fixed: add a REGRESSION TEST so it can't return.
```

---

## Tree 6 — Should this be its own phase, or part of the current one?

```
Can it be planned, built, AND verified within roughly one focused session?
├─ YES → it can be a phase (or a task in the current phase if small + related).
└─ NO  → SPLIT it into smaller phases, each ending in something verifiable.

Does it BLOCK other work (foundation, data model, auth, deploy skeleton)?
├─ YES → schedule it EARLIER (dependencies first).
└─ NO  → schedule by value/priority.

Is it a cross-cutting concern (validation, error handling, observability)?
└─ It is NOT a separate phase — it's baked into EVERY phase (the 20%).
```

---

## Tree 7 — Should I add this dependency/tool?

```
Does the DEFAULT STACK already cover this need?
├─ YES → use the default; don't add another tool.
└─ NO  → Is there a clear, recorded reason (archetype need / founder override)?
         ├─ NO  → don't add it; reconsider whether it's needed at all.
         └─ YES → Is the candidate WELL-MAINTAINED and WIDELY-USED (not abandoned/single-maintainer-risk)?
                  ├─ NO  → find a maintained alternative (check reference/100-repos.md).
                  └─ YES → Is it on a CRITICAL path (auth, payments, data)?
                           ├─ YES → extra scrutiny; prefer the most proven option.
                           └─ NO  → add it; record it + why in DECISIONS.md.
```
Fewer dependencies = fewer breakages. Each one is a forever maintenance cost.

---

## Tree 8 — Is it safe to deploy?

```
Are ALL phases ✅ in phases.md?                                  ── NO → not yet.
Did Release Verify pass with 0 MUST-FIX (production-readiness)?  ── NO → fix, re-verify.
Is observability live (errors + uptime + analytics)?            ── NO → wire it first.
Are backups configured AND a restore tested?                    ── NO → set up + test.
Is the deploy pipeline reproducible WITH a rollback ready?      ── NO → make it so.
Any remaining items explicitly accepted by the founder as known limitations? ── record them.
ALL YES → DEPLOY (then production smoke test). Otherwise → loop back.
```

---

## How to use these trees

When you hit one of these recurring decisions, **walk the matching tree** rather than improvising. They exist so the same judgment is applied every time, in line with the Twelve Laws and the founder's interests — and so the founder can trust that "rebuild vs fix," "ask vs act," and "is it done" are decided consistently, not by mood.
