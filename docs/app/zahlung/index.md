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
---

# Zahlung

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/17_zahlungs_dialog.png" alt="Zahlungs-Dialog (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/17_zahlungs_dialog.png" alt="Zahlungs-Dialog (Tablet)" width="500" />
    <figcaption>iPad</figcaption>
  </figure>
</div>

Der Zahlungs-Dialog ist der zentrale Ort, um eine Bestellung abzuschliessen und die Bezahlung entgegenzunehmen. Hier haben Sie alle Optionen, um den Zahlungsvorgang flexibel zu gestalten. Auf dem iPad erscheint der Dialog als übersichtliches Popup, während der Tischplan im Hintergrund sichtbar bleibt.

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

---

## Trinkgeld eingeben

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/22_trinkgeld_eingeben.png" alt="Trinkgeld eingeben (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/22_trinkgeld_eingeben.png" alt="Trinkgeld eingeben (Tablet)" width="500" />
    <figcaption>iPad</figcaption>
  </figure>
</div>

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

---

## Gutschein einlösen

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/26_gutschein_einloesen.png" alt="Gutschein einlösen (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/26_gutschein_einloesen.png" alt="Gutschein einlösen (Tablet)" width="500" />
    <figcaption>iPad</figcaption>
  </figure>
</div>

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

---

## Getrennt Bezahlen

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/34_getrennt_zahlen.png" alt="Getrennt Bezahlen (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/34_getrennt_zahlen.png" alt="Getrennt Bezahlen (Tablet)" width="500" />
    <figcaption>iPad</figcaption>
  </figure>
</div>

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

---

## Zwischenrechnung

**Navigation:** Zahlungs-Dialog → **Zwischenrechnung**

Tippen Sie auf **Zwischenrechnung**, um eine Teilrechnung zu erstellen, ohne die Bestellung abzuschliessen. Dies ist nützlich, wenn ein Gast eine Übersicht seiner bisherigen Bestellung wünscht.

---

Eine Übersicht aller abgeschlossenen Rechnungen finden Sie unter [Rechnungsübersicht](/app/rechnungsuebersicht).
