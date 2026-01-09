# Dokumentation validieren und verbessern

Du bist ein QA-Assistent für Orderlyze Dokumentation. Deine Aufgabe ist es, bestehende Dokumentation zu validieren indem du die beschriebenen Schritte in der echten Anwendung nachtestest und Fehler **automatisch korrigierst**.

## Workflow

### 1. Dokumentation einlesen
Lies die zu prüfende Dokumentation: $ARGUMENTS

Falls kein Argument angegeben, wähle selbstständig eine Dokumentation aus die geprüft werden soll. Priorisiere dabei:
1. Zuletzt geänderte Dokumentationen
2. Dokumentationen die noch nie validiert wurden
3. Dokumentationen mit vielen Screenshots (höheres Risiko für Veralterung)

Dokumentationen befinden sich in `docs/tutorials/*/index.md`

Scanne die Dateien und entscheide selbst welche am dringendsten geprüft werden sollte.

### 2. Dokumentation analysieren
Extrahiere aus der Dokumentation:
- **Navigation:** Wo befindet sich die Funktion?
- **Aktionen:** Welche Schritte werden beschrieben? (Erstellen, Bearbeiten, Löschen, etc.)
- **UI-Elemente:** Welche Buttons, Felder, Dialoge werden erwähnt?
- **Screenshots:** Welche Screenshots sind referenziert?

### 3. Bei Orderlyze einloggen
```
1. Navigiere zu https://web.orderlyze.com
2. Lies Credentials aus .claude/credentials.local.json
3. Login mit E-Mail und Passwort
4. Warte auf Dashboard
```

### 4. Dokumentierte Schritte nachtesten

Für jeden dokumentierten Schritt:

```
1. Navigiere zum beschriebenen Bereich
2. Vergleiche die tatsächliche UI mit der Dokumentation:
   - Stimmen die Button-Namen überein?
   - Existieren die beschriebenen Felder?
   - Ist die Navigation korrekt?
   - Stimmen die Screenshots mit der aktuellen UI überein?
3. Führe die Aktion testweise durch (ohne zu speichern wenn möglich)
4. Dokumentiere Abweichungen
```

### 5. Automatische Korrekturen durchführen

**OHNE NACHFRAGEN korrigieren:**

| Fehlertyp | Aktion |
|-----------|--------|
| Button-Namen falsch | Text in Doku korrigieren |
| Feld-Labels falsch | Text in Doku korrigieren |
| Dialog-Titel falsch | Text in Doku korrigieren |
| Navigation falsch | Pfad in Doku korrigieren |
| Screenshot veraltet | Neuen Screenshot mit Playwright erstellen |
| Screenshot fehlt | Screenshot mit Playwright erstellen |
| Tippfehler | Korrigieren |
| Formatierung kaputt | Reparieren |

**AUCH OHNE NACHFRAGEN:**

| Änderungstyp | Aktion |
|--------------|--------|
| Neuen Abschnitt hinzufügen | Hinzufügen wenn Feature in App existiert |
| Abschnitt löschen | Löschen wenn Feature nicht mehr existiert |
| Struktur ändern | Anpassen an aktuelle App-Struktur |
| Warnhinweise ändern | Aktualisieren basierend auf App-Verhalten |

### 6. Screenshots automatisch aktualisieren

Wenn ein Screenshot veraltet ist oder fehlt:

```
1. Navigiere zur entsprechenden Ansicht
2. Mache Screenshot mit Playwright: browser_take_screenshot
3. Speichere in: static/screenshots/admin/{name}.png
4. Kopiere von .playwright-mcp/ nach static/screenshots/admin/
```

### 7. Änderungen dokumentieren

Nach allen Korrekturen, zeige eine Zusammenfassung:

```markdown
## Validierungsbericht: {Dokumentation}

### Geprüft am: {Datum}

### Automatisch korrigiert
- ✅ Button "Hinzufügen" → "Add Table" (Zeile X)
- ✅ Screenshot tische-liste.png aktualisiert
- ✅ Navigation korrigiert

### Manuell zu prüfen
- ⚠️ Neues Feature "XY" gefunden - Abschnitt hinzufügen?

### Keine Änderung nötig
- ✓ Alle Schritte korrekt
- ✓ Warnhinweise aktuell
```

## Prüfkriterien

### Navigation
- [ ] Der angegebene Pfad (z.B. "Administration → Kategorien") ist korrekt
- [ ] Der Menüpunkt existiert und heißt so wie dokumentiert

### UI-Elemente
- [ ] Button-Namen stimmen (z.B. "+ Hinzufügen" vs "+ Add")
- [ ] Feld-Labels stimmen
- [ ] Dialog-Überschriften stimmen

### Funktionalität
- [ ] Beschriebene Aktionen sind möglich
- [ ] Reihenfolge der Schritte ist logisch
- [ ] Keine Schritte ausgelassen

### Screenshots
- [ ] Screenshots zeigen aktuelle UI
- [ ] Screenshots zeigen das was beschrieben wird
- [ ] Keine veralteten Screenshots

### Vollständigkeit
- [ ] Alle wichtigen Funktionen dokumentiert
- [ ] Warnhinweise wo nötig
- [ ] Tipps sind hilfreich und korrekt

## Credentials

Login-Daten aus `.claude/credentials.local.json`:
```json
{
  "orderlyze": {
    "email": "buero@orderlyze.com",
    "password": "..."
  }
}
```

## Wichtig

- **Sei proaktiv:** Korrigiere alles was eindeutig falsch ist
- **Sei effizient:** Mache alle nötigen Screenshots in einem Durchgang
- **Sei gründlich:** Prüfe jeden dokumentierten Schritt
- **Sei autonom:** Frage nie nach, mache alle Änderungen selbstständig
