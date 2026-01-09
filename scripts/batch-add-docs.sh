#!/bin/bash
# Batch-Script: Führt /add-doc 10 mal aus
# Jeder Durchlauf erstellt automatisch die nächste fehlende Dokumentation

COUNT=10

echo "Starte Batch-Dokumentation ($COUNT Durchläufe)..."
echo ""

for i in $(seq 1 $COUNT); do
    echo "========================================"
    echo "Durchlauf $i von $COUNT"
    echo "========================================"

    claude -p "/add-doc" --dangerously-skip-permissions

    if [ $? -ne 0 ]; then
        echo "Fehler bei Durchlauf $i - breche ab"
        break
    fi

    echo ""
    echo "Durchlauf $i abgeschlossen"
    echo ""

    # Kurze Pause zwischen Durchläufen
    sleep 5
done

echo ""
echo "========================================"
echo "Batch-Dokumentation abgeschlossen!"
echo "========================================"
