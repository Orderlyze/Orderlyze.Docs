---
id: gutscheine-restguthaben
title: Wie funktioniert Restguthaben bei Gutscheinen?
description: Restbetrag bei teilweise eingelösten Gutscheinen verwenden
type: faq
platform: both
sidebar_position: 2
searchTerms:
  - gutschein
  - restguthaben
  - restbetrag
  - teilweise eingeloest
  - teileinloesung
  - wertgutschein
  - gutschein einloesen
---

# Wie funktioniert Restguthaben bei Gutscheinen?

Wird ein Gutschein nicht vollständig eingelöst, bleibt der **Restbetrag automatisch auf demselben Gutschein-Code** erhalten. Es wird **kein neuer Code** erzeugt — der Kunde nutzt beim nächsten Besuch denselben Gutschein weiter.

## Beispiel

Ein Gast hat einen Gutschein über **100 €**, die Rechnung beträgt **83,20 €**.

1. Beim Bezahlen wird der Gutschein-Code eingegeben oder per QR gescannt.
2. Die 83,20 € werden vom Gutschein abgezogen.
3. Der Status des Gutscheins wechselt auf **Teilweise**.
4. Auf dem Beleg/Gutschein-Druck steht der neue **Restbetrag: 16,80 €**.
5. Der Kunde nimmt diesen Beleg mit.

![Beleg mit Restguthaben 16,80 €](/screenshots/admin/gutscheine-restguthaben-beleg.png)

Auf dem ausgedruckten Beleg erscheint die Zeile **Restguthaben: 16,80 €** als neuer Wert auf demselben Gutschein. Der Kunde kann diesen Beleg beim nächsten Besuch wieder vorlegen.

## Beim nächsten Besuch

Der Kunde legt den Beleg mit dem ursprünglichen Gutschein-Code vor:

- **Gutschein-Nummer eingeben** oder
- **QR-Code scannen**

Das System erkennt den Rest-Betrag automatisch und zieht ihn vom nächsten Einkauf ab. Es ist **keine neue Gutschein-Nummer** nötig — derselbe Code funktioniert weiter, bis er aufgebraucht ist.

## Wo sehe ich das Restguthaben?

In der **Gutschein-Übersicht** (Verwaltung → Gutscheine → Gutschein-Vorlage öffnen):

| Spalte | Beschreibung |
|--------|--------------|
| Aktueller Betrag | Verbleibender Restbetrag (z.B. 16,80 €) |
| Ursprünglicher Betrag | Wert bei Ausgabe (z.B. 100,00 €) |
| Gutschein-Status | **Teilweise**, wenn noch Restbetrag offen |

## Buchhaltung

Im Tagesumsatzbericht wird **nur der tatsächlich eingelöste Betrag** ausgewiesen (im Beispiel 83,20 €), nicht der ursprüngliche Gutscheinwert. Der Restbetrag bleibt als offenes Guthaben im System und wird erst bei der nächsten Einlösung erfasst.

:::tip
Mehrzweckgutscheine sind erst beim Einlösen umsatzsteuerpflichtig — der nicht eingelöste Restbetrag ist also bis zur Einlösung steuerlich neutral.
:::

Mehr Details zur Gutscheinverwaltung: [Gutscheine](/stammdaten/gutscheine)
