# Contributing

This vault grows the way it was designed to grow — through documented failure.

**Good contributions:**
- A new W-doc for a task type the vault doesn't cover, in the standard shape
  (Trigger / Parameters / Procedure / Verification / Failure it prevents) —
  see the meta-procedure in `vault/craft/C13-HOW-I-THINK.md`.
- A sharpened rule: you followed a procedure, it failed in a specific way, and
  you can state the correction as a trigger→action pair. Update the doc in
  place (never fork a near-duplicate) and say what happened in the PR.
- Broken `[[wikilinks]]`, factual errors, or dated practices flagged against
  `vault/craft/C12-EXTERNAL-CANON.md`'s yearly re-distillation.

**Not a fit:**
- Advice ("be careful with X") — rewrite it as an executable rule or it can't
  merge. If a rule needs judgment to apply, it isn't finished.
- Stack-specific content presented as universal. Worked examples are welcome;
  label them as examples.
- Anything from your private registry layer. Sanitize before it leaves your
  machine.

**PR checklist:** doc follows the standard shape · linked into the matching
INDEX · `## Linked` footer updated on every touched file · no personal data,
no secrets, no live-system findings.
