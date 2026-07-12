# W11 — Building a UI Component or Screen

Trigger: "add a screen / component / form / list / dashboard card".

## Parameters to fix first
1. **Which existing component is closest?** Copy its patterns (styling, state, data
   fetching). Consistency beats novelty — the app must feel like one hand built it.
2. **Data source:** which Firestore collection/query feeds it? Real-time listener or
   one-time fetch? (Live operational data → listener; reports → fetch.)
3. **Roles:** who sees it? Hide in UI AND enforce in security rules (W21).
4. **States — all four, always:** loading, empty ("No orders yet" with a helpful action),
   error (readable message + retry), success. AI-built UIs chronically skip empty/error.
5. **Mobile:** design at 360px width first. Touch targets ≥ 44px. His users are field
   agents on cheap Androids.

## Procedure
1. Find + read the closest existing component. Reuse its CSS utility patterns.
2. Build with dummy data → verify layout at 360px and desktop.
3. Wire real data → handle all four states.
4. India locale: ₹ with Indian grouping (1,00,000), DD/MM/YYYY, +91 phones.
5. Forms: validate on submit (not on every keystroke), disable button while submitting
   (double-submit creates duplicate orders — has real cost), show specific field errors.
6. Verify in the running app: click through the whole flow including the failure path
   (turn network off once).

## Failure this prevents
Screens that look done but break on empty data, double-submit duplicate orders,
desktop-only layouts field agents can't use.

## Linked
[[W21-FIRESTORE-SECURITY-RULES]]
