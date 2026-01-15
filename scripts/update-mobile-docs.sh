#!/bin/bash
# =============================================================================
# Orderlyze Mobile Docs Update Script
# =============================================================================
# Iteriert durch alle App-Dokumentations-Ordner und aktualisiert sie mit Claude
# Vergleicht Screenshots und Texte, fügt Tablet-Support hinzu
# =============================================================================

set -e

# Pfade
DOCS_DIR="/home/orderlyze/dev/Orderlyze.Docs"
MOBILE_DIR="/home/orderlyze/dev/Orderlyze_Mobile"
SCREENSHOTS_SRC="$MOBILE_DIR/docs/screenshots"
SCREENSHOTS_DST="$DOCS_DIR/static/screenshots/app"

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=============================================${NC}"
echo -e "${BLUE}  Orderlyze Mobile Docs Update              ${NC}"
echo -e "${BLUE}=============================================${NC}"
echo ""

# Prüfe ob Quell-Ordner existiert
if [ ! -d "$SCREENSHOTS_SRC" ]; then
    echo -e "${RED}Fehler: Quell-Ordner nicht gefunden: $SCREENSHOTS_SRC${NC}"
    exit 1
fi

# Erstelle Tablet-Screenshot-Ordner falls nicht vorhanden
mkdir -p "$SCREENSHOTS_DST/tablet"

# Ordner mit zugehörigen Screenshot-Bereichen
declare -A SECTION_MAP=(
    ["login"]="01_login"
    ["tischuebersicht"]="02_table_overview"
    ["navigation"]="03_menu"
    ["bestellung"]="04_table_detail 21_extras_popup 23_gang_wechseln 24_custom_product 25_gutschein_auswaehlen 27_produkte_transferieren"
    ["zahlung"]="05_invoice_overview 17_zahlungs_dialog 22_trinkgeld_eingeben 26_gutschein_einloesen 34_getrennt_zahlen 35_rechnungsuebersicht"
    ["verwaltung"]="07_user_view 08_verwaltung 09_tischplan_editor 10_tisch_editor 15_benutzer_wechseln 16_passwort_aendern 18_tagesabschluss 19_benutzer_statistik 28_tisch_hinzufuegen 29_bearbeiten_modus"
    ["einstellungen"]="06_settings 11_kartenzahlung 12_logs 13_rechtliches 14_druckereinstellungen 20_terminal_hinzufuegen 30_drucker_auswahl 31_star_drucker_hinzufuegen 32_cloud_drucker_dialog 33_bluetooth_drucker_hinzufuegen 36_drucker_fehler_dialog"
)

# Reihenfolge für konsistente Verarbeitung
SECTIONS_ORDER=("login" "tischuebersicht" "navigation" "bestellung" "zahlung" "verwaltung" "einstellungen")

# Zähler
TOTAL=${#SECTIONS_ORDER[@]}
CURRENT=0

for section in "${SECTIONS_ORDER[@]}"; do
    CURRENT=$((CURRENT + 1))
    SCREENSHOTS="${SECTION_MAP[$section]}"

    echo ""
    echo -e "${YELLOW}[$CURRENT/$TOTAL] Bearbeite: $section${NC}"
    echo -e "Screenshots: $SCREENSHOTS"
    echo "-------------------------------------------"

    # Claude-Prompt für diesen Abschnitt
    PROMPT="Du bist für die Aktualisierung der Orderlyze Mobile App Dokumentation zuständig.

WICHTIG: Arbeite im Verzeichnis $DOCS_DIR

KONTEXT:
- Dokumentations-Ordner: $DOCS_DIR/docs/app/$section/
- Quell-Screenshots Phone: $SCREENSHOTS_SRC/app_flow/
- Quell-Screenshots Tablet: $SCREENSHOTS_SRC/app_flow_ipad/
- Quell-README Phone: $SCREENSHOTS_SRC/app_flow/README.md
- Quell-README Tablet: $SCREENSHOTS_SRC/app_flow_ipad/README.md
- Ziel-Screenshots Phone: $SCREENSHOTS_DST/
- Ziel-Screenshots Tablet: $SCREENSHOTS_DST/tablet/
- Relevante Screenshots für diesen Bereich: $SCREENSHOTS

AUFGABEN (in dieser Reihenfolge):

1. ANALYSE:
   - Lies die aktuelle index.md in docs/app/$section/
   - Lies die relevanten Abschnitte aus der Quell-README ($SCREENSHOTS_SRC/app_flow/README.md)
   - Identifiziere welche Screenshots zu diesem Bereich gehören

2. SCREENSHOTS AKTUALISIEREN:
   - Vergleiche die Phone-Screenshots (Dateigröße) zwischen Quelle und Ziel
   - Kopiere ALLE relevanten Phone-Screenshots von $SCREENSHOTS_SRC/app_flow/ nach $SCREENSHOTS_DST/
   - Kopiere ALLE relevanten Tablet-Screenshots von $SCREENSHOTS_SRC/app_flow_ipad/ nach $SCREENSHOTS_DST/tablet/
   - Verwende: cp -f \"\$QUELLE\" \"\$ZIEL\"

3. DOKUMENTATION AKTUALISIEREN:
   - Aktualisiere die index.md basierend auf der Quell-README
   - Behalte das bestehende Frontmatter-Format bei
   - Füge Tablet-Screenshots hinzu wo sie sich wesentlich unterscheiden
   - Format für Phone: <img src=\"/screenshots/app/XX.png\" alt=\"...\" width=\"280\" />
   - Format für Tablet: <img src=\"/screenshots/app/tablet/XX.png\" alt=\"... (Tablet)\" width=\"500\" />

4. TABLET-HINWEISE:
   - iPad hat Split-View Layout (Menü ist immer sichtbar)
   - Füge bei relevanten Stellen hinzu: ':::info Tablet-Ansicht' mit Tablet-Screenshot
   - Zeige Tablet nur wenn Layout wesentlich anders ist

5. STIL-RICHTLINIEN:
   - Kundenfreundlich und einfach verständlich
   - Kurze Sätze, klare Anweisungen
   - Deutsche Sprache, Sie-Form
   - Keine Emojis
   - Tabellen für Übersichten von Buttons/Funktionen

6. FRONTMATTER:
   - Behalte id, title, description, type, platform, sidebar_position
   - Aktualisiere searchTerms falls neue Funktionen hinzukommen

Führe alle Schritte aus und zeige am Ende eine Zusammenfassung was geändert wurde."

    # Claude ausführen
    cd "$DOCS_DIR"
    claude -p --dangerously-skip-permissions "$PROMPT"

    echo -e "${GREEN}[$CURRENT/$TOTAL] $section abgeschlossen${NC}"
done

echo ""
echo -e "${GREEN}=============================================${NC}"
echo -e "${GREEN}  Alle Bereiche aktualisiert!               ${NC}"
echo -e "${GREEN}=============================================${NC}"
echo ""
echo "Nächste Schritte:"
echo "  1. Änderungen prüfen: git diff"
echo "  2. Docusaurus starten: npm run start"
echo "  3. Bei Zufriedenheit committen: git add -A && git commit -m 'Update mobile docs'"
