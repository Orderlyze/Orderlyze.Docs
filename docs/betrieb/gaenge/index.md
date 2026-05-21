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

<BrowserFrame src="/screenshots/admin/gaenge-liste.png" alt="Gänge Übersicht" />

## Funktionsweise

Jeder Gang kann Kategorien oder einzelne Produkte enthalten. Wenn ein Produkt bestellt wird, das einem Gang zugeordnet ist, wird die Bestellung entsprechend markiert und kann in der Küche in der richtigen Reihenfolge abgearbeitet werden.

## Neuen Gang erstellen

1. Klick unten auf **+ Gang hinzufügen**
2. **Name** eingeben (z.B. "Vorspeise", "Hauptgang", "Dessert")
3. **Speichern**

<BrowserFrame src="/screenshots/admin/gaenge-hinzufuegen-button.png" alt="Gang hinzufügen Button" />

<BrowserFrame src="/screenshots/admin/gaenge-erstellen-dialog.png" alt="Gang erstellen Dialog" />

## Kategorien oder Produkte zuordnen

Nach dem Erstellen eines Gangs können Sie Kategorien oder einzelne Produkte zuordnen:

1. Klick unter dem gewünschten Gang auf **+ Kategorie/Produkt hinzufügen**
2. Eine **Kategorie** oder ein **Produkt** auswählen
3. **Speichern**

<BrowserFrame src="/screenshots/admin/gaenge-zuordnung-link.png" alt="Kategorie/Produkt hinzufügen Link" />

<BrowserFrame src="/screenshots/admin/gaenge-zuordnung-dialog.png" alt="Kategorie oder Produkt zuordnen" />

:::tip
Wenn Sie eine ganze Kategorie zuordnen, werden automatisch alle Produkte dieser Kategorie dem Gang zugewiesen.
:::

## Gang bearbeiten

Klick rechts neben dem Gang-Namen auf das **Bearbeiten-Symbol** (Stift) → Namen ändern → **Speichern**

<BrowserFrame src="/screenshots/admin/gaenge-bearbeiten-button.png" alt="Gang bearbeiten Button" />

## Zuordnung entfernen

Klick auf das **X** neben der Kategorie oder dem Produkt, um die Zuordnung zu entfernen.

## Gang löschen

Klick rechts neben dem Gang-Namen auf das **Löschen-Symbol** (Mülleimer) → Bestätigen.

<BrowserFrame src="/screenshots/admin/gaenge-loeschen-button.png" alt="Gang löschen Button" />

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
