---
id: kunden
title: Kunden
description: Stammkunden und Firmenkunden verwalten
type: reference
platform: web
sidebar_position: 2
navigation: "Verwaltung → Kunden"
searchTerms:
  - kunden
  - stammkunden
  - customer
  - firma
  - firmenkunden
  - kundenverwaltung
---

# Kunden

**Navigation:** Verwaltung → Kunden

Die Kundenverwaltung ermöglicht es Ihnen, Stammkunden und Firmenkunden zu speichern. Diese können dann bei Bestellungen ausgewählt werden, um personalisierte Rechnungen zu erstellen oder Kundenbindung zu fördern.

<BrowserFrame src="/screenshots/admin/kunden-liste.png" alt="Kunden Übersicht" />

---

## Neuen Kunden anlegen

1. Klick oben rechts auf **+ Kunde hinzufügen**
2. Gewünschte Felder ausfüllen (mindestens Vor- und Nachname)
3. **Speichern**

<BrowserFrame src="/screenshots/admin/kunden-hinzufuegen-button.png" alt="Kunde hinzufügen Button" />

<BrowserFrame src="/screenshots/admin/kunden-erstellen-dialog.png" alt="Kunde erstellen Dialog" />

### Verfügbare Felder

| Feld | Beschreibung |
|------|--------------|
| Nummer | Kundennummer (optional) |
| Vorname | Vorname des Kunden |
| Nachname | Nachname des Kunden |
| Firma | Firmenname (bei Firmenkunden) |
| Email | E-Mail-Adresse |
| Telefon | Telefonnummer |
| Umsatzsteuer | Umsatzsteuer-ID (bei Firmenkunden) |
| Firma? | Markiert den Kunden als Firmenkunde |
| Favorit? | Markiert den Kunden als Favorit für schnellen Zugriff |
| Farbe | Farbcodierung zur besseren Übersicht |
| Geburtstag | Geburtsdatum |
| Adresse | Vollständige Adresse (Straße, PLZ, Stadt, Land) |

---

## Firmenkunden

Aktivieren Sie **Firma?** um einen Firmenkunden anzulegen. Bei Firmenkunden können Sie zusätzlich:

- Den Firmennamen im Feld **Firma** eintragen
- Die **Umsatzsteuer** (Umsatzsteuer-ID) hinterlegen

:::tip
Firmenkunden mit Umsatzsteuer-ID erhalten automatisch korrekt formatierte Rechnungen für den B2B-Bereich.
:::

---

## Favoriten

Markieren Sie häufige Kunden als **Favorit** (Favorit?), um sie in der App schneller auswählen zu können.

---

## Kunde bearbeiten


Klick in der Zeile des Kunden auf das **Bearbeiten-Symbol** (Stift-Symbol rechts) → Änderungen vornehmen → **Speichern**

<BrowserFrame src="/screenshots/admin/kunden-bearbeiten-button.png" alt="Kunde bearbeiten Button" />

---

## Kunde löschen

Klick in der Zeile des Kunden auf das **Löschen-Symbol** (Mülleimer-Symbol ganz rechts) → Bestätigen.

<BrowserFrame src="/screenshots/admin/kunden-loeschen-button.png" alt="Kunde löschen Button" />

:::warning
Gelöschte Kunden können nicht wiederhergestellt werden. Rechnungen, die diesem Kunden zugeordnet waren, behalten jedoch ihre Daten.
:::
