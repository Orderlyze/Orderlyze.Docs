/**
 * MCP Index Generator
 *
 * Liest alle Markdown-Dateien, parst Frontmatter und generiert
 * einen strukturierten JSON-Index für den Orderlyze MCP Server.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { glob } = require('glob');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_DIR = path.join(__dirname, '..', 'build');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'mcp-index.json');

async function buildIndex() {
  console.log('Building MCP Index...');
  console.log(`Scanning: ${DOCS_DIR}`);

  // Alle Markdown-Dateien finden
  const files = await glob('**/*.md', { cwd: DOCS_DIR });
  console.log(`Found ${files.length} markdown files`);

  const index = {
    version: new Date().toISOString(),
    generatedAt: new Date().toISOString(),
    tutorials: [],
    troubleshooting: [],
    faq: [],
    reference: [],
    all: []
  };

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    try {
      const { data: frontmatter, content: markdown } = matter(content);

      // Skip files without proper frontmatter
      if (!frontmatter.id || !frontmatter.type) {
        console.warn(`Skipping ${file}: Missing id or type`);
        continue;
      }

      // Content für Semantic Search (ohne Markdown-Syntax)
      const plainContent = extractPlainText(markdown);

      // Screenshots aus Markdown extrahieren (mit Position für Inline-Anzeige)
      const extractedScreenshots = extractScreenshots(markdown, plainContent);

      const article = {
        id: frontmatter.id,
        title: frontmatter.title,
        description: frontmatter.description || '',
        type: frontmatter.type,
        platform: frontmatter.platform || 'both',
        path: file.replace(/\\/g, '/').replace(/\/index\.md$/, '/').replace(/\.md$/, ''),
        searchTerms: frontmatter.searchTerms || [],

        // Content für Semantic Search (ohne Markdown-Syntax)
        plainContent,

        // Navigation - strukturiert oder als String
        ...(frontmatter.navigation && { navigation: parseNavigation(frontmatter.navigation, frontmatter.platform) }),

        // Metadaten basierend auf Typ
        ...(frontmatter.tutorial && { tutorial: frontmatter.tutorial }),
        ...(frontmatter.troubleshooting && { troubleshooting: frontmatter.troubleshooting }),

        // Screenshots: Frontmatter hat Vorrang, sonst aus Markdown extrahieren
        screenshots: frontmatter.screenshots || extractedScreenshots,

        ...(frontmatter.relatedArticles && { relatedArticles: frontmatter.relatedArticles }),
      };

      // In entsprechende Kategorie einsortieren
      switch (frontmatter.type) {
        case 'tutorial':
          index.tutorials.push(article);
          break;
        case 'troubleshooting':
          index.troubleshooting.push(article);
          break;
        case 'faq':
          index.faq.push(article);
          break;
        case 'reference':
          index.reference.push(article);
          break;
      }

      // Auch in "all" für globale Suche
      index.all.push(article);

      console.log(`  ✓ ${frontmatter.type}: ${frontmatter.id}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Statistiken
  index.stats = {
    totalArticles: index.all.length,
    tutorials: index.tutorials.length,
    troubleshooting: index.troubleshooting.length,
    faq: index.faq.length,
    reference: index.reference.length
  };

  // Output-Verzeichnis erstellen falls nicht vorhanden
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Index schreiben
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`\nIndex written to: ${OUTPUT_FILE}`);
  console.log(`Stats: ${index.stats.totalArticles} articles (${index.stats.tutorials} tutorials, ${index.stats.troubleshooting} troubleshooting, ${index.stats.faq} FAQ)`);

  return index;
}

/**
 * Parst Navigation aus Frontmatter
 * Unterstützt sowohl einfache Strings als auch strukturierte Objekte
 *
 * Beispiele:
 *   navigation: "Verwaltung → Produkte"
 *   navigation:
 *     type: menu
 *     path: "Menü ☰ → Einstellungen"
 *     steps:
 *       - action: "Tippe auf"
 *         target: "Hamburger-Menü"
 *         location: "oben links"
 */
function parseNavigation(navigation, platform) {
  // Bereits strukturiertes Objekt
  if (typeof navigation === 'object' && navigation.path) {
    return {
      type: navigation.type || inferNavigationType(navigation.path, platform),
      path: navigation.path,
      steps: navigation.steps || []
    };
  }

  // Einfacher String
  if (typeof navigation === 'string') {
    return {
      type: inferNavigationType(navigation, platform),
      path: navigation,
      steps: []
    };
  }

  return null;
}

/**
 * Bestimmt den Navigationstyp basierend auf Pfad und Plattform
 */
function inferNavigationType(path, platform) {
  if (!path) return 'hierarchical';

  // App-spezifische Navigation
  if (platform === 'app' || platform === 'mobile') {
    if (path.includes('Menü') || path.includes('☰')) return 'menu';
    if (path.includes('Toolbar')) return 'toolbar';
    if (path.includes('→') && (path.includes('Tisch') || path.includes('Bestellung'))) return 'flow';
    return 'menu';
  }

  // Web-Dashboard: immer hierarchisch
  return 'hierarchical';
}

/**
 * Extrahiert Screenshots aus Markdown mit Position für Inline-Anzeige
 *
 * Gibt ein Array zurück mit:
 * - id: eindeutige ID basierend auf Dateiname
 * - path: relativer Pfad zum Screenshot
 * - url: vollständige URL
 * - alt: Alt-Text des Bildes
 * - context: umgebender Text für Relevanz-Matching
 * - position: Position im Plain-Text (für Inline-Anzeige)
 */
function extractScreenshots(markdown, plainContent) {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const screenshots = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const [fullMatch, alt, src] = match;

    // Nur Screenshots aus dem /screenshots/ Verzeichnis
    if (!src.includes('/screenshots/')) continue;

    // ID aus Dateiname generieren
    const fileName = src.split('/').pop().replace(/\.[^.]+$/, '');
    const id = fileName.replace(/[^a-zA-Z0-9_-]/g, '-');

    // Kontext extrahieren (100 Zeichen vor und nach dem Bild)
    const contextStart = Math.max(0, match.index - 100);
    const contextEnd = Math.min(markdown.length, match.index + fullMatch.length + 100);
    const context = markdown.substring(contextStart, contextEnd)
      .replace(/!\[.*?\]\(.*?\)/g, '') // Bild-Syntax entfernen
      .replace(/\s+/g, ' ')
      .trim();

    // Position im Plain-Text finden (approximiert)
    // Wir finden den nächsten Textabschnitt nach dem Bild
    const textAfterImage = markdown.substring(match.index + fullMatch.length, match.index + fullMatch.length + 200);
    const firstTextMatch = textAfterImage.match(/[A-Za-zÄÖÜäöüß]{3,}/);
    let position = -1;
    if (firstTextMatch && plainContent) {
      const searchText = firstTextMatch[0];
      position = plainContent.indexOf(searchText);
    }

    screenshots.push({
      id,
      path: src,
      url: `https://ambitious-cliff-0098a0303.2.azurestaticapps.net${src}`,
      alt: alt || fileName,
      context,
      position: position >= 0 ? position : screenshots.length * 100 // Fallback: gleichmäßig verteilen
    });
  }

  return screenshots;
}

/**
 * Extrahiert Plain-Text aus Markdown für Semantic Search
 */
function extractPlainText(markdown) {
  return markdown
    // Frontmatter entfernen (falls vorhanden)
    .replace(/^---[\s\S]*?---\n?/, '')
    // Code-Blöcke entfernen
    .replace(/```[\s\S]*?```/g, '')
    // Inline-Code entfernen
    .replace(/`[^`]+`/g, '')
    // Bilder entfernen
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Links zu Text konvertieren
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Headers zu Text
    .replace(/#{1,6}\s+/g, '')
    // Bold/Italic entfernen
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Listen-Marker entfernen
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Checkboxen entfernen
    .replace(/\[[ x]\]/g, '')
    // Mehrfache Leerzeilen zu einer
    .replace(/\n{3,}/g, '\n\n')
    // Trimmen
    .trim();
}

// Script ausführen
buildIndex().catch(console.error);
