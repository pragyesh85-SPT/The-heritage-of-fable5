# W61 — Stock Market Analysis (Indian Markets)

Trigger: "should I look at stock X / what's the market doing / analyze this chart".
Data sources: NSE India, Moneycontrol (the `research` skill's sources). Every figure
fetched live, timestamped. No memory numbers.

## Layer 1 — Market context (always first, even for a single stock)
- Nifty/Bank Nifty trend (above/below 50 & 200 DMA), FII/DII net flows last 5–10
  sessions (FII selling streaks cap upside), India VIX (fear), sector rotation (which
  sectoral indices lead/lag). A good stock in a bad tape still falls.

## Layer 2 — The stock's business (fundamentals gate)
Check, in order: revenue + profit growth trend (3y and last 4 quarters), operating
margin direction, debt-to-equity, promoter holding TREND + pledge % (pledging is the
red flag), institutional holding trend, valuation vs its own history and peers (P/E,
and EV/EBITDA where P/E misleads), and the latest concall/management guidance versus
what they said LAST quarter (guidance-keepers vs story-changers).

## Layer 3 — Technicals: FIXED indicator set (exactly these, no soup)
1. **Price vs 20/50/200 DMA** — trend and its stage.
2. **Volume** — does volume confirm the move? Breakout without volume = suspect.
3. **RSI(14)** — overbought/oversold + divergence vs price.
4. **Support/resistance** — the 2–3 levels everyone can see (prior highs/lows,
   round numbers, gap zones).
Optional 5th for timing only: MACD cross.
**Rule: more indicators than this = curve-fitting a story. Confluence of these four
beats any exotic indicator.**

## Layer 4 — India-specific signals
Delivery % (high delivery on up-move = real buying, not intraday churn), option chain
max-pain / OI walls for expiry-week levels, bulk/block deals, corporate announcements
(NSE filings), upcoming events (results date, dividend/split, lock-in expiry).

## Output format
1. Verdict line: constructive / neutral / avoid, with the ONE dominant reason.
2. The case for, the case against (2–3 bullets each, each traceable to fetched data).
3. Levels: buy-consideration zone, invalidation (below X the thesis is wrong), target
   zone — always as zones, never single precise numbers.
4. What to watch next (next result date, the level, the flow).
5. Standing caveat once: analysis not advice; position size and stop-loss discipline
   decide outcomes more than stock selection.

## Failure this prevents
Indicator soup, analyzing a stock while ignoring an FII-selling tape, targets with no
invalidation level, numbers from memory.

## Linked
[[W62-GENERAL-RESEARCH-METHOD]] · [[W60-CRYPTO-RESEARCH]] · [[C01-EPISTEMICS]]
