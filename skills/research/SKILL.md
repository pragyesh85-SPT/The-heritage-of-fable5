---
name: research
description: "Complete Indian stock market research assistant using Moneycontrol.com and NSE India (nseindia.com). Covers FII/DII data, sector analysis, corporate announcements, option chain analysis, stock-specific research, geopolitical impact, and management guidance parsing. Produces structured research reports with signals."
trigger: /research
---

# /research

Complete Indian stock market research pipeline. Turns any stock/sector/topic into a structured research report by browsing Moneycontrol.com and NSE India, cross-referencing FII/DII data, option chain OI, corporate filings, news, and technicals.

## Usage

```
/research                                                        # Interactive: ask for topic then run full pipeline
/research "RELIANCE"                                             # Full stock research on a specific company
/research "NIFTY BANK"                                           # Index/sector research
/research "NIFTY 50" --premarket                                 # Pre-market checklist only
/research "TCS" --quick                                          # Quick 5-min scan (skip deep financials)
/research "Adani Power" --pdf                                    # Full research + PDF report generation
/research "--help"                                               # Show this usage block
```

## What this skill is for

Deep Indian equity research combining:
- **Moneycontrol.com** — Indices, sectors, FII/DII, technical trends, stock screener, news
- **NSE India (nseindia.com)** — Option chain, corporate filings, shareholding, financials, block deals, F&O OI

## What You Must Do When Invoked

If the user runs `/research --help` or `/research -h`, print the `## Usage` section above and stop.

Otherwise, identify the research scope:
- **Stock deep-dive** (single company) → use full 7-step pipeline
- **Sector/Index research** → use steps 1, 2, 6, 7
- **Market overview** (no specific topic) → use steps 1, 2, 3, 6, 7
- **Pre-market checklist** → use steps 1, 3, 6 only
- **Option chain analysis** → use step 6 only

Follow the steps below in order. Do not skip steps unless scope excludes them.

---

## COMPLETE SITE REFERENCE GUIDE

### MONEYCONTROL.COM KEY URLS

#### Homepage & Navigation
| Page | URL |
|------|-----|
| Homepage | https://www.moneycontrol.com/ |
| Markets Hub | https://www.moneycontrol.com/stocksmarketsindia/ |
| News Hub | https://www.moneycontrol.com/news/ |
| MC PRO | https://www.moneycontrol.com/pro-top-stories |

#### Market Data
| Page | URL |
|------|-----|
| Indian Indices | https://www.moneycontrol.com/markets/indian-indices/ |
| Global Markets | https://www.moneycontrol.com/markets/global-indices/ |
| FII/DII Data | https://www.moneycontrol.com/markets/fii-dii-data/ |
| Sector Analysis | https://www.moneycontrol.com/markets/sector-analysis |
| Technical Trends | https://www.moneycontrol.com/markets/technical-trends/ |
| Earnings Calendar | https://www.moneycontrol.com/markets/earnings/ |
| Stock Deals | https://www.moneycontrol.com/markets/stock-deals/ |
| Seasonality Analysis | https://www.moneycontrol.com/markets/seasonality-analysis/ |
| Economic Calendar | https://www.moneycontrol.com/markets/economic-calendar/ |
| US Markets | https://www.moneycontrol.com/markets/us-markets/ |
| Commodities | https://www.moneycontrol.com/commodity/ |
| Currencies | https://www.moneycontrol.com/markets/currencies/ |
| IPO | https://www.moneycontrol.com/ipo/ |
| Mutual Funds | https://www.moneycontrol.com/mutual-funds/ |

#### Stock Screeners
| Page | URL |
|------|-----|
| Top Gainers NSE | https://www.moneycontrol.com/stocks/market-stats/top-gainers-nse/ |
| Top Losers NSE | https://www.moneycontrol.com/stocks/market-stats/top-losers-nse/ |
| Most Active (Value) | https://www.moneycontrol.com/stocks/market-stats/most-active-stocks-nse/ |
| Volume Shockers | https://www.moneycontrol.com/stocks/market-stats/volume-shockers-bse/ |
| Price Shockers | https://www.moneycontrol.com/stocks/market-stats/price-shockers-bse/ |
| Only Buyers | https://www.moneycontrol.com/stocks/market-stats/only-buyers-nse/ |
| Only Sellers | https://www.moneycontrol.com/stocks/market-stats/only-sellers-nse/ |
| Delivery Stats | https://www.moneycontrol.com/india/stockmarket/stock-deliverables/marketstatistics/bse/ |
| All Market Stats | https://www.moneycontrol.com/stocks/marketstats/index.php |
| F&O Gainers | https://www.moneycontrol.com/stocks/fno/marketstats/futures/gainers/homebody.php |
| F&O Losers | https://www.moneycontrol.com/stocks/fno/marketstats/futures/losers/homebody.php |

#### Key Indices
| Index | URL |
|-------|-----|
| NIFTY 50 | https://www.moneycontrol.com/indian-indices/nifty-50-9.html |
| SENSEX | https://www.moneycontrol.com/sensex/bse/sensex-live |
| NIFTY BANK | https://www.moneycontrol.com/indian-indices/nifty-bank-23.html |
| NIFTY IT | https://www.moneycontrol.com/indian-indices/nifty-it-14.html |
| NIFTY AUTO | https://www.moneycontrol.com/indian-indices/nifty-auto-24.html |
| NIFTY PHARMA | https://www.moneycontrol.com/indian-indices/nifty-pharma-19.html |
| NIFTY FMCG | https://www.moneycontrol.com/indian-indices/nifty-fmcg-16.html |
| NIFTY MIDCAP 100 | https://www.moneycontrol.com/indian-indices/nifty-midcap-100-27.html |

#### Individual Stock Page Pattern
```
https://www.moneycontrol.com/india/stockpricequote/[sector]/[company]/[code]
```
Tabs: Overview | Chart | Forecast | MC Insights | MC Technicals | Stock Vitals | Scans | Price & Volume | Seasonality | News | Forum | Research | Deals | Corp Action | Financials | Shareholding

#### News
| Page | URL |
|------|-----|
| Markets News | https://www.moneycontrol.com/news/business/markets/ |
| Stocks News | https://www.moneycontrol.com/news/business/stocks/ |
| Economy | https://www.moneycontrol.com/news/economy/ |
| Companies | https://www.moneycontrol.com/news/business/companies/ |
| Interview | https://www.moneycontrol.com/news/interview/ |

#### MC PRO
| Page | URL |
|------|-----|
| PRO Home | https://www.moneycontrol.com/pro-top-stories |
| Brokerage Recs | https://www.moneycontrol.com/news/tags/recommendations.html |
| Stock Views | https://www.moneycontrol.com/news/tags/stocks-views.html |
| Buzzing Stocks | https://www.moneycontrol.com/news/tags/stocks-in-news.html |

---

### NSE INDIA (nseindia.com) KEY URLS

| Page | URL |
|------|-----|
| Homepage | https://www.nseindia.com/ |
| Option Chain | https://www.nseindia.com/option-chain |
| Live Equity Watch | https://www.nseindia.com/market-data/live-equity-market |
| Indices Watch | https://www.nseindia.com/market-data/live-market-indices |
| Index Heatmap | https://www.nseindia.com/market-data/live-market-indices/heatmap |
| OI Spurts | https://www.nseindia.com/market-data/oi-spurts |
| Most Active Contracts | https://www.nseindia.com/market-data/most-active-contracts |
| Most Active Underlying | https://www.nseindia.com/market-data/most-active-underlying |
| Top Gainers/Losers | https://www.nseindia.com/market-data/top-gainers-losers |
| 52W High/Low | https://www.nseindia.com/market-data/52-week-high-equity-market |
| Price Band Hitters | https://www.nseindia.com/market-data/both-band-hitters |
| Pre-Open Market | https://www.nseindia.com/market-data/pre-open-market-cm-and-emerge-market |
| Block Deal Watch | https://www.nseindia.com/market-data/block-deal-watch |
| Corporate Announcements | https://www.nseindia.com/companies-listing/corporate-filings-announcements |
| Corporate Actions | https://www.nseindia.com/companies-listing/corporate-filings-actions |
| Financial Results | https://www.nseindia.com/companies-listing/corporate-filings-financial-results |
| Board Meetings | https://www.nseindia.com/companies-listing/corporate-filings-board-meetings |
| Shareholding Patterns | https://www.nseindia.com/companies-listing/corporate-filings-shareholding-pattern |
| Annual Reports | https://www.nseindia.com/companies-listing/corporate-filings-annual-reports |
| Currency Derivatives | https://www.nseindia.com/market-data/currency-derivatives |
| Commodity Derivatives | https://www.nseindia.com/market-data/commodity-derivatives |
| IPO | https://www.nseindia.com/market-data/all-upcoming-issues-ipo |
| Listings | https://www.nseindia.com/market-data/new-stock-exchange-listings-today |
| ETF Watch | https://www.nseindia.com/market-data/exchange-traded-funds-etf |
| SME Market | https://www.nseindia.com/market-data/sme-market |
| Daily Reports | https://www.nseindia.com/all-reports |

#### Individual Stock Quote Page
```
https://www.nseindia.com/get-quotes/equity?symbol=SYMBOLNAME
```
Shows: LTP, change, day OHLC, VWAP, volume, delivery %, market cap, P/E, 52W range, order book, corporate announcements, corporate actions, financial results charts, shareholding, peer comparison, board meetings, annual reports, and historical data download.

#### Index Tracker Pages
```
https://www.nseindia.com/index-tracker/NIFTY%2050
https://www.nseindia.com/index-tracker/NIFTY%20BANK
https://www.nseindia.com/index-tracker/NIFTY%20IT
https://www.nseindia.com/index-tracker/NIFTY%20AUTO
https://www.nseindia.com/index-tracker/NIFTY%20PHARMA
https://www.nseindia.com/index-tracker/NIFTY%20FMCG
https://www.nseindia.com/index-tracker/NIFTY%20METAL
https://www.nseindia.com/index-tracker/NIFTY%20REALTY
https://www.nseindia.com/index-tracker/NIFTY%20MIDCAP%20SELECT
https://www.nseindia.com/index-tracker/NIFTY%20FINANCIAL%20SERVICES
```
Each shows: live value, O/H/L, P/E, P/B, advance/decline, constituent heatmap, top 5 gainers/losers, returns table (1W/1M/3M/6M/YTD/1Y/3Y/5Y), constituent table with weightages.

---

## SIGNAL INTERPRETATION CHEATSHEET

### FII/DII Interpretation
| Signal | Meaning |
|--------|---------|
| FII CM deeply negative (< -5000 Cr multiple days) | Bearish — risk of market decline |
| DII CM strongly positive | Domestic institutions buying dip = market floor |
| FII CM positive for 3+ days | Bullish — potential sustained rally |
| FII Index Futures net long rising | FIIs bullish on Nifty |
| FII Index Futures net short rising | FIIs hedging/shorting = bearish |
| FPI Sectoral Activity | Which sectors FIIs are accumulating/selling |

### F&O OI + Price (4 Combinations)
| OI Change | Price Change | Signal |
|-----------|-------------|--------|
| Increasing | Increasing | LONG BUILDUP — strongly bullish |
| Increasing | Decreasing | SHORT BUILDUP — strongly bearish |
| Decreasing | Increasing | SHORT COVERING — momentum buy |
| Decreasing | Decreasing | LONG UNWINDING — bearish |

### Option Chain Support/Resistance
| Observation | Meaning |
|-------------|---------|
| Highest Put OI strike | Strong SUPPORT |
| Highest Call OI strike | Strong RESISTANCE |
| PCR > 1.2 | Bearish sentiment (more puts) |
| PCR < 0.8 | Bullish sentiment (more calls) |
| Large +Change in OI at Call strike + falling LTP | Resistance confirmed (call writing) |
| Large +Change in OI at Put strike + rising LTP | Support confirmed (put writing) |
| Max Pain strike | Expected expiry settlement level |

### Market Breadth Signals
| Signal | Meaning |
|--------|---------|
| Adv/Decl > 1.5 | Broad bullish |
| Adv/Decl < 0.7 | Broad bearish |
| Index up but breadth poor | Narrow rally — caution |
| 100+ stocks at 52W high | Extreme strength |
| 100+ stocks at 52W low | Extreme weakness |

### Sector Rotation Signals
| Pattern | Meaning |
|---------|---------|
| IT + FMCG gaining, Metals + Auto falling | Defensive rotation (cautious market) |
| Metals + Auto + Banks gaining, IT falling | Risk-on rotation (bullish) |

### Individual Stock Buy/Sell Signals
| Signal | Action |
|--------|--------|
| Volume Shocker + Price up >5% + Long Buildup OI + Insider buying + Sector uptrend + Analyst upgrade | STRONG BUY |
| Volume Shocker + Price down >5% + Short Buildup OI + Promoter selling + Sector downtrend + Analyst downgrade | STRONG SELL |
| Near 52W high without volume confirmation | WAIT |
| Results due in <5 days | WAIT |
| Promoter pledge >50% | RISK |
| Negative operating cash flow | RISK |

---

## RESEARCH PIPELINE — 7 STEPS

### STEP 1: Macro Context — Market Direction & Global Cues

Goal: Understand what's driving the market today.

Execute in parallel using WebSearch + Kimi WebBridge browsing:

**A. Global Markets Check** (WebSearch)
- Search: "GIFT Nifty today June 2026" and "US market close S&P 500 Nasdaq June 4 2026"
- Search: "Asian markets open June 2026 Nikkei Hang Seng Shanghai"
- Note: GIFT Nifty direction = single best pre-market indicator for NIFTY open

**B. Commodity & Currency Check** (Kimi WebBridge → browse if needed, or WebSearch)
- Browse or search: Crude Oil price, USD/INR rate
- Rising crude >2% = negative for India; USD/INR weakening >0.5% = FII selling risk

**C. FII/DII Data** (Kimi WebBridge → https://www.moneycontrol.com/markets/fii-dii-data/)
- Read Summary tab: FII CM net + DII CM net for latest 2-3 days
- Switch to FPI Sectoral Activity tab: which sectors getting foreign inflows/outflows
- Note: FII index futures net position (bullish/bearish for Nifty)

**D. Market Breadth** (WebSearch or browse)
- Advance/Decline ratio, 52-week highs vs lows count

**OUTPUT:** Brief macro summary — global cues (bullish/bearish/mixed), FII/DII flow direction, commodity risk, overall market bias.

### STEP 2: Sector Analysis

Goal: Identify which sectors are leading/lagging and why.

Execute in parallel:

**A. Sector Performance** (Kimi WebBridge → https://www.moneycontrol.com/markets/sector-analysis)
- Read 1D and 1M sector performance table
- Note: top 3 performing sectors, bottom 3 performing sectors

**B. Sector-specific News** (WebSearch)
- Search: "sector news [METAL/BANK/IT/etc] June 2026"
- Search: "government policy [sector] India June 2026"
- Look for: budget announcements, regulatory changes, tariff moves, PLI scheme updates

**C. Cross-reference with FII Flows**
- Compare sector performance (from 2A) with FPI Sectoral Activity (from 1C)
- Signal: If sector is performing but FIIs are selling → caution
- Signal: If sector is performing AND FIIs are buying → strong confirmation

**OUTPUT:** Sector heatmap — which sectors have momentum, which are weak, FII flow alignment, any catalyst events.

### STEP 3: Stock-specific Corporate Announcements

Goal: Find material corporate events affecting the target stock.

**A. NSE Corporate Announcements** (Kimi WebBridge → https://www.nseindia.com/companies-listing/corporate-filings-announcements)
- Filter by target stock symbol
- Read recent announcements: board meetings, results intimations, press releases, order wins, M&A, insider trading disclosures

**B. News Search** (WebSearch)
- Search: "[stock name] news June 2026"
- Search: "[stock name] analyst rating target price 2026"
- Search: "[stock name] quarterly results financials"

**OUTPUT:** Key events list — what's happening with this stock in the near term.

### STEP 4: Stock Deep-Dive — Financials, Shareholding, Management Guidance

Goal: Understand the company's fundamentals and management outlook.

Execute in parallel:

**A. NSE Stock Quote Page** (Kimi WebBridge → https://www.nseindia.com/get-quotes/equity?symbol=SYMBOL)
- Read: P/E, market cap, delivery %, 52W range, beta
- Read: Shareholding pattern tab — FII/DII/Promoter stake trend (last 4 quarters)
- Read: Financial results tab — revenue, profit trend (last 8 quarters)

**B. Moneycontrol Stock Page** (Kimi WebBridge → https://www.moneycontrol.com/india/stockpricequote/...)
- Read: MC Technicals tab — overall rating, moving averages, pivot levels
- Read: MC Insights tab — OI-based signal (long buildup/short buildup etc.)
- Read: Research tab — recent brokerage reports with target prices
- Read: Deals tab — block/bulk/insider deals
- Read: News tab for stock-specific news

**C. Management Guidance Parsing** (WebSearch or Kimi WebBridge)
- If recent earnings call transcript or concall notes available:
  - Search: "[stock] earnings call transcript Q4 FY26" or "[stock] concall highlights"
  - Key things to extract:
    - Revenue guidance for upcoming quarters
    - Margin outlook (raw material costs, pricing power)
    - Capex plans
    - Demand commentary (domestic vs export)
    - Order book position (for industrials/infra)
    - Any new product launches or geographies
    - Management tone (optimistic/cautious)

**OUTPUT:** Fundamental snapshot — valuation (P/E vs sector), shareholding trends, delivery trend, pivot levels, OI signal, management guidance summary.

### STEP 5: Geopolitical & Macro News Impact

Goal: Identify global/domestic events that could move the market or specific stocks.

**A. Geopolitical Scan** (WebSearch)
- Search: "geopolitical risk Indian stock market June 2026"
- Search: "India trade policy China US June 2026"
- Search: "global economic data this week June 2026" (Fed, RBI, CPI, GDP)
- Search: "crude oil supply disruption June 2026"

**B. Domestic Policy** (WebSearch)
- Search: "SEBI regulation new circular June 2026"
- Search: "government fiscal policy India June 2026"
- Search: "RBI monetary policy outlook 2026"

**OUTPUT:** Risk register — geopolitical, policy, or macro events that could impact the position; categorized by severity (high/medium/low).

### STEP 6: Option Chain Analysis

Goal: Determine support/resistance levels from option OI data.

**A. Browse NSE Option Chain** (Kimi WebBridge → https://www.nseindia.com/option-chain)
- Select the correct symbol/index and nearest expiry
- Extract:
  - Total Call OI and Total Put OI
  - PCR (Put-Call Ratio)
  - Max Pain strike
  - Strikes with highest Put OI (support levels)
  - Strikes with highest Call OI (resistance levels)
  - Change in OI for near strikes — identify where new positions are building

**B. OI Spurts** (Kimi WebBridge → https://www.nseindia.com/market-data/oi-spurts)
- Check Long Build-Up and Short Build-Up tabs for target stock

**C. OI Participants** (Kimi WebBridge → FII/DII page OI Participants tab)
- Who is building positions — FIIs, DIIs, retail, or proprietary traders

**OUTPUT:** Option chain summary — support levels, resistance levels, PCR sentiment, OI buildup signals, expected expiry range.

### STEP 7: Consolidated Research Report

Compile everything into a structured report:

```
────────────────────────────────────────
RESEARCH REPORT: [TOPIC]
Date: [current date]
────────────────────────────────────────

1. MACRO SUMMARY
   - Global cues: [bullish/bearish/mixed]
   - GIFT Nifty signal: [+/-]%
   - FII/DII: [FII net X Cr, DII net Y Cr]
   - Commodity: Crude [price], USD/INR [rate]
   - Market bias: [bullish/bearish/cautious]

2. SECTOR ANALYSIS
   - Top sectors: [1, 2, 3 with returns]
   - Weak sectors: [1, 2, 3 with returns]
   - FII flow alignment: [aligned/divergent]
   - Sector catalyst: [what's driving moves]

3. CORPORATE EVENTS
   - [Event type]: [details]
   - [Event type]: [details]

4. STOCK FUNDAMENTALS
   - Valuation: P/E [X], Sector P/E [Y], [over/under]valued
   - Shareholding: FII [trend], DII [trend], Promoter [trend]
   - Delivery trend: [improving/declining]
   - Management guidance: [summary of key takeaways]
   - Brokerage consensus: [Buy/Hold/Sell], avg target [price]

5. TECHNICAL & OI
   - Technical rating: [Very Bullish/Bullish/Neutral/Bearish/Very Bearish]
   - Pivot S/R: S3/S2/S1/P/R1/R2/R3
   - OI signal: [Long Buildup/Short Buildup/Short Covering/Long Unwinding]
   - Support (Option Chain): [levels with highest Put OI]
   - Resistance (Option Chain): [levels with highest Call OI]
   - PCR: [value] — [bullish/bearish/neutral]

6. RISKS
   - Geopolitical: [high/med/low — details]
   - Policy/regulatory: [high/med/low — details]
   - Stock-specific: [promoter pledge, results date, etc.]

7. VERDICT
   - Overall bias: [Bullish/Bearish/Neutral/Cautious]
   - Entry zone: [support level range]
   - Exit zone: [resistance level range]
   - Stop-loss: [level]
   - Confidence: [High/Medium/Low]
   - Key catalysts to watch: [1-3 items]
```

## Research Methodology Rules

1. **Run searches in parallel** — all independent web searches go in one batch
2. **Cross-verify** key claims from at least 2 sources before including
3. **If sources disagree** on a data point, note the tension — don't pick a side
4. **Always include date context** in searches (e.g. "June 2026", "this month")
5. **Prefer official NSE/Moneycontrol data** over third-party summaries
6. **Kimii WebBridge session** — use one session name per research task
7. **For quick scans** (--quick flag): only run Steps 1, 4(B), 6, 7
8. **For pre-market** (--premarket flag): only run Steps 1, 6, output condensed macro summary
9. **If user asks for PDF** (--pdf flag): after Step 7, use the RESEARCH_METHODOLOGY.md pipeline (Python HTTP server + Kimi WebBridge save_as_pdf) to generate PDF from the report HTML

## Site Navigation Tips for Kimi WebBridge

- Moneycontrol.com and NSE India both load with JavaScript — use `snapshot` after `navigate` to read content
- NSE option chain page: after navigating, wait 2-3 seconds for the table to render, then `snapshot` to read OI data
- If a table is too large, use `evaluate` to extract specific cells with JS
- Stock quotes: NSE uses symbol-based URLs — may need to search first to find the correct symbol
- Moneycontrol uses sector/company/code path — search bar is easiest; navigate to homepage, search stock name, then snapshot the search results to find the correct URL
- Corporate announcements on NSE: filter by company name after loading the page

## Error Handling

- If a page doesn't load (timeout or error), retry once after 3 seconds
- If the site blocks browsing, fall back to WebSearch for that data point
- If FII/DII data is not yet available (provisional comes around 12:30 PM IST, final at 4-5 PM), note the time and use previous day's data
- If option chain data is stale (after 3:30 PM), use the last available expiry data
