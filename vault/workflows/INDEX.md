# Workflow Index — "When asked for X, load W-doc Y"

Load the ONE doc matching the task (plus core files per `00-README.md`). Don't load all.

## W1x — Creating things
- **W10** SVG / logo / diagram / illustration
- **W11** UI component / screen / form / dashboard card
- **W12** Invoice / PDF / printable document
- **W13** UI without AI slop — banned patterns, anti-slop procedure, acceptance tests
- **W14** UX — flows, friction audits, behavior rules, the cold-user test

## W2x — Firebase & Firestore
- **W20** Designing a database / new collections / modeling data
- **W21** Security rules / "permission denied" / who-can-see-what
- **W22** Firestore broke — data missing, writes failing, function not firing
- **W23** Interconnected apps out of sync / shared-DB drift / data repair
- **W24** Traffic spike / slow under load / "CPU upgrade" / background job management
- **W25** Writing Cloud Functions, webhooks, scheduled jobs
- **W26** Backups, restore, disaster recovery

## W3x — Operations
- **W30** Git: dev vs prod branches, releases, rollback
- **W31** Dev/prod Firebase environments
- **W32** Secrets: API keys, tokens, leak response
- **W33** Monitoring & alerts setup
- **W34** LIVE INCIDENT: production down / money wrong ← go here first in a fire
- **W35** Cloud bills: prevention and spike diagnosis

## W4x — Security
- **W40** Security baseline checklist (pre-launch / quarterly)
- **W41** Login, roles, RBAC, multi-tenant auth
- **W42** Payments (Razorpay) — the money path
- **W43** "Check the security of this app" — six-lane audit SOP with cheap-agent fan-out

## W5x — Business playbooks
- **W50** Production launch gate (go-live checklist)
- **W51** Vehicle finance domain (Aapka Hisab): ledger, EMI, KYC, NBFC rules
- **W52** E-commerce/advisor ecosystem (TIP): attribution, commissions, subscriptions
- **W53** Marketplace expansion: multi-retailer, money-splitting, migration path

## W6x — Research
- **W60** Crypto outlook (Bitcoin up/down) — scenario framework
- **W61** Indian stock market analysis — the fixed indicator set
- **W62** General research method for any topic

## W7x — Personal tech
- **W70** PC troubleshooting (Windows)

## W8x — Knowledge system
- **W80** Project registry design (`_REGISTRY/`, Obsidian vault, project cards)
- **W81** Context loading protocol — new chat, full context, <2k tokens
- **W82** Leveraging cheap models (DeepSeek/Haiku class) safely — the theory
- **W83** The context network — atomic linked notes, wake-up/sleep protocols, claude-flow/GraphRAG options
- **W84** Small-model prompt pack — ready-to-use envelopes and templates for W82

## W9x — Architecture (designing systems, not just building in them)
- **W90** Architecting any system from scratch — order of decisions, one-pager test
- **W91** Memory systems — the four memory types, write-back, files-vs-vector decision
- **W92** RAG systems — do-you-need-it test, pipeline, the two eval numbers
- **W93** Agent systems — anatomy, stop conditions, when multi-agent is earned
- **W94** Multi-agent at minimum cost — SOP-not-executor principle, lanes, envelopes, merge
- **W95** Harness design — the seven components, weak-model test, grading questions
- **W96** Breaking work into agent tasks — independence test, split shapes, collision map
- **W97** Briefing an agent — the seven-section handoff contract, executor calibration
- **W98** Verifying agent work — three verification layers, acceptance gates, verdicts
- **W99** Agent governance — spawn ladder, agent kinds, owner-consent gate, kill rules

## W100 — The gate on all of the above
- **W100** Vault acceptance test — ten unannounced probes that verify a model is
  actually OPERATING this system, with scoring and a per-model logbook

## Gaps → how to add a new workflow
New task type with no doc: do the task with the core pack (01–08), then write the
W-doc from what was learned — same shape: Trigger / Parameters / Procedure /
Verification / Failure it prevents. Add one line here. Number into the matching series.

## Linked
[[00-README]] · [[W10-SVG-AND-GRAPHICS]] · [[W11-UI-COMPONENT]] · [[W12-DOCUMENT-PDF-GENERATION]] · [[W13-UI-ANTI-SLOP]] · [[W14-UX-DESIGN]] · [[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W21-FIRESTORE-SECURITY-RULES]] · [[W22-FIRESTORE-DEBUGGING]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W24-SCALING-AND-TRAFFIC]] · [[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[W26-BACKUPS-AND-DISASTER-RECOVERY]] · [[W30-GIT-DEV-PROD-WORKFLOW]] · [[W31-ENVIRONMENTS-DEV-STAGING-PROD]] · [[W32-SECRETS-MANAGEMENT]] · [[W33-MONITORING-AND-ALERTS]] · [[W34-INCIDENT-RESPONSE]] · [[W35-COST-CONTROL]] · [[W40-SECURITY-BASELINE]] · [[W41-AUTH-AND-RBAC]] · [[W42-PAYMENTS-RAZORPAY]] · [[W43-SECURITY-AUDIT-SOP]] · [[W50-PRODUCTION-LAUNCH-GATE]] · [[W51-VEHICLE-FINANCE-DOMAIN]] · [[W52-ECOMMERCE-ECOSYSTEM]] · [[W53-MARKETPLACE-EXPANSION]] · [[W60-CRYPTO-RESEARCH]] · [[W61-STOCK-MARKET-ANALYSIS]] · [[W62-GENERAL-RESEARCH-METHOD]] · [[W70-PC-TROUBLESHOOTING]] · [[W80-PROJECT-REGISTRY]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W82-CHEAP-MODEL-LEVERAGE]] · [[W83-CONTEXT-NEURAL-NETWORK]] · [[W84-SMALL-MODEL-PROMPT-PACK]] · [[W90-SYSTEM-ARCHITECTURE]] · [[W91-MEMORY-ARCHITECTURE]] · [[W92-RAG-ARCHITECTURE]] · [[W93-AGENT-ARCHITECTURE]] · [[W94-AGENT-COST-ORCHESTRATION]] · [[W95-HARNESS-DESIGN]]
