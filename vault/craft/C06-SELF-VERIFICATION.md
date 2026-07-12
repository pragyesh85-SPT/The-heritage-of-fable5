# C06 — Self-Verification: Catching Your Own Errors First

Generation and checking are DIFFERENT modes. The mind that wrote it can't see its
faults while still in writing mode — you must deliberately switch: change role
("hostile reviewer"), change direction (read backward, bottom-up), or change medium
(run it instead of reading it). Same mode twice = same blind spots twice.

## Numbers
- **Two-route rule:** any number that matters gets computed twice by DIFFERENT routes
  (script vs mental estimate; sum-of-parts vs total). Match → trust. Mismatch → the
  script wins, but find out WHY they differed — the discrepancy usually points at a
  misunderstanding bigger than the number.
- **Fermi gate:** before trusting any computed result, ask "what magnitude SHOULD this
  be?" 40,000 orders/day for a ghee brand fails the sniff test regardless of how it
  was computed. Order-of-magnitude intuition catches what arithmetic can't.
- **Unit/date walk:** paise vs rupees, percent vs fraction, DD/MM vs MM/DD, timezone.
  Wrong-unit answers look EXACTLY like right answers. Say the units out loud once.

## Code (beyond running it)
- **Re-read the diff as saboteur:** "I want this to break in review — where do I
  point?" Different question than "is this right?" — finds different bugs.
- **Boundary walk:** for every loop and slice, check the first element, the last, and
  the empty case, by hand, with a concrete example. Off-by-ones cluster at boundaries;
  concrete beats abstract for catching them.
- **The edit really landed?** After editing: is this file the one actually imported/
  built/deployed? (Duplicate files, build caches, wrong branch — C04's "wrong code"
  problem applies to your own edits.)

## Claims and answers
- **Re-read the QUESTION immediately before sending.** The single highest-yield check
  that exists. Long work drifts; you answered something adjacent — a better question,
  a harder question, but not theirs. Ask: "did I answer what was asked, all of it,
  and only it?"
- **Source-tag pass:** for each factual claim in your draft — can I point at where
  this came from? (C01). Claims that fail get verified, labeled, or cut.
- **The inversion test for recommendations:** "would I be able to defend the OPPOSITE
  recommendation with the evidence I have?" If yes almost as easily — your evidence
  doesn't actually decide the question; say that instead of picking with false
  confidence.

## Rationing (checking everything = shipping nothing)
Scale rigor to blast radius: money, auth, migrations, anything irreversible → full
protocol. A UI label → just look at it. The skill isn't maximal checking; it's
knowing which mistakes are expensive. But the MINIMUM for everything: re-read the
question, run what's runnable.

## The tell
Notice the impulse to skip verification "because it's obviously fine." That impulse
firing IS the signal — it fires hardest exactly when fluency is highest, and fluency
is not evidence (C00). The check you most want to skip is the one to run.

## Linked
[[C00-READ-ME-FIRST]] · [[C01-EPISTEMICS]] · [[C04-READING-SYSTEMS]]
