---
id: app-rueckgeld
title: Rückgeld-Rechner
description: Rückgeld über den Taschenrechner beim Gesamt Bezahlen in der Orderlyze Mobile App berechnen
type: reference
platform: app
sidebar_position: 6
searchTerms:
  - rückgeld
  - retour
  - taschenrechner
  - rechner
  - wechselgeld
  - betrag gegeben
  - bar bezahlen
---

# Rückgeld-Rechner

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/38_rueckgeld_rechner.png" alt="Rückgeld-Rechner (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/38_rueckgeld_rechner.png" alt="Rückgeld-Rechner (Tablet)" width="500" />
    <figcaption>Tablet</figcaption>
  </figure>
</div>

Der Rückgeld-Rechner (Taschenrechner) hilft Ihnen bei Barzahlungen, das Rückgeld schnell und fehlerfrei zu berechnen. Sie geben einfach ein, wie viel der Gast Ihnen gegeben hat — die App zeigt sofort an, wie viel Sie zurückgeben müssen.

---

## Rechner öffnen

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/37_rueckgeld_rechner_oeffnen.png" alt="Taschenrechner-Symbol im Zahlungs-Dialog (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/37_rueckgeld_rechner_oeffnen.png" alt="Taschenrechner-Symbol im Zahlungs-Dialog (Tablet)" width="500" />
    <figcaption>Tablet</figcaption>
  </figure>
</div>

**Navigation:** Tischübersicht → Tisch antippen → Tab "Rechnung" → **Gesamt Bezahlen** → **Taschenrechner-Symbol**

**So funktioniert es:**

1. Öffnen Sie den Zahlungs-Dialog über **Gesamt Bezahlen** (siehe [Zahlung](/app/zahlung))
2. Tippen Sie auf das **Taschenrechner-Symbol** rechts im Dialog
3. Der Rückgeld-Rechner öffnet sich mit dem zu zahlenden Betrag

:::info
Das Taschenrechner-Symbol wird nur angezeigt, wenn die Funktion für Ihr Konto aktiviert ist. Die Einstellung finden Sie im Web Dashboard unter [Features aktivieren/deaktivieren](/einstellungen/features).
:::

---

## Rückgeld berechnen

**Navigation:** Zahlungs-Dialog → **Taschenrechner-Symbol**

Der Rechner zeigt drei Beträge übersichtlich untereinander an:

| Element | Beschreibung |
|---------|--------------|
| **zu bezahlen** (blau) | Der offene Rechnungsbetrag |
| **Betrag gegeben** | Eingabefeld — hier tippen Sie ein, wie viel der Gast Ihnen gegeben hat |
| **Retour** (grün) | Das Rückgeld, das Sie dem Gast zurückgeben müssen |

**So funktioniert es:**

1. Geben Sie im Feld **Betrag gegeben** den Betrag ein, den der Gast Ihnen überreicht hat (z.B. 20 bei einem 20-Euro-Schein)
2. Das Rückgeld wird sofort automatisch berechnet und im grünen Feld **Retour** angezeigt
3. Geben Sie dem Gast das Rückgeld und tippen Sie auf **Fertig**

**Beispiel:** Die Rechnung beträgt 12,50€, der Gast zahlt mit einem 20-Euro-Schein. Sie tippen 20 ein — der Rechner zeigt 7,50€ Retour.

**Wichtige Buttons:**

| Button | Beschreibung |
|--------|--------------|
| **Ziffernfeld** | Tippen Sie den gegebenen Betrag ein |
| **X-Symbol im Eingabefeld** | Löscht die Eingabe |
| **Fertig** | Schliesst den Rechner und kehrt zum Zahlungs-Dialog zurück |

---

## Rechner automatisch nach der Zahlung anzeigen

Optional kann der Rückgeld-Rechner nach jedem Abschluss einer Zahlung automatisch erscheinen. In diesem Fall ist das Feld **Betrag gegeben** bereits mit dem Zahlbetrag vorausgefüllt — Sie passen nur noch den tatsächlich gegebenen Betrag an.

Diese Einstellung aktivieren Sie im Web Dashboard unter [Features aktivieren/deaktivieren](/einstellungen/features) im Bereich **Zahlungsprozess**.

---

Alle weiteren Optionen im Zahlungs-Dialog (Trinkgeld, Gutscheine, getrennt Bezahlen) finden Sie unter [Zahlung](/app/zahlung).
