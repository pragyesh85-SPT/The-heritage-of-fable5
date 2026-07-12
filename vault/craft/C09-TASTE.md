# C09 — Taste: What "Good" Looks Like

Taste is compressed judgment — knowing what good looks like before you can articulate
why. It can't be transferred whole, but its rules of thumb can. These are mine.

## UI/design taste (the 80/20 of "looks professional")
1. **Spacing is the whole game.** Amateur UIs die by inconsistent gaps. One spacing
   scale (4/8/12/16/24/32/48), used everywhere, no exceptions. Double the whitespace
   you think you need around groups; group related things TIGHT, separate unrelated
   things WIDE. Proximity = meaning.
2. **One accent color.** Neutrals (grays/off-whites) for 90% of the screen, ONE brand
   accent for the actions that matter, semantic red/green ONLY for status. Multi-color
   UIs read as toys.
3. **Hierarchy through weight and size, not decoration.** The screen must answer "what
   do I look at first?" — one big thing, few medium things, everything else small and
   quiet. Borders are the last resort; spacing and background shifts do it cleaner.
4. **Text: 2 fonts max, ~4 sizes, line-height ~1.5 for body, never pure black on pure
   white (#1a1a1a on #fafafa), max ~70 characters per line.**
5. **Motion: 150–250ms, ease-out, on user-triggered changes only.** Animation that
   loops or exceeds 300ms is noise. Motion should CONFIRM ("you clicked, it moved"),
   never decorate.
6. **Empty, loading, error states designed on purpose** — that's where an app feels
   professional or broken, because that's where users are anxious (C03 litany, W11).
7. **The squint test:** blur your eyes at the screen. Can you still tell what's
   important and what's clickable? If everything blurs into equal gray mush, there's
   no hierarchy — start over on weight/size/spacing.

## Code taste
- **Boring beats clever, every time it matters.** Clever code optimizes for the
  writing moment; boring code optimizes for the hundred reading moments. If a junior
  can't follow it, it's a liability with good syntax.
- **Deletion is the highest-value edit.** Code you removed can't break, can't confuse,
  can't need updating. Celebrate negative diffs.
- **Duplication is cheaper than the wrong abstraction.** Copy twice, watch, and only
  unify when the THIRD copy proves the pattern is real. Premature abstraction couples
  things that wanted to evolve apart — far more expensive than repetition.
- **A function should do what its name says, completely, and nothing else.** The test
  of a design: can you name every piece honestly in ≤4 words? (C03 naming rule.)

## Architecture taste
- **Choose boring technology.** Every novel component spends an innovation token you'll
  repay in 3 AM debugging of something nobody on Earth has documented. His stack
  (React+Firebase) is boring in the best way — protect that.
- **The data model is the architecture.** Get the nouns and their relationships right
  and the code writes itself; get them wrong and no amount of clean code saves you.
  Spend planning time on schema, not folder structure.
- **Optimize for deletability.** You can't predict what changes, but you can build so
  pieces detach cleanly. Small modules, narrow interfaces, one-way dependencies.
- **Do the simplest thing that could work — then LISTEN to it.** Scaling problems
  announce themselves with data (slow query, hot doc); speculative complexity for
  imagined scale is paid in real bugs today for hypothetical users tomorrow.

## Writing taste (documents, reports, explanations)
- The first sentence carries the whole message; everything after is elaboration for
  those who want it (inverted pyramid — nobody reads to the end, plan for it).
- One idea per paragraph. Cut every sentence that doesn't change what the reader
  knows or does. "Somewhat", "quite", "very" — delete on sight.
- Concrete beats abstract: "commission of ₹40.50 on a ₹450 order" teaches more than
  "a percentage-based commission structure".

## The meta-rule of taste
When something feels slightly off — a name that almost fits, a layout that's nearly
balanced, an abstraction that mostly works — that feeling is DATA. Don't override it
with "it's fine." Stop and find what the feeling knows. Taste whispers; deadline
pressure shouts; the whisper is usually right.

## Linked
[[C03-WRITING-CODE]] · [[W11-UI-COMPONENT]]
