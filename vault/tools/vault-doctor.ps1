# vault-doctor.ps1 -- CLAUDE-BRAIN vault health check (protocol: workflows\W101)
# Usage:
#   powershell -ExecutionPolicy Bypass -File "E:\PRAGYESH - WORK\CLAUDE-BRAIN\tools\vault-doctor.ps1"
# Exit code 0 = healthy, 1 = defects found. Windows PowerShell 5.1 compatible.

$ErrorActionPreference = 'Stop'
$VaultRoot = Split-Path -Parent $PSScriptRoot

$allMd = Get-ChildItem -Path $VaultRoot -Filter *.md -Recurse -File |
    Where-Object { $_.FullName -notmatch '[\\/]\.obsidian[\\/]' }

# Load every file's text once
$texts = @{}
foreach ($f in $allMd) {
    $raw = Get-Content -LiteralPath $f.FullName -Raw
    if ($null -eq $raw) { $raw = '' }   # empty files return $null
    $texts[$f.FullName] = $raw
}

# Basename set ([[wikilinks]] resolve by basename, no extension)
$names = @{}
foreach ($f in $allMd) { $names[$f.BaseName] = $true }

$linkPattern = '\[\[([^\]\|#]+)'
# Illustrative link targets used in prose examples -- never real files
$exampleTargets = @('wikilink', 'wikilinks', 'other-note-name', 'related-note', 'their-name', 'name')
$inbound = @{}
$brokenLinks = New-Object System.Collections.ArrayList
$missingFooter = New-Object System.Collections.ArrayList

foreach ($f in $allMd) {
    $text = $texts[$f.FullName]
    $rel = $f.FullName.Substring($VaultRoot.Length + 1)
    foreach ($m in [regex]::Matches($text, $linkPattern)) {
        $target = $m.Groups[1].Value.Trim()
        if ($names.ContainsKey($target)) { $inbound[$target] = $true }
        elseif (($exampleTargets -contains $target) -or ($target -match '[<>]')) { }
        else { [void]$brokenLinks.Add("$rel -> [[$target]]") }
    }
    # '## Linked' footer required for core (NN-*.md at root), craft, workflows
    $isCore  = ($f.DirectoryName -eq $VaultRoot) -and ($f.BaseName -match '^\d\d-')
    $isCraft = $f.DirectoryName -match '[\\/]craft$'
    $isWf    = ($f.DirectoryName -match '[\\/]workflows$') -and ($f.BaseName -ne 'INDEX')
    if (($isCore -or $isCraft -or $isWf) -and ($text -notmatch '## Linked')) {
        [void]$missingFooter.Add($rel)
    }
}

# Orphans: no inbound wikilink, excluding entry points and index files
$entryPoints = @('HOME', 'ROUTER', 'RESURRECTION', 'INDEX')
$orphans = New-Object System.Collections.ArrayList
foreach ($f in $allMd) {
    if ($entryPoints -contains $f.BaseName) { continue }
    if (-not $inbound.ContainsKey($f.BaseName)) {
        [void]$orphans.Add($f.FullName.Substring($VaultRoot.Length + 1))
    }
}

# Every workflows\W*.md must appear in workflows\INDEX.md
$wfIndexPath = Join-Path $VaultRoot 'workflows\INDEX.md'
$wfIndex = $texts[$wfIndexPath]
$unindexed = New-Object System.Collections.ArrayList
foreach ($f in $allMd) {
    if (($f.DirectoryName -match '[\\/]workflows$') -and ($f.BaseName -like 'W*')) {
        if ($wfIndex -notmatch [regex]::Escape($f.BaseName)) { [void]$unindexed.Add($f.Name) }
    }
}

# Registry notes stuck at 'confidence: assumed' (W83: verify twice or delete)
$assumed = New-Object System.Collections.ArrayList
foreach ($f in $allMd) {
    if ($f.FullName -match '[\\/]_REGISTRY[\\/]') {
        if ($texts[$f.FullName] -match 'confidence:\s*assumed') {
            [void]$assumed.Add($f.FullName.Substring($VaultRoot.Length + 1))
        }
    }
}

function Show-Section($title, $items) {
    Write-Host ""
    if ($items.Count -eq 0) { Write-Host "OK   $title" -ForegroundColor Green }
    else {
        Write-Host "FAIL $title ($($items.Count))" -ForegroundColor Red
        foreach ($i in $items) { Write-Host "     - $i" }
    }
}

Write-Host "VAULT DOCTOR -- $VaultRoot"
Write-Host "Markdown files scanned: $($allMd.Count)"
Show-Section 'Broken wikilinks' $brokenLinks
Show-Section 'Orphan files (nothing links to them)' $orphans
Show-Section "Missing '## Linked' footer (core/craft/workflows)" $missingFooter
Show-Section 'W-docs missing from workflows\INDEX.md' $unindexed
Show-Section "Registry notes at 'confidence: assumed'" $assumed

$defects = $brokenLinks.Count + $orphans.Count + $missingFooter.Count + $unindexed.Count + $assumed.Count
Write-Host ""
Write-Host "TOTAL DEFECTS: $defects"
if ($defects -gt 0) { exit 1 } else { exit 0 }
