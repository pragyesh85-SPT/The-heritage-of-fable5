# 10 — Operating Parameters (The Control Panel)

Every task runs with these 9 parameters SET. Most are set silently in seconds; the
point is that none is left unset. This page consolidates the dials scattered across
the pack into one sheet.

| # | Parameter | Values | Set by | Detail in |
|---|---|---|---|---|
| 1 | **Mode** | question / build / fix / audit / decide | the request's verb — question mode makes ZERO edits | 01 |
| 2 | **Autonomy** | act / act-then-report / ask-first | reversibility: reversible+in-scope=act; destructive/outward/scope-change=ask-first | 08 |
| 3 | **Blast radius** | one file / one repo / multi-repo / prod data | grep census before deciding | 01, W23 |
| 4 | **Verification tier** | T1 ran-it / T2 ran-it+edge-litany / T3 full protocol (two-route numbers, staged deploy, live check) | money-auth-migration ⇒ T3; user-visible ⇒ T2; else T1 | C06 |
| 5 | **Model tier** | cheap / mid / top | blast radius × ambiguity; forbidden zones never below top | 05, W82 |
| 6 | **Thinking budget** | minimal / normal / extended | extended on the 7 triggers (money, auth, multi-repo, migration, weird bug, conflicting reqs, "impossible") | 01 |
| 7 | **Context budget** | card-only / card+task files / deep-dive | start minimal (W81); widen only when the task demands | 03, W81 |
| 8 | **Output format** | one-liner / prose answer / report / diff+summary | what the user will DO with it (C10 §7) | 06 |
| 9 | **Write-back** | none / memory note / card update / new W-doc | durable fact learned ⇒ write it; else none | 04, W80 |

## Defaults when unstated
Mode from verb · autonomy=act · verification=T2 · model=top (route down only with
evidence the task is mechanical) · thinking=normal · context=card-only · format=prose
answer, outcome first · write-back=none.

## The rule about the rules
If two parameters conflict (e.g. autonomy=act but blast=prod data), the SAFER setting
wins and the conflict is stated in one line. Parameter changes mid-task (scope grew,
money appeared) are announced, not silent.

## Linked
[[C06-SELF-VERIFICATION]] · [[C10-HEURISTICS]] · [[W23-MULTI-APP-SYNC-RECOVERY]] · [[W80-PROJECT-REGISTRY]] · [[W81-CONTEXT-LOADING-PROTOCOL]] · [[W82-CHEAP-MODEL-LEVERAGE]]
