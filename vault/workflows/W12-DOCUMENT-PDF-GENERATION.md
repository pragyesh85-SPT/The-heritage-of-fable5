# W12 — Documents, Invoices, and PDFs

Trigger: "generate invoice / report / PDF / printable".

## Parameters
1. **Legal fields for Indian invoices:** invoice number (sequential, never reused),
   date, seller name + address + GSTIN (if registered), buyer details, item lines with
   HSN if applicable, taxable value, GST breakup (CGST/SGST or IGST), total in words.
   Missing GST fields = accountant problems later. Confirm GST registration status once
   per business, then stop asking.
2. **Where generated:** client-side jsPDF (his existing pattern — fine for invoices) vs
   server-side (needed when the document must be trustworthy/archived — store in Firebase
   Storage with the order record).
3. **Numbering:** sequential counters need a Firestore transaction (two simultaneous
   orders must not get the same invoice number).

## Procedure
1. Get one REAL example of the desired output (or sketch the layout as text) before coding.
2. Build the layout with fixed positions; test with the LONGEST realistic data (long
   names, 15 line items) — overflow is the #1 PDF bug.
3. Amounts: compute in paise/integers, format at display. Never float-math money.
4. Verify: generate 3 PDFs — minimal data, typical data, maximal data. Open each. Check
   totals by recomputing independently.

## Failure this prevents
Invoices with overlapping text on long names, duplicate invoice numbers, GST-noncompliant
documents discovered at filing time.
