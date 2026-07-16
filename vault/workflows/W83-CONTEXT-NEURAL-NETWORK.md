# W83 — The Context Network: Full Project Memory in a New Chat, Minimal Tokens

Trigger: setting up or maintaining per-project knowledge so that a NEW chat on the
same project "remembers everything" without rereading source files.
Extends W80 (registry) + W81 (loading). This is the design that makes them scale.

**Automation:** the `/neuron` skill (v1.0.0, `skills/neuron/` in the heritage repo)
executes this entire protocol as one command — bootstrap, wake, sleep, link
(integrated repos), status, rebuild — storing the vault as `.neuron/` INSIDE each
repo so context travels with `git clone`. This doc remains the protocol authority;
the skill is its executable form.

## The principle
A model cannot "remember" across chats — but it doesn't need to. It needs the
DISTILLATE: decisions, facts, structures, and gotchas, stored as small linked notes
that load in seconds. Rereading source files to rebuild understanding is the expensive
path; reading notes WRITTEN BY the previous session's understanding is the cheap path.
The network of notes is the memory. Sessions read it to wake up and write to it to
sleep. Source code remains the truth for CODE; the network is the truth for MEANING
(why it's built this way, what broke before, what was decided).

## Structure (inside this vault — Obsidian-native)
```
CLAUDE-BRAIN\_REGISTRY\
  INDEX.md                      ← all projects, one line each
  <project>.md                  ← the card (W80 schema, ≤150 lines) = the project's HUB
  notes\<project>--<topic>.md   ← atomic notes, linked from the card
```
**Atomic note rule:** one note = one durable fact-cluster (a decision, a subsystem's
behavior, an incident postmortem, a schema contract). 10–40 lines. Fixed shape:
```markdown
# <project> — <topic>
updated: <date> · confidence: verified | reported | assumed
FACT: what is true, stated plainly
WHY: the reason/decision behind it (1–3 lines)
LINKS: [[<project>]] [[related-note]] · code: <repo-relative path(s)>
```
Notes link to each other and back to the card with `[[wikilinks]]` — in Obsidian this
renders as a literal graph per project. Density of links = quality of recall.

## The wake-up protocol (new chat, same project)
1. Read the project card (hub). 2. Follow ONLY the links whose titles match today's
task (2-hop maximum from the hub). 3. State the 3-line confirmation (W81). Total:
~1.5–3k tokens for full working context. Source files open only when the task itself
demands code-level detail — never for orientation.

## The sleep protocol (every session end — this is what keeps it alive)
Before ending, answer three questions and write the answers into the network:
1. What did I DECIDE? (new/changed decisions → note or card update)
2. What did I LEARN that isn't in the code? (gotchas, causes, external facts → note)
3. What did I CHANGE about the project's state? (card's Current-state section)
5 minutes. A session that doesn't write back steals context from every future session.

## Maintenance (what makes it a network, not a landfill)
- **Update beats create:** search existing notes first; duplicates poison recall.
- **Confidence decays:** any `assumed` note touched twice without verification gets
  verified or deleted. Wrong notes are worse than no notes (they load as truth).
- **Prune on contradiction:** when code contradicts a note, the note is updated the
  moment the contradiction is found — not "later".
- Quarterly: delete orphan notes (nothing links to them), merge near-duplicates.

## Open-source frameworks for the heavier version of this
When the manual vault outgrows itself (many agents, cross-project queries):
- **claude-flow / Ruflo** (github.com/ruvnet/ruflo — the framework previously
  discussed; its agents are already installed in this Claude Code setup): open-source
  multi-agent orchestration with a persistent SQLite memory (`.swarm/memory.db`),
  self-learning modules, and MCP integration. Its memory system is the automated
  equivalent of this vault's sleep protocol.
- **Microsoft GraphRAG** (github.com/microsoft/graphrag): builds a knowledge graph
  from documents/code and answers queries over it — the industrial version of the
  note-graph.
- **Letta (MemGPT)** (github.com/letta-ai/letta): agents with self-editing long-term
  memory.
- Local `/graphify` skill: already installed here; turns a codebase into a queryable
  knowledge graph (`graphify-out/`) — use it to BOOTSTRAP a project's first notes
  instead of writing them by hand.
Adoption rule: tools change; the protocol above is tool-agnostic. Adopt a framework
only when the manual vault demonstrably fails (recall misses, >5 min wake-ups) — not
because the framework is impressive.

## Failure this prevents
20-minute re-orientation per chat, token burn rereading unchanged code, knowledge
dying at session end, new models confidently ignorant of last month's decisions.

## Linked
[[INDEX]] · [[W80-PROJECT-REGISTRY]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W101-VAULT-SELF-IMPROVEMENT]]
