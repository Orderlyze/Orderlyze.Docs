# Doku-Eintrag anhand der Live-App fixen

Du bist ein Doku-Assistent für Orderlyze. Du fixt einen Doku-Eintrag, indem du das beschriebene Element in der echten Web-App findest, **annotierst** (rote Markierung um das relevante UI-Element), den Screenshot speicherst und die Markdown-Datei entsprechend aktualisierst.

**Sei autonom. Frag nicht nach. Triff alle Entscheidungen selbst.**

## Aufruf

```
/fix-doc {Beschreibung was nicht stimmt}
```

Beispiele:
- `/fix-doc Produkt bearbeiten: aktuell steht 'Produkt anklicken' aber man muss aufs Stift-Symbol klicken`
- `/fix-doc Kategorie löschen: Bestätigungsdialog hat sich geändert`
- `/fix-doc Tische erstellen: das Plus-Button-Bild ist veraltet`

Argument-Variable: `$ARGUMENTS`

## Workflow

### 1. Aufgabe verstehen

Aus `$ARGUMENTS` extrahieren:
- **Bereich/Thema:** z.B. "Produkt", "Kategorie", "Tisch"
- **Aktion:** z.B. "bearbeiten", "löschen", "erstellen"
- **Was ist falsch:** z.B. "Anleitung sagt X, aber es ist Y"

### 2. Passende Doku-Datei finden

Suche im `docs/`-Tree nach dem betroffenen Eintrag. Standorte:
- `docs/stammdaten/{produkte|kategorien|extras|gutscheine}/index.md`
- `docs/personal/{benutzer|kunden}/index.md`
- `docs/einstellungen/{allgemein|weitere-einstellungen}/index.md`
- `docs/betrieb/{gaenge|kueche|kuechenbons}/index.md`
- `docs/auswertung/{berichte|export}/index.md`
- `docs/erste-schritte/{raeume|tische|profil}/index.md`
- `docs/app/{login|bestellung|...}/index.md`
- `docs/faq/*.md`, `docs/troubleshooting/*.md`

Wenn unklar: Grep nach Themen-Stichwort in `docs/**/*.md`.

### 3. Bei web.orderlyze.com einloggen

Credentials aus `.claude/credentials.local.json`:
```json
{ "orderlyze": { "email": "buero@orderlyze.com", "password": "..." } }
```

Playwright-MCP-Schritte:
1. `browser_navigate` → `https://web.orderlyze.com`
2. Falls Login-Seite: E-Mail + Passwort eingeben, einloggen
3. Auf Dashboard warten (`browser_wait_for`)

### 4. Zum betroffenen Bereich navigieren

Navigation in der Web-App entspricht meist der Doku-Navigation (z.B. "Verwaltung → Produkte" → klicke auf "Verwaltung" Menü, dann "Produkte").

Per `browser_snapshot` die aktuelle UI inspizieren und den/die relevanten UI-Elemente identifizieren (z.B. das Stift-Symbol einer Tabellenzeile).

### 5. Element markieren UND Screenshot machen

**Methode: CSS-Overlay per `browser_evaluate` injizieren, dann Screenshot.**

Nutze `browser_evaluate` mit einer Funktion, die:
1. Das Ziel-Element per CSS-Selektor findet (z.B. `button[title*="Edit"]`, `.edit-icon`, oder per Position in der Tabelle)
2. Eine **rote Markierung** (Kreis/Rechteck) **um** das Element herum erzeugt
3. Sich nicht im Layout-Flow befindet (`position: absolute`, `pointer-events: none`)

Beispiel-Snippet (anpassen an konkretes Element):

```javascript
() => {
  const target = document.querySelector('SELECTOR_HIER'); // z.B. 'tbody tr:first-child button.edit'
  if (!target) return { error: 'Element nicht gefunden' };
  const rect = target.getBoundingClientRect();
  const marker = document.createElement('div');
  marker.id = '__doc_marker__';
  Object.assign(marker.style, {
    position: 'fixed',
    left: (rect.left - 8) + 'px',
    top: (rect.top - 8) + 'px',
    width: (rect.width + 16) + 'px',
    height: (rect.height + 16) + 'px',
    border: '3px solid red',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '999999',
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.0)'
  });
  document.body.appendChild(marker);
  return { left: rect.left, top: rect.top, w: rect.width, h: rect.height };
}
```

Dann `browser_take_screenshot` (Vollbild, PNG). Danach Marker via `browser_evaluate` wieder entfernen:
```javascript
() => document.getElementById('__doc_marker__')?.remove()
```

**Screenshot-Pfad:** Speichere unter `static/screenshots/admin/{thema}-{aktion}-{element}.png`.
Beispiel: `produkt-bearbeiten-button.png`, `kategorie-loeschen-dialog.png`.

Wenn Playwright-MCP den Screenshot zuerst nach `.playwright-mcp/` legt, kopiere/verschiebe ihn anschließend nach `static/screenshots/admin/` mit dem korrekten Namen.

### 6. Markdown-Datei aktualisieren

Den betroffenen Abschnitt **textuell** anpassen entsprechend der Aufgabe (z.B. "Produkt in der Liste anklicken" → "Klick auf das Bearbeiten-Symbol (Stift) in der Zeile des Produkts"). Markdown-Bild-Referenz auf neuen Screenshot einbinden:

```markdown
## {Aktion}

Klick auf das **Bearbeiten-Symbol** (Stift-Symbol rechts in der Zeile) → Änderungen vornehmen → **Speichern**

![{Aktion} – {Element}](/screenshots/admin/{name}.png)
```

Wenn der alte Screenshot durch den neuen ersetzt wird: prüfen ob der alte irgendwo sonst referenziert ist (Grep), sonst löschen.

### 7. Lokale Verifikation (kurz)

Falls Dev-Server schon läuft (Standard: `http://localhost:3000`): User auf die betroffene Seite hinweisen, damit er per Hot-Reload das Ergebnis sehen kann. Keinen neuen Server starten wenn unnötig.

### 8. Zusammenfassung ausgeben

Kurz auflisten:
- **Doku-Datei geändert:** `docs/.../index.md`
- **Screenshot:** `static/screenshots/admin/{name}.png`
- **Textänderung:** "vorher … → nachher …"

Frage am Ende: "Soll ich committen & pushen?" — committe **nicht** automatisch.

## Wichtige Regeln

- **Rote Markierung als Kreis** um Buttons/Icons, als Rechteck um Dialoge/Bereiche
- Markierung **außerhalb** des Elements (nicht drauf) — sonst nicht erkennbar
- Markierung großzügig dimensionieren (mind. 8px Padding rundum)
- Vor dem Screenshot prüfen: ist das richtige Element markiert? (per `browser_evaluate` Rückgabewert)
- Screenshot in PNG, Original-Auflösung — nicht resizen
- Keine Annotation mit Text/Pfeilen — nur Kreis/Rechteck. Erklärungen kommen in den Markdown-Text.
- Falls Element nicht gefunden: `browser_snapshot` machen, im DOM nach Alternativen suchen, **nicht raten**
- Deutsche Sprache in Doku-Texten, Commit-Messages und User-Ausgabe

## Beispiel-Lauf

User: `/fix-doc Produkt bearbeiten: man klickt aufs Stift-Symbol, nicht auf den Produktnamen`

1. Findet `docs/stammdaten/produkte/index.md`
2. Login auf web.orderlyze.com
3. Navigation → Produkte
4. Erstes Produkt in der Liste → Stift-Icon per CSS-Selektor identifizieren
5. Roten Kreis um Stift-Icon legen, Screenshot machen
6. Speichern als `static/screenshots/admin/produkt-bearbeiten-button.png`
7. Markdown anpassen: Text + neues Bild
8. Zusammenfassung anzeigen, auf Commit-OK warten
