---
id: app-kartenzahlung
title: Kartenzahlung
description: Kartenzahlungsterminal einrichten und verwalten
type: reference
platform: app
sidebar_position: 9
searchTerms:
  - kartenzahlung
  - terminal
  - ec karte
  - kreditkarte
  - hobex
  - mollie
  - zvt
  - tecs
  - gp tom
  - gptom
  - global payments
  - softpos
---

# Kartenzahlung

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/11_kartenzahlung.png" alt="Kartenzahlung (Tablet)" width="500" />
    <figcaption>Tablet</figcaption>
  </figure>
</div>

**Navigation:** Seitenmenü → Kartenzahlung

Richten Sie EC-Karten- und Kreditkartenzahlungen für Ihre Gäste ein.

**Übersicht:**

| Element | Funktion |
|---------|----------|
| **Terminal-Dropdown** | Zeigt das aktuell verbundene Terminal an |
| **X-Symbol** | Terminal entfernen |
| **Bank Terminal hinzufügen** (blau) | Neues Terminal einrichten |

---

## Terminal hinzufügen {#terminal-hinzufuegen}

<div className="device-gallery">
  <figure className="device-figure">
    <img src="/screenshots/app/20_terminal_hinzufuegen.png" alt="Terminal hinzufügen (Handy)" width="220" />
    <figcaption>Handy</figcaption>
  </figure>
  <figure className="device-figure">
    <img src="/screenshots/app/tablet/20_terminal_hinzufuegen.png" alt="Terminal hinzufügen (Tablet)" width="500" />
    <figcaption>Tablet</figcaption>
  </figure>
</div>

**Navigation:** Kartenzahlung → Bank Terminal hinzufügen

**So richten Sie ein neues Terminal ein:**

1. **Anbieter** aus Dropdown auswählen
2. **Model** auswählen
3. **Haken (✓)** zum Speichern tippen

**Unterstützte Anbieter:**

| Anbieter | Beschreibung |
|----------|--------------|
| **Hobex** | Österreichischer Zahlungsdienstleister |
| **Mollie** | Europäischer Payment-Anbieter |
| **GlobalPayments** | GP tom – Kartenzahlung per App oder Terminal von Global Payments |
| **ZVT** | Standard-Protokoll für deutsche Terminals |
| **TECS** | Terminal-System verschiedener Hersteller |

### Hobex TECS einrichten

Wenn Sie ein Hobex-Terminal mit TECS verwenden, tragen Sie die Verbindungsdaten wie folgt ein:

| Feld | Wert |
|------|------|
| **Port** | `9990` verwenden. Falls die Verbindung damit nicht funktioniert, `9991` verwenden. |
| **IP-Adresse** | Falls das Feld vorhanden ist: `tca.hobex.at` |
| **TID** | Teilnehmer-ID vom Terminal |
| **Passwort** | Teilnehmer-ID vom Terminal |

### GP tom (Global Payments) einrichten {#gp-tom}

[GP tom](https://www.gptom.com) ist die Kartenzahlungs-Lösung von Global Payments. Damit wird Ihr Android-Gerät selbst zum Kartenterminal (SoftPOS) – Ihre Gäste halten die Karte oder das Handy einfach an Ihr Gerät. Alternativ kann auch ein klassisches GP-Terminal angebunden werden.

**Voraussetzungen:**

- Aktiver Vertrag bei Global Payments (GP tom Konto)
- Ihre **Terminal-ID (TID)** – erhalten Sie von Global Payments
- Je nach Verbindungsart: die **GP tom App** aus dem [Play Store](https://play.google.com/store/apps/details?id=com.globalpayments.atom) auf demselben Gerät

**So richten Sie GP tom ein:**

1. **Kartenzahlung** → **Bank Terminal hinzufügen** öffnen
2. Als **Anbieter** `GlobalPayments` auswählen
3. Das passende **Model** auswählen – das Model bestimmt die Verbindungsart (siehe unten)
4. Verbindungsdaten eintragen
5. **Haken (✓)** zum Speichern tippen

Nach dem Speichern wird das Terminal automatisch als aktuelles Terminal übernommen.

#### Verbindungsart 1: App-zu-App (empfohlen) {#gp-tom-app}

Orderlyze und die GP tom App laufen auf **demselben Android-Gerät**. Bei einer Kartenzahlung wechselt Orderlyze automatisch zur GP tom App, die Karte wird ans Gerät gehalten, danach geht es zurück zu Orderlyze.

| Feld | Wert |
|------|------|
| **Eigener Name** | Frei wählbarer Name, z. B. `GP tom Handy` |

Weitere Daten sind nicht nötig – die Verbindung läuft direkt über die installierte GP tom App.

:::warning Wichtig
Die **GP tom App** muss auf demselben Gerät installiert, aktiviert und mit Ihrem GP tom Konto angemeldet sein. Diese Verbindungsart funktioniert nur auf **Android**-Geräten.
:::

#### Verbindungsart 2: Cloud {#gp-tom-cloud}

Orderlyze steuert das GP tom Terminal über die Cloud von Global Payments. Das funktioniert von jedem Gerät aus – Orderlyze und das Terminal müssen nicht auf demselben Gerät laufen.

| Feld | Wert |
|------|------|
| **Eigener Name** | Frei wählbarer Name, z. B. `GP tom Terminal Bar` |
| **Terminal Id** | Ihre TID von Global Payments, z. B. `12345678` |
| **API-Key** | API-Schlüssel von Global Payments, z. B. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| **Benutzername** | E-Mail-Adresse Ihres GP tom Kontos |
| **Passwort** | Passwort Ihres GP tom Kontos |

:::tip Tipp
TID und API-Schlüssel erhalten Sie von Global Payments (im Händlerportal oder über den GP-Support). Pro Gerät gilt eine eigene TID.
:::

#### Verbindungsart 3: ZVT {#gp-tom-zvt}

Ein klassisches GP-Terminal wird über das lokale Netzwerk (ZVT-Protokoll) angesprochen. Orderlyze und das Terminal müssen sich im **selben Netzwerk** befinden.

| Feld | Wert |
|------|------|
| **Eigener Name** | Frei wählbarer Name |
| **IP-Adresse** | IP-Adresse des Terminals im lokalen Netzwerk, z. B. `192.168.1.50` |
| **Port** | `20008` (Standard, ist vorausgefüllt) |

#### Bezahlen mit GP tom

Sobald das Terminal als aktuelles Terminal gesetzt ist, wählen Sie beim Kassieren einfach die Zahlungsart **Karte**. Orderlyze zeigt „Verbindung wird hergestellt" und startet die Zahlung – je nach Verbindungsart auf der GP tom App oder dem Terminal. Der Zahlungsbeleg wird von GP tom erstellt.

:::info Storno und Rückerstattung
Ein **Storno** ist direkt aus der [Rechnungsübersicht](/app/rechnungsuebersicht) möglich. Eine **Rückerstattung** unterstützt bei GP tom nur die Verbindungsart ZVT – bei App-zu-App und Cloud führen Sie Rückerstattungen direkt in der GP tom App bzw. im GP-Händlerportal durch.
:::

**Häufige Fehlermeldungen:**

| Meldung | Lösung |
|---------|--------|
| „Terminal-App nicht installiert" | GP tom App aus dem Play Store installieren und mit Ihrem GP tom Konto anmelden |
| „Keine Verbindung zum hinterlegten Terminal möglich" | Netzwerkverbindung des Terminals prüfen; bei ZVT IP-Adresse und Port kontrollieren |
| „Terminal ist beschäftigt" | Laufende Transaktion auf dem Terminal abschließen und erneut versuchen |

:::tip Tipp
Falls Sie nicht wissen, welchen Anbieter Sie haben, schauen Sie auf der Vorder- oder Rückseite Ihres Terminals nach.
:::
