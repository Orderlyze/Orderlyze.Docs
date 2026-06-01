---
id: kategorien
title: Kategorien
description: Produktkategorien verwalten
type: reference
platform: web
sidebar_position: 1
navigation: "Verwaltung → Produktkategorien"
searchTerms:
  - kategorie
  - kategorien
  - produktgruppe
  - anordnung ändern
  - reihenfolge ändern
  - drag drop
  - produkte ohne kategorie
  - nicht zugewiesen
---

# Kategorien

**Navigation:** Verwaltung → Produktkategorien

<BrowserFrame src="/screenshots/admin/kategorie-liste.png" alt="Kategorien Übersicht" />

## Neue Kategorie erstellen

1. Klick oben rechts auf **+ Kategorie hinzufügen**
2. Pflichtfeld ausfüllen:
   - Name
3. Optional: Übergeordnete Kategorie, Mehrwertsteuer, Farbe, Reihenfolge
4. **Speichern**

<BrowserFrame src="/screenshots/admin/kategorie-hinzufuegen-button.png" alt="Kategorie hinzufügen Button" />

<BrowserFrame src="/screenshots/admin/kategorie-erstellen-dialog.png" alt="Kategorie erstellen Dialog" />

## Kategorie bearbeiten

Klick in der Zeile der Kategorie auf das **Bearbeiten-Symbol** (Stift-Symbol rechts) → Änderungen vornehmen → **Speichern**

<BrowserFrame src="/screenshots/admin/kategorie-bearbeiten-button.png" alt="Kategorie bearbeiten Button" />

## Kategorie löschen

Klick in der Zeile der Kategorie auf das **Löschen-Symbol** (Mülleimer-Symbol ganz rechts) → Bestätigen.

<BrowserFrame src="/screenshots/admin/kategorie-loeschen-button.png" alt="Kategorie löschen Button" />

:::warning
Beim Löschen einer Kategorie werden alle zugeordneten Produkte in "Ohne Kategorie" verschoben.
:::

## Anordnung ändern

Mit **Anordnung ändern** ändern Sie die Reihenfolge der Kategorien oder verschieben Kategorien per Drag & Drop in eine Unterebene. Das beeinflusst, wie die Kategorien in der App angezeigt werden.

Klicken Sie oben rechts auf **Anordnung ändern**.

<BrowserFrame src="/screenshots/admin/kategorie-anordnung-button.png" alt="Button Anordnung ändern" />

Im Anordnungsmodus sehen Sie die Kategorien als verschiebbare Liste. Lesen Sie die Hinweise vor dem Verschieben sorgfältig.

<BrowserFrame src="/screenshots/admin/kategorie-anordnung-hinweise.png" alt="Hinweise im Anordnungsmodus" />

### Kategorie verschieben

1. Kategorie mit der Maus anklicken und halten
2. Kategorie an die gewünschte Position ziehen
3. Maustaste loslassen
4. Danach in der App prüfen, ob die Reihenfolge und Unterebenen korrekt angezeigt werden

<BrowserFrame src="/screenshots/admin/kategorie-anordnung-ziehen.png" alt="Kategorie per Drag and Drop verschieben" />

:::danger Wichtig bei Produkten
Produkte können nur Kategorien auf der untersten Ebene zugewiesen sein. Wenn eine Kategorie durch das Verschieben nicht mehr als unterste Ebene gilt oder die Struktur ungültig wird, kann Orderlyze die Kategoriezuweisung bei betroffenen Produkten entfernen. Diese Produkte sind dann nicht gelöscht, sondern erscheinen unter **Produkte ohne Kategorie** bzw. als nicht zugewiesen.
:::

Nach größeren Änderungen an der Anordnung sollten Sie deshalb **Verwaltung → Produkte → Produkte ohne Kategorie** prüfen und betroffene Produkte wieder einer passenden Kategorie zuweisen.

:::tip
Wenn viele Produkte betroffen sind, nutzen Sie die Sammelzuweisung unter **Produkte ohne Kategorie**. Dort können mehrere Produkte markiert und gemeinsam einer Zielkategorie zugeordnet werden.
:::
