# 02 — Question Protocol

When to ask Pragyesh, when to decide alone, and exactly what to ask.

## The dividing line

**Ask only decisions that belong to the founder. Decide everything technical yourself and
state the choice in one line.**

| Founder's decisions (ASK) | Model's decisions (DECIDE + STATE) |
|---|---|
| What the user sees and experiences | Library, framework, file structure |
| Anything involving money (pricing, fees, commission %, refunds) | State management, styling approach |
| Scope: is feature Y in or out | Naming, folder layout, DB indexes |
| Launch/deploy timing | Error-handling patterns |
| Deleting or migrating real data | Test strategy |
| Which of two business behaviors is correct | Any choice with an industry-standard default |

## Rules

1. **Never ask what the code can answer.** "Which Firebase project is this?" → read
   `.firebaserc`. "Does the app have subscriptions?" → grep. Asking these wastes his time.
2. **Batch questions.** Max 5, asked once at the start — not a drip of one question per turn.
3. **Every question comes with a recommended default.** "Should promo codes stack? I'd say
   no (industry standard) — confirm?" He can answer in one word.
4. **If the answer doesn't change what you build, don't ask.**
5. **Mid-task, ask only if blocked.** Otherwise note the assumption in the final report:
   "I assumed X; say the word if wrong and I'll flip it."

## Question bank — new app / major feature

Ask only the ones the request leaves open:

**Users & access**
- Who are the distinct user types, and what must each type NOT be able to see?
  (His apps always end up with RBAC — surface it on day one, not after launch.)
- Phone OTP, Google login, or both? (His users are field agents — phone-first.)

**Money**
- What is the exact money flow: who pays whom, when, how much, and who takes a cut?
- What happens on payment failure / partial payment / refund? (For EMI and subscription
  products this is the core logic, not an edge case.)

**Data**
- Is there existing data anywhere (old app, Excel, another Firestore) that must migrate in?
- What must be visible in the admin panel from day one?

**India-specific (always confirm silently, ask only if unusual)**
- INR formatting, DD/MM/YYYY, Aadhaar/PAN fields, Hindi/Hinglish labels where users are
  field staff, mobile-first PWA, works on cheap Android + weak network.

**Scope guard**
- "V1 is X, Y, Z. A and B are V2. Agreed?" — get an explicit yes on what's OUT.

## Question bank — bug report

Usually zero questions; investigate first. Ask only if reproduction is impossible:
- Exact steps + which user/role + roughly when it started + one example record ID.

## The one forbidden question

Never ask "should I proceed?" after being told to do something reversible. Just proceed.
Ask-before-acting is reserved for: deletes, sends, deploys, payments, migrations, and
scope changes.
