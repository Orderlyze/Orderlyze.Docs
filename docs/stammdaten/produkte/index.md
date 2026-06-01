---
id: produkte
title: Produkte
description: Produkte anlegen und verwalten
type: reference
platform: web
sidebar_position: 2
navigation: "Verwaltung → Produkte"
searchTerms:
  - produkt
  - produkte
  - artikel
  - anlegen
  - produkte verschwunden
  - verschwunden
  - ohne kategorie
  - produkte ohne kategorie
---

# Produkte

**Navigation:** Verwaltung → Produkte

<BrowserFrame src="/screenshots/admin/produkt-liste.png" alt="Produkte Übersicht" />

## Neues Produkt erstellen

1. Klick oben rechts auf **+ Produkt hinzufügen**
2. Pflichtfelder ausfüllen:
   - Name
   - Preis
   - Kategorie
3. **Speichern**

<BrowserFrame src="/screenshots/admin/produkt-hinzufuegen-button.png" alt="Produkt hinzufügen Button" />

<BrowserFrame src="/screenshots/admin/produkt-erstellen-dialog.png" alt="Produkt erstellen Dialog" />

## Produkt bearbeiten

Klick in der Zeile des Produkts auf das **Bearbeiten-Symbol** (Stift-Symbol rechts) → Änderungen vornehmen → **Speichern**

<BrowserFrame src="/screenshots/admin/produkt-bearbeiten-button.png" alt="Produkt bearbeiten Button" />

## Produkt löschen

Klick in der Zeile des Produkts auf das **Löschen-Symbol** (Mülleimer-Symbol ganz rechts) → Bestätigen.

<BrowserFrame src="/screenshots/admin/produkt-loeschen-button.png" alt="Produkt löschen Button" />

## Produkte verschwunden oder nicht in der App sichtbar

Wenn Produkte in der Bonier-App nicht mehr sichtbar sind, sind sie meistens nicht gelöscht, sondern haben keine Kategorie mehr. Das kann z.B. passieren, wenn eine Produktkategorie gelöscht wurde. In diesem Fall verschiebt Orderlyze die zugehörigen Produkte automatisch in **Produkte ohne Kategorie**.

:::warning
Produkte ohne Kategorie werden in der App nicht angezeigt. Weisen Sie diese Produkte wieder einer Kategorie zu, damit sie wieder in der App erscheinen.
:::

### Produkte ohne Kategorie öffnen

Öffnen Sie **Verwaltung → Produkte** und klicken Sie oben rechts auf **Produkte ohne Kategorie**.

<BrowserFrame src="/screenshots/admin/produkte-ohne-kategorie-button.png" alt="Button Produkte ohne Kategorie" />

### Produkte wieder zuweisen

In der Ansicht **Produkte ohne Kategorie** sehen Sie alle Produkte, die aktuell keiner Kategorie zugeordnet sind.

1. Zielkategorie auswählen
2. Produkt per Checkbox markieren
3. Auf **Zuweisen** klicken

<BrowserFrame src="/screenshots/admin/produkte-ohne-kategorie-zuweisen.png" alt="Produkt ohne Kategorie wieder einer Kategorie zuweisen" />

Nach dem Zuweisen erscheint das Produkt wieder in der normalen Produktliste und wird in der App wieder unter der gewählten Kategorie angezeigt.
