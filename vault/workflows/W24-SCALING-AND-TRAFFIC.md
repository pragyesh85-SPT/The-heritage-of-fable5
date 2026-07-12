# W24 — Traffic Spikes, Scaling, and "CPU Upgrades"

Trigger: "too many people came in", app slow under load, function timeouts, planning a
campaign/launch that will multiply traffic.

## The mental model for HIS stack
Firebase Hosting and Firestore **auto-scale** — you don't upgrade their CPU. The things
that actually choke, in order of likelihood:
1. **Cloud Functions / Cloud Run** — cold starts, instance limits, memory/CPU per instance.
2. **Firestore write hotspots** — 1 sustained write/sec per document (counters, sequential IDs).
3. **Wasteful reads** — every user's app downloading whole collections = cost + latency.
4. **Third parties** — Razorpay/ShipRocket/OpenRouter rate limits.

## Diagnosis procedure (app is slow/failing under load NOW)
1. Firebase console → Functions → look at error rate, execution times, instance count.
   Cloud Run → metrics: CPU utilization, request latency, instance count, 429/5xx.
2. Firestore usage tab: reads/writes per minute — did READS explode (inefficient queries)
   or WRITES (hotspot)?
3. Identify THE ONE bottleneck before changing anything. Upgrading everything blindly
   costs money and hides the real cause.

## The actual "CPU upgrade" levers
- **Cloud Run:** increase `--cpu` and `--memory`, raise `--max-instances` (and set
  `--min-instances 1` to kill cold starts on payment-critical services). One gcloud
  command or console edit; test on dev service first.
- **Cloud Functions v2:** set `memory` and `minInstances`/`maxInstances`/`concurrency`
  in the function definition; redeploy.
- **Firestore hotspots:** sharded counters (N counter docs, sum on read), remove
  sequential doc IDs, batch writes.
- **Read reduction:** add `limit()` + pagination to every list; replace repeated fetches
  with one listener; cache static data (product catalog) in the client.
- **Third-party limits:** queue + retry with backoff for Razorpay/ShipRocket calls;
  never fan out N simultaneous calls per user action.

## Before a planned campaign/launch
1. Estimate: expected users × actions each = reads/writes/function calls per minute.
2. Raise max-instances and set min-instances on the payment path BEFORE the spike.
3. Set billing alerts (W35) — a spike should never be discovered via the invoice.
4. Load-test the ONE critical path (order creation) with a simple script hitting dev,
   at 5× the expected rate. Fix what falls over.

## Background work management
- Anything slow (PDF generation, bulk WhatsApp sends, ShipRocket sync) runs in a
  function/Cloud Run job triggered by a Firestore write or Cloud Tasks — NEVER in the
  user's request path.
- Every background job writes its status to a doc (`jobs/{id}: pending/running/done/failed`
  + error) so the admin panel can show it — invisible background failures are how orders
  silently never ship.
- Scheduled work → Cloud Scheduler, with an alert on failure, not a "hope it ran" cron.

## Failure this prevents
Panic-upgrading the wrong thing, checkout dying during your own campaign, ₹-bleeding
runaway reads discovered on the bill.

## Linked
[[W35-COST-CONTROL]]
