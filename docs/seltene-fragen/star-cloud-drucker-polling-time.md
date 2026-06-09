---
id: star-cloud-drucker-polling-time
title: Wie ändere ich die Polling Time beim Star Cloud Drucker?
description: Polling Time im Star CloudPRNT Web Configuration-Menü ändern und speichern
type: faq
platform: both
sidebar_position: 1
searchTerms:
  - star
  - cloud drucker
  - cloudprnt
  - polling time
  - polling
  - drucker
  - mc-print3
  - mC-Print3
---

# Wie ändere ich die Polling Time beim Star Cloud Drucker?

Die **Polling Time** bestimmt, wie oft der Star Cloud Drucker beim CloudPRNT-Server nach neuen Druckaufträgen fragt. Die Einstellung wird direkt im Web Configuration-Menü des Druckers geändert.

## Voraussetzungen

- Der Star Drucker ist eingeschaltet.
- Der Drucker ist mit demselben Netzwerk verbunden wie das Gerät, auf dem Sie die Einstellung ändern.
- Sie kennen die IP-Adresse des Druckers.

:::tip
Die IP-Adresse finden Sie über einen Selbsttest-Ausdruck des Druckers, über die Geräteliste Ihres Routers oder über die Star Quick Setup Utility. Eine genaue Anleitung finden Sie unter [IP-Adresse eines Star mC-Print Druckers herausfinden](/seltene-fragen/star-mcprint-ip-adresse-herausfinden).
:::

## Polling Time ändern

1. Öffnen Sie auf einem Gerät im selben Netzwerk einen Browser, z.B. Chrome oder Safari.
2. Geben Sie die IP-Adresse des Druckers in die Adresszeile ein.
3. Öffnen Sie im Web Configuration-Menü den Bereich **CloudPRNT**.
4. Prüfen Sie, ob **CloudPRNT Service** auf **ENABLE** steht.
5. Ändern Sie den Wert im Feld **Polling time**.
6. Klicken oder tippen Sie auf **Submit**.

Nach **Submit** zeigt der Drucker eine Kontrollseite mit den eingegebenen Werten an. Die Änderung ist damit noch nicht dauerhaft gespeichert.

## Einstellung dauerhaft speichern

1. Öffnen Sie im Menü den Bereich **Save**.
2. Wählen Sie **Save Restart device**.
3. Klicken oder tippen Sie auf **Execute**.

Der Drucker speichert die neue Polling Time und startet neu. Danach arbeitet der Cloud-Drucker mit dem neuen Intervall.

## Wichtig

- Speichern Sie jeden geänderten Bereich einzeln mit **Submit**.
- Danach muss die Änderung über **Save → Save Restart device → Execute** auf dem Drucker gespeichert werden.
- Falls der CloudPRNT-Server HTTPS verwendet, können zusätzliche Sicherheitseinstellungen im Bereich **CloudPRNT** relevant sein. Ändern Sie diese nur, wenn Sie die Vorgaben Ihres CloudPRNT-Servers kennen.

Quelle: [Star mC-Print3 Online Manual: Use Star CloudPRNT](https://www.star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsCloudPRNT.htm)
