# W53 — Expanding to a Marketplace (Multi-Retailer)

Trigger: "I want to add more retailers/sellers/brands to the platform" — turning a
single-brand system (TIP) into a multi-party marketplace.

## The decision that shapes everything
**Marketplace = multi-tenant + money-splitting.** Before any code, get these business
answers from Pragyesh (they're founder decisions, W02):
1. Who owns the customer — the platform or the retailer? (Decides data visibility rules.)
2. Money flow: does the platform collect and pay out to retailers (needs Razorpay
   Route/nodal-style splits, settlement schedules) or do retailers collect directly
   (platform takes a fee invoice)? This single answer decides half the architecture.
3. Who fulfils: central logistics (ShipRocket under platform) or each retailer ships?
4. What does the platform take: % commission, listing fee, subscription — and who sets
   retail prices?
5. Onboarding bar: KYC/GST verification for retailers, who approves, what documents.

## Architecture rules (given his stack)
1. **Reuse the tenant pattern from Aapka Hisab** — `retailerId` on products, orders,
   payouts; rules enforce isolation; retailers see ONLY their data; the platform admin
   sees all. Don't invent a new isolation scheme; port the proven one.
2. **Don't fork the codebase per retailer.** One advisor app, one admin, one website —
   tenant-aware. Forks die at 3 tenants.
3. **The catalog becomes two-level:** platform categories + retailer products (approval
   flow before a product goes live).
4. **The ledger grows up:** every order now splits into retailer amount + platform fee
   (+ advisor commission where the advisor channel applies). Reuse the double-entry
   pattern from W51 — marketplaces without proper ledgers cannot settle payouts.
   Settlement runs (weekly payout batches) are generated, approved, marked paid,
   append-only.
5. **New role set:** platformAdmin, retailerAdmin, retailerStaff, advisor, customer.
   Write the whole matrix into W41's role enum before building.
6. **Disputes exist now:** a returns/complaint object with states, because platform
   sits between customer and retailer money.

## Migration path (from current single-brand TIP)
Phase 1: introduce `retailerId` everywhere with the single value "TIP" (schema change
via W23 staged-deploy rules). Phase 2: retailer onboarding + isolation rules + tests.
Phase 3: money-splitting + settlements. Phase 4: second retailer live (pilot, friendly).
Never attempt this as one big bang; each phase ships and runs.

## Failure this prevents
A marketplace built as N forked apps, retailer money that can't be settled correctly,
retailers seeing each other's customers, big-bang migration that kills the working
single-brand business.

## Linked
[[02-QUESTION-PROTOCOL]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W41-AUTH-AND-RBAC]] · [[W51-VEHICLE-FINANCE-DOMAIN]]
