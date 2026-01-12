---
id: app-verwaltung
title: Verwaltung
description: Benutzer, Tischplan und Terminals verwalten in der Orderlyze Mobile App
type: reference
platform: app
sidebar_position: 6
searchTerms:
  - verwaltung
  - benutzer
  - tischplan
  - terminal
  - kartenzahlung
  - passwort
---

# Verwaltung

In diesem Bereich verwalten Sie Benutzer, den Tischplan und Zahlungsterminals.

---

## Benutzeransicht {#benutzeransicht}

![Benutzeransicht](/screenshots/app/07_user_view.png)

**Navigation:** Seitenmenü -> Benutzeransicht

Zeigt Ihre Benutzerdaten:

- Avatar
- Firmenname
- Benutzername
- E-Mail-Adresse

### Aktionen

| Button | Funktion |
|--------|----------|
| **Passwort ändern** (grün) | Passwort aktualisieren |
| **Benutzer wechseln** (blau) | Zu anderem Benutzer wechseln |
| **Abmelden** (rot) | Session beenden |

---

### Passwort ändern

![Passwort ändern](/screenshots/app/16_passwort_aendern.png)

1. **Aktuelles Passwort** eingeben
2. **Neues Passwort** eingeben
3. **Neues Passwort bestätigen**
4. **Passwort ändern** tippen

:::tip
Nutzen Sie den Sichtbarkeits-Toggle (Auge-Icon) um Ihre Eingaben zu überprüfen.
:::

---

### Benutzer wechseln

![Benutzer wechseln](/screenshots/app/15_benutzer_wechseln.png)

1. Benutzer aus Dropdown auswählen
2. Passwort des gewählten Benutzers eingeben
3. **Benutzer wechseln** tippen

---

## Web-Portal (Verwaltung) {#web-portal}

![Verwaltung Web-Portal](/screenshots/app/08_verwaltung.png)

**Navigation:** Seitenmenü -> Verwaltung

Öffnet das Orderlyze Web-Portal für administrative Funktionen:

- Separater Login für den Admin-Bereich
- Registrierung neuer Nutzer
- Passwort-Wiederherstellung
- Browser-Navigation (Zurück, Vor, Teilen)

---

## Tischplan-Editor {#tischplan-editor}

![Tischplan Editor](/screenshots/app/09_tischplan_editor.png)

**Navigation:** Seitenmenü -> Tischplan gestalten

Gestalten Sie das Layout Ihrer Tische per Drag & Drop:

- **Rasteransicht:** Präzise Positionierung
- **Raumauswahl:** Zwischen Räumen wechseln
- **Tische verschieben:** Per Touch ziehen
- **Plus-Button:** Neuen Tisch hinzufügen
- **Haken:** Änderungen speichern

---

### Tisch hinzufügen

![Tisch hinzufügen](/screenshots/app/28_tisch_hinzufuegen.png)

1. **Plus-Button** im Editor tippen
2. **Tischname** eingeben
3. **Breite** festlegen (50-500)
4. **Höhe** festlegen (50-500)
5. **Hinzufügen** tippen

---

### Tisch bearbeiten

![Tisch Editor](/screenshots/app/10_tisch_editor.png)

Tippen Sie auf einen Tisch im Editor um ihn zu bearbeiten:

| Einstellung | Beschreibung |
|-------------|--------------|
| Tischname | Name ändern |
| Breite | 50-500 Pixel |
| Höhe | 50-500 Pixel |
| Rotation | 0°, 45°, 90°, -45° |

- **Live-Vorschau:** Zeigt Änderungen sofort
- **Löschen** (rot): Tisch entfernen
- **Fertig** (blau): Änderungen übernehmen

---

## Kartenzahlung {#kartenzahlung}

![Kartenzahlung](/screenshots/app/11_kartenzahlung.png)

**Navigation:** Seitenmenü -> Kartenzahlung

Verwalten Sie Ihre Zahlungsterminals:

- **Aktuelles Terminal:** Zeigt verbundenes Terminal
- **Dropdown:** Terminal auswählen
- **X-Button:** Terminal entfernen
- **Stift-Icon:** Terminal bearbeiten

---

### Terminal hinzufügen

![Terminal hinzufügen](/screenshots/app/20_terminal_hinzufuegen.png)

1. **Bank Terminal hinzufügen** tippen
2. **Anbieter** auswählen (Mollie, ZVT, TECS, etc.)
3. **Model** auswählen
4. **Haken** tippen um zu speichern

:::info Unterstützte Anbieter
- Mollie (AppSwitch)
- ZVT
- TECS
- Weitere auf Anfrage
:::
