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

Mit [GP tom](https://www.gptom.com) wird Ihr Android-Handy selbst zum Kartenterminal – Sie brauchen kein eigenes Terminal-Gerät. Orderlyze und die GP tom App laufen dabei auf **demselben Gerät** (Android 9 oder höher, mit NFC).

#### Schritt 1: GP tom App einrichten {#gp-tom-app-einrichten}

1. **GP tom** und **GP tom PIN** aus dem [Play Store](https://play.google.com/store/apps/details?id=com.globalpayments.atom) installieren – die PIN-App öffnet sich automatisch, wenn eine PIN nötig ist
2. In der GP tom App mit Ihren **GP tom Zugangsdaten** anmelden – E-Mail und Passwort erhalten Sie nach Vertragsabschluss von Global Payments
3. **Terminal auswählen** – es heißt meistens wie Ihr Betrieb

#### Schritt 2: Terminal in Orderlyze anlegen {#gp-tom-app}

1. **Seitenmenü → Kartenzahlung** öffnen
2. Auf **Bank Terminal hinzufügen** tippen
3. **Anbieter:** `GlobalPayments` auswählen
4. **Model:** `InApp` auswählen
5. **Eigener Name:** z. B. `Terminal` eingeben – mehr ist nicht nötig
6. Mit dem **Haken (✓)** rechts oben speichern

Das Terminal wird automatisch als aktuelles Terminal übernommen – Sie sehen es danach im Dropdown auf der Kartenzahlung-Seite.

#### Schritt 3: Erste Zahlung testen

1. Ein Produkt aufnehmen und auf **Gesamt bezahlen** tippen
2. Als Zahlungsart **Kartenzahlung** auswählen
3. Orderlyze zeigt „Verbindung wird hergestellt" und wechselt automatisch zur **GP tom App**
4. Karte oder Handy des Gastes ans Gerät halten – danach geht es automatisch zurück zu Orderlyze

Öffnet sich die GP tom App, ist alles richtig eingerichtet.

#### Wenn es nicht funktioniert

| Problem | Lösung |
|---------|--------|
| Nach dem Bezahlen passiert nichts | Prüfen, ob als Zahlungsart wirklich **Kartenzahlung** gewählt ist und das Terminal im Dropdown unter **Kartenzahlung** gesetzt ist – danach Orderlyze einmal **komplett schließen und neu starten** |
| „Terminal-App nicht installiert" | GP tom App ist nicht installiert oder abgemeldet – installieren bzw. neu anmelden, dann **Erneut versuchen** |
| „Terminal ist beschäftigt" | Laufende Zahlung in der GP tom App abschließen und erneut versuchen |
| „Keine Verbindung zum hinterlegten Terminal möglich" | Internetverbindung des Geräts prüfen |

:::info Storno und Rückerstattung
Ein **Storno** ist direkt aus der [Rechnungsübersicht](/app/rechnungsuebersicht) möglich. Rückerstattungen führen Sie direkt in der GP tom App bzw. im GP-Händlerportal durch.
:::

#### GP tom mit echtem Terminal

Haben Sie ein klassisches GP-Terminal statt der Handy-App, wählen Sie beim **Model** die passende Variante:

##### Cloud {#gp-tom-cloud}

Orderlyze steuert das Terminal über die Cloud von Global Payments, funktioniert von jedem Gerät aus (auch iOS):

| Feld | Wert |
|------|------|
| **Eigener Name** | Frei wählbar, z. B. `Terminal Bar` |
| **Terminal Id** | Ihre TID von Global Payments, z. B. `12345678` |
| **API-Key** | API-Schlüssel von Global Payments, z. B. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| **Benutzername / Passwort** | Ihre GP tom Zugangsdaten |

##### ZVT {#gp-tom-zvt}

Das Terminal wird über das lokale Netzwerk angesprochen (gleiches WLAN/Netzwerk nötig):

| Feld | Wert |
|------|------|
| **Eigener Name** | Frei wählbar |
| **IP-Adresse** | IP-Adresse des Terminals, z. B. `192.168.1.50` |
| **Port** | `20008` (vorausgefüllt) |

:::tip Tipp
Falls Sie nicht wissen, welchen Anbieter Sie haben, schauen Sie auf der Vorder- oder Rückseite Ihres Terminals nach.
:::
