/**
 * Automatisches Screenshot-Script für Orderlyze Web Dashboard
 * Basierend auf der App-Struktur aus Orderlyze_Analyser
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://web.orderlyze.com';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'static', 'screenshots');
const VIEWPORT = { width: 1280, height: 800 };

// Alle Screens die dokumentiert werden sollen
const SCREENS = [
  // === HOME ===
  { route: '/home', name: 'home/dashboard', desc: 'Dashboard Übersicht' },

  // === ADMINISTRATION - Kategorien ===
  { route: '/administration/category', name: 'admin/kategorie-liste', desc: 'Kategorien Übersicht' },

  // === ADMINISTRATION - Produkte ===
  { route: '/administration/product', name: 'admin/produkt-liste', desc: 'Produkte Übersicht' },

  // === ADMINISTRATION - Benutzer ===
  { route: '/administration/user', name: 'admin/benutzer-liste', desc: 'Benutzer Übersicht' },

  // === ADMINISTRATION - Einstellungen ===
  { route: '/administration/seller-settings/universally', name: 'admin/einstellungen-allgemein', desc: 'Allgemeine Einstellungen' },
  { route: '/administration/seller-settings/user', name: 'admin/einstellungen-benutzer', desc: 'Benutzer Einstellungen' },

  // === BERICHTE ===
  { route: '/evaluation/dailyReport', name: 'berichte/tagesbericht', desc: 'Tagesbericht' },
  { route: '/evaluation/monthlyReport', name: 'berichte/monatsbericht', desc: 'Monatsbericht' },
  { route: '/evaluation/yearlyReport', name: 'berichte/jahresbericht', desc: 'Jahresbericht' },
  { route: '/evaluation/productReport', name: 'berichte/produktbericht', desc: 'Produktbericht' },
  { route: '/evaluation/categoryReport', name: 'berichte/kategoriebericht', desc: 'Kategoriebericht' },

  // === EXPORTE ===
  { route: '/evaluation/bmdExport', name: 'export/bmd', desc: 'BMD Export' },
  { route: '/evaluation/rzlExport', name: 'export/rzl', desc: 'RZL Export' },

  // === PROFIL ===
  { route: '/profile/user', name: 'profil/benutzer', desc: 'Benutzer Profil' },
  { route: '/profile/company', name: 'profil/unternehmen', desc: 'Unternehmens Profil' },
];

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshot(page, screen) {
  const filePath = path.join(SCREENSHOT_DIR, `${screen.name}.png`);
  await ensureDir(filePath);

  await page.screenshot({
    path: filePath,
    fullPage: false,
    animations: 'disabled'
  });

  console.log(`  ✅ ${screen.desc}`);
  return filePath;
}

async function waitForPageLoad(page) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    // Timeout ist ok, manche Seiten laden lange
  }
  await sleep(500); // Extra Zeit für Animationen
}

async function main() {
  console.log('🚀 Orderlyze Auto-Screenshot Tool\n');

  // Browser starten (sichtbar für Login)
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    locale: 'de-DE'
  });

  const page = await context.newPage();

  // Login-Seite öffnen
  console.log('📱 Öffne Login-Seite...');
  await page.goto(`${BASE_URL}/login`);

  // Login Screenshot
  await sleep(1000);
  await ensureDir(path.join(SCREENSHOT_DIR, 'auth/login.png'));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'auth/login.png') });
  console.log('  ✅ Login Seite\n');

  // Warten bis User eingeloggt ist (prüfe ob /home erreichbar)
  console.log('⏳ Warte auf Login...');
  console.log('   Bitte logge dich im Browser ein.\n');

  // Warten bis wir nicht mehr auf /login sind
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 300000 });
  console.log('✅ Login erfolgreich!\n');

  await sleep(2000);

  // Durch alle Screens navigieren
  console.log(`📸 Starte Screenshot-Session (${SCREENS.length} Screens)...\n`);

  let success = 0;
  let failed = 0;

  for (const screen of SCREENS) {
    try {
      console.log(`📍 ${screen.route}`);
      await page.goto(`${BASE_URL}${screen.route}`, { waitUntil: 'domcontentloaded' });
      await waitForPageLoad(page);
      await takeScreenshot(page, screen);
      success++;
    } catch (error) {
      console.log(`  ❌ Fehler: ${error.message}`);
      failed++;
    }

    await sleep(300);
  }

  // Zusätzlich: Modals/Dialoge screenshotten
  console.log('\n📸 Zusätzliche Screenshots (Dialoge)...\n');

  // Kategorie erstellen Dialog
  try {
    await page.goto(`${BASE_URL}/administration/category`);
    await waitForPageLoad(page);

    // Suche nach "Hinzufügen" oder "+" Button
    const addButton = await page.$('button:has-text("Hinzufügen"), button:has-text("+"), [data-action="add"]');
    if (addButton) {
      await addButton.click();
      await sleep(800);
      await ensureDir(path.join(SCREENSHOT_DIR, 'admin/kategorie-erstellen-dialog.png'));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'admin/kategorie-erstellen-dialog.png') });
      console.log('  ✅ Kategorie erstellen Dialog');
      success++;

      // Dialog schließen
      await page.keyboard.press('Escape');
      await sleep(300);
    }
  } catch (error) {
    console.log(`  ⚠️  Kategorie-Dialog: ${error.message}`);
  }

  // Produkt erstellen Dialog
  try {
    await page.goto(`${BASE_URL}/administration/product`);
    await waitForPageLoad(page);

    const addButton = await page.$('button:has-text("Hinzufügen"), button:has-text("+"), [data-action="add"]');
    if (addButton) {
      await addButton.click();
      await sleep(800);
      await ensureDir(path.join(SCREENSHOT_DIR, 'admin/produkt-erstellen-dialog.png'));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'admin/produkt-erstellen-dialog.png') });
      console.log('  ✅ Produkt erstellen Dialog');
      success++;

      await page.keyboard.press('Escape');
    }
  } catch (error) {
    console.log(`  ⚠️  Produkt-Dialog: ${error.message}`);
  }

  // Sidebar Screenshot (wenn sichtbar)
  try {
    await page.goto(`${BASE_URL}/home`);
    await waitForPageLoad(page);

    // Viewport auf sidebar fokussieren
    const sidebar = await page.$('.sidebar, nav, [class*="sidebar"], [class*="nav-menu"]');
    if (sidebar) {
      await sidebar.screenshot({ path: path.join(SCREENSHOT_DIR, 'navigation/sidebar.png') });
      console.log('  ✅ Sidebar Navigation');
      success++;
    }
  } catch (error) {
    console.log(`  ⚠️  Sidebar: ${error.message}`);
  }

  // Zusammenfassung
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Fertig! ${success} Screenshots erstellt, ${failed} fehlgeschlagen`);
  console.log('='.repeat(50));
  console.log(`\n📁 Screenshots gespeichert in:\n   ${SCREENSHOT_DIR}\n`);

  // Browser schließen
  await browser.close();
}

main().catch(console.error);
