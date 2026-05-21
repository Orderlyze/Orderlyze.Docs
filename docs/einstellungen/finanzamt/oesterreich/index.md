---
id: einstellungen-finanzamt-oesterreich
title: Österreich (RKSV)
description: Signaturerstellungseinheit, Nullbelege und DEP-Exporte gemäß RKSV
type: reference
platform: web
sidebar_position: 1
navigation: "Menü → Einstellungen → Finanzamt"
searchTerms:
  - rksv
  - registrierkassensicherheitsverordnung
  - scu
  - signaturerstellungseinheit
  - nullbeleg
  - monatsbeleg
  - jahresbeleg
  - startbeleg
  - dep131
  - dep7
  - finanzonline
---

# Finanzamt — Österreich (RKSV)

**Navigation:** Menü (oben rechts) → **Einstellungen** → **Finanzamt**

Diese Seite zeigt den Status Ihrer Kasse gemäß der österreichischen **Registrierkassensicherheitsverordnung (RKSV)**. Orderlyze erfüllt alle gesetzlichen Anforderungen automatisch — Sie sehen hier nur den aktuellen Status und können die gesetzlich vorgeschriebenen Exporte für das Finanzamt herunterladen.

![Finanzamt Einstellungen Österreich](/screenshots/einstellungen/finanzamt/at-scu.png)

:::tip Status grün
Steht oben "Dein Kassensystem ist mit dem Finanzamt verbunden", ist alles in Ordnung — die Signaturkette ist aktiv und Belege werden RKSV-konform signiert.
:::

---

## SCU-Informationen

Die **Signaturerstellungseinheit (SCU)** ist die zertifizierte Komponente, die Ihre Belege gesetzeskonform signiert. Sie sehen folgende Felder:

| Feld | Bedeutung |
|------|-----------|
| **Status der Signaturerstellungseinheit** | `INITIALIZED` — die SCU ist beim Finanzamt angemeldet und einsatzbereit |
| **Version** | Software-Version der Signaturerstellungseinheit |
| **Erstellungsdatum** | Tag, an dem die SCU für Ihre Kasse erzeugt wurde |
| **Initialisierungsdatum** | Tag der erstmaligen Anmeldung beim Finanzamt (FinanzOnline) |
| **Zertifikats-Seriennummer** | Eindeutige Seriennummer Ihres Signaturzertifikats |
| **Steuernummer / UUID** | Ihre beim Finanzamt registrierte Steuernummer und Kassen-UUID |

:::info Was bedeutet "INITIALIZED"?
`INITIALIZED` bedeutet, dass Ihre Kasse erfolgreich bei FinanzOnline registriert wurde und Belege gesetzeskonform signiert werden. Bei jedem anderen Status (z.B. `INACTIVE`, `ERROR`) wenden Sie sich bitte umgehend an den Orderlyze-Support.
:::

---

## Nullbelege

Die **Nullbeleg-Tabelle** zeigt alle gesetzlich vorgeschriebenen Sonderbelege — diese werden automatisch von Orderlyze erstellt und signiert.

| Spalte | Bedeutung |
|--------|-----------|
| **Beleg** | Laufende Belegnummer der Signaturkette |
| **ID** | Eindeutige UUID des Belegs |
| **Datum** | Erstellungsdatum des Belegs |
| **QR-Code** | Der signierte Beleg-Code (auf dem Bon abgedruckt) |
| **Belegart** | Typ des Nullbelegs (siehe unten) |

### Belegarten

| Art | Bedeutung | Wann erstellt |
|-----|-----------|---------------|
| **INITIALIZATION** | Startbeleg / Initialisierungsbeleg | Einmalig bei Inbetriebnahme der Kasse |
| **MONTHLY_CLOSE** | Monatsbeleg | Automatisch am Ende jedes Monats |
| **YEARLY_CLOSE** | Jahresbeleg | Automatisch am 31.12. jedes Jahres |

:::info Müssen Sie selbst aktiv werden?
**Nein.** Orderlyze erstellt alle Nullbelege automatisch. Der Jahresbeleg (YEARLY_CLOSE) muss laut RKSV bis zum 15. Februar des Folgejahres bei FinanzOnline geprüft werden — auch das übernimmt die Orderlyze-Infrastruktur für Sie.
:::

:::tip Belegprüfer-App des BMF
Sie können jeden QR-Code mit der kostenlosen **"BMF Belegcheck"-App** (Bundesministerium für Finanzen) scannen. Die App bestätigt, dass der Beleg gültig signiert wurde.
:::

---

## DEP131 / DEP7 herunterladen

![Dep131 und Dep7 Download](/screenshots/einstellungen/finanzamt/at-download.png)

Das **Datenerfassungsprotokoll (DEP)** ist die gesetzlich vorgeschriebene, manipulationssichere Aufzeichnung aller Geschäftsvorfälle. Bei einer Finanzamtsprüfung müssen Sie dieses Protokoll vorlegen können.

### So laden Sie das DEP herunter

1. **Zeitraum auswählen:** Tippen Sie auf das Datumsfeld **"von – bis"** und wählen Sie den gewünschten Bereich (z.B. ein ganzes Geschäftsjahr).
2. **Format wählen:**
   - **Herunterladen Dep131** — Standard-Export gemäß § 131b BAO (übliche Wahl bei Prüfungen)
   - **Herunterladen Dep7** — Erweiterter Export für detaillierte Auswertungen
3. Die Datei wird im Hintergrund erzeugt und erscheint anschließend im **Download Center** unterhalb.

| Format | Verwendung |
|--------|------------|
| **DEP131** | Standardprotokoll für die Finanzamtsprüfung (§ 131b BAO) |
| **DEP7** | Erweitertes Protokoll mit zusätzlichen Detail-Informationen |

:::tip Empfehlung
Erstellen Sie spätestens zum Jahresende einen DEP131-Export Ihres Geschäftsjahres und sichern Sie die Datei extern (z.B. Cloud, externe Festplatte). Die Aufbewahrungspflicht beträgt **7 Jahre**.
:::

---

## Download Center

Im **Download Center** sehen Sie alle erstellten Exporte. Die Erzeugung großer DEP-Dateien kann einige Minuten dauern — die Datei erscheint hier, sobald sie fertig ist.

| Spalte | Bedeutung |
|--------|-----------|
| **Dateiname** | Name der Export-Datei |
| **Benutzername** | Wer den Export angefordert hat |
| **Typ** | DEP131 oder DEP7 |
| **Status** | `In Bearbeitung`, `Fertig` oder `Fehler` |
| **Erstellt am** | Zeitpunkt der Anforderung |
| **Zuletzt geändert am** | Zeitpunkt der Fertigstellung |
| **Error** | Fehlermeldung, falls die Erstellung fehlgeschlagen ist |

### Filter und Aktionen

- **seit:** Datumsfilter — zeigt nur Exporte ab dem gewählten Datum.
- **Alle Downloads:** Lädt alle gelisteten Dateien als gemeinsames Archiv herunter.

:::info Aufbewahrung
Heruntergeladene DEP-Dateien werden auf dem Server **nicht dauerhaft** gespeichert. Speichern Sie die Datei nach dem Download auf einem externen Medium — Sie können den Export jederzeit erneut für denselben Zeitraum erzeugen.
:::

---

## Was tun bei Problemen?

| Problem | Lösung |
|---------|--------|
| "Dein Kassensystem ist **nicht** mit dem Finanzamt verbunden" | Sofort den Orderlyze-Support kontaktieren — die Belegerstellung ist davon nicht direkt betroffen, muss aber zeitnah behoben werden |
| Status der SCU nicht `INITIALIZED` | Support kontaktieren — eventuell muss die Kasse bei FinanzOnline neu registriert werden |
| DEP-Download bricht ab oder ist `ERROR` | Kleineren Zeitraum wählen und erneut versuchen; bei großen Jahresexporten Geduld haben (mehrere Minuten) |
| QR-Code-Prüfung in BMF-App schlägt fehl | Support kontaktieren — Zertifikat oder Signaturkette könnte beschädigt sein |

:::tip RKSV-Pflichten im Überblick
- **Belegerteilungspflicht** und **Belegannahmepflicht** des Kunden bleiben Ihre gesetzliche Verantwortung
- **Jahresbeleg-Prüfung** bis 15. Februar des Folgejahres (übernimmt Orderlyze automatisch)
- **DEP-Aufbewahrung** für 7 Jahre — Orderlyze speichert die Daten, ein lokaler Export wird trotzdem empfohlen
:::
