# W91 — Architecting a Memory System (for an agent, an app, or a person)

Trigger: designing how any AI system remembers across sessions — agent memory,
user-facing "remembers you" features, or a new knowledge base like this vault.

## The four memory types (design each explicitly; mixing them is the failure)
| Type | Contains | Lifetime | This vault's instance |
|---|---|---|---|
| Working | the current task's context | one session | the loaded context window |
| Episodic | what happened (logs, transcripts) | short — distill then discard | session transcripts |
| Semantic | distilled durable FACTS | long, curated | `_REGISTRY\` cards |
| Procedural | how to do things (SOPs) | long, versioned | W-docs and craft docs |

## Design rules (each earned by a failure)
1. **Distill, never transcript.** Storing raw conversation as memory rots into
   contradictions. Episodic → semantic conversion is a deliberate write-back step
   (the W83 sleep protocol), not an automatic dump.
2. **One fact, one place.** Duplicated facts diverge; the second copy is a future
   bug. Link (`[[wikilink]]`) instead of copying.
3. **Index always loaded, bodies just-in-time.** A one-line-per-note index
   (MEMORY.md / INDEX.md pattern) fits in any context; bodies load only when the
   task matches. This is the smallest-high-signal-tokens principle from C12.
4. **Every memory needs a decay policy.** Facts carry dates; anything relative
   ("last week") converts to absolute at write time; quarterly review deletes or
   re-verifies stale notes (W80). Unmaintained memory is worse than none — it's
   confident staleness.
5. **Write-back is an obligation, not a feature.** A session that learned
   something and didn't write it back stole from the next session. Build the
   write step into the loop's exit, not into good intentions.
6. **Retrieval must be dumb-model-proof.** If finding the right note requires
   judgment, cheap models will load the wrong one. Fixed load orders (W81),
   trigger-worded titles ("When X, load Y"), and explicit links do the judgment
   in advance.

## Storage decision (files → vector DB, in that order)
Plain linked Markdown files until: >≈5,000 notes, OR recall must be fuzzy
("something about a refund bug last year"), OR multiple machines/agents need
concurrent writes. Only then add embeddings/GraphRAG (W83 lists options) — and
keep the files as source of truth; the index is derived, rebuildable, never
authoritative.

## Verification
Cold-start test: a fresh model with ONLY the index must reach the right note in
≤2 hops for 10 sample questions. Any miss → fix titles/links, not the model.

## Failure this prevents
Memory that grows into a contradictory swamp; agents that re-learn the same
lesson weekly; vector databases bought to solve what a naming convention solves.

## Linked
[[W80-PROJECT-REGISTRY]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[04-MEMORY]] · [[C12-EXTERNAL-CANON]] · [[W92-RAG-ARCHITECTURE]]
