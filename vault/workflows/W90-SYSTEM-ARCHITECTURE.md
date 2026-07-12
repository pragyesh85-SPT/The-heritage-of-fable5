# W90 — Architecting a System From Scratch

Trigger: designing any new app/service/backend, or a redesign big enough that data
moves. This is the order of decisions; skipping ahead is the failure mode.

## Parameters to fix before any diagram
1. Who writes each piece of data (one owner per fact — the W23 lesson generalized).
2. What is the money path / irreversible path (payments, deletes, sends). It gets
   the strictest design; everything else can be looser.
3. Real scale: current users ×10. Design for that, NOT ×1000 — premature scale
   architecture is the most expensive slop in backend form.
4. Who operates this (for this user: one non-technical founder + AI models →
   managed services beat self-hosted, always; fewer moving parts beats elegant).

## Procedure
1. **Data truth first.** List entities, owners, and relations on one page before
   choosing any technology (W20 has the modeling method). A system is its data
   model wearing clothes.
2. **Draw consistency boundaries.** Mark which facts must be correct NOW
   (balances, stock, auth) vs eventually (analytics, feeds, counters). Strong
   consistency inside a boundary, messages/jobs between boundaries (W25).
3. **Choose boring components.** Default stack here: Firebase/Firestore + Cloud
   Functions + hosting — because the registry, workflows, and this user's ops all
   assume it. Every deviation needs a written reason in the project card.
4. **Count moving parts.** Each independent service/queue/cron is a thing that
   pages you at 2am. Target: the minimum count that satisfies step 2.
5. **Enumerate failure before building** (C05): for each component ask "when this
   is down or slow, what does the user see, what data can corrupt?" A design where
   the answer is "money duplicates" goes back to step 2.
6. **Write the one-pager** into `_REGISTRY\<project>.md`: entities, boundaries,
   components, the money path highlighted, and the deviations-with-reasons list.

## Anti-patterns (banned without written justification)
Microservices for a one-team product · event sourcing without a replay
requirement · a queue between two things that could be one function · a second
database "for speed" before measuring · any component whose failure story is
"shouldn't happen".

## Verification — the new-engineer test
A model (or dev) reading ONLY the one-pager must be able to answer: where does
feature X live, what breaks if component Y dies, where is the money path. If it
can't, the architecture isn't done — the doc is the architecture.

## Failure this prevents
Systems that work in the demo and corrupt data under concurrency; rewrites caused
by nobody knowing which app owns a field; ×1000-scale plumbing that ×10 users pay
for monthly.

## Linked
[[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[C05-PLANNING-AND-RISK]] · [[W80-PROJECT-REGISTRY]] · [[W91-MEMORY-ARCHITECTURE]] · [[W93-AGENT-ARCHITECTURE]]
