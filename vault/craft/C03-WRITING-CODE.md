# C03 — Writing Code That's Right the First Time

## Before the first line
1. **Say the contract out loud:** inputs, outputs, and what must NEVER happen (the
   invariants). If you can't state what must never happen, you don't understand the
   feature yet — and the code will faithfully encode your confusion.
2. **Walk the data, not the code:** trace one concrete example end-to-end BY HAND
   ("order #123, ₹450, agent A7 → link created → webhook → commission 9%= ₹40.50 →
   payout row"). Writing code before you can walk one example = generating plausible
   text, not engineering.
3. **Find the pattern to copy.** In an existing codebase, the second-best design that
   matches the codebase beats the best design that doesn't. Consistency is a feature;
   novelty is a cost.

## The edge-case enumeration (run the litany EVERY time — the bugs live here)
For every input: **empty · exactly one · many · duplicate · maximum/huge · zero ·
negative · unicode/emoji · whitespace · null/undefined vs missing · already-exists ·
concurrent (two at the same instant) · slow/failed midway.**
You don't have to HANDLE all of them — you have to DECIDE about each. The bug reports
of the world are this list, unread.

## Shape rules (the ones that pay compound interest)
- **Make illegal states unrepresentable.** One `status` enum, not four booleans that
  can contradict (`isPaid && isCancelled` = who wins?). If two fields can disagree,
  someday they will.
- **Parse, don't validate:** convert raw input into a trusted shape at the BOUNDARY,
  once; the interior never re-checks. Sprinkled validation = missed validation.
- **One source of truth per fact;** everything else derived or explicitly labeled a
  copy (with its refresh rule). Two authoritative copies WILL diverge.
- **Guard clauses over nesting:** handle the exceptional cases early and return; the
  happy path reads straight down the left margin.
- **Names are your spec:** if the honest name is `handleDataAndAlsoSendEmail`, the
  design is wrong. Rename until names are honest; the refactor falls out.
- **Errors: catch only where you can DO something** (retry, default, report). An empty
  catch block is a bug you're scheduling for a future stranger.
- **Idempotency for anything triggered by the outside world** (webhooks, queues,
  clicks): design so running twice = running once. The outside world always delivers
  twice eventually.

## The diff discipline
- Smallest change that fully solves it. Every line you touch is a line you can break;
  drive-by improvements smuggle risk into a tested change.
- Write in testable bites: code a little, RUN a little. Never write 300 lines then run
  once — errors compound and bury each other. First run of any new chunk should happen
  within ~30 lines of writing it.
- Re-read your own diff before declaring done, as a hostile reviewer: "where does this
  break?" You will find something surprisingly often — that's the point.

## AI-specific honesty
Your code comes out FLUENT — well-shaped, well-named, confident. Fluency hides bugs
from reviewers (and from you). Compensate with mechanical verification: run it, feed
it the edge litany, print intermediate values. Never let beautiful code skip the
checks ugly code would get.
