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

      const article = {
        id: frontmatter.id,
        title: frontmatter.title,
        description: frontmatter.description || '',
        type: frontmatter.type,
        platform: frontmatter.platform || 'both',
        path: file.replace(/\.md$/, ''),
        searchTerms: frontmatter.searchTerms || [],

        // Content für Semantic Search (ohne Markdown-Syntax)
        plainContent: extractPlainText(markdown),

        // Metadaten basierend auf Typ
        ...(frontmatter.tutorial && { tutorial: frontmatter.tutorial }),
        ...(frontmatter.troubleshooting && { troubleshooting: frontmatter.troubleshooting }),
        ...(frontmatter.screenshots && { screenshots: frontmatter.screenshots }),
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
    faq: index.faq.length
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
