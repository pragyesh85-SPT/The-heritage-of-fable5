# W10 — Creating SVGs and Graphics

Trigger: "make an SVG / logo / diagram / illustration / icon".

## Parameters to fix BEFORE drawing (ask only if unclear, else default)
1. **Purpose:** logo / diagram / illustration / icon / chart. Each has different rules.
2. **Canvas:** pick a viewBox and never draw outside it. Defaults: icon `0 0 24 24`,
   logo `0 0 512 512`, diagram `0 0 800 600` (wider if >6 nodes).
3. **Theme:** must it work on both light and dark backgrounds? If yes → no hardcoded
   white/black fills; use `currentColor` or two variants.
4. **Where it lives:** inline in React (make it a component with `props.className`),
   standalone file, or favicon (also export 32/180/512 PNG sizes).

## Procedure
1. **Plan coordinates on paper first.** Write the layout as numbers before any path:
   "title at y=40, three boxes at x=50/300/550, each 200×100, arrows between." Skipping
   this step is why AI-drawn SVGs overlap and misalign.
2. Draw back-to-front: background → shapes → connectors → text LAST (text on top).
3. Text rules: `text-anchor="middle"` for centered labels; font-size ≥ canvas-width/50;
   never let text width exceed its box (~0.6 × font-size × char count — check the math).
4. Connectors: use `marker-end` arrowheads defined once in `<defs>`; route with straight
   lines or single-bend paths, never spaghetti curves.
5. Palette: max 4 colors + neutrals. Use the brand color if the project has one
   (TIP = warm ghee gold/saffron family; Bharat-One = saffron).
6. Curves: prefer `rx` on rects and simple `Q`/`C` beziers. Complex organic shapes are
   where hand-written SVG fails — build from primitives instead.

## Verification (mandatory)
Render it — open the file in the browser or preview pane and LOOK at it. Check: nothing
clipped at edges, no overlapping text, readable at intended display size (zoom out to
actual size), works on dark background if required. Fix and re-render until clean.
"The code looks right" is not verification for graphics.

## Failure this prevents
Overlapping labels, clipped edges, invisible-on-dark logos — shipped because nobody rendered it.
