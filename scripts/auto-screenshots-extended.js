/**
 * Erweitertes Screenshot-Script für Orderlyze Docs
 * Macht Screenshots von allen wichtigen Screens inkl. Dialoge
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://web.orderlyze.com';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'static', 'screenshots');
const VIEWPORT = { width: 1280, height: 800 };

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function screenshot(page, name, desc) {
  const filePath = path.join(SCREENSHOT_DIR, `${name}.png`);
  await ensureDir(filePath);
  await page.screenshot({ path: filePath, animations: 'disabled' });
  console.log(`  ✅ ${desc}`);
  return true;
}

async function waitForLoad(page) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch {}
  await sleep(400);
}

async function clickAndScreenshot(page, selector, screenshotName, desc) {
  try {
    const el = await page.$(selector);
    if (el) {
      await el.click();
      await sleep(600);
      await screenshot(page, screenshotName, desc);
      await page.keyboard.press('Escape');
      await sleep(300);
      return true;
    }
  } catch (e) {
    console.log(`  ⚠️ ${desc}: ${e.message}`);
  }
  return false;
}

async function main() {
  console.log('🚀 Orderlyze Extended Screenshot Tool\n');

  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext({ viewport: VIEWPORT, locale: 'de-DE' });
  const page = await context.newPage();

  // Login
  console.log('📱 Öffne Login...');
  await page.goto(`${BASE_URL}/login`);
  await waitForLoad(page);
  await screenshot(page, 'auth/login', 'Login Seite');

  // Automatischer Login
  console.log('\n🔐 Automatischer Login...');
  await page.fill('input[type="email"], input[name="email"], input[formcontrolname="email"]', 'buero@orderlyze.com');
  await page.fill('input[type="password"], input[name="password"], input[formcontrolname="password"]', 'Orderlyze');
  await screenshot(page, 'auth/login-filled', 'Login ausgefüllt');

  await page.click('button[type="submit"], button:has-text("Anmelden"), button:has-text("Login")');

  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 30000 });
  console.log('✅ Eingeloggt!\n');
  await sleep(1500);

  let success = 0;

  // =====================
  // HOME / DASHBOARD
  // =====================
  console.log('📍 Dashboard');
  await page.goto(`${BASE_URL}/home`);
  await waitForLoad(page);
  await screenshot(page, 'home/dashboard', 'Dashboard');
  success++;

  // Sidebar Screenshot
  const sidebar = await page.$('.sidebar, [class*="sidebar"], nav[class*="side"]');
  if (sidebar) {
    const box = await sidebar.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, 'navigation/sidebar.png'),
        clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 700) }
      });
      console.log('  ✅ Sidebar Navigation');
      success++;
    }
  }

  // =====================
  // KATEGORIEN
  // =====================
  console.log('\n📍 Kategorien');
  await page.goto(`${BASE_URL}/administration/category`);
  await waitForLoad(page);
  await screenshot(page, 'admin/kategorie-liste', 'Kategorien Liste');
  success++;

  // Kategorie erstellen Dialog
  if (await clickAndScreenshot(page,
    'button:has-text("Hinzufügen"), button:has-text("Neu"), button:has-text("+"), [mattooltip*="Hinzufügen"]',
    'admin/kategorie-dialog', 'Kategorie Dialog')) {
    success++;
  }

  // =====================
  // PRODUKTE
  // =====================
  console.log('\n📍 Produkte');
  await page.goto(`${BASE_URL}/administration/product`);
  await waitForLoad(page);
  await screenshot(page, 'admin/produkt-liste', 'Produkte Liste');
  success++;

  if (await clickAndScreenshot(page,
    'button:has-text("Hinzufügen"), button:has-text("Neu"), button:has-text("+"), [mattooltip*="Hinzufügen"]',
    'admin/produkt-dialog', 'Produkt Dialog')) {
    success++;
  }

  // =====================
  // BENUTZER
  // =====================
  console.log('\n📍 Benutzer');
  await page.goto(`${BASE_URL}/administration/user`);
  await waitForLoad(page);
  await screenshot(page, 'admin/benutzer-liste', 'Benutzer Liste');
  success++;

  if (await clickAndScreenshot(page,
    'button:has-text("Hinzufügen"), button:has-text("Neu"), button:has-text("+"), [mattooltip*="Hinzufügen"]',
    'admin/benutzer-dialog', 'Benutzer Dialog')) {
    success++;
  }

  // =====================
  // EXTRAS (falls vorhanden)
  // =====================
  console.log('\n📍 Extras');
  try {
    await page.goto(`${BASE_URL}/administration/extra`, { timeout: 5000 });
    await waitForLoad(page);
    await screenshot(page, 'admin/extras-liste', 'Extras Liste');
    success++;
  } catch {
    console.log('  ⏭️ Extras nicht verfügbar');
  }

  // =====================
  // GUTSCHEINE (falls vorhanden)
  // =====================
  console.log('\n📍 Gutscheine');
  try {
    await page.goto(`${BASE_URL}/administration/voucher`, { timeout: 5000 });
    await waitForLoad(page);
    await screenshot(page, 'admin/gutscheine-liste', 'Gutscheine Liste');
    success++;
  } catch {
    console.log('  ⏭️ Gutscheine nicht verfügbar');
  }

  // =====================
  // RÄUME & TISCHE (falls vorhanden)
  // =====================
  console.log('\n📍 Räume & Tische');
  try {
    await page.goto(`${BASE_URL}/administration/room`, { timeout: 5000 });
    await waitForLoad(page);
    await screenshot(page, 'admin/raeume-liste', 'Räume Liste');
    success++;
  } catch {
    console.log('  ⏭️ Räume nicht verfügbar');
  }

  try {
    await page.goto(`${BASE_URL}/administration/table`, { timeout: 5000 });
    await waitForLoad(page);
    await screenshot(page, 'admin/tische-liste', 'Tische Liste');
    success++;
  } catch {
    console.log('  ⏭️ Tische nicht verfügbar');
  }

  // =====================
  // EINSTELLUNGEN
  // =====================
  console.log('\n📍 Einstellungen');
  await page.goto(`${BASE_URL}/administration/seller-settings/universally`);
  await waitForLoad(page);
  await screenshot(page, 'admin/einstellungen-allgemein', 'Allgemeine Einstellungen');
  success++;

  await page.goto(`${BASE_URL}/administration/seller-settings/user`);
  await waitForLoad(page);
  await screenshot(page, 'admin/einstellungen-benutzer', 'Benutzer Einstellungen');
  success++;

  // =====================
  // BERICHTE
  // =====================
  console.log('\n📍 Berichte');

  const reports = [
    { route: '/evaluation/dailyReport', name: 'berichte/tagesbericht', desc: 'Tagesbericht' },
    { route: '/evaluation/monthlyReport', name: 'berichte/monatsbericht', desc: 'Monatsbericht' },
    { route: '/evaluation/yearlyReport', name: 'berichte/jahresbericht', desc: 'Jahresbericht' },
    { route: '/evaluation/dailySalesReport', name: 'berichte/tagesumsatz', desc: 'Tagesumsatz' },
    { route: '/evaluation/productReport', name: 'berichte/produktbericht', desc: 'Produktbericht' },
    { route: '/evaluation/categoryReport', name: 'berichte/kategoriebericht', desc: 'Kategoriebericht' },
    { route: '/evaluation/paymenttypeReport', name: 'berichte/zahlungsarten', desc: 'Zahlungsarten' },
    { route: '/evaluation/stornoReport', name: 'berichte/stornobericht', desc: 'Stornobericht' },
    { route: '/evaluation/userReport', name: 'berichte/benutzerbericht', desc: 'Benutzerbericht' },
    { route: '/evaluation/report', name: 'berichte/rechnungen', desc: 'Rechnungen' },
  ];

  for (const r of reports) {
    try {
      await page.goto(`${BASE_URL}${r.route}`, { timeout: 5000 });
      await waitForLoad(page);
      await screenshot(page, r.name, r.desc);
      success++;
    } catch {
      console.log(`  ⏭️ ${r.desc} nicht verfügbar`);
    }
  }

  // =====================
  // EXPORTE
  // =====================
  console.log('\n📍 Exporte');
  await page.goto(`${BASE_URL}/evaluation/bmdExport`);
  await waitForLoad(page);
  await screenshot(page, 'export/bmd', 'BMD Export');
  success++;

  await page.goto(`${BASE_URL}/evaluation/rzlExport`);
  await waitForLoad(page);
  await screenshot(page, 'export/rzl', 'RZL Export');
  success++;

  // =====================
  // PROFIL
  // =====================
  console.log('\n📍 Profil');
  await page.goto(`${BASE_URL}/profile/user`);
  await waitForLoad(page);
  await screenshot(page, 'profil/benutzer', 'Benutzer Profil');
  success++;

  await page.goto(`${BASE_URL}/profile/company`);
  await waitForLoad(page);
  await screenshot(page, 'profil/unternehmen', 'Unternehmen Profil');
  success++;

  // =====================
  // KÜCHE (falls vorhanden)
  // =====================
  console.log('\n📍 Küche');
  try {
    await page.goto(`${BASE_URL}/kitchen`, { timeout: 5000 });
    await waitForLoad(page);
    await screenshot(page, 'kueche/monitor', 'Küchen Monitor');
    success++;
  } catch {
    console.log('  ⏭️ Küche nicht verfügbar');
  }

  // =====================
  // FERTIG
  // =====================
  console.log('\n' + '='.repeat(50));
  console.log(`✅ ${success} Screenshots erstellt`);
  console.log('='.repeat(50));
  console.log(`\n📁 ${SCREENSHOT_DIR}\n`);

  await browser.close();
}

main().catch(console.error);
