# 03 — Retrieval System ("RAG") and Context Management

There is no magic vector database. "My RAG" = disciplined, targeted search over files plus
deliberate context budgeting. This is fully reproducible by any model with file tools.

## The retrieval procedure (in order, stop as soon as you have the answer)

1. **Orient (30 seconds, once per session per repo):**
   - `package.json` → what the app is, scripts, dependencies
   - `firebase.json` / `.firebaserc` → which Firebase project, what's deployed
   - Routes file / `App.jsx` → the app's surface area
   - `functions/index.js` (or functions folder) → all backend entry points
   - If `graphify-out/` or `.nirmaan-state/` exists → read its summary FIRST; someone
     already did this work.

2. **Hypothesis → keyword → Grep.** Never open files hoping to stumble on the answer.
   - Bug in commission display? → grep `commission` across repo, note every file that
     touches it, then read only those.
   - Search for the IDENTIFIER (function name, Firestore collection name, field name),
     not the English description.

3. **Read sections, not files.** Open the 40 relevant lines, not the 900-line file.
   Follow imports only when the answer isn't in the current file.

4. **Cross-repo tracing (TIP ecosystem rule):** data bugs can originate in a different
   repo than where they appear. The advisor app, admin panel, website, and WA-bot share
   one Firestore. Trace: who WRITES this field (grep in all repos) → who READS it.
   Never conclude from one repo alone.

5. **Fan out only when the question is broad** ("where is X handled across everything?"):
   use a subagent/second session per repo, have each return a summary, synthesize. Don't
   fan out for pointed questions — direct grep is faster and cheaper.

## When retrieval runs

- ALWAYS before: explaining code, claiming a feature exists/doesn't exist, editing a file,
  estimating effort, answering "how does X work".
- NEVER instead of running: if the question is "does it work", the retrieval is execution
  (run it, hit the endpoint), not reading.

## Context budget — "how do you keep everything in your mind"

You don't. The working rules:

1. **The filesystem is the long-term memory; context is a scratchpad.** Anything that must
   survive the session gets WRITTEN to a file (`.nirmaan-state/`, project memory, a
   `NOTES.md`). If it only lives in the conversation, assume it will be lost.
2. **Compress as you go.** After investigating 10 files, write a 5-line summary of what
   you learned (which file owns what). Refer to the summary; don't re-read the 10 files.
3. **Long tasks = checkpoint files.** Every meaningful unit of progress, update a state
   file: DONE / IN-PROGRESS / NEXT / DECISIONS MADE. A fresh session must be able to
   resume from that file alone. (This is the `.nirmaan-state/` pattern — keep using it.)
4. **Never hold numbers in your head across steps.** Write intermediate values down or
   compute in code.
5. **Re-derive, don't memorize, anything the code already records.** Code structure, git
   history, configs — always fresh from source, never from memory (it goes stale).

## External retrieval (web)

- Prices, API docs, library versions, anything after the knowledge cutoff → fetch, never
  answer from memory.
- Indian market data → the sources in the `research` skill (Moneycontrol, NSE), with the
  number traced to the fetched page.

## Linked
[[04-MEMORY]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W92-RAG-ARCHITECTURE]]
