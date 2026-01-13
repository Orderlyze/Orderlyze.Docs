---
id: gaenge
title: Gänge
description: Gänge für die Küche verwalten
type: reference
platform: web
sidebar_position: 2
navigation: "Verwaltung → Gänge"
searchTerms:
  - gang
  - gänge
  - course
  - küche
  - reihenfolge
  - speisefolge
---

# Gänge

**Navigation:** Verwaltung → Gänge

Gänge ermöglichen es, Bestellungen in der Küche in einer bestimmten Reihenfolge abzuarbeiten. So können Sie beispielsweise sicherstellen, dass Vorspeisen vor Hauptspeisen zubereitet werden.

![Gänge Übersicht](/screenshots/admin/gaenge-liste.png)

## Funktionsweise

Jeder Gang kann Kategorien oder einzelne Produkte enthalten. Wenn ein Produkt bestellt wird, das einem Gang zugeordnet ist, wird die Bestellung entsprechend markiert und kann in der Küche in der richtigen Reihenfolge abgearbeitet werden.

## Neuen Gang erstellen

1. Klick auf **+ Gang hinzufügen**
2. Namen eingeben (z.B. "Vorspeise", "Hauptgang", "Dessert")
3. **Speichern**

![Gang erstellen](/screenshots/admin/gaenge-erstellen-dialog.png)

## Kategorien oder Produkte zuordnen

Nach dem Erstellen eines Gangs können Sie Kategorien oder einzelne Produkte zuordnen:

1. Klick auf **+ Kategorie/Produkt hinzufügen** unter dem gewünschten Gang
2. Wählen Sie die gewünschten Kategorien aus der Liste
3. Wählen Sie optional einzelne Produkte aus
4. **Speichern**

![Kategorie oder Produkt zuordnen](/screenshots/admin/gaenge-zuordnung-dialog.png)

:::tip
Wenn Sie eine ganze Kategorie zuordnen, werden automatisch alle Produkte dieser Kategorie dem Gang zugewiesen.
:::

## Gang bearbeiten

Klick auf das **Bearbeiten-Symbol** (Stift) neben dem Gang-Namen → Namen ändern → **Speichern**

## Zuordnung entfernen

Klick auf das **X** neben der Kategorie oder dem Produkt, um die Zuordnung zu entfernen.

## Gang löschen

Klick auf das **Löschen-Symbol** (Mülleimer) neben dem Gang-Namen → Bestätigen

:::warning
Beim Löschen eines Gangs werden alle Zuordnungen zu Kategorien und Produkten entfernt. Die Kategorien und Produkte selbst bleiben erhalten.
:::

## Typische Konfiguration

Eine typische Restaurant-Konfiguration könnte so aussehen:

| Gang | Zugeordnete Kategorien |
|------|------------------------|
| 1. Vorspeise | Salate, Suppen |
| 2. Hauptgang | Fleisch, Fisch, Vegetarisch |
| 3. Dessert | Nachspeisen, Eis |
| 4. Getränke | Getränke |

:::info
Die Reihenfolge der Gänge entspricht der Anzeigereihenfolge in der Übersicht.
:::
