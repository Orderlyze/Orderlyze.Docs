---
id: rechnungen-uebersicht
title: Rechnungsübersicht
description: Erstellte Rechnungen ansehen, herunterladen und verwalten
type: reference
platform: web
sidebar_position: 2
navigation: "Rechnungsübersicht"
sidebar_custom_props:
  badge: "Coming Soon"
searchTerms:
  - rechnungsübersicht
  - rechnung herunterladen
  - e-rechnung
  - zahlung erfassen
  - gutschrift
  - rechnung stornieren
---

# Rechnungsübersicht

:::warning In Entwicklung
Dieses Feature befindet sich noch in Entwicklung und ist noch nicht für den produktiven Einsatz freigegeben.
:::

**Navigation:** Rechnungsübersicht

Alle im Web-Portal erstellten Rechnungen auf einen Blick — mit Status, Download und Aktionen.

<BrowserFrame src="/screenshots/rechnungen/rechnungsuebersicht.png" alt="Rechnungsübersicht" />

## Filter

- **Von / Bis** — Zeitraum eingrenzen
- **Zahlart** — nach Zahlart filtern
- **Status** — Offen, Überfällig, Teilbezahlt, Bezahlt, Gutschrift, Storniert
- **Suche** — Freitextsuche

Unter der Tabelle werden Anzahl und Gesamtsumme der gefilterten Rechnungen angezeigt.

## Aktionen je Rechnung

| Aktion | Beschreibung |
|--------|--------------|
| **Vorschau** | Rechnung im Browser ansehen |
| **PDF herunterladen (A4)** | Rechnung als A4-PDF |
| **Beleg (80mm)** | Rechnung im Bon-Format für den Thermodrucker |
| **E-Mail** | Rechnung per E-Mail an den Kunden senden |
| **E-Rechnung (PDF)** | E-Rechnung als PDF (z.B. ZUGFeRD) |
| **E-Rechnung (XML)** | E-Rechnung als XML (z.B. XRechnung) |
| **Zahlung erfassen** | Zahlungseingang verbuchen — der Status wechselt auf Teilbezahlt/Bezahlt |
| **Gutschrift** | Gutschrift zur Rechnung erstellen |
| **Stornieren** | Rechnung stornieren |

:::info Abgrenzung
Diese Übersicht zeigt Rechnungen, die du im Web-Portal an deine Kunden ausgestellt hast. In der App bonierte Verkäufe findest du im [Rechnungsbericht](/auswertung/weitere-berichte/rechnungsbericht); deine Orderlyze-Lizenzrechnungen unter [Einstellungen → Kundenrechnungen](/einstellungen/kundenrechnungen).
:::
