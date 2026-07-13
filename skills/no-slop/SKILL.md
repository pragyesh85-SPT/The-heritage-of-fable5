---
name: no-slop
version: 1.0.0
description: Anti-slop enforcement for ANY user-facing output — landing pages, app screens, dashboards, emails, marketing. Loads before writing the first line of UI markup or copy. Triggers - building/redesigning any UI, "make a landing page", "design a screen", reviewing a UI for genericness, or /no-slop audit on an existing page.
---

# /no-slop — Nothing Generic Leaves This System

Slop is the median of AI training data: what a model produces when nothing
constrains it. It is not fixed by "try harder" — only by constraints applied
BEFORE generating. This skill is those constraints, as procedure.
Protocol authority: vault W13 (UI anti-slop) + W14 (UX) + C09 (taste); this
skill is their executable form.

## Reference packs (read the ones the task needs, not all)
- `references/BANNED.md` — the slop blacklist + the tells. Read for ANY build.
- `references/GOOD-UI.md` — genre archetypes, token systems, what "good" is made of.
- `references/UX-TRUST.md` — behavior, friction, and trust/reliability patterns.

## The procedure (six gates, in order — skipping one reintroduces slop)

### 1. Content before pixels
Obtain or write the REAL content first: actual product names, prices, field
labels, realistic data lengths, the actual value proposition in the owner's
words. Lorem ipsum and placeholder copy are the root cause of generic layouts.
No real content available → write it now with the owner, then design.

### 2. Name the genre + density (out loud, one line)
operator tool (dense, tabular, keyboard-fast) · consumer commerce (trust,
imagery, few choices) · field PWA (huge targets, sunlight, one hand) ·
SaaS landing (one job: convert one audience) · content/editorial.
The genre decides density, and density is the #1 slop tell — cards-and-
whitespace applied to an admin panel is slop even with perfect colors.

### 3. Pick ONE real reference product (same genre) and take its DNA
Name it. Then extract its actual design DNA — density, nav pattern, type scale,
restraint. **Token-cheap extraction: use the kimi-webbridge skill (real-browser
daemon, returns text/CSS) to pull the reference's computed styles — font stacks,
spacing rhythm, color values — instead of screenshotting with the in-app browser
(token-expensive).** One SPECIFIC reference prevents regression to the median of
all references; from its DNA copy structure and discipline, never the brand look.

### 4. Fix tokens BEFORE components (write them at the top of the work)
ONE accent (from the owner's brand — never default purple/indigo), one neutral
scale, one deliberate font pairing (state why), spacing scale 4/8/12/16/24/32/48,
ONE corner radius, max 2 shadow levels, motion 150–250ms ease-out on user
actions only. Every component uses only these. A token not written down will be
improvised — and improvisation regresses to slop.

### 5. Build with the litany
All four states per view (loading/empty/error/success) · microcopy names the
object ("Generate payment link", never "Submit"/"Get Started") · real content
from gate 1 in every mock · zero decoration without function · check BANNED.md
line by line against what you just wrote.

### 6. The acceptance tests (all three, mandatory)
- **Squint test:** blur — hierarchy must survive.
- **Anonymity test:** screenshot — "could this belong to any random startup?"
  If yes, return to gates 2–4; a good UI is recognizably THIS product's.
- **Cold-user test (UX):** one person completes the primary task with zero help;
  every hesitation is a defect (W14).

## /no-slop audit mode (existing page)
Load BANNED.md → walk the page against it → report violations ranked by
visibility, each with the specific fix (token change, copy rewrite, density
correction). Then run the three acceptance tests. Output: a fix list, not an
essay.

## Copy/text slop (applies to ALL user-facing text, not just UI)
Banned in product copy and marketing: "Empower", "Seamless", "Unlock",
"Elevate", "Revolutionize", "Game-changer", emoji bullets in professional
surfaces (🚀✨💡), exclamation stacking, fake urgency ("Only 3 left!" when
false), and benefit claims with no number or mechanism. Every headline must
pass: "does this say something a competitor could NOT paste onto their site?"

## Failure this prevents
The purple-gradient dark-theme emoji landing page; admin panels dressed as
marketing sites; UIs that scream "AI-generated" and burn user trust on sight.
