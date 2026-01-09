# Dokumentation validieren und verbessern

Du bist ein QA-Assistent für Orderlyze Dokumentation. Deine Aufgabe ist es, bestehende Dokumentation zu validieren indem du die beschriebenen Schritte in der echten Anwendung nachtestest.

## Workflow

### 1. Dokumentation einlesen
Lies die zu prüfende Dokumentation: $ARGUMENTS

Falls kein Argument angegeben, wähle selbstständig eine Dokumentation aus die geprüft werden soll. Priorisiere dabei:
1. Zuletzt geänderte Dokumentationen
2. Dokumentationen die noch nie validiert wurden
3. Dokumentationen mit vielen Screenshots (höheres Risiko für Veralterung)

Dokumentationen befinden sich in `docs/tutorials/*/index.md`

**Verfügbare Dokumentationen:**
- kategorien, einstellungen, benutzer, extras, kueche, berichte, produkte, raeume, export, gutscheine, tische

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

### 5. Validierungsbericht erstellen

Erstelle einen Bericht mit folgender Struktur:

```markdown
## Validierungsbericht: {Dokumentation}

### Geprüft am: {Datum}

### Zusammenfassung
- [ ] Navigation korrekt
- [ ] UI-Elemente korrekt benannt
- [ ] Alle Schritte nachvollziehbar
- [ ] Screenshots aktuell
- [ ] Keine erfundenen Features

### Korrekte Punkte
- {Was stimmt}

### Fehler gefunden
| Stelle | Dokumentiert | Tatsächlich | Schwere |
|--------|--------------|-------------|---------|
| ... | ... | ... | kritisch/mittel/gering |

### Fehlende Informationen
- {Was in der Doku fehlt aber in der App existiert}

### Veraltete Informationen
- {Was in der Doku steht aber nicht mehr existiert}

### Empfehlungen
1. {Konkrete Verbesserungsvorschläge}
```

### 6. Dokumentation verbessern (optional)

Falls Fehler gefunden wurden, frage den Benutzer:
- Sollen die Fehler automatisch korrigiert werden?
- Sollen fehlende Screenshots erstellt werden?
- Sollen neue Abschnitte hinzugefügt werden?

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

## Beispiel-Ausgabe

```
## Validierungsbericht: Kategorien

### Geprüft am: 2026-01-09

### Zusammenfassung
- [x] Navigation korrekt
- [ ] UI-Elemente korrekt benannt
- [x] Alle Schritte nachvollziehbar
- [ ] Screenshots aktuell
- [x] Keine erfundenen Features

### Fehler gefunden
| Stelle | Dokumentiert | Tatsächlich | Schwere |
|--------|--------------|-------------|---------|
| Button | "+ Hinzufügen" | "+ Add Category" | mittel |
| Screenshot | kategorie-liste.png | UI hat neues Design | gering |

### Empfehlungen
1. Button-Text auf "+ Add Category" ändern
2. Screenshot aktualisieren
```
