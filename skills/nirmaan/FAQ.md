# FAQ — straight answers for the founder

> The real questions you'll have, answered plainly and honestly. (For what any technical word means, see `reference/glossary.md`.)

---

### Will this really build my whole product, or just another prototype?
It builds the **whole, working thing** — that's the entire design. Nirmaan forces the agent through discovery → plan → stack → build → verify → deploy, and bakes in the reliability work (validation, error handling, real auth/payments, tests, monitoring) that prototypes skip. The result is meant for real strangers to use, not a demo. You still approve the plan and stack and hand over credentials at launch — but you don't write code.

### Does this mean my apps will never break again?
It means they'll break **far less**, and when something does go wrong you'll **see it on a dashboard** and it'll be fixable fast — instead of silently failing until a customer complains. No honest system promises zero bugs ever (nobody can). What Nirmaan removes is the *category* of breakage you've been hitting: the missing "20%" (unvalidated input, unhandled failures, no tests, no monitoring). That's most of it.

### Do I have to learn to code or become technical?
No. Your whole job is five things: pick the right kickoff prompt, answer the agent's plain-language questions (it always offers a default you can just approve), approve the plan and the stack, hand over credentials at launch, and answer the occasional business question. Everything technical is the agent's responsibility. If it ever uses a word you don't know, it should stop and explain it — and the glossary has every term.

### Can it build *anything* — a voice agent, a finance app, an automation, not just an online store?
Yes. There are seven **archetypes** built in (e-commerce, voice/telephony agent, fintech/finance, internal tool, content/SaaS, AI chat/companion, automation/agency backend), each with its own known traps, example data models, and the specific things to test. Most real products are a mix of two or three, and the agent combines them. The *shape* of the process is the same for all of them.

### How does it remember things between chats? A whole app can't be built in one conversation.
Exactly — and that's the key feature. The agent keeps the project's memory in **files on disk** (`.nirmaan-state/`), not in the chat. It writes down where things stand, every decision, and the plan as it goes. When a chat fills up, you tell it "wrap up" and it gives you a short **handoff** to paste into a new chat (or, in Claude Code, you just say "continue" and it reads its own notes). So you can build across many short sessions over days or weeks, and never re-explain the project. The product explains itself, from its own files.

### Why is this many files instead of the one giant file I asked for?
The total *is* huge and ultra-detailed (well over 5,000 lines). But it's split into focused files on purpose: if you stuff everything into the single file the agent reads on every turn, you **dilute its attention** and it starts missing the rules that matter — which causes the exact unreliability you're escaping. The proven approach is a short "router" file (`CLAUDE.md`) that the agent always reads, which points it to the right detailed file for whatever it's doing right now. Big library, small working set. You get the depth *and* the reliability.

### Can I really just dump 100 GitHub repos into one repo and point the AI at it?
No — and you shouldn't. Those 100 are different *kinds* of things (small tools, whole apps, books, and direct rivals like Medusa-vs-Saleor). Cloning them into one folder makes gigabytes of conflicting code that means nothing as a unit and drowns the agent. Nirmaan instead carries the **playbook** (which tools to use, in what order, to what standard) and keeps the 100 as a curated **menu** (`reference/100-repos.md`) the agent installs from *selectively*, per project. That's how a master builder works — a playbook, not the whole hardware store in the garage.

### What will it cost to run what it builds?
Usually very little to start — the default tools favor free tiers and cheap, self-hostable options (often ₹0–500/month early on). The agent tells you the cost in plain terms before committing to anything paid, puts **hard caps** on things that could spike (like AI usage), and sets up alerts so you never get a surprise bill. Cost grows gradually as you actually grow.

### What if it gets stuck on a problem?
Built in: after **two** failed attempts at the same fix, the agent stops patching, re-states the problem cleanly, and takes a fresh approach (or starts a fresh session, or asks you if it's a decision only you can make). This prevents the "endless broken loop" that wastes time and money.

### What if I change my mind halfway, or want to add a feature?
Fine — that's normal. The agent tells you the impact in plain language ("about half a session; won't break what's done"), updates the plan, logs the change, and proceeds. Mid-launch additions usually become a fast-follow so you can ship the solid thing now.

### My existing apps (like This Is Purest) are already broken. Can it fix those instead of starting over?
Yes — that's the **audit mode**. You attach Nirmaan to the existing code and it: figures out what the product actually is (concept + persona), audits everything for flaws by severity, and gives you an honest call **per app** — rebuild from scratch, keep-and-fix, or a hybrid — with plain trade-offs and a "do this first" step. It won't change anything until you choose a path. Often the answer is "keep what's sound, rebuild the broken core" — not a full restart.

### Is anything still on me that I can't avoid?
A few checkpoints, by design: approving the plan, approving the stack, creating a few accounts and handing over keys at launch, carrying the handoff between chats, and answering business questions only you know (pricing, refund rules, who-sees-what). These are deliberately **few, clear, and in your language** — and they're exactly *why* the result won't silently break. It's the same human-approval model you already chose for your agency idea.

### How do I actually start?
Open `prompts/kickoff-prompts.md`, copy **Prompt 1** (new project) or **Prompt 2** (fix existing) into Claude Code in your project folder, and let the agent lead. That's it.

### What if I want to change tools later (different host, different payment provider)?
You can. The stack is a sensible default, not a cage — each layer has "swap-if" notes, and changing one later is a normal, scoped task. Decisions are recorded with their reasons, so changing one is a clear, deliberate move, not a mystery.

### Does it keep my data safe?
Yes — that's a hard rule. Secrets never go in the code; anything you can't afford to lose gets automated, tested backups; database changes are reversible; and destructive actions are guarded. There's a written recovery plan for worst cases.

---

> If a question isn't answered here, the honest move is to ask the agent directly — and it should answer in plain language, not jargon. You're the director; you're allowed to ask anything.
