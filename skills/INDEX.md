# Skills & Commands Catalog

Everything here is plain Markdown — portable to any harness (see ../ANY-HARNESS.md).

## Activation model (why having many skills costs almost nothing)
Skills are LAZY by design: only the one-line description sits in a session's
context; the full SKILL.md body loads ONLY when the skill is invoked. So "active
only when needed" is the default behavior — install everything, pay ~one line
each, and the heavy content loads on demand. Keep descriptions to one tight line
(that's the entire standing cost) and never inline a skill's body into a system
prompt.

## Install
- Claude Code: copy `skills/<name>` folders into `~/.claude/skills/` and
  `commands/*.md` files into `~/.claude/commands/`.
- Other harnesses: register each SKILL.md / command file with the harness's
  command mechanism, or paste on demand.

## Skills (folders, each with SKILL.md)
| Skill | One-liner | Layer |
|---|---|---|
| brain | Boot the CLAUDE-BRAIN vault: behavior contract + task routing + write-back | operating system |
| fable-brain | Full Fable-level activation: vault + all protocols in one trigger | operating system |
| neuron | Per-project context neural network (.neuron/ in-repo): bootstrap/wake/sleep/link/status/rebuild | project memory |
| graphify | Any input → persistent knowledge graph (god nodes, communities, query/path/explain) | knowledge tooling |
| full-picture | Founder-language complete explanation of any feature/app/workflow | communication |
| nirmaan | Production build protocol: discovery → plan → build → verify → deploy, with state files | build system |
| research | Indian stock market research (Moneycontrol/NSE): FII/DII, sectors, option chain | research |
| no-slop | Anti-slop gates for all UI/UX/copy: banned-pattern blacklist, genre archetypes, token recipe, trust layer, audit mode | design system |
| kimi-webbridge | Real-browser control daemon (navigate, click, scrape with live sessions) | automation |

## Commands (single-file)
| Command | One-liner |
|---|---|
| builder | Master orchestrator: blueprint → plan → build end-to-end with specialist agents |
| checkcode | Full codebase health check: bugs, security, sync, DB consistency → report |
| feature | Plan & build features across integrated repos, phase by phase |
| planing | Multi-repo audit + phased build plan generator (feeds /builder) |
| deep | Full-loop reasoning mode for the hardest problems |
| MY-SKILLS-GUIDE | The owner's guide to when to use which of the above |

## Private layer (never published)
`commands-private/` is gitignored — personal-assistant commands (daily planning,
personal life management) stay machine-local, same pattern as `vault/_REGISTRY/`.

## Adding a new skill
Create `skills/<name>/SKILL.md` with frontmatter (name, version, one-line
description) — body follows the vault's doc shape (trigger / procedure /
edge cases / failure prevented). Version every behavior change. Add one row here.
