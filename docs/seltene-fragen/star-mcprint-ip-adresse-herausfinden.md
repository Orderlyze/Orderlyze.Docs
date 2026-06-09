---
id: star-mcprint-ip-adresse-herausfinden
title: Wie finde ich die IP-Adresse eines Star mC-Print Druckers heraus?
description: IP-Adresse eines Star mC-Print Druckers per Selbsttest-Ausdruck, Router oder Star Quick Setup Utility finden
type: faq
platform: both
sidebar_position: 2
searchTerms:
  - star
  - mc-print
  - mC-Print
  - mc-print3
  - mC-Print3
  - cloudprnt
  - ip adresse
  - ip-adresse
  - drucker ip
  - selbsttest
  - self-printing
---

# Wie finde ich die IP-Adresse eines Star mC-Print Druckers heraus?

Die IP-Adresse brauchen Sie, wenn Sie das Web Configuration-Menü des Star Druckers öffnen oder CloudPRNT-Einstellungen ändern möchten. Beim Star mC-Print ist der zuverlässigste Weg der Selbsttest-Ausdruck des Druckers.

## Methode 1: IP-Adresse per Selbsttest-Ausdruck finden

1. Stellen Sie sicher, dass Papier eingelegt ist.
2. Schalten Sie den Drucker aus.
3. Halten Sie die **FEED**-Taste gedrückt.
4. Drücken Sie zusätzlich die **Power**-Taste.
5. Lassen Sie die Tasten los, sobald der Selbsttest-Ausdruck startet.
6. Warten Sie, bis alle Testseiten gedruckt wurden.
7. Suchen Sie auf dem Ausdruck den Bereich **Current IP Parameters Status**.
8. Notieren Sie den Wert bei **IP Address**.

Bei mC-Print-Modellen mit Netzwerkanschluss wird die Netzwerkinformation nach den allgemeinen Druckerinformationen gedruckt. Wenn mehrere Seiten kommen, prüfen Sie deshalb auch die späteren Ausdrucke.

## Methode 2: IP-Adresse im Router nachsehen

Falls der Selbsttest-Ausdruck nicht verfügbar ist, öffnen Sie die Geräteliste Ihres Routers oder DHCP-Servers. Suchen Sie dort nach einem Gerät mit einem Namen wie **Star**, **mC-Print**, **MCP31** oder nach der MAC-Adresse vom Drucker-Ausdruck.

Diese Methode ist hilfreich, wenn der Drucker per DHCP automatisch eine Adresse vom Netzwerk bekommen hat.

## Methode 3: Star Quick Setup Utility verwenden

Star stellt für iOS und Android die **Star Quick Setup Utility** bereit. Darüber können Sie die Netzwerkeinstellungen des Druckers prüfen und ändern, wenn das Gerät passend mit dem Drucker verbunden ist. Die App ist besonders praktisch, wenn Sie den Drucker vom Smartphone oder Tablet aus einrichten.

## Web Configuration öffnen

Wenn Sie die IP-Adresse kennen:

1. Verbinden Sie Ihr Handy, Tablet oder Ihren Computer mit demselben Netzwerk wie der Drucker.
2. Öffnen Sie einen Browser, z.B. Chrome oder Safari.
3. Geben Sie die Adresse im Format `http://192.168.1.113` ein.

:::warning
Verwenden Sie `http://` und nicht `https://`. Laut Star kann die Web Configuration bei `https://[Drucker-IP]` falsch angezeigt werden.
:::

## Wenn keine IP-Adresse gedruckt wird

- Prüfen Sie, ob das Netzwerkkabel steckt oder der Drucker korrekt mit WLAN verbunden ist.
- Starten Sie Drucker und Router neu und wiederholen Sie den Selbsttest.
- Prüfen Sie die Router-Geräteliste.
- Wenn der Drucker durch falsche Netzwerkeinstellungen nicht mehr erreichbar ist, kann ein Zurücksetzen der Kommunikationseinstellungen nötig sein.

## Wichtig

- Die IP-Adresse kann sich ändern, wenn der Router dem Drucker per DHCP eine neue Adresse zuweist.
- Für dauerhaft stabile Verbindungen sollte der Drucker im Router eine feste DHCP-Zuweisung bekommen oder im Star Web Configuration-Menü eine statische IP erhalten.
- Eine statische IP sollte nur mit passenden Netzwerkeinstellungen gesetzt werden. Fragen Sie im Zweifel die zuständige Netzwerkbetreuung.

Quellen:

- [Star mC-Print3 Online Manual: Connect Tablet/PC](https://star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsLAN.htm)
- [Star mC-Print3 Online Manual: Self-Printing](https://www.star-m.jp/products/s_print/mcprint3/manual/en/basicOperations/testPrint.htm)
- [Star mC-Print3 Online Manual: Use App](https://star-m.jp/products/s_print/oml/mcprint3_gen2/manual/en/settings/usingApp.htm)
