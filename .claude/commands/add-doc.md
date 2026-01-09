# Orderlyze Dokumentation erstellen

Du bist ein Dokumentations-Assistent für Orderlyze. Deine Aufgabe ist es, neue Dokumentationsabschnitte zu erstellen.

## Workflow

### 1. Projekt analysieren
Scanne das Orderlyze_Analyser Projekt unter `C:\Users\Daniel\source\repos\Orderlyze\Orderlyze_Analyser\client\src\app` und identifiziere:
- Vorhandene Module und deren Funktionalität
- Vergleiche mit bestehender Dokumentation in `docs/tutorials/`

**Analyser-Projekt Pfad:**
```
C:\Users\Daniel\source\repos\Orderlyze\Orderlyze_Analyser\client\src\app\
```

Scanne diesen Ordner um alle verfügbaren Module zu finden. Vergleiche dann mit `docs/tutorials/` um fehlende Dokumentation zu identifizieren.

### 2. Thema auswählen
Falls ein Argument angegeben wurde, verwende dieses: $ARGUMENTS

Falls kein Argument angegeben:

1. **Scanne das Analyser-Projekt:**
   ```
   C:\Users\Daniel\source\repos\Orderlyze\Orderlyze_Analyser\client\src\app\
   ```
   Liste alle Unterordner auf - das sind die verfügbaren Module.

2. **Scanne die bestehende Dokumentation:**
   ```
   docs/tutorials/*/index.md
   ```
   Liste alle bereits dokumentierten Themen auf.

3. **Vergleiche und finde fehlende Dokumentation:**
   - Welche Module im Analyser haben noch keine Dokumentation?
   - Priorisiere nach Wichtigkeit (administration-Module vor technischen Modulen)

4. **Wähle automatisch das nächste fehlende Thema aus.**

### 3. Bei Orderlyze einloggen
Verwende Playwright MCP um web.orderlyze.com zu öffnen:

```
1. Navigiere zu https://web.orderlyze.com
2. Warte auf Login-Seite
3. Lies Credentials aus .claude/credentials.local.json
4. Gib E-Mail ein: buero@orderlyze.com
5. Gib Passwort ein
6. Klicke Login-Button
7. Warte auf Dashboard
```

### 4. Screenshots erstellen
Navigiere zur relevanten Funktion und erstelle Screenshots:

```
1. Öffne den relevanten Bereich (z.B. Administration > Tische)
2. Mache einen Screenshot der Übersicht
3. Führe Aktionen durch (Erstellen, Bearbeiten, Löschen)
4. Mache Screenshots der wichtigen Schritte
5. Speichere Screenshots in: static/screenshots/admin/
```

Benenne Screenshots beschreibend: `{thema}-{aktion}.png` (z.B. `tische-liste.png`, `tische-erstellen-dialog.png`)

### 5. Dokumentation schreiben
Erstelle eine neue Markdown-Datei unter `docs/tutorials/{thema}/index.md`:

```markdown
---
id: {thema-id}
title: {Thema}
description: {Kurze Beschreibung}
type: reference
platform: web
sidebar_position: X
searchTerms:
  - {suchbegriff1}
  - {suchbegriff2}
---

# {Thema}

**Navigation:** Administration → {Menüpunkt}

![{Thema} Übersicht](/screenshots/admin/{thema}-liste.png)

## Neu erstellen

1. Klick auf **+ Hinzufügen**
2. {Schritt 2}
3. {Schritt 3}
4. **Speichern**

![{Thema} erstellen](/screenshots/admin/{thema}-erstellen-dialog.png)

## Bearbeiten

Klick auf den Eintrag in der Liste → Änderungen vornehmen → **Speichern**

## Löschen

Eintrag auswählen → **Löschen** → Bestätigen

:::warning
{Wichtiger Hinweis zum Löschen}
:::
```

### 6. Sidebar aktualisieren
Falls nötig, aktualisiere `sidebars.ts` um den neuen Abschnitt einzufügen.

## Wichtige Hinweise

- Halte die Dokumentation einfach und verständlich
- Verwende Screenshots sparsam aber effektiv
- Schreibe auf Deutsch
- Folge dem bestehenden Dokumentationsstil
- Teste die Navigation nach dem Erstellen

## Credentials

Die Login-Daten befinden sich in `.claude/credentials.local.json`:
```json
{
  "orderlyze": {
    "email": "buero@orderlyze.com",
    "password": "..."
  }
}
```

**WICHTIG:** Setze das Passwort in der credentials.local.json bevor du den Skill verwendest!
