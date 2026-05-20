---
id: einstellungen-buchungskonten
title: Buchungskonten
description: Buchungskonten für DATEV-/Buchhaltungs-Export einrichten
type: reference
platform: web
sidebar_position: 7
navigation: "Test Account → Einstellungen → Buchungskonten"
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

**Navigation:** Test-Account-Menü (oben rechts) → **Einstellungen** → **Buchungskonten**

Über die Buchungskonten ordnen Sie Ihre Zahlungsarten, Erlös- und Gutschein-Buchungen den passenden Konten Ihres Kontenrahmens zu. Das fertige Mapping wird beim **CSV-Export** verwendet, damit Ihre Steuerberatung die Daten direkt in das jeweilige Buchhaltungsprogramm einlesen kann.

![Buchungskonten Einstellungen aufrufen](/screenshots/buchungskonten/buchungskonten-1.png)

---

## 1. Bestandskonten

Bestandskonten bilden Bank, Kassa und ggf. weitere Liquiditäts-Konten ab. Jedes Bestandskonto bekommt eine oder mehrere **Zahlungsarten** zugewiesen — alle Einnahmen über die jeweilige Zahlungsart werden später beim Export auf dieses Konto gebucht.

![Bestandskonten Übersicht](/screenshots/buchungskonten/buchungskonten-2.png)

### Neues Bestandskonto anlegen

1. Klick auf **Konto hinzufügen**
2. **Kontonummer** und **Kontoname** eintragen (bei Bestandskonten ist keine MwSt zu hinterlegen)
3. **Speichern**

![Konto hinzufügen Dialog](/screenshots/buchungskonten/buchungskonten-5.png)

### Zahlungsarten einem Bestandskonto zuweisen

1. Beim gewünschten Konto auf **Zahlungsart hinzufügen** klicken
2. Im Dropdown die Zahlungsart auswählen
3. **Speichern**

![Zahlungsart hinzufügen](/screenshots/buchungskonten/buchungskonten-3.png)

Bereits zugewiesene Zahlungsarten erscheinen als blaue Chips. Über das **×** lassen sie sich wieder entfernen.

![Zugewiesene Zahlungsarten](/screenshots/buchungskonten/buchungskonten-4.png)

:::warning Wichtig
**Alle** Zahlungsmethoden müssen einem Bestandskonto zugewiesen sein, sonst ist der CSV-Export unvollständig.
:::

---

## 2. Erlöskonten

Erlöskonten gruppieren Ihre Umsätze nach Mehrwertsteuersatz und/oder Sortiment (z.B. "Erlöse Speisen 10%", "Erlöse Getränke 20%"). Jedem Erlöskonto werden eine MwSt und eine oder mehrere **Produktkategorien** zugewiesen.

![Erlöskonten Übersicht](/screenshots/buchungskonten/buchungskonten-6.png)

### Neues Erlöskonto anlegen

1. Klick auf **Konto hinzufügen**
2. **Kontonummer** und **Kontoname** eintragen
3. **Mehrwertsteuer** im Dropdown wählen
4. **Speichern**

![Erlöskonto anlegen](/screenshots/buchungskonten/buchungskonten-7.png)

Das angelegte Konto erscheint anschließend in der Liste.

![Erlöskonto in Liste](/screenshots/buchungskonten/buchungskonten-8.png)

### Produktkategorien einem Erlöskonto zuweisen

1. Beim gewünschten Erlöskonto auf **Kategorie hinzufügen** klicken
2. Produktkategorie aus der Liste auswählen
3. **Speichern**

![Kategorie zuweisen](/screenshots/buchungskonten/buchungskonten-9.png)

Bereits zugewiesene Kategorien lassen sich per **×** wieder entfernen.

![Zugewiesene Kategorien](/screenshots/buchungskonten/buchungskonten-10.png)

:::warning Wichtig
Alle Produkte einer Kategorie müssen denselben Mehrwertsteuersatz haben wie das Erlöskonto, dem die Kategorie zugewiesen ist. Außerdem muss **jede** Produktkategorie genau einem Erlöskonto zugewiesen sein.
:::

---

## 3. Gutscheinkonto

Das Gutscheinkonto bucht ausgegebene und eingelöste Gutscheine getrennt. In den meisten Fällen müssen Sie hier nichts ändern.

![Gutscheinkonto Übersicht](/screenshots/buchungskonten/buchungskonten-11.png)

Bei Bedarf können Sie über das **Bearbeiten-Symbol** (rechts unten) die Kontonummer oder den Namen anpassen — sprechen Sie das vorher mit Ihrer Steuerberatung ab.

![Gutscheinkonto bearbeiten](/screenshots/buchungskonten/buchungskonten-12.png)

---

## 4. CSV-Export herunterladen

Sobald alle Konten und Zuweisungen stehen, können Sie die Buchungsdaten als CSV für Ihr Buchhaltungsprogramm exportieren.

### Schritt 1: Bereich öffnen

Klick auf **CSV Exporte** in der linken Seitenleiste.

![CSV Exporte Bereich](/screenshots/buchungskonten/buchungskonten-13.png)

### Schritt 2: Zeitraum wählen

In das Datumsfeld klicken, anschließend Start- und Enddatum auswählen (oder zweimal das gleiche Datum für einen einzelnen Tag). Mit **Festlegen** bestätigen.

![Zeitraum festlegen](/screenshots/buchungskonten/buchungskonten-14.png)

### Schritt 3: CSV herunterladen

Über den jeweiligen blauen Button die CSV-Datei für Ihr Buchhaltungsprogramm herunterladen.

![CSV Download](/screenshots/buchungskonten/buchungskonten-15.png)

:::info
Die heruntergeladene Datei kann direkt in der Buchhaltungssoftware Ihrer Steuerberatung importiert werden.
:::
