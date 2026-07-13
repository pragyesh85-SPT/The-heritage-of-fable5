# TECH EXPLAINERS — how the pieces actually work, in plain language

> **Two uses:** the **founder** can read these to understand what's happening under the hood (enough to make good decisions, not to code); the **agent** draws on these explanations when the founder asks "how does that work?" — answering at this level, never in jargon. Unlike the glossary (single-term definitions), these are short conceptual walk-throughs. None of this is required to use Nirmaan — it's here for when curiosity or a decision calls for it.

---

## How a web/app product is actually put together

Think of your product as three connected parts:

1. **The front** (what people see) — the screens, buttons, and forms on their phone or browser. It's "dumb" on purpose: it shows things and collects taps, then asks the back to do the real work.
2. **The back** (the engine) — runs on a server somewhere. It holds the logic ("if someone places an order, check stock, take payment, save it"), and it's the only part allowed to be trusted, because the front can be tampered with.
3. **The database** (the memory) — where everything is stored permanently and reliably: users, orders, logs. Structured like very strict spreadsheets that can't easily be corrupted.

They talk through an **API** — a defined set of requests the front sends the back ("get my orders," "log a fast"). When something "breaks," it's usually because one of these handoffs wasn't handled for a case that came up (empty data, a failure, bad input). That's the whole reason Nirmaan obsesses over the "20%."

---

## Why "it works on my screen" isn't "it works"

When the builder tests on their own machine, everything is ideal: fast internet, one user, clean data, the test version of services. Real life isn't: users are on patchy mobile networks, two people act at once, someone pastes emoji into a name field, a payment provider has a slow moment. Software that only handled the ideal case breaks the instant reality differs. Production-grade means handling reality — which is why Nirmaan tests failure paths and deploys to a real, monitored environment before calling it done.

---

## How a payment actually flows (and where it goes wrong)

1. The customer hits "pay." Your back creates an order marked **pending** and opens the payment provider's **own secure page** (so your app never sees card numbers).
2. The customer pays on that page. 
3. The provider then sends your back a **signed message** ("this order is paid"). Your back checks the signature is really from the provider, then marks the order **paid** and sends a confirmation.

Where it goes wrong if rushed: trusting the customer's browser saying "paid" instead of the provider's signed message (→ fake/phantom orders); not handling a failed or half-finished payment (→ stuck orders); letting a double-tap create two orders (→ double charges). Nirmaan's payment recipe closes all three.

---

## How "logging in" works, and why we never build it ourselves

Logging in has two parts: **authentication** (proving you're you — via a password, a phone OTP, or Google) and **authorization** (deciding what you're allowed to do once in). Doing this securely involves a lot of subtle, dangerous detail — how passwords are stored, how sessions are kept, how resets work, how brute-force is blocked. Getting any of it slightly wrong means accounts can be broken into. So we use a **proven system built and hardened by specialists** rather than hand-building it. The critical rule: every "are you allowed?" check happens on the **server** — hiding a button on the screen stops nothing, because an attacker can talk to your back directly.

---

## How AI features and "agents" work

An **AI model** (an LLM) takes text in and produces text out — it predicts a helpful response. A **chat feature** sends the user's message (plus any relevant context or memory) to the model and streams back the reply. An **agent** is the model wired up to take **actions** — it can decide to call tools, look things up, or perform steps to finish a task.

Two things matter for reliability: (1) the model's output is **untrusted** — you don't let raw AI text directly trigger payments or database wipes without checking it; and (2) it costs money **per use** (measured in "tokens"), so you cap and watch spend. The model can also be slow or down, so you always have a graceful fallback. For privacy or cost, models can run **locally** on your own hardware instead of a paid cloud service.

---

## What "the cloud," "a server," and "hosting" really mean

Your product needs a computer that's always on and reachable from anywhere — that's a **server**, usually rented in a data centre ("the cloud" is just other people's servers you rent). **Hosting** is putting your app onto such a server so the world can reach it at a web address. You can rent a cheap server and use a tool that makes publishing a one-button affair (push-to-deploy), or use a fully managed service that hides the server entirely. Either way, the goal is the same: a reliable, secure, always-on home for your product that you can update safely and roll back if a change goes wrong.

---

## What "deploying" is, and why doing it the same way every time matters

**Deploying** is publishing a new version of your product. If a person does it by hand with steps they remember in their head, two bad things happen: it breaks when they forget a step, and no one else can do it. So Nirmaan sets up a **reproducible pipeline** — one button or command that always: runs the tests (and refuses to publish if any fail), backs up data, applies any database changes safely, publishes, and checks the site is healthy — with a quick way to **roll back** if something's wrong. Boring and repeatable is exactly what you want here.

---

## Why we can see problems before customers complain (observability)

Once live, three quiet watchers are set up: an **error tracker** (records every time something breaks for a real user, with the details to fix it), an **uptime monitor** (pings the site constantly and alerts you the moment it's down), and **analytics** (shows how people actually use the product and where they give up). Together they replace "finding out from an angry message days later" with "seeing it on a dashboard immediately" — and they tell you what to improve based on real behavior, not guesses.

---

## Why a big product is built in stages across many sessions

A single conversation with an AI can only "hold in mind" so much before it starts forgetting (its **context window** fills). A whole product is far bigger than that. So instead of trying to build it all in one marathon chat, Nirmaan breaks it into **stages**, builds each in a focused session, and writes the plan, decisions, and progress to **files**. Those files are the project's real memory — so each new session reads them and continues exactly where the last left off. The product's size is no longer limited by a chat's size; it's limited only by how many small, solid stages you stack up.

---

## How to use these explainers

When the founder asks how something works, the agent answers **at this level** — concrete, plain, and honest about the trade-off — never with jargon or condescension. Understanding the *shape* of how things work helps the founder make good calls at checkpoints (which is their job); the mechanics remain the agent's job.
