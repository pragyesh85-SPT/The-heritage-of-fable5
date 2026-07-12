# W51 — Vehicle Finance App Domain Rules (Aapka Hisab class)

Trigger: any work on the vehicle financing product — features, fixes, reports.
This is DOMAIN knowledge; stack rules stay in W20–W42.

## The non-negotiable domain parameters
1. **The ledger is the truth, not the loan card.** Double-entry: every rupee movement
   is a journal entry (disbursement, EMI receipt, penalty, waiver, closure). Loan
   summaries (outstanding, paid-till-date) are DERIVED from entries — never directly
   edited. If a number is wrong, a correcting entry fixes it; edits to history are
   forbidden (auditability is the product).
2. **EMI math must be exact and printed:** principal, rate (flat vs reducing — huge
   difference, confirm which the NBFC uses per product), tenure, EMI amount, and the
   full amortization schedule stored at disbursement time. Never recompute the schedule
   later from parameters — rates/rules change; the stored schedule is the contract.
3. **Money in paise, dates DD/MM/YYYY, INR words on documents.**
4. **Collections reality (field truth):** partial payments, late payments, advance
   payments, and cash handed to a field agent all happen. The model must support:
   partial EMI receipt against a due, penalty rules (defined, not ad-hoc), agent cash
   reconciliation (agent collected vs agent deposited — this is where leakage happens).
5. **KYC:** Aadhaar/PAN images in locked Storage paths (owner + branch roles), OCR
   output is a DRAFT the staff confirms — never auto-trusted into the loan record.
6. **Multi-tenant walls (it's SaaS):** tenantId on every doc, in every rule, in every
   query. One NBFC seeing another's book = end of the product. Test cross-tenant
   denial explicitly per release (W21 §4).
7. **Roles:** field agents create/collect but never edit ledgers or waive penalties;
   waivers/closures = manager+ with audit log of who/when/why.
8. **Reports that matter to an NBFC owner:** portfolio outstanding, collection
   efficiency % (collected/due this month), overdue buckets (1–30/31–60/61–90/90+ days),
   agent-wise collections. Build reports FROM the ledger.
9. **Regulatory awareness:** NBFC lending has RBI rules (interest disclosure, fair
   practices, recovery conduct). The app records what's needed for compliance
   (sanction letter data, communication logs); when a feature touches regulated
   territory (interest changes, recovery notices), flag it to Pragyesh explicitly —
   don't silently implement.

## When asked to change EMI/penalty/interest logic
Treat as a W05-routing "money + top model + written plan" task: state current rule,
proposed rule, effect on 3 example loans (numbers computed), migration plan for
existing loans (usually: new rule for new loans only), get explicit yes.

## Failure this prevents
Editable history that fails audit, wrong flat-vs-reducing math on real customers'
EMIs, cross-tenant leaks, cash leakage with no reconciliation trail.

## Linked
[[05-MODEL-ROUTING]] · [[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W21-FIRESTORE-SECURITY-RULES]] · [[W42-PAYMENTS-RAZORPAY]]
