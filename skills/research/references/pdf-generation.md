# PDF Generation for Research Reports

When the user adds `--pdf` flag, generate a PDF from the Step 7 consolidated report.

## Workflow

1. Write the Step 7 report as a self-contained HTML file with inline CSS
2. Serve it via Python HTTP server
3. Use Kimi WebBridge's `save_as_pdf` to save as PDF
4. Deliver the PDF path to the user

## HTML Template

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --primary: #1a1a2e;
      --positive: #059669;
      --negative: #dc2626;
      --neutral: #d97706;
      --accent: #2563eb;
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #e2e8f0;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); padding: 40px; }
    h1 { font-size: 2em; margin-bottom: 10px; }
    h2 { font-size: 1.4em; margin: 30px 0 15px; border-bottom: 1px solid #334155; padding-bottom: 8px; }
    h3 { font-size: 1.1em; margin: 20px 0 10px; color: var(--accent); }
    .signal-up { color: var(--positive); }
    .signal-down { color: var(--negative); }
    .signal-neutral { color: var(--neutral); }
    .data-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0; }
    .metric-box { background: var(--card-bg); padding: 15px; border-radius: 8px; }
    .metric-box .label { font-size: 0.8em; color: #94a3b8; }
    .metric-box .value { font-size: 1.4em; font-weight: 600; margin-top: 5px; }
    .signal-box { padding: 12px 15px; border-left: 4px solid; border-radius: 6px; margin: 10px 0; background: var(--card-bg); }
    .signal-box.bullish { border-color: var(--positive); }
    .signal-box.bearish { border-color: var(--negative); }
    .signal-box.neutral { border-color: var(--neutral); }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #334155; }
    th { background: var(--card-bg); font-weight: 600; }
    .page-break { page-break-before: always; }
    .cover { text-align: center; padding-top: 200px; }
    .cover h1 { font-size: 2.5em; }
    .cover p { margin: 10px 0; color: #94a3b8; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin: 5px 0; line-height: 1.6; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: 600; }
    .tag.up { background: rgba(5, 150, 105, 0.2); color: var(--positive); }
    .tag.down { background: rgba(220, 38, 38, 0.2); color: var(--negative); }
    .tag.warn { background: rgba(217, 119, 6, 0.2); color: var(--neutral); }
    @media print { .page-break { page-break-before: always; } }
  </style>
</head>
<body>
  <!-- COVER PAGE -->
  <div class="cover">
    <h1>Research Report: [TOPIC]</h1>
    <p>[Date] | AI-Assisted Research via Moneycontrol + NSE</p>
    <p style="margin-top:30px;">7-section analysis: Macro → Sector → Corporate → Fundamentals → Technicals → Options → Verdict</p>
  </div>
  <div class="page-break"></div>

  <!-- SECTION CONTENT — plug in all 7 sections here -->
  <!-- End with disclaimer -->
  <div class="page-break"></div>
  <p style="color:#64748b; font-size:0.8em; margin-top:40px;">
    Disclaimer: This report is AI-generated research assistance. Not investment advice. 
    Cross-verify all data with your broker or financial advisor before trading.
  </p>
</body>
</html>
```

## Steps for PDF Generation

```powershell
# 1. Write HTML to $env:TEMP\opencode\research_report.html

# 2. Start Python HTTP server
Start-Process -NoNewWindow -FilePath "python" -ArgumentList "-m http.server 8899" `
  -WorkingDirectory "$env:TEMP\opencode" `
  -RedirectStandardOutput "$env:TEMP\opencode\server_stdout.log" `
  -RedirectStandardError "$env:TEMP\opencode\server_stderr.log"
Start-Sleep -Seconds 2

# 3. Verify server
curl.exe -s -o NUL -w "%{http_code}" http://127.0.0.1:8899/research_report.html

# 4. Write navigate.json
Set-Content -Encoding ascii -Path "$env:TEMP\opencode\navigate.json" -Value '{"action":"navigate","args":{"url":"http://127.0.0.1:8899/research_report.html","newTab":true,"group_title":"Research Report"},"session":"research-report"}'

# 5. Navigate via Kimi WebBridge
curl.exe -s -X POST http://127.0.0.1:10086/command -d "@$env:TEMP\opencode\navigate.json" -H "Content-Type: application/json"
Start-Sleep -Seconds 3

# 6. Write save_pdf.json (use forward slashes)
Set-Content -Encoding ascii -Path "$env:TEMP\opencode\save_pdf.json" -Value '{"action":"save_as_pdf","args":{"paper_format":"a4","landscape":false,"scale":0.9,"print_background":true,"path":"C:/Users/YOURUSER/Desktop/research_report.pdf"},"session":"research-report"}'

# 7. Save as PDF
curl.exe -s -X POST http://127.0.0.1:10086/command -d "@$env:TEMP\opencode\save_pdf.json" -H "Content-Type: application/json"

# 8. Stop server
Stop-Process -Name "python" -Force

# 9. Verify PDF exists
Get-Item -LiteralPath "C:\Users\YOURUSER\Desktop\research_report.pdf"
```

## Critical Notes

- Write JSON to file — never use inline JSON with curl.exe in PowerShell (it gets mangled)
- Use forward slashes in paths in JSON (backslashes become escape sequences)
- Use Start-Process NOT Start-Job (jobs don't persist across tool calls)
- Always verify server with curl before navigating
- Wait 2-3 seconds between navigate and save_as_pdf for full page render
