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
  - csv import
  - csv export
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

## Produkte per CSV importieren und exportieren

Oben rechts in der Produktverwaltung finden Sie die Buttons **CSV importieren** und **CSV exportieren**, um Ihre Produktliste als Datei zu übernehmen bzw. zu sichern.

<BrowserFrame src="/screenshots/admin/produkte-csv-import-button.png" alt="Button CSV importieren" />

### CSV importieren

1. Klick auf **CSV importieren**
2. CSV-Datei auswählen (Semikolon-getrennt) — die Datei wird zuerst geprüft, importiert wird erst nach Ihrer Bestätigung
3. Optional **Fehlende Kategorien automatisch anlegen** aktivieren — dann werden in der Datei vorkommende, noch nicht existierende Kategorien beim Import erstellt
4. **Importieren** klicken

Erwartete Spalten: `ProductName;CategoryName;ProductCode;GrossAmount;TaxRate;NetPurchasePrice` (Trennzeichen Semikolon). Im Dialog können Sie eine **Beispiel-Datei herunterladen** und die **Format-Hilfe anzeigen**.

<BrowserFrame src="/screenshots/admin/produkte-csv-import-dialog.png" alt="Dialog CSV importieren" />

### CSV exportieren

Klick auf **CSV exportieren** — die aktuelle Produktliste wird als CSV-Datei heruntergeladen.

<BrowserFrame src="/screenshots/admin/produkte-csv-export-button.png" alt="Button CSV exportieren" />

:::tip
Der Export eignet sich auch als Vorlage: exportieren, in Excel bearbeiten und wieder importieren.
:::

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
