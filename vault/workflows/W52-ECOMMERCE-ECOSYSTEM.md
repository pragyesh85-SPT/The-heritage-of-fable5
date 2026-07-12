# W52 — E-commerce / Advisor Ecosystem Domain Rules (This Is Purest class)

Trigger: any work on the TIP ecosystem or a similar direct-to-consumer + field-advisor
business. Multi-app mechanics live in W23/W31; this is the business logic.

## The ecosystem map (know it before touching anything)
One Firestore, many faces: Advisor PWA (orders, links, commissions) · Admin panel
(everything) · Customer website (storefront, subscriptions) · WhatsApp bot (notifications/
automation) · ops tools. Every business object below is read by several of them —
SCHEMA.md discipline (W20) applies to all changes.

## Core domain parameters
1. **Attribution is sacred.** The agentCode on an order decides who earns commission.
   Rules: attribution set at order creation, never changed silently; storefront links
   (`/order/:agentCode`) must survive the whole funnel (don't lose the code on redirects,
   abandoned-cart recovery, or WhatsApp handoff). Every attribution change = audit log.
2. **Commission engine is ONE module** with tests (the Vitest precedent). Every place
   that computes commission — order, refund reversal, subscription renewal, reports —
   calls that module. Two implementations WILL disagree and advisors WILL notice in
   their own money. Payouts: computed → approved by admin → marked paid; append-only
   records.
3. **Subscriptions state machine:** active → paused → resumed → cancelled; renewal
   creates an order via the SAME order pipeline (one pipeline, not a parallel
   subscription path); failed renewal → retry policy + advisor notified to follow up
   (that's the human advantage of the model — use it).
4. **Inventory/catalog:** one product catalog collection all apps read; price changes
   take effect for NEW orders only; never mutate historical order line prices.
5. **Order lifecycle with logistics:** paid → packed → shipped (ShipRocket AWB) →
   delivered / RTO (returned). RTO handling defined: who's notified, does commission
   reverse (business rule — ask Pragyesh once, record in memory).
6. **Leads/abandoned orders:** captured with attribution intact; recovery flows
   (WhatsApp nudge) rate-limited and unsubscribable — never spam.
7. **The WhatsApp bot is a WRITER too:** it must obey the same state machine and
   idempotency rules as the apps; a bot double-sending or double-writing is the same
   class of bug as a webhook replay (W25).

## Metrics that matter (build reports around these)
Orders/day, AOV, advisor-wise sales + commission, subscription active count + churn,
repeat-purchase rate, RTO rate, abandoned→recovered %.

## Failure this prevents
Advisors paid wrong (trust death for the whole channel), attribution lost mid-funnel,
two commission formulas fighting, RTO chaos with no defined rules.

## Linked
[[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[W31-ENVIRONMENTS-DEV-STAGING-PROD]]
