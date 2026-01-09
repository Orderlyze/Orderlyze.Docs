# Batch-Script: Führt /add-doc 10 mal aus
# Jeder Durchlauf erstellt automatisch die nächste fehlende Dokumentation

$count = 10
$projectDir = "C:\Users\Daniel\source\repos\Orderlyze\Orderlyze.Docs"

# Wechsle ins Projektverzeichnis (wichtig für MCP Plugins)
Push-Location $projectDir

Write-Host "Starte Batch-Dokumentation ($count Durchläufe)..." -ForegroundColor Cyan
Write-Host "Arbeitsverzeichnis: $projectDir" -ForegroundColor Gray
Write-Host ""

for ($i = 1; $i -le $count; $i++) {
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "Durchlauf $i von $count" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow

    claude -p "/add-doc" --dangerously-skip-permissions --verbose

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Fehler bei Durchlauf $i - breche ab" -ForegroundColor Red
        break
    }

    Write-Host ""
    Write-Host "Durchlauf $i abgeschlossen" -ForegroundColor Green
    Write-Host ""

    # Kurze Pause zwischen Durchläufen
    Start-Sleep -Seconds 5
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Batch-Dokumentation abgeschlossen!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Zurück zum ursprünglichen Verzeichnis
Pop-Location
