---
id: funktionen-steuer-aendern
title: Steuer ändern
description: Mehrwertsteuersatz einer Produktkategorie oder eines einzelnen Produkts anpassen
type: tutorial
platform: web
sidebar_position: 12
navigation: "web.orderlyze.com → Verwaltung"
searchTerms:
  - steuer
  - mehrwertsteuer
  - umsatzsteuer
  - mwst
  - vat
  - kategorie
  - produkt
---

# Steuer ändern

Den Mehrwertsteuersatz kannst du in Orderlyze auf zwei Arten anpassen:

- **pro Produktkategorie** – die Änderung wird automatisch auf alle Produkte der Kategorie übernommen
- **pro einzelnem Produkt** – wenn ein einzelnes Produkt einen abweichenden Steuersatz haben soll

Öffne dafür das Web Dashboard unter [web.orderlyze.com](https://web.orderlyze.com) und melde dich mit deinen Orderlyze-Zugangsdaten an.

## So änderst du die Mehrwertsteuer einer Kategorie

1. Im Web Dashboard links unter **Verwaltung** auf **Produktkategorien** klicken
2. Bei der gewünschten Kategorie rechts auf das **Bearbeiten-Symbol** klicken
3. Im Feld **Mehrwertsteuer** den neuen Mehrwertsteuersatz aus dem Dropdown wählen
4. Mit **Speichern** bestätigen

<BrowserFrame src="/screenshots/funktionen/steuer-aendern/kategorie-uebersicht.png" alt="Produktkategorien im Web Dashboard" />

<BrowserFrame src="/screenshots/funktionen/steuer-aendern/kategorie-bearbeiten.png" alt="Mehrwertsteuer einer Kategorie bearbeiten" />

Der Wert wird automatisch auf alle Produkte dieser Kategorie übernommen.

## So änderst du die Mehrwertsteuer eines einzelnen Produkts

1. Im Web Dashboard links unter **Verwaltung** auf **Produkte** klicken
2. In der Zeile des gewünschten Produkts rechts auf das **Bearbeiten-Symbol** klicken
3. Im Feld **Mehrwertsteuer** den neuen Mehrwertsteuersatz aus dem Dropdown wählen
4. Mit **Speichern** bestätigen

<BrowserFrame src="/screenshots/funktionen/steuer-aendern/produkt-uebersicht.png" alt="Produkte im Web Dashboard" />

<BrowserFrame src="/screenshots/funktionen/steuer-aendern/produkt-bearbeiten.png" alt="Mehrwertsteuer eines Produkts bearbeiten" />

So erhält das Produkt einen vom Kategorie-Steuersatz abweichenden Mehrwertsteuersatz.

## Wichtige Hinweise

:::warning
Wenn bei einer **Überkategorie** ein Mehrwertsteuersatz eingestellt ist, kann der Mehrwertsteuersatz bei den darunterliegenden **Unterkategorien** nicht abweichend gesetzt werden — die Unterkategorien erben den Wert der Überkategorie.
:::

:::info
Beim Ändern der Mehrwertsteuer einer Kategorie wird der Wert **automatisch auf alle Produkte** dieser Kategorie übernommen. Soll nur ein einzelnes Produkt einen abweichenden Steuersatz erhalten, ändere die Mehrwertsteuer direkt beim Produkt.
:::
