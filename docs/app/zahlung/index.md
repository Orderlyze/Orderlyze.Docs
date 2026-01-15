---
id: app-zahlung
title: Zahlung
description: Zahlungsvorgang, Trinkgeld, Gutscheine und getrennt Bezahlen in der Orderlyze Mobile App
type: reference
platform: app
sidebar_position: 5
searchTerms:
  - zahlung
  - bezahlen
  - rechnung
  - trinkgeld
  - gutschein
  - getrennt zahlen
  - bar
  - karte
  - rechnungsuebersicht
---

# Zahlung

<img src="/screenshots/app/17_zahlungs_dialog.png" alt="Zahlungs-Dialog" width="280" />

Der Zahlungs-Dialog ist der zentrale Ort, um eine Bestellung abzuschliessen und die Bezahlung entgegenzunehmen. Hier haben Sie alle Optionen, um den Zahlungsvorgang flexibel zu gestalten.

---

## Zahlungsvorgang

**Navigation:** Tischübersicht → Tisch antippen → Tab "Rechnung" → **Gesamt Bezahlen**

**So funktioniert die Zahlung:**

1. Öffnen Sie die Tisch-Detailansicht und wechseln Sie zum Tab "Rechnung"
2. Tippen Sie auf **Gesamt Bezahlen**
3. Der Zahlungs-Dialog öffnet sich mit dem Gesamtbetrag

**Optionen im Zahlungs-Dialog:**

| Element | Beschreibung |
|---------|--------------|
| **Zahlungstyp** | Wählen Sie zwischen Bar, Karte oder anderen Zahlungsarten |
| **Rabatt (%)** | Geben Sie einen prozentualen Rabatt ein |
| **Trinkgeld** | Erfassen Sie ein Trinkgeld (siehe nächster Abschnitt) |
| **Gutschein einlösen** | Lösen Sie einen Gutschein-Code ein |
| **OK** | Schliesst die Zahlung ab |
| **Zwischenrechnung** | Erstellt eine Teilrechnung ohne abzuschliessen |

:::info Tablet-Ansicht
Auf dem iPad erscheint der Zahlungs-Dialog als übersichtliches Popup in der Bildschirmmitte. Der Tischplan bleibt im Hintergrund sichtbar.

<img src="/screenshots/app/tablet/17_zahlungs_dialog.png" alt="Zahlungs-Dialog (Tablet)" width="500" />
:::

---

## Trinkgeld eingeben

<img src="/screenshots/app/22_trinkgeld_eingeben.png" alt="Trinkgeld eingeben" width="280" />

**Navigation:** Zahlungs-Dialog → **Trinkgeld** tippen

Der Trinkgeld-Dialog ermöglicht es Ihnen, schnell ein Trinkgeld zu erfassen, wenn der Gast mehr als den Rechnungsbetrag zahlen möchte.

**So funktioniert es:**

1. Im Zahlungs-Dialog auf **Trinkgeld** tippen
2. Den Gesamtbetrag eingeben, den der Gast zahlt
3. **Ok** tippen

Das System berechnet automatisch das Trinkgeld aus der Differenz zwischen dem eingegebenen Betrag und dem Rechnungsbetrag.

| Element | Beschreibung |
|---------|--------------|
| **Eingabefeld** | Zeigt den eingegebenen Gesamtbetrag |
| **Ziffernfeld** | Tippen Sie die Zahlen ein |
| **Ok** | Bestätigt den Betrag und berechnet das Trinkgeld |
| **Clear** | Löscht die Eingabe |

:::info Tablet-Ansicht
<img src="/screenshots/app/tablet/22_trinkgeld_eingeben.png" alt="Trinkgeld eingeben (Tablet)" width="500" />
:::

---

## Gutschein einlösen

<img src="/screenshots/app/26_gutschein_einloesen.png" alt="Gutschein einlösen" width="280" />

**Navigation:** Zahlungs-Dialog → **Gutschein einlösen**

Hier können Sie Gutschein-Codes Ihrer Gäste einlösen. Der Gutscheinwert wird automatisch vom Rechnungsbetrag abgezogen.

**So funktioniert es:**

1. Fragen Sie den Gast nach seinem Gutschein-Code
2. Tippen Sie in das Eingabefeld und geben Sie den Code ein
3. Tippen Sie auf den grünen **Einlösen**-Button
4. Bei gültigem Code wird der Gutscheinwert sofort abgezogen
5. Bei ungültigem Code erhalten Sie eine Fehlermeldung

**Wichtige Buttons:**

| Button | Beschreibung |
|--------|--------------|
| **Eingabefeld** | Hier geben Sie den Gutscheincode ein |
| **QR-Code Scanner** | Scannen Sie den Gutschein-QR-Code mit der Kamera (schneller als manuelle Eingabe) |
| **Einlösen** | Bestätigt den Code und zieht den Wert ab |
| **X-Symbol** | Schliesst den Dialog ohne Änderungen |

:::info Tablet-Ansicht
Der Dialog wird als zentriertes Overlay über dem Split-View-Layout angezeigt.

<img src="/screenshots/app/tablet/26_gutschein_einloesen.png" alt="Gutschein einlösen (Tablet)" width="500" />
:::

---

## Getrennt Bezahlen

<img src="/screenshots/app/34_getrennt_zahlen.png" alt="Getrennt Bezahlen" width="280" />

**Navigation:** Tischübersicht → Tisch antippen → Tab "Rechnung" → **Getrennt Bezahlen**

Dieser Dialog ermöglicht es Ihnen, eine Rechnung auf mehrere Gäste aufzuteilen. Perfekt, wenn eine Gruppe getrennt bezahlen möchte und jeder nur seine eigenen Bestellungen zahlen soll.

**Die zwei Bereiche des Dialogs:**

| Bereich | Position | Beschreibung |
|---------|----------|--------------|
| **Gesamt** | Links | Zeigt alle noch nicht zugewiesenen Produkte der Bestellung |
| **Person 1** | Rechts | Zeigt die Produkte, die der aktuellen Person zugewiesen wurden |

**So funktioniert es:**

1. Tippen Sie auf **Getrennt Bezahlen** in der Rechnungsansicht
2. Tippen Sie auf den **Pfeil (→)** neben einem Produkt, um es Person 1 zuzuweisen
3. Wiederholen Sie dies für alle Produkte, die Person 1 bezahlen soll
4. Tippen Sie auf **Person 1 bezahlen** um den Zahlungsdialog zu öffnen
5. Nach der Zahlung erscheint automatisch "Person 2"
6. Wiederholen Sie den Vorgang für alle weiteren Gäste

**Wichtige Buttons:**

| Button | Beschreibung |
|--------|--------------|
| **Pfeil-Symbol (→)** | Verschiebt ein Produkt von der Gesamtrechnung zur aktuellen Person |
| **Person X bezahlen** (grün) | Öffnet den Zahlungsdialog für diese Person |
| **X-Symbol** | Schliesst den Dialog. Bereits zugewiesene Produkte bleiben erhalten |

**Tipps:**
- Sie können Produkte auch wieder zurück zur Gesamtrechnung verschieben
- Bei grösseren Gruppen arbeiten Sie am besten Person für Person ab
- Der Dialog zeigt immer die aktuelle Summe für jede Person an

:::info Tablet-Ansicht
Auf dem iPad wird dieser Dialog als Overlay über dem Split-View Layout angezeigt. Im Hintergrund bleibt die Tischübersicht sichtbar.

<img src="/screenshots/app/tablet/34_getrennt_zahlen.png" alt="Getrennt Bezahlen (Tablet)" width="500" />
:::

---

## Zwischenrechnung

**Navigation:** Zahlungs-Dialog → **Zwischenrechnung**

Tippen Sie auf **Zwischenrechnung**, um eine Teilrechnung zu erstellen, ohne die Bestellung abzuschliessen. Dies ist nützlich, wenn ein Gast eine Übersicht seiner bisherigen Bestellung wünscht.

---

## Rechnungsübersicht {#rechnungsuebersicht}

<img src="/screenshots/app/05_invoice_overview.png" alt="Rechnungsübersicht" width="280" />

**Navigation:** Menü-Symbol (drei Striche) → **Rechnungsübersicht**

Die Rechnungsübersicht ist Ihr digitales Kassenbuch. Hier finden Sie alle abgeschlossenen Rechnungen des Tages oder eines beliebigen Zeitraums.

**Funktionen:**

| Element | Beschreibung |
|---------|--------------|
| **Datumsfilter** | Wählen Sie ein bestimmtes Datum, um nur Rechnungen dieses Tages anzuzeigen |
| **Export-Button** | Exportieren Sie Ihre Rechnungsdaten für die Buchhaltung |
| **Rechnungsliste** | Alle Rechnungen mit Nummer, Datum, Uhrzeit und Betrag |

**Informationen pro Rechnung:**

| Spalte | Beschreibung |
|--------|--------------|
| **Nr.** (blau) | Die fortlaufende Rechnungsnummer |
| **Datum** | Datum der Rechnung |
| **Uhrzeit** | Uhrzeit der Erstellung |
| **Mitarbeiter** | Name des Mitarbeiters, der abkassiert hat |
| **Betrag** | Gesamtbetrag der Rechnung |

Tippen Sie auf eine Rechnung, um Details anzuzeigen oder sie erneut zu drucken.

:::info Tablet-Ansicht
Auf dem iPad haben Sie eine breitere Listenansicht mit mehr Informationen pro Rechnung ohne Scrollen.

<img src="/screenshots/app/tablet/05_invoice_overview.png" alt="Rechnungsübersicht (Tablet)" width="500" />
:::

---

## Rechnungsdetail

<img src="/screenshots/app/35_rechnungsuebersicht.png" alt="Rechnungsdetail" width="280" />

**Navigation:** Menü → Rechnungsübersicht → Auf eine Rechnung tippen

In der Detailansicht sehen Sie alle Positionen einer abgeschlossenen Rechnung. Diese Ansicht ist nützlich für:

- Nachverfolgung einzelner Bestellungen
- Erneutes Drucken eines Belegs für den Gast
- Kontrolle der Buchhaltung

:::info Tablet-Ansicht
<img src="/screenshots/app/tablet/35_rechnungsuebersicht.png" alt="Rechnungsdetail (Tablet)" width="500" />
:::
