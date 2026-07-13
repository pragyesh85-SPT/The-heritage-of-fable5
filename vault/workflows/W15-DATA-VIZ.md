# W15 — Charts & Dashboards Without Lying or Slop

Trigger: any chart, graph, KPI card, analytics view, or report visual (Recharts
in his stack, but tool-agnostic). Companion: W13/W14 for the surrounding UI.

## Rule zero — the question decides the chart
Every chart answers exactly ONE question, stated first: "is revenue growing?"
(line) · "which advisor sells most?" (sorted bar) · "what share is
subscriptions?" (2–4 slice donut max, else bars) · "is collection efficiency
healthy?" (single number + trend spark). No question = no chart — a dashboard
is answers, not decoration.

## The honesty rules (charts can lie by accident)
1. Bar charts start at ZERO, always. Truncated axes manufacture drama.
2. Time axes have even intervals; missing periods shown as gaps, not skipped.
3. Don't plot cumulative when the question is about rate (cumulative always
   looks like growth).
4. Currency in the user's units (₹ with Indian grouping); thousands as 1.2L /
   3.4Cr for Indian business users — spell the convention once per view.
5. Two metrics with different units → two axes is a last resort (usually two
   charts); dual-axis charts mislead more than they inform.
6. Percentages sum to 100 or say why not.

## The slop list for charts (banned per W13 logic)
Gradient-filled areas by default · 3D anything · donut with 9 slices ·
rainbow category palettes · gridlines darker than data · legends for a single
series · animated counting numbers · sparkline-per-card when nobody asked a
trend question.

## Design tokens for data (extends GOOD-UI tokens)
- ONE data color for single-series charts (the brand accent); multi-series gets
  a 4-step categorical set chosen once, used everywhere (same metric = same
  color across ALL screens — advisors learn "gold = revenue").
- Semantic reserved: green up-good, red down-bad — never decorative.
- Text hierarchy: the NUMBER is biggest, the label quiet, the change indicator
  (+12% vs last month) colored and adjacent. A KPI card is typography, not art.
- Axis text ≥11px, muted; gridlines barely-there; data ink dominates.

## Dashboard composition
1. Order by decision frequency: today's money/orders top-left, diagnostics
   below the fold.
2. Max ~6 primary tiles per view; more = nothing is primary.
3. Every number clickable through to its detail list (aggregate → evidence),
   or operators stop trusting it.
4. Comparison context on every KPI (vs yesterday / same day last week) —
   a number without comparison is trivia.
5. Empty/zero states designed: a new tenant's dashboard must look intentional,
   not broken (W11 litany applies).

## Verification (charts have their own C06)
Recompute one plotted value by hand from the source data (the two-route rule).
Then the density test: view at real data volumes — 3 orders AND 3,000. Then
the honesty pass: would this chart survive an accountant's cross-examination?

## Failure this prevents
Dashboards that decorate instead of answer, truncated-axis panic, rainbow
noise, KPIs nobody can drill into or believe.

## Linked
[[C06-SELF-VERIFICATION]] · [[W11-UI-COMPONENT]] · [[W13-UI-ANTI-SLOP]] · [[W14-UX-DESIGN]]
