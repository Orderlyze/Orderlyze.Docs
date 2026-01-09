/**
 * Playwright Screenshot Script für Orderlyze Docs
 *
 * Dieses Script öffnet einen Browser, du loggst dich ein,
 * und dann werden automatisch Screenshots gemacht.
 *
 * Usage: node scripts/take-screenshots.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const BASE_URL = 'https://web.orderlyze.com';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'static', 'screenshots');

// Desktop viewport
const VIEWPORT = { width: 1280, height: 800 };

// Screenshot-Konfiguration: Welche Screens sollen fotografiert werden
const SCREENSHOTS = [
  // Tutorials - Kategorie erstellen
  {
    id: 'kategorie-nav-settings',
    path: 'tutorials/kategorie/nav-settings.png',
    description: 'Navigation zu Einstellungen',
    instructions: 'Navigiere zu den Einstellungen und drücke Enter wenn bereit'
  },
  {
    id: 'kategorie-nav-categories',
    path: 'tutorials/kategorie/nav-categories.png',
    description: 'Kategorien Menüpunkt',
    instructions: 'Öffne den Kategorien-Bereich und drücke Enter wenn bereit'
  },
  {
    id: 'kategorie-add-button',
    path: 'tutorials/kategorie/add-button.png',
    description: 'Button zum Hinzufügen einer neuen Kategorie',
    instructions: 'Zeige den "Neue Kategorie" Button und drücke Enter wenn bereit'
  },
  {
    id: 'kategorie-form',
    path: 'tutorials/kategorie/form.png',
    description: 'Formular zur Kategorieerstellung',
    instructions: 'Öffne das Kategorie-Formular und drücke Enter wenn bereit'
  },
  {
    id: 'kategorie-save',
    path: 'tutorials/kategorie/save.png',
    description: 'Speichern Button',
    instructions: 'Zeige den Speichern-Dialog und drücke Enter wenn bereit'
  },

  // Troubleshooting - Drucker
  {
    id: 'drucker-settings',
    path: 'troubleshooting/drucker/settings.png',
    description: 'Drucker Einstellungen',
    instructions: 'Navigiere zu Drucker-Einstellungen und drücke Enter wenn bereit'
  },
  {
    id: 'drucker-test',
    path: 'troubleshooting/drucker/test-print.png',
    description: 'Testdruck Button',
    instructions: 'Zeige den Testdruck-Button und drücke Enter wenn bereit'
  },

  // FAQ - Export
  {
    id: 'export-menu',
    path: 'faq/export/menu.png',
    description: 'Export Menü im Dashboard',
    instructions: 'Öffne das Export-Menü und drücke Enter wenn bereit'
  }
];

async function waitForEnter(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`\n📸 ${prompt}\n   Drücke ENTER um Screenshot zu machen (oder 'skip' zum Überspringen): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() !== 'skip');
    });
  });
}

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function takeScreenshot(page, config) {
  const fullPath = path.join(SCREENSHOT_DIR, config.path);
  await ensureDir(fullPath);

  await page.screenshot({
    path: fullPath,
    fullPage: false,
    animations: 'disabled'
  });

  console.log(`   ✅ Screenshot gespeichert: ${config.path}`);
}

async function main() {
  console.log('🚀 Orderlyze Screenshot Tool\n');
  console.log('Dieses Script öffnet einen Browser.');
  console.log('1. Logge dich in Orderlyze ein');
  console.log('2. Navigiere zum gewünschten Screen');
  console.log('3. Drücke ENTER um den Screenshot zu machen\n');

  // Browser mit sichtbarem Fenster starten
  const browser = await chromium.launch({
    headless: false,  // Browser sichtbar
    slowMo: 100       // Etwas langsamer für bessere Sichtbarkeit
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    locale: 'de-DE'
  });

  const page = await context.newPage();

  // Zur Login-Seite navigieren
  console.log('📱 Öffne Orderlyze Login...\n');
  await page.goto(`${BASE_URL}/login`);

  // Warten bis User eingeloggt ist
  const shouldContinue = await waitForEnter(
    'Logge dich jetzt ein und navigiere zur Startseite.\n   Wenn du eingeloggt bist, drücke ENTER um fortzufahren.'
  );

  if (!shouldContinue) {
    console.log('\n👋 Abgebrochen.');
    await browser.close();
    return;
  }

  console.log('\n📸 Starte Screenshot-Session...\n');
  console.log(`   ${SCREENSHOTS.length} Screenshots geplant\n`);

  let completed = 0;
  let skipped = 0;

  for (const config of SCREENSHOTS) {
    console.log(`\n[${completed + skipped + 1}/${SCREENSHOTS.length}] ${config.description}`);

    const shouldTake = await waitForEnter(config.instructions);

    if (shouldTake) {
      await takeScreenshot(page, config);
      completed++;
    } else {
      console.log(`   ⏭️  Übersprungen: ${config.id}`);
      skipped++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Fertig! ${completed} Screenshots erstellt, ${skipped} übersprungen`);
  console.log('='.repeat(50));

  // Noch offen lassen für weitere manuelle Screenshots
  const keepOpen = await waitForEnter(
    'Möchtest du den Browser offen lassen für weitere Screenshots?\n   ENTER = Schließen, "skip" = Offen lassen'
  );

  if (keepOpen) {
    await browser.close();
  } else {
    console.log('\n💡 Browser bleibt offen. Schließe ihn manuell wenn du fertig bist.');
  }
}

main().catch(console.error);
