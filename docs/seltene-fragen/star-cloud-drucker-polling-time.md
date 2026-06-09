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

1. Öffnen Sie auf einem Gerät im selben Netzwerk einen Browser, z.B. Chrome oder Safari.
2. Finden Sie die IP-Adresse heraus. Eine genaue Anleitung finden Sie unter [IP-Adresse eines Star mC-Print Druckers herausfinden](/seltene-fragen/star-mcprint-ip-adresse-herausfinden).
3. Geben Sie die IP-Adresse des Druckers in die Adresszeile ein.
4. Loggen Sie sich ein:
   - **Benutzername:** `root`
   - **Passwort:** `Orderlyze`

   ![Login im Star Web Configuration-Menü](/screenshots/seltene-fragen/star-cloud-polling/login.png)

5. Öffnen Sie im Web Configuration-Menü den Bereich **CloudPRNT**.
6. Prüfen Sie, ob **CloudPRNT Service** auf **ENABLE** steht.
7. Ändern Sie den Wert im Feld **Polling time** auf `1`.
8. Klicken oder tippen Sie auf **Submit**.

   ![CloudPRNT-Einstellungen mit Polling time und Submit](/screenshots/seltene-fragen/star-cloud-polling/cloudprnt-einstellungen.png)

Nach **Submit** zeigt der Drucker eine Kontrollseite mit den eingegebenen Werten an. Die Änderung ist damit noch nicht dauerhaft gespeichert.

![CloudPRNT-Kontrollseite nach Submit](/screenshots/seltene-fragen/star-cloud-polling/cloudprnt-kontrollseite.png)

## Einstellung dauerhaft speichern

1. Öffnen Sie im Menü den Bereich **Save**.
2. Wählen Sie **Save Restart device**.
3. Klicken oder tippen Sie auf **Execute**.

![Save Restart device ausführen](/screenshots/seltene-fragen/star-cloud-polling/save-restart.png)

Der Drucker speichert die neue Polling Time und startet neu. Danach arbeitet der Cloud-Drucker mit dem neuen Intervall.

Quellen:

- [Star mC-Print3 Online Manual: Use Star CloudPRNT](https://www.star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsCloudPRNT.htm)
- [Star mC-Print3 Online Manual: Connect Tablet/PC (LAN)](https://star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsLAN.htm)
