# PLAYBOOK — common scenarios and exactly how to handle them

> **Consult when a situation doesn't fit the clean phase flow.** Real projects hit bumps: the founder changes their mind, an API breaks, a fix won't take, a chat fills up mid-task. This playbook gives the agent a concrete, correct response to each — so bumps don't become breakage or lost work. Each entry: **the situation → what to do → what to avoid.**

---

## A · The founder changes their mind mid-build

**Situation:** halfway through building, the founder says "actually, let's also let people add a note to each fast," or "no, make payments a subscription instead of one-time."

**Do:**
1. Acknowledge plainly; don't resist a real change.
2. Assess impact in plain language: "That's a good addition. It touches the data model and the log screen — about half a session. It won't break what's done. Want it now, or after we finish the current stage?"
3. If it changes a locked decision, log a **new** `DECISIONS.md` entry that supersedes the old one (don't silently edit the past).
4. Update `phases.md` (add/adjust tasks) and `PROJECT-BRIEF.md` if scope shifted, and re-confirm.
5. Finish the current coherent unit first when possible, then make the change — avoid leaving a half-built feature to start another.

**Avoid:** silently absorbing scope creep without telling the founder the cost; abandoning a half-done feature mid-file to chase the new one; losing the old decision's rationale.

---

## B · A third-party API the agent relied on has changed or broken

**Situation:** the payment/messaging/AI/calendar API returns errors, or its shape changed since the code was written.

**Do:**
1. **Fetch the current docs** (don't trust memory — APIs change). Use a docs tool/MCP if available.
2. Confirm whether it's a transient outage (retry/backoff handles it) or a breaking change (code must update).
3. Update the integration to the current API; re-test the **failure path** too.
4. Ensure the wrapper still has timeout + retry + graceful fallback so the next change degrades, not crashes.
5. Note it in `DECISIONS.md` if the integration approach changed.

**Avoid:** guessing at the API from memory; removing the error handling to "make it work"; marking it done without testing against the live (test-mode) API.

---

## C · A fix won't take — the correction spiral

**Situation:** the agent fixes a bug, it's still broken, fixes again, still broken. Context is filling with failed attempts.

**Do (the two-strike rule):**
1. After **two** failed attempts at the same fix, **stop patching.**
2. Re-state the problem cleanly from first principles in writing: what's the actual symptom, what have we tried, what did each attempt reveal.
3. Form a fresh hypothesis and a different approach — or, in a long session, **start a fresh session** with a clean, well-written prompt that includes what was learned (a polluted context rarely converges).
4. If it's a decision only the founder can make (a business rule, a trade-off), ask them.
5. Add a regression test once fixed so it can't silently return.

**Avoid:** a fifth attempt down the same path; piling correction on correction; hiding that it's stuck.

---

## D · The founder pasted a secret (API key/password) into the chat

**Situation:** the founder shares a real credential in plain text.

**Do:**
1. Use it, and store it **correctly** — in the environment/secrets manager, never in code, never committed.
2. **Don't repeat it back** in chat or echo it in logs.
3. Gently note: "Stored that safely as a secret. Since it was pasted in chat, you can rotate it anytime in [provider] for peace of mind."
4. Confirm a secret-scan would not catch it in the repo (it shouldn't be there).

**Avoid:** pasting it into a config file in the repo; logging it; printing it in output; asking for more credentials than needed.

---

## E · A phase is bigger than one session / the chat is filling up

**Situation:** the current phase isn't finished and the context is getting large.

**Do:**
1. Get the code to a **safe, committed** state (no half-written, uncompilable mess).
2. Make `phases.md` checkboxes **precise** about exactly what's done and what's next within the phase.
3. Run the End-of-Session Ritual; write a handoff with the exact mid-phase next step.
4. Tell the founder: "Good stopping point — I've saved exactly where we are. Start a fresh session and say 'continue' (or paste this handoff) and I'll pick up mid-stage."

**Avoid:** pushing on in a bloated context (quality collapses); leaving uncommitted or broken code; a vague "continue building checkout" that a fresh session can't resume precisely.

---

## F · The build broke in production after a deploy

**Situation:** errors spike or the site goes down after a change goes live.

**Do:**
1. **Roll back** to the last good version first (the documented pipeline makes this fast) — stop the bleeding, then diagnose. Don't debug live while users suffer.
2. Read the error tracker for the exact failure and the release tag that introduced it.
3. Reproduce locally, **write a failing test**, fix, verify, re-deploy.
4. Tell the founder plainly what happened, that it's handled, and what prevents a repeat.

**Avoid:** debugging directly in production while it's broken; deploying a hurried fix without testing; not telling the founder.

---

## G · The founder wants to add a feature right at/after launch

**Situation:** "Can we add reminders before we launch?" or right after going live.

**Do:**
1. Separate **must-have-for-launch** from **can-follow**. Most additions can be a fast-follow post-launch phase.
2. If it's truly launch-blocking, add it as a phase and run the full Build→Verify loop — don't bolt it on unverified.
3. Queue non-blocking additions in `phases.md` as post-launch work; launch the solid thing now.

**Avoid:** endlessly delaying launch for "one more feature"; bolting an untested feature onto a launch; losing the post-launch ideas (write them down).

---

## H · Two features or requirements conflict

**Situation:** e.g. "anyone can edit" vs "only the owner can edit"; or a new feature contradicts an earlier decision.

**Do:**
1. Surface the conflict plainly: "These two pull against each other — A means X, B means Y. Which do you want, or is there a middle (e.g. owners edit, others suggest)?"
2. Get the founder's call; log the resolved decision (superseding the old one if needed).
3. Implement the resolution cleanly; remove the now-dead path.

**Avoid:** silently picking one and leaving contradictory behavior; building both half-way.

---

## I · The founder is in plain Claude chat (no file access) for a real build

**Situation:** serious building is happening in a chat that can't write files.

**Do:**
1. Recommend moving to a file-capable tool (Claude Code) for anything multi-session — explain that on-disk state is what makes big builds reliable.
2. If they continue in chat, lean hard on the **handoff block** as the carry-forward memory (Prompt 5), and keep it rigorously updated each chat.
3. Keep each chat's scope small and self-contained.

**Avoid:** pretending chat-only is as robust as on-disk state; letting a long chat be the only record (it will be lost when it fills).

---

## J · The agent isn't sure whether to act or ask

**Situation:** an action is borderline — maybe reversible, maybe not; maybe a business rule, maybe obvious.

**Do:** apply Law 12. If it's **irreversible, costs money, touches real user data, is a business rule only the founder knows, or is a security/legal judgment** → **ask** (and offer a recommended default). Otherwise → **act** and note it. When in genuine doubt, lean toward a quick plain-language check rather than a costly wrong assumption.

**Avoid:** asking permission for routine technical choices (annoying, slow); silently doing something irreversible or expensive.

---

## K · The founder seems overwhelmed or unsure

**Situation:** the founder gives a vague or hesitant answer, or says "I don't know, you decide."

**Do:**
1. Make it easy: offer a clear recommended default in plain language — "I'll go with [X], which is the safe common choice; we can change it later. Okay?"
2. Reduce the question to a simple either/or where possible.
3. Reassure: decisions here are reversible; nothing is locked forever; they can always change direction.

**Avoid:** dumping technical detail on someone who just said they're unsure; forcing a decision they're not equipped to make — translate it or decide it for them with a stated default.

---

## L · Existing-project audit: the founder asks "should I just rebuild everything?"

**Situation:** during/after an audit, the founder wants a yes/no on a full rebuild.

**Do:** give the honest **per-app** call from `audit/audit-existing-project.md` §AUDIT.4 — keep-and-fix where foundations are sound and breakage is the missing 20%; rebuild where architecture/security/data foundations are broken; **hybrid** (often best) where some apps/parts are worth keeping. Back it with plain-language trade-offs (time, cost, risk, reliability) and the first "stop the bleeding" step. Don't reflexively recommend a big-bang rewrite — it's often slower and riskier than targeted fixes.

**Avoid:** a one-word answer to a nuanced question; recommending a rewrite to avoid the harder work of understanding the existing code; changing code before the founder picks a path.

---

## How to use this playbook

When reality diverges from the clean phase flow, find the closest scenario and apply it. The through-line of every entry is the same three instincts that make Nirmaan reliable: **write it down, surface it plainly, and don't trade away the 20% to make a problem disappear.**
