# W70 — Fixing the PC (Windows Troubleshooting)

Trigger: "PC is slow / crashing / something broke on my computer".

## The parameters to establish before touching anything
1. **Exact symptom:** slow always vs slow sometimes; crash (BSOD? app? freeze?);
   error message VERBATIM (screenshot it).
2. **When it started + what changed:** new install, Windows update, new device,
   power cut. Problems follow changes here too.
3. **Scope:** one app / one function (WiFi, audio) / whole system.

## The iron rules
- **One change at a time, test after each.** Shotgun fixes = never knowing what worked
  and often making it worse.
- **Restore point / backup BEFORE:** driver changes, registry edits, or uninstall
  sprees. (System Restore point: 1 minute; recovering without one: a weekend.)
- **No random "PC optimizer" tools, ever.** They are the disease sold as the cure.

## Diagnosis ladder (stop at the first rung that finds it)
1. **Reboot** (genuinely fixes ~30%; uptime of weeks causes ghosts).
2. **Task Manager → sort by CPU/Memory/Disk.** A single process eating everything is
   the answer more often than not. Disk at 100% constantly on an HDD → the fix is an
   SSD, not software.
3. **Startup programs:** disable everything non-essential (Task Manager → Startup).
4. **Storage:** system drive under ~15% free causes system-wide slowness → clean
   (Storage Sense, uninstall unused, move media off C:).
5. **Windows Update + driver status:** fully update; for GPU/WiFi issues get the
   driver from the maker's site, not third-party driver tools.
6. **System integrity:** `sfc /scannow`, then `DISM /Online /Cleanup-Image /RestoreHealth`.
7. **Malware:** full Windows Defender scan (+ one-off second-opinion scanner if
   suspicious). Browser hijacks: check extensions first.
8. **Event Viewer** (crashes/BSOD): Windows Logs → System, filter Critical/Error around
   the crash time; the BSOD stop-code names the suspect (driver vs memory vs disk).
9. **Hardware checks:** disk health (`wmic diskdrive get status` / CrystalDiskInfo —
   SMART warnings mean BACK UP NOW, replace disk), RAM (Windows Memory Diagnostic),
   temperatures (dust + thermal throttling explain many "slow after 20 minutes" cases).
10. **Last resorts in order:** System Restore → Windows Reset keeping files → clean
    install. Before ANY of these: verify the backup of E:\PRAGYESH - WORK and the
    projects exists and opens.

## Special rule for THIS machine
`E:\PRAGYESH - WORK` is the business. Before any risky PC operation, confirm the E:
drive is backed up (cloud or external copy) and all git repos are pushed (W30). The
PC is replaceable; unpushed code and unsynced files are not.

## Failure this prevents
Optimizer-tool infections, driver roulette with no restore point, reinstalling Windows
for what was a 100%-disk HDD, losing the work drive during a "simple fix".

## Linked
[[W30-GIT-DEV-PROD-WORKFLOW]]
