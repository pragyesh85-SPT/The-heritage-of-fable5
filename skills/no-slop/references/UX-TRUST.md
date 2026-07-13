# UX-TRUST — Behavior, Friction, and the Trust Layer

UI is how it looks (GOOD-UI.md); this is how it BEHAVES and whether people
believe it. A beautiful page that feels untrustworthy converts worse than a
plain one that feels solid. Full protocol: vault W14; this pack is the
build-time distillation + the trust patterns.

## Behavior floor (every interactive surface)
- Acknowledge every action <100ms (pressed state / optimistic update).
- >1s waits show progress; >5s frees the user (background + status).
- Success states answer "what now" (show the link + share button + where to
  track — never a dead-end checkmark).
- Errors: what happened + what to do, in user language; NEVER lose typed input;
  never dead-end.
- Forms: fewest fields, smart defaults, validate on blur, correct mobile
  keyboards (inputmode), labels above fields, one column.
- Back button always works; destructive actions never adjacent to frequent ones.
- Weak-network reality (India field use): queue writes, show sync state
  honestly, never silently drop an entry.

## Friction audit (run on any flow that "isn't converting / isn't used")
Walk it on a real phone counting: taps · waits · decisions · typed characters ·
"what do I do now?" moments. Each count is a ranked fix. Kill DECISIONS first
(defaults beat options); merge inputs second; explain waits third. Users leave
at friction, not at missing features.

## The trust layer (what makes a site feel reliable enough to pay money on)
Trust is specific, verifiable, and boring. Build it with:
1. **Identity:** real business name, place, and a reachable human channel
   (WhatsApp number for Indian D2C) visible in the footer of every page.
2. **Money clarity:** before any pay button — the exact amount, what it buys,
   delivery expectation, and what happens next. After — a reference ID worth
   screenshotting. Surprise at checkout = abandoned cart + lost trust.
3. **Policies that exist:** refund/return/shipping pages in plain language,
   linked where doubt occurs (next to price, not buried).
4. **Specific evidence over adjectives:** "8-hour Athpaheri process, daylight
   only" beats "premium quality". Numbers, dates, process photos, named people.
   Real reviews with names/dates; NO invented testimonials ever — one fake
   detected poisons everything true.
5. **Consistency signals:** same prices everywhere (site = payment link =
   invoice), working links, no lorem fragments, current year in footer. Small
   inconsistencies read as scam-tells even when innocent.
6. **Restraint as credibility:** no fake urgency, no popup stacking, no
   discount theater. Calm sites read as established; shouting reads as
   desperate.
7. **Security honesty:** payment via recognizable gateway (Razorpay checkout),
   https, no requests for data the transaction doesn't need (W32/W40 apply
   underneath).

## Reliability as UX
Perceived reliability = does it behave the SAME every time: same action → same
result → same wording. Idempotent buttons (double-tap ≠ double order — W25),
stable layout (no content jumping as things load: reserve space), predictable
navigation (things stay where they were yesterday). Novelty is the enemy of
the returning user's muscle memory — evolve layouts, don't rearrange them.

## The cold-user gate (mandatory before "done")
One person who has never seen the flow completes the primary task, silently
observed, zero help. Hesitations and wrong taps = the defect list. Two failures
on the same step = that step is broken regardless of how logical it looks.
