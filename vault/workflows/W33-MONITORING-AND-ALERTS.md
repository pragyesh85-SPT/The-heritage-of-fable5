# W33 — Monitoring: Knowing It Broke Before Customers Tell You

Trigger: any app going to production; "how do I know it's healthy".

## The principle
A solo founder cannot watch dashboards. Monitoring = ALERTS that come to you (email/
WhatsApp/Telegram) when something crosses a line, plus one health view in the admin
panel. If it doesn't alert, it doesn't exist.

## Minimum setup per production app
1. **Cloud Function error alerts:** Google Cloud Monitoring alert on function error
   rate > 0 for payment/webhook functions, > 5% for the rest → email.
2. **Billing alert:** budget with alerts at 50/80/100% of expected monthly spend (W35).
3. **Payment reconciliation job (the most valuable one):** scheduled function, every
   6–12h, compares Razorpay dashboard totals vs Firestore payment records; any mismatch
   → alert. Catches lost webhooks, double-processing, and fraud in one check.
4. **Dead-man switch for critical jobs:** scheduled jobs write `lastRunAt` to a health
   doc; a watcher alerts if a job hasn't run on schedule. Silent-dead crons ship no orders.
5. **Admin panel health card** (his existing system-health pattern — keep it): last
   webhook received, last order, pending jobs count, failed jobs count.
6. **Uptime check** on the main URL + the Cloud Run payment endpoint (Google Cloud
   uptime checks or UptimeRobot free tier).

## What to check when an alert fires
Follow W34 (incident response). Alerts are triggers, not diagnoses.

## What NOT to build
No Grafana, no self-hosted stacks, no 40-metric dashboards. Six alerts that reach your
phone beat any dashboard you'll stop opening after week two.

## Failure this prevents
Customers discovering your outage before you, webhooks silently dead for a week,
a ₹40,000 surprise bill, orders stuck in "processing" forever.

## Linked
[[W34-INCIDENT-RESPONSE]] · [[W35-COST-CONTROL]]
