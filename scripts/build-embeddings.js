/**
 * Embedding Generator für Semantic Search
 *
 * Liest den MCP-Index und generiert OpenAI Embeddings für jeden Artikel.
 * Die Embeddings werden in einer separaten Datei gespeichert.
 *
 * Benötigt: OPENAI_API_KEY Umgebungsvariable
 */

const fs = require('fs');
const path = require('path');

const INDEX_FILE = path.join(__dirname, '..', 'build', 'mcp-index.json');
const EMBEDDINGS_FILE = path.join(__dirname, '..', 'build', 'embeddings.json');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const EMBEDDING_MODEL = 'text-embedding-3-small';

async function generateEmbeddings() {
  if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable not set');
    console.log('Set it with: export OPENAI_API_KEY=your-key');
    process.exit(1);
  }

  // Index laden
  if (!fs.existsSync(INDEX_FILE)) {
    console.error('Error: MCP index not found. Run "npm run build:index" first.');
    process.exit(1);
  }

  const index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  console.log(`Generating embeddings for ${index.all.length} articles...`);

  const embeddings = {
    version: index.version,
    model: EMBEDDING_MODEL,
    generatedAt: new Date().toISOString(),
    articles: []
  };

  for (const article of index.all) {
    console.log(`  Processing: ${article.id}`);

    // Text für Embedding zusammensetzen
    const textForEmbedding = [
      article.title,
      article.description,
      ...(article.searchTerms || []),
      article.plainContent?.substring(0, 8000) || '' // OpenAI limit
    ].join('\n');

    try {
      const embedding = await getEmbedding(textForEmbedding);

      embeddings.articles.push({
        id: article.id,
        type: article.type,
        platform: article.platform,
        embedding: embedding
      });

      console.log(`    ✓ Generated (${embedding.length} dimensions)`);

      // Rate limiting - 1 request per 100ms
      await sleep(100);
    } catch (error) {
      console.error(`    ✗ Error: ${error.message}`);
    }
  }

  // Embeddings speichern
  fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(embeddings, null, 2));
  console.log(`\nEmbeddings written to: ${EMBEDDINGS_FILE}`);
  console.log(`Total: ${embeddings.articles.length} embeddings generated`);
}

async function getEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  const data = await response.json();
  return data.data[0].embedding;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Script ausführen
generateEmbeddings().catch(console.error);
