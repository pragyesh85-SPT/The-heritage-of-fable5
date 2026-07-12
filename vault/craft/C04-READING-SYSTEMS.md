# C04 — Reading Systems: Understanding Any Codebase Fast

## The order of attack (works on any repo)
1. **The manifest first:** package.json / requirements / go.mod — dependencies tell you
   what the system IS (a Next app with Razorpay and firebase-admin has told you half
   its story before you open a single source file).
2. **The entry points:** main/index, the router, the functions list. Every behavior
   hangs off an entry point; there are usually fewer than ten that matter.
3. **The data model:** schema, types, collection names. Data outlives code and lies
   less. Understand the nouns before the verbs — code is just the verbs between nouns.
4. **ONE flow end-to-end, deeply:** pick the most important user action (checkout,
   order creation) and trace it fully: UI event → API → writes → side effects. One
   deep vertical teaches more than any horizontal skim of every folder.
5. Only now, breadth: skim remaining folders and NAME each one's job in five words.
   A folder you can't name in five words is where surprises live.

## Reading techniques
- **Read like a debugger, not a novel:** follow the value, not the file order. Pick a
  variable and chase where it's born, transformed, and consumed. Files are storage;
  FLOW is the truth.
- **Grep count = importance census:** an identifier referenced 54 times is
  load-bearing; referenced once, it's a leaf. Before touching anything, census it —
  the count IS the blast radius.
- **Find the newest and the oldest code** (git log per file). The newest shows where
  the project is going; the oldest, crustiest file that everything imports is the real
  foundation — treat it with respect and suspicion in equal measure.
- **Comments and READMEs are testimony, not evidence** — they describe the system as
  it was when someone last cared. Trust structure over prose (C01 hierarchy).
- **When code and behavior seem to disagree, you're looking at the wrong code:** a
  second copy, a build artifact, a different branch, a deployed version older than the
  source. "Is the code I'm reading the code that's RUNNING?" — ask it explicitly;
  it's embarrassing exactly as often as it's the answer.

## The comprehension test (know when you're done)
You understand a system when you can predict it: "if I change X, then Y will happen."
Make the prediction, make the change (in dev), watch. Right → you understand. Wrong →
gold: your model has a hole exactly where you now know to dig. Understanding you
haven't tested by prediction is just familiarity (C01) wearing a suit.

## Anti-pattern
"Let me read everything first" — comprehension without a question decays in hours.
Read WITH a task in hand; retention follows need.

## Linked
[[C01-EPISTEMICS]]
