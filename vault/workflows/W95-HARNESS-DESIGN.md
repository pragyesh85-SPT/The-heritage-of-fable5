# W95 — Designing a Harness From Scratch

Trigger: building the SYSTEM around a model — a custom agent runtime (Claude
Agent SDK, Hermes, or hand-rolled), a new Claude Code-style setup, or wiring
this vault into any tool. An agent (W93) is one runner; the harness is the
racetrack, rules, and pit crew.

## The core insight (why harnesses exist at all)
A harness is compensating structure: every clause in a good harness exists
because some model, at some point, failed without it. Models don't improve by
being told "do better" — they improve by having the failure made structurally
impossible or immediately visible. Corollary: you design a harness by
enumerating failures (C08), not by listing features.

## The seven components (this vault maps onto all of them)
| # | Component | Job | Vault instance |
|---|---|---|---|
| 1 | Behavior contract | how to act, always | core files 00–10 as system prompt |
| 2 | Context loader | right knowledge, just-in-time | W81 + INDEX routing |
| 3 | Tool layer | verifiable actions | file/shell/search tools |
| 4 | Verification loop | catch failure before the user does | 08-FINAL-GATE |
| 5 | Memory write-back | sessions compound | W83 sleep protocol |
| 6 | Model router | intelligence per task, price per task | 05-MODEL-ROUTING |
| 7 | Failure ledger | mistakes become rules | template H + C08 |

## Build procedure (for any SDK/runtime)
1. Write the loop: load contract → load task context (component 2) → act via
   tools → verify (component 4) → write back (component 5) → stop. Stop
   conditions before features (W93 §4).
2. Component 1 stays SMALL and constant — behavior rules only, no knowledge.
   Knowledge enters through component 2 per task type. Mixing them is why
   naive harnesses blow their context on turn one.
3. Every tool returns evidence, not vibes: exit codes, diffs, row counts. If a
   tool's success can't be checked mechanically, redesign the tool before
   blaming the model.
4. Log every session (inputs, actions, verdict). The log feeds component 7 —
   a harness that doesn't learn from its failures is frozen at day-one quality.
5. Test the harness with a WEAK model first, deliberately. A harness that makes
   DeepSeek-class output acceptable is a good harness; one that only works with
   a frontier model is a prompt with extra steps. (This is also the cost play:
   harness quality is what lets you route work downward per W82/W94.)

## Grading a harness (four questions)
Can a fresh model start cold and know how to behave? (contract) · Does the same
mistake happen twice? (ledger) · Does quality survive a model downgrade?
(structure vs raw intelligence) · Does session N+1 start smarter than session N?
(write-back). Four yeses = the harness, not the model, is now the asset.

## Failure this prevents
"Smart model, chaotic results" setups; harnesses that are one giant prompt;
paying frontier prices because the structure can't support cheaper executors;
every session starting from zero.

## Linked
[[W93-AGENT-ARCHITECTURE]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[05-MODEL-ROUTING]] · [[08-FINAL-GATE]] · [[C08-FAILURE-CATALOG]] · [[C13-HOW-I-THINK]] · [[C12-EXTERNAL-CANON]]
