# W35 — Firebase/Cloud Cost Control

Trigger: new prod project, bill higher than expected, before any traffic campaign.

## Setup (once per project, 15 minutes)
1. Google Cloud budget on the billing account: expected monthly spend, alerts at
   50/80/100/200%.
2. Know the four things that cost money in his stack: Firestore READS (usually #1),
   Cloud Functions/Run compute, Storage bandwidth (images/PDFs), and OpenRouter tokens.

## Design rules that keep bills flat
- Every list query has `limit()` + pagination. An unbounded `getDocs(collection)` on a
  growing collection is a bill that grows forever.
- Listeners only on data the user is looking at; detach on unmount.
- Images: resize/compress at upload (a 4MB camera photo served 10,000 times = real money);
  serve via Hosting/CDN cache.
- Counters and aggregates maintained by function (W20 §7), not computed by reading
  10,000 docs per dashboard load.
- OpenRouter/AI features: cap max tokens, cache common answers, use the cheapest model
  that passes (W82 logic applies inside apps too).

## Bill spiked — diagnosis
1. Billing report → which SKU (reads? egress? compute?) and which day it started.
2. Match to that day's deploys (git log across repos) — a new listener-per-row bug or an
   infinite function loop (W25 §3) are the usual suspects.
3. Firestore usage graphs narrow it to reads vs writes; function logs narrow the loop.
4. Fix root cause; don't just raise the budget alert.

## Failure this prevents
The classic Firebase horror story: a loop or unbounded query discovered only on a
5-figure invoice.

## Linked
[[W20-FIRESTORE-SCHEMA-DESIGN]] · [[W25-CLOUD-FUNCTIONS-AND-BACKGROUND-JOBS]] · [[W82-CHEAP-MODEL-LEVERAGE]]
