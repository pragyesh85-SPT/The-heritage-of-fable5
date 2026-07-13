---
name: full-picture
description: Use whenever the user (a non-technical founder) asks to describe, explain, or show a feature/app/workflow/system — especially "tell me about X", "what does this do", "show me the workflow". Forces a full investigation first, then ONE complete business-language answer with no detail left out.
---

# Full Picture — complete answers, no half answers

This founder hates partial answers and hates technical jargon. When he asks you to describe or explain anything, follow this every time.

## 1. Investigate BEFORE answering
- Read every relevant source: main logic, **config/settings files**, and edge-case behaviour.
- Specifically look for things that are easy to forget but matter to him:
  - **Operating / office hours** (when does it run, when does it stop, quiet hours, queued-vs-sent windows)
  - On/off conditions, limits, throttling, pacing
  - Different states, tags, sources, and what triggers each
  - What the customer/end-user actually receives
- Do NOT answer until you can describe the whole thing. A guess that omits a known dimension (like send hours) counts as a half answer.

## 2. Answer in ONE complete shot
- Deliver everything in a single consolidated response so he can review it once and spot any problem himself.
- Cover: what it is · the deliverables/outputs · every meaningful behaviour · timings/limits · what the end-user gets.
- Don't trickle details across messages. Don't make him ask "what about X".

## 3. Business language only — never technical
- Explain outcomes and value, not how it's built.
- NO file names, libraries, stacks, code, or internal mechanics unless he explicitly asks "how is it built".
- Translate technical config into plain business terms (e.g. `endHour: 20` → "messages stop at 8 PM and resume 9 AM").

## 4. Complete ≠ verbose
- Be precise and point-to-point. Use tight bullets/sections.
- Completeness means leaving nothing material out — not padding.

## Self-check before sending
- [ ] Did I read the config/settings, not just the main logic?
- [ ] Did I include operating hours / limits / on-off conditions?
- [ ] Is it all in one answer he can review at a glance?
- [ ] Is it 100% business language, zero unrequested tech?
