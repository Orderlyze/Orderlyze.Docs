---
id: funktionen-kassenbuch
title: Kassenbuch
description: Bareinnahmen und -ausgaben im Orderlyze-Kassenbuch erfassen
type: tutorial
platform: web
sidebar_position: 2
searchTerms:
  - kassenbuch
  - bargeld
  - einnahme
  - ausgabe
  - storno
  - export
---

# Kassenbuch

Im Kassenbuch werden alle Bareinnahmen und -ausgaben tagesgenau erfasst.

## Aktivierung

Das Kassenbuch ist standardmäßig nicht freigeschaltet. Wenn der Menüpunkt **Kassenbuch** in deiner App nicht erscheint, melde dich beim Orderlyze Support unter **0800 400 4511**. Nach der Freischaltung die App einmal neu starten — danach ist das Kassenbuch im App-Menü und im Verwaltungs-Menü sichtbar.

![Kassenbuch einrichten](/screenshots/funktionen/kassenbuch/1.png)

## Einrichtung (erstmalige Konfiguration)

Beim ersten Öffnen des Kassenbuchs sind zwei Werte festzulegen:

### Schritt 1 — Anfangssaldo

Trage den aktuellen Bargeldbestand in deiner Kassa ein. Falls du von einem anderen Kassensystem umsteigst, übernimm den Schlusssaldo des Vorgängersystems.

### Schritt 2 — Start-Nummer

Definiere, mit welcher Nummer die automatische Belegnummerierung beginnen soll. Beim Wechsel des Systems empfiehlt sich die Nummer nach dem letzten Eintrag des Altsystems.

---

## Tagesansicht

In der Tagesansicht siehst du den aktuellen Kassenstand und im Tabellenbereich darunter alle Einträge des laufenden Tages.

![Tagesansicht](/screenshots/funktionen/kassenbuch/2.png)

- Tippe auf einen Eintrag, um die Details aufzurufen
- Stornierungen werden direkt aus der Detailansicht angestoßen (siehe unten)

---

## Verlauf

Im Reiter **Verlauf** wählst du oben einen Zeitraum aus. Darunter erscheint eine Tabelle mit allen Tagen, an denen Einträge vorhanden sind. Klick auf einen Tag öffnet dessen Einzeleinträge.

![Verlauf](/screenshots/funktionen/kassenbuch/3.png)

Aus dieser Ansicht können auch ältere Einträge storniert werden.

---

## Neuen Eintrag erstellen

1. **Einnahme** oder **Ausgabe** auswählen
2. Oben optional **Belegnummer** und **Rechnungsdatum** eintragen
3. Eine oder mehrere Positionen anlegen — pro Position eine Kategorie und ggf. einen eigenen Steuersatz
4. Pflichtfelder pro Position: **Kategorie**, **Bruttobetrag**, **Mehrwertsteuer**
5. Optional: Notiz hinzufügen oder einen Beleg (Foto/PDF) anhängen

![Neue Einnahme](/screenshots/funktionen/kassenbuch/4.png)

---

## Eintrag stornieren

- **Automatisch erstellte Einträge** (aus dem Verkaufsbetrieb) werden nicht direkt im Kassenbuch storniert, sondern über die Rechnungsübersicht in der Haupt-App (siehe [Rechnungen nachträglich bearbeiten/stornieren](../rechnungen-bearbeiten)).
- **Manuelle Einträge** in der Tagesansicht (heutige) bzw. unter **Verlauf → Tag → Eintrag** antippen und auf das **rote Storno-Symbol** in der Detailansicht klicken.

![Stornieren](/screenshots/funktionen/kassenbuch/5.png)

---

## Daten exportieren

1. Reiter **Verlauf** öffnen
2. Zeitraum auswählen
3. Export-Variante wählen:
   - **PDF** — strukturierte Zusammenfassung in einer Datei
   - **Beleg-Sammelexport** — Ordnerstruktur mit allen angehängten Originalbelegen

:::tip
Den PDF-Export gibst du an deine Steuerberatung weiter. Der Beleg-Sammelexport ist sinnvoll, wenn du die hinterlegten Belege archivieren willst.
:::
