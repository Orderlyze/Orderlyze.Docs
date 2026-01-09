---
id: gutscheine
title: Gutscheine
description: Gutscheine und Rabatte verwalten
type: reference
platform: web
sidebar_position: 4
searchTerms:
  - gutschein
  - voucher
  - rabatt
  - coupon
  - wertgutschein
---

# Gutscheine

**Navigation:** Verwaltung → Gutscheine

Mit der Gutscheinverwaltung erstellen und verwalten Sie Wertgutscheine für Ihr Unternehmen. Das System arbeitet mit Gutschein-Vorlagen, aus denen Sie beliebig viele individuelle Gutschein-Codes generieren können.

![Gutscheine Übersicht](/screenshots/admin/gutscheine-uebersicht.png)

## Übersicht

Die Gutschein-Übersicht zeigt alle Ihre Gutschein-Vorlagen mit folgenden Informationen:

| Spalte | Beschreibung |
|--------|--------------|
| Name | Name der Gutschein-Vorlage |
| Kategorie | Zugeordnete Kategorie |
| Wert | Wert des Gutscheins in Euro |
| Verfügbare Gutscheine | Anzahl der erstellten Gutscheine |
| Verbleibende Gutscheine | Noch nicht eingelöste Gutscheine |
| Eingelöste Gutscheine | Bereits eingelöste Gutscheine |

---

## Gutschein-Vorlage erstellen

Eine Gutschein-Vorlage definiert den Wert und die Anzahl der Gutscheine, die generiert werden sollen.

1. Klick auf **+ Gutschein-Vorlage hinzufügen**
2. Formular ausfüllen:
   - **Name** - Bezeichnung der Vorlage (z.B. "50€ Geschenkgutschein")
   - **Wert** - Gutscheinwert in Euro
   - **Anzahl der Gutscheine** - Wie viele Gutscheine generiert werden sollen
3. **Speichern** klicken

![Gutschein-Vorlage erstellen](/screenshots/admin/gutscheine-erstellen-dialog.png)

:::tip
Erstellen Sie verschiedene Vorlagen für unterschiedliche Gutscheinwerte, z.B. "10€ Gutschein", "25€ Gutschein", "50€ Gutschein".
:::

---

## Gutschein-Details anzeigen

Klicken Sie auf das **Info-Symbol** (ℹ️) bei einer Gutschein-Vorlage, um die einzelnen Gutschein-Codes anzuzeigen.

![Gutschein-Details](/screenshots/admin/gutscheine-details.png)

Die Detailansicht zeigt:

| Spalte | Beschreibung |
|--------|--------------|
| Gutschein-Code | Einzigartiger Gutschein-Code |
| Aktueller Betrag / Ursprünglicher Betrag | Aktueller Wert / Ursprünglicher Wert |
| Gutschein-Status | Status (Erstellt, Eingelöst, Teilweise) |
| Erstellungsdatum | Datum der Erstellung |

### Gutschein-Status

| Status | Bedeutung |
|--------|-----------|
| Erstellt | Gutschein ist erstellt und kann eingelöst werden |
| Eingelöst | Gutschein wurde vollständig eingelöst |
| Teilweise | Gutschein wurde teilweise eingelöst |

---

## Weitere Gutscheine hinzufügen

Um mehr Gutscheine zu einer bestehenden Vorlage hinzuzufügen:

1. Klick auf das **Plus-Symbol** (➕) bei der gewünschten Vorlage
2. Anzahl der neuen Gutscheine eingeben
3. **Bestätigen** klicken

---

## Gutschein-Vorlage löschen

1. Klick auf das **Mülleimer-Symbol** (🗑️) bei der Vorlage
2. Löschen bestätigen

:::warning
Beim Löschen einer Vorlage werden alle zugehörigen Gutschein-Codes unwiderruflich gelöscht. Bereits eingelöste Gutscheine können nicht mehr nachverfolgt werden.
:::

---

## Einzelnen Gutschein löschen

In der Detailansicht können Sie einzelne Gutscheine löschen:

1. Gutschein-Details öffnen (Info-Symbol)
2. Beim gewünschten Gutschein auf das **Mülleimer-Symbol** klicken
3. Löschen bestätigen

---

## Gutschein einlösen

Gutscheine werden in der Orderlyze App beim Bezahlvorgang eingelöst:

1. Bestellung aufnehmen
2. Beim Bezahlen **Gutschein** auswählen
3. Gutschein-Code eingeben oder scannen
4. Der Gutscheinwert wird automatisch abgezogen

:::info
Gutscheine können auch teilweise eingelöst werden. Der Restwert bleibt auf dem Gutschein-Code erhalten.
:::

---

## Tipps zur Gutscheinverwaltung

- **Sinnvolle Namen verwenden**: Benennen Sie Vorlagen eindeutig (z.B. "Weihnachten 2024 - 50€")
- **Regelmäßig prüfen**: Kontrollieren Sie die Gutschein-Übersicht, um den Überblick über eingelöste und offene Gutscheine zu behalten
- **Buchhaltung**: Gutscheine werden als Mehrzweckgutscheine behandelt - die Umsatzsteuer fällt erst beim Einlösen an

---

## Häufige Fragen

### Wie erkenne ich, ob ein Gutschein bereits eingelöst wurde?

In der Übersicht sehen Sie die Spalten "Verbleibende Gutscheine" (noch offen) und "Eingelöste Gutscheine" (eingelöst). In den Details zeigt die Spalte "Gutschein-Status" den genauen Status jedes einzelnen Gutscheins.

### Kann ein Gutschein mehrfach verwendet werden?

Nein, jeder Gutschein-Code ist einzigartig und kann nur einmal verwendet werden. Bei Teileinlösung bleibt der Restwert auf dem Code.

### Was passiert, wenn der Bestellwert niedriger ist als der Gutscheinwert?

Der Restbetrag bleibt auf dem Gutschein erhalten und kann bei einem späteren Einkauf verwendet werden.
