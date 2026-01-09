/**
 * Frontmatter Validator
 *
 * Validiert alle Markdown-Dateien gegen das JSON-Schema.
 * Bricht den Build ab wenn Fehler gefunden werden.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { glob } = require('glob');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const SCHEMA_FILE = path.join(__dirname, '..', 'schemas', 'frontmatter.schema.json');

// Erforderliche Felder pro Typ
const REQUIRED_FIELDS = {
  all: ['id', 'title', 'type', 'platform'],
  tutorial: ['tutorial'],
  troubleshooting: ['troubleshooting'],
  faq: []
};

// Valide Werte
const VALID_VALUES = {
  type: ['tutorial', 'troubleshooting', 'faq', 'reference'],
  platform: ['mobile', 'web', 'both'],
  'troubleshooting.category': ['drucker', 'zahlung', 'sync', 'login', 'netzwerk', 'allgemein'],
  'tutorial.difficulty': ['anfaenger', 'fortgeschritten', 'experte']
};

async function validate() {
  console.log('Validating Frontmatter...');
  console.log(`Scanning: ${DOCS_DIR}\n`);

  const files = await glob('**/*.md', { cwd: DOCS_DIR });
  let hasErrors = false;
  let totalFiles = 0;
  let validFiles = 0;

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const errors = [];

    try {
      const { data: frontmatter } = matter(content);

      // Skip leere Frontmatter (erlaubt für einfache Seiten)
      if (Object.keys(frontmatter).length === 0) {
        continue;
      }

      totalFiles++;

      // Basis-Validierung: Erforderliche Felder
      for (const field of REQUIRED_FIELDS.all) {
        if (!frontmatter[field]) {
          errors.push(`Missing required field: ${field}`);
        }
      }

      // Typ-spezifische Validierung
      if (frontmatter.type && REQUIRED_FIELDS[frontmatter.type]) {
        for (const field of REQUIRED_FIELDS[frontmatter.type]) {
          if (!frontmatter[field]) {
            errors.push(`Missing required field for ${frontmatter.type}: ${field}`);
          }
        }
      }

      // Wert-Validierung
      if (frontmatter.type && !VALID_VALUES.type.includes(frontmatter.type)) {
        errors.push(`Invalid type: ${frontmatter.type}. Must be one of: ${VALID_VALUES.type.join(', ')}`);
      }

      if (frontmatter.platform && !VALID_VALUES.platform.includes(frontmatter.platform)) {
        errors.push(`Invalid platform: ${frontmatter.platform}. Must be one of: ${VALID_VALUES.platform.join(', ')}`);
      }

      if (frontmatter.troubleshooting?.category &&
          !VALID_VALUES['troubleshooting.category'].includes(frontmatter.troubleshooting.category)) {
        errors.push(`Invalid troubleshooting.category: ${frontmatter.troubleshooting.category}`);
      }

      if (frontmatter.tutorial?.difficulty &&
          !VALID_VALUES['tutorial.difficulty'].includes(frontmatter.tutorial.difficulty)) {
        errors.push(`Invalid tutorial.difficulty: ${frontmatter.tutorial.difficulty}`);
      }

      // ID-Format validieren (kebab-case)
      if (frontmatter.id && !/^[a-z0-9-]+$/.test(frontmatter.id)) {
        errors.push(`Invalid id format: ${frontmatter.id}. Must be kebab-case (lowercase, hyphens only)`);
      }

      // Screenshot-Referenzen validieren
      if (frontmatter.screenshots) {
        for (const screenshot of frontmatter.screenshots) {
          if (!screenshot.id) {
            errors.push('Screenshot missing id');
          }
          if (!screenshot.file) {
            errors.push(`Screenshot ${screenshot.id || '?'} missing file path`);
          }
          if (!screenshot.alt) {
            errors.push(`Screenshot ${screenshot.id || '?'} missing alt text`);
          }
        }
      }

      // Ergebnis ausgeben
      if (errors.length > 0) {
        console.log(`✗ ${file}`);
        errors.forEach(err => console.log(`    - ${err}`));
        hasErrors = true;
      } else {
        console.log(`✓ ${file}`);
        validFiles++;
      }

    } catch (error) {
      console.log(`✗ ${file}`);
      console.log(`    - Parse error: ${error.message}`);
      hasErrors = true;
    }
  }

  console.log(`\n${validFiles}/${totalFiles} files valid`);

  if (hasErrors) {
    console.error('\nValidation failed! Fix the errors above.');
    process.exit(1);
  }

  console.log('\nAll files valid!');
}

validate().catch(error => {
  console.error('Validation error:', error);
  process.exit(1);
});
