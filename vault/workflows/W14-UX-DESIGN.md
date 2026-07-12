# W14 — UX: Designing How It Works (Not How It Looks)

Trigger: any new screen/flow, any "users are confused / not using it" complaint.
W13 covers appearance; this covers behavior. UX failures cost more than UI failures —
an ugly tool that's obvious gets used; a pretty one that confuses gets abandoned.

## Parameters per screen (decide before building)
1. **The one job:** every screen has ONE primary task. Name it. Count the taps/fields
   from screen-open to task-done; reducing that count is the whole game. Secondary
   actions exist but visually defer.
2. **The user model (his three audiences):**
   - Field advisor/agent: cheap Android, sunlight, one hand, mid tech literacy,
     Hinglish labels help, interruptions constant → big targets, forgiving flows,
     resumable state.
   - Admin/owner: dense information, comparisons, keyboard, "show me everything" →
     tables, filters, bulk actions; whitespace is a COST here.
   - Customer: trust is the product → clarity about money, no surprises, visible
     policies, minimal choices per step.
3. **Flow before screens:** write the journey as steps; mark every WAIT, every
   DECISION, every INPUT. Kill decisions (defaults), merge inputs, explain waits.
   Each removed decision is worth more than any visual polish.

## Behavior rules
- **Acknowledge every action <100ms** (pressed state, optimistic update for
  reversible ops). Unacknowledged taps get re-tapped → duplicate orders (W11).
- **Waits >1s show progress; waits >5s free the user** (background job + status doc,
  W24) — never trap someone watching a spinner for a network they don't control.
- **Success states answer "what now":** after creating a payment link → show the link,
  the share button, and where to track it. Dead-end success screens strand users.
- **Error UX:** say what happened + what to do, in the user's language ("Payment link
  couldn't be created — check internet and tap retry"), NEVER lose their typed input,
  never dead-end (always a retry or a way back).
- **Forms:** fewest possible fields; smart defaults; validate on blur not keystroke;
  correct mobile keyboards (`inputmode=numeric` for phones/amounts); label above
  field; one column.
- **Navigation:** ≤5 primary destinations; current location always visible; system
  back button always works (PWA route handling); destructive actions never adjacent
  to frequent ones.
- **Offline/weak network (field reality):** queue writes locally where feasible, show
  sync state honestly ("saved, will sync"), never silently drop a field agent's
  collection entry recorded in a no-signal area.
- **Money UX (trust):** before any pay/confirm button — the amount, what it's for,
  and what happens next, on one screen. After — a reference ID they can screenshot.
- **Accessibility floor:** contrast ≥4.5:1, targets ≥44px, meaning never carried by
  color alone.

## The friction audit (run on any existing flow that "isn't being used")
Walk the real flow on a real phone, counting: taps, waits, decisions, typed
characters, and moments of "what do I do now?". Each count is a fix-list item, worst
first. Users abandon at friction points, not at feature gaps — check friction before
building more features.

## The acceptance test
One cold user (or the founder acting cold) completes the primary task with ZERO
verbal help while you watch silently. Every hesitation and wrong tap = a defect.
Two failed attempts on the same step = that step is broken regardless of how logical
it looks. This 10-minute test outperforms any amount of internal review.

## Failure this prevents
Features that work but don't get used, duplicate submissions, field data lost to weak
networks, checkout abandonment from money ambiguity, "users keep calling to ask how".

## Linked
[[W11-UI-COMPONENT]] · [[W13-UI-ANTI-SLOP]] · [[W24-SCALING-AND-TRAFFIC]]
