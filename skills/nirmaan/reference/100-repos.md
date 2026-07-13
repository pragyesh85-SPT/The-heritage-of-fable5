# THE CURATED 100 — a menu, not a shopping list

> **This is a reference the agent consults, not a pile to clone.** For each project, install **only the few** items the current phase needs (per `workflow/04-build.md` §4.4). Prefer the **default stack** (`stack/default-stack.md`); pull alternatives from here only when an archetype or a recorded reason calls for it. Bulk-cloning these would drown the project in conflicting code — exactly the failure Nirmaan prevents.
>
> Format: **Name** `owner/repo` — what it does *for the build* · `[tags]`. Tags mark when it's relevant.
> Tag legend: `[learn]` knowledge/checklist (read, don't install) · `[core]` likely used in most builds · `[ecom]` · `[ai]` · `[local-ai]` · `[agent]` · `[voice]` · `[fintech]` · `[admin]` · `[infra]` · `[security]` · `[observability]` · `[india]` (India-built/India-fit).

---

## A · Learn — production-grade thinking (read, don't install) `[learn]`

1. **System Design Primer** `donnemartin/system-design-primer` — how real apps are structured to handle load without falling over. `[learn]`
2. **Developer Roadmap** `kamranahmedse/developer-roadmap` — visual maps of everything a real app involves; spot what you're skipping. `[learn]`
3. **Node.js Best Practices** `goldbergyoni/nodebestpractices` — the best checklist of what makes a backend production-grade. Backbone reading. `[learn][core]`
4. **The Twelve-Factor App** `12factor.net` — the rules separating a hobby app from one that survives deployment. `[learn]`
5. **Google SRE Book** `sre.google/books` — how the biggest sites stay reliable, in plain English. `[learn]`
6. **Awesome Scalability** `binhnguyennus/awesome-scalability` — real architectures to copy patterns from. `[learn]`
7. **Front-End Checklist** `thedaviddias/Front-End-Checklist` — tick-box list to make any site launch-ready. `[learn][core]`
8. **JavaScript Testing Best Practices** `goldbergyoni/javascript-testing-best-practices` — how to test so you catch breakage early. `[learn][core]`
9. **Professional Programming** `charlax/professional-programming` — curated reading on shipping like a pro. `[learn]`
10. **Build Your Own X** `codecrafters-io/build-your-own-x` — build tiny versions of real systems to understand them. `[learn]`

## B · Reliability, testing & edge cases `[core]`

11. **Zod** `colinhacks/zod` — validates every input at the boundary so bad data can't silently break things. The #1 edge-case fix. `[core]`
12. **Playwright** `microsoft/playwright` — a robot clicks through the whole app to catch broken flows. `[core]`
13. **Vitest** `vitest-dev/vitest` — fast tests for Vite apps so changes don't break old features. `[core]`
14. **Cypress** `cypress-io/cypress` — visual end-to-end testing you can watch; great for checkout. `[core]`
15. **k6** `grafana/k6` — simulates hundreds of users to see what cracks under load. `[infra]`
16. **Faker** `faker-js/faker` — realistic fake data to stress-test edge cases. `[core]`
17. **TanStack Query** `TanStack/query` — handles loading/error/retry/caching for data; removes a huge class of "it broke" bugs. `[core]`
18. **React Hook Form** `react-hook-form/react-hook-form` — robust forms with validation wired to Zod. `[core]`

## C · Security `[security]`

19. **OWASP Cheat Sheet Series** `OWASP/CheatSheetSeries` — trusted guides for securing every part of an app. `[learn][security]`
20. **OWASP ASVS** `OWASP/ASVS` — the security checklist to verify against before real users/payments. `[learn][security]`
21. **OWASP Web Security Testing Guide** `OWASP/wstg` — how to test your own app for the holes attackers seek. `[learn][security]`
22. **Juice Shop** `juice-shop/juice-shop` — a deliberately broken app you hack to learn what not to do. `[learn][security]`
23. **PayloadsAllTheThings** `swisskyrepo/PayloadsAllTheThings` — the attacks people try on your forms, so you block them. `[security]`
24. **Gitleaks** `gitleaks/gitleaks` — scans so you never publish secrets/keys. Run before every commit. `[security][core]`
25. **Semgrep** `semgrep/semgrep` — finds bugs and security holes in your code automatically. `[security]`
26. **Trivy** `aquasecurity/trivy` — scans app and servers for known vulnerabilities before launch. `[security][infra]`
27. **OWASP ZAP** `zaproxy/zaproxy` — automated web-app security scanner for a pre-launch pass. `[security]`

## D · Backend foundations — Firebase alternatives & data `[core]`

28. **Supabase** `supabase/supabase` — open-source Firebase: Postgres DB + auth + storage + APIs in one. The default backend. `[core]`
29. **Appwrite** `appwrite/appwrite` — alternative all-in-one backend (auth, DB, functions). `[core]`
30. **PocketBase** `pocketbase/pocketbase` — a single tiny binary = full backend + admin UI; runs on minimal hardware. For local-first/low-HW. `[core][local-ai]`
31. **PostgreSQL** `postgres/postgres` — the rock-solid relational database serious products run on. `[core]`
32. **pgvector** `pgvector/pgvector` — adds AI memory/search to normal Postgres without extra infra. `[ai]`
33. **Prisma** `prisma/prisma` — typed database access + safe migrations for custom backends. `[core]`
34. **Drizzle ORM** `drizzle-team/drizzle-orm` — lightweight typed SQL/ORM, great with Postgres. `[core]`
35. **Meilisearch** `meilisearch/meilisearch` — fast product/catalog search with typo tolerance. `[ecom]`
36. **Typesense** `typesense/typesense` — alternative fast, typo-tolerant search engine. `[ecom]`
37. **Trigger.dev** `triggerdotdev/trigger.dev` — durable background jobs that retry; emails/reports won't fail silently. `[core][infra]`
38. **Inngest** `inngest/inngest` — durable, event-driven workflows with automatic retries. `[infra]`
39. **NocoDB** `nocodb/nocodb` — turns a database into a Notion/Airtable-like sheet your non-technical team can use. `[admin][india]`

## E · Auth `[core][security]`

40. **Better Auth** `better-auth/better-auth` — modern, complete login (2FA, passkeys, roles), self-hostable. The default for custom backends. `[core][security]`
41. **Auth.js (NextAuth)** `nextauthjs/next-auth` — widely-used web auth with social sign-in. `[core][security]`
42. **SuperTokens** `supertokens/supertokens-core` — open-source auth you fully control; good for India data-residency. `[security][india]`
43. **Authentik** `goauthentik/authentik` — self-hosted identity provider for one login across many apps. `[security][infra]`
44. **Ory Kratos** `ory/kratos` — battle-tested composable identity for when you outgrow the easy options. `[security]`

## F · AI-native dev workflow — the founder's "stack is just AI" `[ai][core]`

45. **Cline** `cline/cline` — autonomous coding agent in VS Code that plans and edits across files. Pairs with Claude. `[ai]`
46. **Aider** `Aider-AI/aider` — AI pair-programmer in the terminal that edits your repo and commits cleanly. `[ai]`
47. **Continue** `continuedev/continue` — open-source in-editor AI assistant, customizable to your project. `[ai]`
48. **OpenHands** `All-Hands-AI/OpenHands` — an AI "software engineer" that takes a task and works autonomously. `[ai][agent]`
49. **Awesome CursorRules** `PatrickJS/awesome-cursorrules` — ready-made rule files that make Cursor produce consistent code. `[ai]`
50. **Claude Task Master** `eyaltoledano/claude-task-master` — breaks a big spec into ordered tasks the AI executes one by one; stops half-built messes. `[ai]`
51. **Spec Kit** `github/spec-kit` — spec-driven development: write the spec, AI builds to it. Matches Nirmaan's phased approach. `[ai]`
52. **Context7** `upstash/context7` — feeds the AI current, correct docs so it stops inventing broken code. `[ai]`
53. **Repomix** `yamadashy/repomix` — packs a whole repo into one AI-readable file for reviews/refactors. `[ai]`
54. **Gitingest** `cyclotruc/gitingest` — paste any GitHub repo as clean text into the AI to learn from it fast. `[ai]`
55. **Anthropic Cookbook** `anthropics/anthropic-cookbook` — official copy-paste recipes for building well with Claude. `[ai][learn]`
56. **Anthropic Courses** `anthropics/courses` — free structured lessons on prompting and building AI apps. `[ai][learn]`

## G · Local & offline AI — minimal hardware + voice `[local-ai]`

57. **Ollama** `ollama/ollama` — run AI models locally with one command. Backbone of any local-first AI tool. `[local-ai]`
58. **llama.cpp** `ggml-org/llama.cpp` — runs language models on plain CPUs with little RAM. Fits no-GPU/2GB goals. `[local-ai]`
59. **LocalAI** `mudler/LocalAI` — gives local models an OpenAI-style API so app code works online or offline. `[local-ai]`
60. **Open WebUI** `open-webui/open-webui` — a private ChatGPT-style interface for local models, self-hosted. `[local-ai]`
61. **Jan** `janhq/jan` — offline desktop AI assistant; privacy-first, no-internet use. `[local-ai]`
62. **whisper.cpp** `ggml-org/whisper.cpp` — turns speech into text locally. For the founder's voice workflow and voice products. `[local-ai][voice]`
63. **Piper** `rhasspy/piper` — natural text-to-speech that runs locally; for voice features/companions. `[local-ai][voice]`
64. **Mem0** `mem0ai/mem0` — long-term memory for an AI across sessions (e.g. a companion that remembers). `[ai]`

## H · Agent & LLM-app frameworks + working with documents `[ai][agent]`

65. **Vercel AI SDK** `vercel/ai` — easiest way to add AI chat/streaming to a web app; fits React/Vite. `[ai][core]`
66. **LangChain** `langchain-ai/langchain` — the most complete toolkit for connecting AI to data and tools. `[ai]`
67. **LangGraph** `langchain-ai/langgraph` — build controllable, stateful agents that don't wander off task. `[agent]`
68. **CrewAI** `crewAIInc/crewAI` — a "team" of role-based AI agents that collaborate; useful for agency-style work. `[agent]`
69. **Mastra** `mastra-ai/mastra` — TypeScript-native agent framework with workflows and memory built in. `[agent]`
70. **Pydantic AI** `pydantic/pydantic-ai` — agents with strict, validated outputs (reliable, not random). `[agent]`
71. **Dify** `langgenius/dify` — visual platform to build and host AI apps with little code; self-hostable. `[ai]`
72. **Flowise** `FlowiseAI/Flowise` — drag-and-drop builder for AI chatbots and flows. `[ai]`
73. **LlamaIndex** `run-llama/llama_index` — connect AI to your own documents/PDFs (research, formula PDFs). `[ai]`
74. **RAGFlow** `infiniflow/ragflow` — turns messy real-world documents into a reliable AI knowledge base. `[ai]`
75. **Firecrawl** `mendableai/firecrawl` — turns websites into clean data agents can use (research, agency pipelines). `[agent]`
76. **browser-use** `browser-use/browser-use` — lets an AI agent operate a real web browser to do tasks. `[agent]`

## I · Automation & internal tools / admin panels `[admin][infra]`

77. **n8n** `n8n-io/n8n` — open-source Make.com/Zapier, self-hosted. Rebuild order→WhatsApp flows without free-tier limits. `[infra][admin]`
78. **Activepieces** `activepieces/activepieces` — AI-first automation builder, no-code, self-hostable. `[infra][admin]`
79. **Windmill** `windmill-labs/windmill` — turn scripts into internal tools and scheduled jobs reliably. `[admin][infra]`
80. **Refine** `refinedev/refine` — React framework purpose-built for admin/dashboards/CRUD. Rebuild admin & adviser panels solidly. `[admin]`
81. **Appsmith** `appsmithorg/appsmith` — drag-and-drop internal tools/admin panels over your database. `[admin]`
82. **ToolJet** `ToolJet/ToolJet` — low-code internal-tools builder; fast admin dashboards. `[admin]`
83. **Budibase** `Budibase/budibase` — build internal apps and forms quickly, self-hosted. `[admin]`
84. **React Admin** `marmelab/react-admin` — mature library for data-heavy admin interfaces. `[admin]`

## J · E-commerce, payments & notifications — This Is Purest & D2C `[ecom][india]`

85. **Medusa** `medusajs/medusa` — open-source headless commerce engine (cart, orders, payments). A reliable backbone vs hand-built logic. `[ecom]`
86. **Bagisto** `bagisto/bagisto` — full open-source e-commerce platform from an Indian team (Laravel). `[ecom][india]`
87. **Vendure** `vendure-ecommerce/vendure` — clean, maintainable TypeScript commerce framework with a solid plugin system. `[ecom]`
88. **Saleor** `saleor/saleor` — enterprise-grade open-source commerce for large/multi-channel later. `[ecom]`
89. **Hyperswitch** `juspay/hyperswitch` — open-source payments orchestrator (India-built by Juspay); route across gateways. `[ecom][fintech][india]`
90. **Razorpay SDKs** `razorpay/razorpay-node` — official libraries for India's main gateway (UPI/cards). `[ecom][fintech][india]`
91. **Novu** `novuhq/novu` — one system for all notifications (email/SMS/WhatsApp/in-app). Cleanly fixes three-party order alerts. `[core][ecom]`
92. **React Email + Resend** `resend/react-email` — design reliable transactional emails (order confirmations, receipts) as components. `[core][ecom]`
93. **Listmonk** `knadh/listmonk` — self-hosted newsletters/bulk email at scale, India-built. Own your customer comms. `[ecom][india]`

## K · UI, design & deploy `[core][infra]`

94. **shadcn/ui** `shadcn-ui/ui` — the copy-paste component set that makes apps instantly professional; you own the code. `[core]`
95. **Tailwind CSS** `tailwindlabs/tailwindcss` — the styling system nearly all modern UIs use. `[core]`
96. **Lucide** `lucide-icons/lucide` — clean, consistent icon set. `[core]`
97. **Tremor** `tremorlabs/tremor` — ready-made dashboard/chart components for analytics and admin. `[admin]`
98. **Coolify** `coollabsio/coolify` — "Vercel on your own cheap server": push-to-deploy, auto-HTTPS, one dashboard. India hosting possible. `[infra][core][india]`
99. **Dokploy** `dokploy/dokploy` — lighter self-hosted deploy platform; great for a solo founder on a small VPS. `[infra]`

## L · Observability — see breakage (always wire these) `[observability]`

100. **The observability trio** — **Sentry** `getsentry/sentry` (error tracking: what broke, where, when), **Uptime Kuma** `louislam/uptime-kuma` (uptime watchdog + alerts), **PostHog** `PostHog/posthog` (product analytics: how users behave, where they drop off). Wire all three **before** launch — this is how the founder stops finding out about breakage from customers. `[observability][core]`

---

## How the agent uses this menu

- **Match to phase and archetype.** Phase 0 pulls observability + deploy. The core-flow phase pulls payments/validation. An AI feature pulls the AI SDK. Don't install ahead of need.
- **Default first.** If the default stack already covers a need, use it; reach into this list for alternatives only with a recorded reason.
- **Record additions.** Every dependency added → a line in `DECISIONS.md` (what and why).
- **Prefer maintained over abandoned**, and **fewer dependencies over more** — each one is a future breakage point.
- **`[learn]` items are for reading**, to raise the quality bar — not packages to install.
