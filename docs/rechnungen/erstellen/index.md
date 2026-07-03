---
id: rechnungen-erstellen
title: Rechnung erstellen
description: Rechnungen direkt im Web-Portal erstellen
type: reference
platform: web
sidebar_position: 1
navigation: "Rechnung erstellen"
sidebar_custom_props:
  badge: "Coming Soon"
searchTerms:
  - rechnung erstellen
  - rechnung schreiben
  - ausgangsrechnung
  - skonto
  - reverse charge
  - entwurf
  - vorlage
---

# Rechnung erstellen

:::warning In Entwicklung
Dieses Feature befindet sich noch in Entwicklung und ist noch nicht für den produktiven Einsatz freigegeben.
:::

**Navigation:** Rechnung erstellen

Hier erstellst du Rechnungen direkt im Web-Portal — unabhängig vom Bonieren in der App. Zum Beispiel für Firmenkunden, Caterings oder Lieferungen.

<BrowserFrame src="/screenshots/rechnungen/rechnung-erstellen.png" alt="Rechnung erstellen" />

## Empfänger

- **Kunde** — einen unter **Verwaltung → Kunden** angelegten Stammkunden aus der Liste wählen
- **Freier Empfänger** — Name/Firma, Ansprechpartner, Adresse und UID direkt eintippen, ohne den Kunden anzulegen

Dazu die **Zahlart** wählen (z.B. Bar, Überweisung, Kartenzahlung).

## Rechnungsinformationen

- **Rechnungsdatum** und **Zahlungsziel** (vorbelegt: heute + 14 Tage)
- **Leistungszeitraum** oder umschaltbar **Lieferdatum**
- **Referenz** (z.B. Bestell-Nummer oder Projekt)
- **Sprache** (Deutsch/Englisch) und **Währung**

## Positionen

<BrowserFrame src="/screenshots/rechnungen/rechnung-erstellen-positionen.png" alt="Positionen der Rechnung" />

- **Produkt wählen** — Position aus deinen angelegten Produkten übernehmen
- **Eigene Position** — freie Position mit eigenem Text und Preis
- **Versand** und **Pfand** als Spezial-Positionen
- Je Position: Menge, Einheit (Stk, Std, Tag, Pauschal, kg, l, m² …), optionaler Kommentar und Rabatt in %
- Umschalter **Brutto/Netto** für die Preiseingabe

## Kopf- und Fußtext

Der Kopftext kann pro Rechnung überschrieben werden (leer = Standard-Kopftext), der Fußtext ist mit dem Text aus den [Rechnungseinstellungen](/einstellungen/rechnung) vorbelegt.

## Weitere Optionen

Unter **Weitere Optionen** stehen zusätzlich bereit:

- **Rabatt** (% auf die Gesamtsumme) und **Trinkgeld** (€)
- **Skonto** (%) mit **Skonto-Frist** (Tage)
- **Kommentar**
- **Sofort drucken**
- **Reverse Charge** (Empfänger schuldet die USt)

## Speichern und erstellen

- **Als Entwurf speichern** — Rechnung später fertigstellen (mit Entwurfsname)
- **Als Vorlage speichern** — als Ausgangsbasis für künftige Rechnungen
- **Als wiederkehrende Rechnung (Abo) speichern** — siehe [Wiederkehrende Rechnungen](/rechnungen/wiederkehrend)
- **Lieferschein mit erstellen** — erzeugt zusätzlich einen Lieferschein unter [Belege](/rechnungen/belege)
- **Rechnung erstellen** — die Rechnung wird erzeugt und erscheint in der [Rechnungsübersicht](/rechnungen/uebersicht)
