---
id: einstellungen-finanzamt-deutschland
title: Deutschland (KassenSichV)
description: TSE-Anbindung und DSFinV-K-Export gemäß KassenSichV
type: reference
platform: web
sidebar_position: 2
navigation: "Menü → Einstellungen → Signaturanbieter (TSE)"
searchTerms:
  - kassensichv
  - tse
  - technische sicherheitseinrichtung
  - fiskaly
  - dsfinv-k
  - tar
  - gobd
  - signaturzaehler
  - transaktionszaehler
  - finanzamt
---

# Finanzamt — Deutschland (KassenSichV)

**Navigation:** Menü (oben rechts) → **Einstellungen** → **Signaturanbieter (TSE)**

Diese Seite zeigt den Status Ihrer Kasse gemäß der deutschen **Kassensicherungsverordnung (KassenSichV)**. Orderlyze nutzt eine zertifizierte **TSE (Technische Sicherheitseinrichtung)**, die jeden Geschäftsvorfall manipulationssicher signiert. Sie sehen hier den aktuellen Status, können das TSE-Zertifikat herunterladen und die gesetzlich vorgeschriebenen Exporte (TSE / DSFinV-K) für eine Kassen-Nachschau erzeugen.

![TSE Einstellungen Deutschland](/screenshots/einstellungen/finanzamt/de-tse.png)

:::tip Status grün
Steht oben "Dein Kassensystem ist mit dem Finanzamt verbunden", ist alles in Ordnung — die TSE ist aktiv und Belege werden gemäß KassenSichV signiert.
:::

---

## Daten an Finanzamt übermitteln

Über den Button **"Daten an Finanzamt übermitteln"** melden Sie Ihre Kasse beim Finanzamt an. Eine ausführliche Schritt-für-Schritt-Anleitung finden Sie unter [**Funktionen → Datenübermittlung Finanzamt (Deutschland)**](/funktionen/datenuebermittlung-finanzamt).

---

## TSE-Informationen

Die **TSE (Technische Sicherheitseinrichtung)** ist die zertifizierte Komponente, die jeden Beleg gesetzeskonform signiert. Orderlyze setzt **fiskaly sign cloud-TSE** ein — eine vom BSI zertifizierte Cloud-TSE.

| Feld | Bedeutung |
|------|-----------|
| **TSE Anbieter** | Verwendeter TSE-Dienst (z.B. `fiskaly sign cloud-TSE`) und dessen eindeutige ID |
| **Status** | `INITIALIZED` — die TSE ist beim Finanzamt angemeldet und einsatzbereit |
| **Zertifikat** | Über **Herunterladen** laden Sie das TSE-Zertifikat als Datei herunter (für die Belegprüfung notwendig) |
| **Seriennummer des Signaturzertifikates** | Eindeutige Seriennummer des Zertifikats — wird auf jedem Beleg abgedruckt |
| **Signaturzähler** | Anzahl der bisher von dieser TSE erzeugten Signaturen |
| **Signaturalgorithmus** | Kryptografisches Verfahren (z.B. `ecdsa-plain-SHA256`) |
| **Transaktionszähler** | Fortlaufender Zähler der signierten Geschäftsvorfälle |
| **TSE-Version** | Software-Version der Signaturkomponente |
| **Erstellungsdatum** | Tag, an dem die TSE für Ihre Kasse erzeugt wurde |
| **Initialisierungsdatum** | Tag der erstmaligen Anmeldung beim Finanzamt |
| **Kunden Seriennummer** | Eindeutige UUID Ihrer Kasse im TSE-System |

:::info Was bedeutet "INITIALIZED"?
`INITIALIZED` bedeutet, dass Ihre TSE aktiv ist und Belege gesetzeskonform signiert werden. Bei jedem anderen Status (z.B. `UNINITIALIZED`, `DISABLED`, `DELETED`) wenden Sie sich bitte umgehend an den Orderlyze-Support — in diesen Zuständen werden keine gültigen Signaturen erzeugt.
:::

### Zertifikat herunterladen

Über den Button **"Herunterladen"** unter dem Feld _Zertifikat_ erhalten Sie das öffentliche Zertifikat Ihrer TSE. Sie benötigen es:

- bei Belegprüfungen durch Dritte (z.B. App des Finanzamts)
- für die externe Archivierung
- bei TSE-Anbieterwechseln zum Nachweis der vorherigen Konfiguration

---

## TSE / DSFinV-K herunterladen

![TSE und DSFinV-K Download](/screenshots/einstellungen/finanzamt/de-download.png)

Bei einer **Kassen-Nachschau** (§ 146b AO) oder einer **Betriebsprüfung** müssen Sie dem Finanzamt zwei Arten von Exporten zur Verfügung stellen:

| Format | Inhalt | Verwendung |
|--------|--------|------------|
| **TSE-Export (TAR)** | Signierte Rohdaten aller Belege gemäß TR-03153 des BSI | Nachweis der manipulationssicheren Aufzeichnung |
| **DSFinV-K** | Strukturierte CSV-Daten gemäß Digitale Schnittstelle der Finanzverwaltung für Kassensysteme | Inhaltliche Auswertung durch das Finanzamt |

### So laden Sie die Exporte herunter

1. **Zeitraum auswählen:** Tippen Sie auf das Datumsfeld **"von – bis"** und wählen Sie den gewünschten Bereich (z.B. ein ganzes Geschäftsjahr).
2. **Format wählen:**
   - **Herunterladen TSE** — exportiert die signierten TSE-Daten (TAR-Archiv)
   - **Herunterladen DsfinVK** — exportiert die Geschäftsvorfälle im DSFinV-K-Format (ZIP mit CSV-Dateien)
3. Die Datei wird im Hintergrund erzeugt und erscheint anschließend im **Download Center** unterhalb.

:::tip Empfehlung
Erstellen Sie spätestens zum Jahresende einen kompletten Export Ihres Geschäftsjahres (TSE **und** DSFinV-K) und sichern Sie die Dateien extern (z.B. Cloud, externe Festplatte). Die Aufbewahrungspflicht beträgt **10 Jahre** (§ 147 AO).
:::

:::info Beide Formate sind Pflicht
Bei einer Kassen-Nachschau wird in der Regel **beides** verlangt: der TSE-Export weist die Unveränderbarkeit nach, der DSFinV-K-Export liefert die auswertbaren Daten. Laden Sie immer beide Formate für denselben Zeitraum herunter.
:::

---

## Download Center

Im **Download Center** sehen Sie alle erstellten Exporte. Die Erzeugung großer Dateien kann einige Minuten dauern — die Datei erscheint hier, sobald sie fertig ist.

| Spalte | Bedeutung |
|--------|-----------|
| **Dateiname** | Name der Export-Datei |
| **Benutzername** | Wer den Export angefordert hat |
| **Typ** | TSE oder DSFinV-K |
| **Status** | `In Bearbeitung`, `Fertig` oder `Fehler` |
| **Erstellt am** | Zeitpunkt der Anforderung |
| **Zuletzt geändert am** | Zeitpunkt der Fertigstellung |
| **Error** | Fehlermeldung, falls die Erstellung fehlgeschlagen ist |

### Filter und Aktionen

- **seit:** Datumsfilter — zeigt nur Exporte ab dem gewählten Datum.
- **Alle Downloads:** Lädt alle gelisteten Dateien als gemeinsames Archiv herunter.

:::info Aufbewahrung
Heruntergeladene Export-Dateien werden auf dem Server **nicht dauerhaft** gespeichert. Speichern Sie die Datei nach dem Download auf einem externen Medium — Sie können den Export jederzeit erneut für denselben Zeitraum erzeugen.
:::

---

## Was tun bei Problemen?

| Problem | Lösung |
|---------|--------|
| "Dein Kassensystem ist **nicht** mit dem Finanzamt verbunden" | Sofort den Orderlyze-Support kontaktieren — Belege können in diesem Zustand nicht gesetzeskonform signiert werden |
| Status der TSE nicht `INITIALIZED` (z.B. `DISABLED`, `DELETED`) | Support kontaktieren — die TSE muss neu initialisiert oder ersetzt werden |
| TSE-Export bricht ab oder ist `ERROR` | Kleineren Zeitraum wählen und erneut versuchen; bei großen Jahresexporten Geduld haben (mehrere Minuten) |
| Belegprüfung durch App des Finanzamts schlägt fehl | Support kontaktieren — Zertifikat oder Signaturkette könnte beschädigt sein |
| Finanzamt verlangt Daten in einem anderen Format | Bei Sonderwünschen den Support kontaktieren — wir können bei Bedarf weitere Formate liefern |

:::tip KassenSichV-Pflichten im Überblick
- **Belegausgabepflicht** seit 1.1.2020 — jeder Geschäftsvorfall muss einen TSE-signierten Beleg auslösen (Orderlyze automatisch)
- **Mitteilungspflicht** der Kasse beim Finanzamt — siehe [Datenübermittlung Finanzamt (Deutschland)](/funktionen/datenuebermittlung-finanzamt)
- **Aufbewahrungspflicht** für TSE- und DSFinV-K-Daten: **10 Jahre** (§ 147 AO) — Orderlyze speichert die Daten, ein lokaler Export wird trotzdem empfohlen
:::
