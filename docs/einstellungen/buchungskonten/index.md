---
id: einstellungen-buchungskonten
title: Buchungskonten
description: Buchungskonten für DATEV-/Buchhaltungs-Export einrichten
type: reference
platform: web
sidebar_position: 7
navigation: "Menü → Einstellungen → Buchungskonten"
searchTerms:
  - buchungskonten
  - datev
  - buchhaltung
  - csv-export
  - bestandskonto
  - erlöskonto
  - gutscheinkonto
  - kontenrahmen
---

# Buchungskonten

**Navigation:** Menü (oben rechts) → **Einstellungen** → **Buchungskonten**

Über die Buchungskonten ordnen Sie Ihre Zahlungsarten, Erlös- und Gutschein-Buchungen den passenden Konten Ihres Kontenrahmens zu. Das fertige Mapping wird beim **CSV-Export** verwendet, damit Ihre Steuerberatung die Daten direkt in das jeweilige Buchhaltungsprogramm einlesen kann.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-1.png" alt="Buchungskonten Einstellungen aufrufen" />

---

## 1. Bestandskonten

Bestandskonten bilden Bank, Kassa und ggf. weitere Liquiditäts-Konten ab. Jedes Bestandskonto bekommt eine oder mehrere **Zahlungsarten** zugewiesen — alle Einnahmen über die jeweilige Zahlungsart werden später beim Export auf dieses Konto gebucht.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-2.png" alt="Bestandskonten Übersicht" />

### Neues Bestandskonto anlegen

1. Klick auf **Konto hinzufügen**
2. **Kontonummer** und **Kontoname** eintragen (bei Bestandskonten ist keine MwSt zu hinterlegen)
3. **Speichern**

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-5.png" alt="Konto hinzufügen Dialog" />

### Zahlungsarten einem Bestandskonto zuweisen

1. Beim gewünschten Konto auf **Zahlungsart hinzufügen** klicken
2. Im Dropdown die Zahlungsart auswählen
3. **Speichern**

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-3.png" alt="Zahlungsart hinzufügen" />

Bereits zugewiesene Zahlungsarten erscheinen als blaue Chips. Über das **×** lassen sie sich wieder entfernen.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-4.png" alt="Zugewiesene Zahlungsarten" />

:::warning Wichtig
**Alle** Zahlungsmethoden müssen einem Bestandskonto zugewiesen sein, sonst ist der CSV-Export unvollständig.
:::

---

## 2. Erlöskonten

Erlöskonten gruppieren Ihre Umsätze nach Mehrwertsteuersatz und/oder Sortiment (z.B. "Erlöse Speisen 10%", "Erlöse Getränke 20%"). Jedem Erlöskonto werden eine MwSt und eine oder mehrere **Produktkategorien** zugewiesen.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-6.png" alt="Erlöskonten Übersicht" />

### Neues Erlöskonto anlegen

1. Klick auf **Konto hinzufügen**
2. **Kontonummer** und **Kontoname** eintragen
3. **Mehrwertsteuer** im Dropdown wählen
4. **Speichern**

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-7.png" alt="Erlöskonto anlegen" />

Das angelegte Konto erscheint anschließend in der Liste.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-8.png" alt="Erlöskonto in Liste" />

### Produktkategorien einem Erlöskonto zuweisen

1. Beim gewünschten Erlöskonto auf **Kategorie hinzufügen** klicken
2. Produktkategorie aus der Liste auswählen
3. **Speichern**

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-9.png" alt="Kategorie zuweisen" />

Bereits zugewiesene Kategorien lassen sich per **×** wieder entfernen.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-10.png" alt="Zugewiesene Kategorien" />

:::warning Wichtig
Alle Produkte einer Kategorie müssen denselben Mehrwertsteuersatz haben wie das Erlöskonto, dem die Kategorie zugewiesen ist. Außerdem muss **jede** Produktkategorie genau einem Erlöskonto zugewiesen sein.
:::

---

## 3. Gutscheinkonto

Das Gutscheinkonto bucht ausgegebene und eingelöste Gutscheine getrennt. In den meisten Fällen müssen Sie hier nichts ändern.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-11.png" alt="Gutscheinkonto Übersicht" />

Bei Bedarf können Sie über das **Bearbeiten-Symbol** (rechts unten) die Kontonummer oder den Namen anpassen — sprechen Sie das vorher mit Ihrer Steuerberatung ab.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-12.png" alt="Gutscheinkonto bearbeiten" />

---

## 4. CSV-Export herunterladen

Sobald alle Konten und Zuweisungen stehen, können Sie die Buchungsdaten als CSV für Ihr Buchhaltungsprogramm exportieren.

### Schritt 1: Bereich öffnen

Klick auf **CSV Exporte** in der linken Seitenleiste.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-13.png" alt="CSV Exporte Bereich" />

### Schritt 2: Zeitraum wählen

In das Datumsfeld klicken, anschließend Start- und Enddatum auswählen (oder zweimal das gleiche Datum für einen einzelnen Tag). Mit **Festlegen** bestätigen.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-14.png" alt="Zeitraum festlegen" />

### Schritt 3: CSV herunterladen

Über den jeweiligen blauen Button die CSV-Datei für Ihr Buchhaltungsprogramm herunterladen.

<BrowserFrame src="/screenshots/buchungskonten/buchungskonten-15.png" alt="CSV Download" />

:::info
Die heruntergeladene Datei kann direkt in der Buchhaltungssoftware Ihrer Steuerberatung importiert werden.
:::
