/**
 * WoZTell FAQ Analyzer
 *
 * Ruft Konversationen von der WoZTell API ab und analysiert häufig gestellte Fragen.
 *
 * Usage: node scripts/woztell-faq-analyzer.js
 */

const fs = require('fs');
const path = require('path');

// Konfiguration
const WOZTELL_API_URL = 'https://open.api.woztell.com/v3';
const ENV_FILE = path.join(__dirname, '..', 'woztell.env');
const OUTPUT_DIR = path.join(__dirname, '..', 'woztell-data');

// Frage-Patterns (Deutsch)
const QUESTION_PATTERNS = [
  /\?$/,                           // Endet mit Fragezeichen
  /^(wie|warum|was|wann|wo|wer|welche|kann|geht|ist|haben|gibt|funktioniert|muss|soll)/i,
  /^(hilfe|problem|fehler|nicht|klappt nicht|geht nicht)/i,
];

/**
 * Lädt die Umgebungsvariablen aus woztell.env
 */
function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error(`Fehler: ${ENV_FILE} nicht gefunden!`);
    console.error('Bitte woztell.env im Projektroot erstellen.');
    process.exit(1);
  }

  const content = fs.readFileSync(ENV_FILE, 'utf-8');
  const env = {};

  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      env[key.trim()] = valueParts.join('=').trim();
    }
  });

  return env;
}

/**
 * Query um die apiViewer Struktur zu erkunden
 */
function getApiViewerExploreQuery() {
  return {
    query: `
      query exploreApiViewer {
        apiViewer {
          __typename
        }
      }
    `
  };
}

/**
 * Query für Members (ohne messageEvents)
 */
function getMembersBasicQuery(first = 100, after = null) {
  return {
    query: `
      query getMembers($first: IntMax100!, $after: String) {
        apiViewer {
          members(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                createdAt
                profile {
                  firstName
                  lastName
                }
                name
                firstName
                lastName
              }
            }
          }
        }
      }
    `,
    variables: { first, after }
  };
}

/**
 * Query um Konversation für einen Member zu holen
 */
function getMemberConversationQuery(memberId) {
  return {
    query: `
      query getMemberConversation($memberId: ID!) {
        apiViewer {
          member(id: $memberId) {
            id
            name
            conversation(first: 100) {
              edges {
                node {
                  id
                  direction
                  content
                  createdAt
                }
              }
            }
          }
        }
      }
    `,
    variables: { memberId }
  };
}

/**
 * Query für conversationHistory
 */
function getConversationHistoryQuery(first = 100, after = null) {
  return {
    query: `
      query getConversationHistory($first: IntMax100!, $after: String) {
        apiViewer {
          conversationHistory(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                createdAt
                from
                messageEvent
                member {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `,
    variables: { first, after }
  };
}

/**
 * Introspection für Chat Type
 */
function getChatIntrospection() {
  return {
    query: `
      query ChatIntrospection {
        __type(name: "Chat") {
          name
          fields {
            name
            type {
              name
              kind
              ofType { name kind }
            }
          }
        }
      }
    `
  };
}

/**
 * Versuche verschiedene Query-Varianten
 */
function getConversationVariant1() {
  return {
    query: `
      query getConversations {
        apiViewer {
          conversations(first: 100) {
            edges {
              node {
                id
                messages {
                  content
                  direction
                }
              }
            }
          }
        }
      }
    `
  };
}

function getConversationVariant2() {
  return {
    query: `
      query getLogs {
        apiViewer {
          logs(first: 100) {
            edges {
              node {
                id
                content
                direction
                createdAt
              }
            }
          }
        }
      }
    `
  };
}

/**
 * Introspection Query um verfügbare Felder zu sehen
 */
function getIntrospectionQuery() {
  return {
    query: `
      query IntrospectionQuery {
        __schema {
          queryType {
            fields {
              name
              description
              args {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        }
      }
    `
  };
}

/**
 * Detaillierte Introspection für apiViewer
 */
function getApiViewerIntrospection() {
  return {
    query: `
      query ApiViewerIntrospection {
        __type(name: "ApiViewer") {
          name
          fields {
            name
            description
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
            args {
              name
              type {
                name
                kind
              }
            }
          }
        }
      }
    `
  };
}

/**
 * Introspection für Member Type
 */
function getMemberIntrospection() {
  return {
    query: `
      query MemberIntrospection {
        __type(name: "Member") {
          name
          fields {
            name
            description
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    `
  };
}

/**
 * Führt eine GraphQL Anfrage aus
 */
async function graphqlRequest(query, accessToken) {
  const response = await fetch(WOZTELL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(query)
  });

  const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
  const rateLimitLimit = response.headers.get('X-RateLimit-Limit');

  if (rateLimitRemaining) {
    console.log(`Rate Limit: ${rateLimitRemaining}/${rateLimitLimit} verbleibend`);
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Fehler ${response.status}: ${error}`);
  }

  return response.json();
}

/**
 * Prüft ob ein Text eine Frage ist
 */
function isQuestion(text) {
  if (!text || typeof text !== 'string') return false;
  const normalized = text.trim().toLowerCase();
  return QUESTION_PATTERNS.some(pattern => pattern.test(normalized));
}

/**
 * Extrahiert Fragen aus Nachrichten
 */
function extractQuestions(messages) {
  const questions = [];

  for (const msg of messages) {
    // Nur eingehende Nachrichten (vom Kunden)
    // WoZTell: 'from' = 'MEMBER' (uppercase) bedeutet vom Kunden
    const from = (msg.from || '').toUpperCase();

    if (from === 'MEMBER') {
      const content = msg.content || '';
      if (content && isQuestion(content)) {
        questions.push({
          text: content,
          date: msg.createdAt,
          memberName: msg.memberName
        });
      }
    }
  }

  return questions;
}

/**
 * Gruppiert und zählt ähnliche Fragen
 */
function analyzeQuestions(questions) {
  const categories = {
    'Bestellung/Kasse': [],
    'Drucker': [],
    'Rechnung/Zahlung': [],
    'Login/Zugang': [],
    'Produkte/Speisekarte': [],
    'App/Technik': [],
    'Sonstiges': []
  };

  const keywords = {
    'Bestellung/Kasse': ['bestellung', 'bestellen', 'kasse', 'bon', 'tisch', 'kellner'],
    'Drucker': ['drucker', 'drucken', 'druck', 'bondrucker', 'küchendrucker'],
    'Rechnung/Zahlung': ['rechnung', 'zahlung', 'bezahlen', 'bar', 'karte', 'trinkgeld', 'storno'],
    'Login/Zugang': ['login', 'passwort', 'anmelden', 'zugang', 'benutzer', 'konto'],
    'Produkte/Speisekarte': ['produkt', 'artikel', 'speisekarte', 'kategorie', 'preis', 'extra'],
    'App/Technik': ['app', 'tablet', 'handy', 'internet', 'verbindung', 'fehler', 'geht nicht', 'funktioniert nicht']
  };

  for (const q of questions) {
    const text = q.text.toLowerCase();
    let categorized = false;

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => text.includes(word))) {
        categories[category].push(q);
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      categories['Sonstiges'].push(q);
    }
  }

  return categories;
}

/**
 * Erstellt einen Bericht
 */
function generateReport(categories) {
  let report = '# WoZTell FAQ Analyse\n\n';
  report += `Analysiert am: ${new Date().toISOString()}\n\n`;

  let totalQuestions = 0;
  for (const [category, questions] of Object.entries(categories)) {
    totalQuestions += questions.length;
  }
  report += `Gesamt Fragen gefunden: ${totalQuestions}\n\n`;

  report += '## Kategorien\n\n';

  // Sortiert nach Anzahl
  const sorted = Object.entries(categories).sort((a, b) => b[1].length - a[1].length);

  for (const [category, questions] of sorted) {
    report += `### ${category} (${questions.length})\n\n`;

    // Zeige die häufigsten/neuesten Fragen
    const sample = questions.slice(0, 10);
    for (const q of sample) {
      report += `- ${q.text}\n`;
    }
    report += '\n';
  }

  return report;
}

/**
 * Hauptfunktion
 */
async function main() {
  console.log('=== WoZTell FAQ Analyzer ===\n');

  // 1. Umgebungsvariablen laden
  console.log('Lade Konfiguration...');
  const env = loadEnv();

  const accessToken = env.WOZTELL_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('Fehler: WOZTELL_ACCESS_TOKEN nicht in woztell.env gefunden!');
    process.exit(1);
  }

  console.log(`Channel: ${env.WOZTELL_CHANNEL_NAME || 'N/A'}`);
  console.log(`Channel ID: ${env.WOZTELL_CHANNEL_ID || 'N/A'}\n`);

  // Output Verzeichnis erstellen
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // 2. Erst Schema prüfen um verfügbare Queries zu sehen
    console.log('Prüfe verfügbare API Endpunkte...');
    const schemaResult = await graphqlRequest(getIntrospectionQuery(), accessToken);

    // Schema speichern für Debugging
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'schema.json'),
      JSON.stringify(schemaResult, null, 2)
    );
    console.log('Schema gespeichert in woztell-data/schema.json\n');

    if (schemaResult.data?.__schema?.queryType?.fields) {
      console.log('Verfügbare Queries:');
      for (const field of schemaResult.data.__schema.queryType.fields) {
        console.log(`  - ${field.name}`);
      }
      console.log('');
    }

    // ApiViewer Details abrufen
    console.log('Hole ApiViewer Schema Details...');
    const apiViewerSchema = await graphqlRequest(getApiViewerIntrospection(), accessToken);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'apiViewer-schema.json'),
      JSON.stringify(apiViewerSchema, null, 2)
    );

    if (apiViewerSchema.data?.__type?.fields) {
      console.log('ApiViewer Felder:');
      for (const field of apiViewerSchema.data.__type.fields) {
        console.log(`  - ${field.name} (${field.type?.name || field.type?.ofType?.name || 'complex'})`);
      }
      console.log('');
    }

    // Member Details abrufen
    console.log('Hole Member Schema Details...');
    const memberSchema = await graphqlRequest(getMemberIntrospection(), accessToken);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'member-schema.json'),
      JSON.stringify(memberSchema, null, 2)
    );

    if (memberSchema.data?.__type?.fields) {
      console.log('Member Felder:');
      for (const field of memberSchema.data.__type.fields) {
        console.log(`  - ${field.name}`);
      }
      console.log('');
    }

    // 3. Erkunde ApiViewer Struktur
    console.log('Erkunde ApiViewer Typ...');
    const exploreResult = await graphqlRequest(getApiViewerExploreQuery(), accessToken);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'apiViewer-explore.json'),
      JSON.stringify(exploreResult, null, 2)
    );
    console.log('ApiViewer Typ:', exploreResult.data?.apiViewer?.__typename || 'unbekannt');

    // Hole ApiViewer Type Schema
    const typeName = exploreResult.data?.apiViewer?.__typename;
    if (typeName) {
      const typeSchemaQuery = {
        query: `
          query TypeSchema {
            __type(name: "${typeName}") {
              name
              fields {
                name
                type {
                  name
                  kind
                  ofType { name kind }
                }
              }
            }
          }
        `
      };
      const typeSchema = await graphqlRequest(typeSchemaQuery, accessToken);
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'apiViewer-type-schema.json'),
        JSON.stringify(typeSchema, null, 2)
      );

      if (typeSchema.data?.__type?.fields) {
        console.log('\nVerfügbare ApiViewer Felder:');
        for (const field of typeSchema.data.__type.fields) {
          const typeName = field.type?.name || field.type?.ofType?.name || 'complex';
          console.log(`  - ${field.name} (${typeName})`);
        }
        console.log('');
      }
    }

    // 4. Hole Chat Schema Details
    console.log('Hole Chat Schema...');
    const chatSchema = await graphqlRequest(getChatIntrospection(), accessToken);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'chat-schema.json'),
      JSON.stringify(chatSchema, null, 2)
    );

    if (chatSchema.data?.__type?.fields) {
      console.log('Chat Felder:');
      for (const field of chatSchema.data.__type.fields) {
        console.log(`  - ${field.name}`);
      }
      console.log('');
    }

    // 5. Hole conversationHistory
    console.log('Rufe conversationHistory ab...');
    const allMessages = [];
    let hasNextPage = true;
    let cursor = null;
    let pageCount = 0;
    const maxPages = 100; // Max 10000 Nachrichten für vollständige Analyse

    while (hasNextPage && pageCount < maxPages) {
      pageCount++;
      process.stdout.write(`Seite ${pageCount}...`);

      try {
        const result = await graphqlRequest(getConversationHistoryQuery(100, cursor), accessToken);

        // Speichere erste Seite für Debugging
        if (pageCount === 1) {
          fs.writeFileSync(
            path.join(OUTPUT_DIR, 'conversationHistory-sample.json'),
            JSON.stringify(result, null, 2)
          );
        }

        const data = result.data?.apiViewer?.conversationHistory;
        if (data?.edges) {
          const edges = data.edges;
          console.log(` ${edges.length} Nachrichten`);

          for (const edge of edges) {
            if (edge.node) {
              // Extrahiere den Text aus messageEvent.data.text
              let content = '';
              try {
                const msgEvent = edge.node.messageEvent;
                if (msgEvent?.data?.text) {
                  content = msgEvent.data.text;
                } else if (msgEvent?.text) {
                  content = typeof msgEvent.text === 'string' ? msgEvent.text : msgEvent.text.body || '';
                }
              } catch (e) {
                content = '';
              }

              // 'from' ist uppercase: "MEMBER", "BOT", "ADMIN"
              const from = edge.node.from || '';

              allMessages.push({
                id: edge.node.id,
                from: from,
                content: content,
                createdAt: edge.node.createdAt,
                memberName: edge.node.member?.name,
                type: edge.node.messageEvent?.type
              });
            }
          }

          hasNextPage = data.pageInfo?.hasNextPage || false;
          cursor = data.pageInfo?.endCursor;
        } else {
          console.log(' Keine Daten');
          hasNextPage = false;
        }
      } catch (e) {
        console.log(` Fehler: ${e.message}`);
        hasNextPage = false;
      }

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`\n${allMessages.length} Nachrichten insgesamt geladen.\n`);

    // Speichere alle Nachrichten
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'all-messages.json'),
      JSON.stringify(allMessages, null, 2)
    );

    // 4. Fragen extrahieren
    console.log('Extrahiere Fragen...');
    const questions = extractQuestions(allMessages);
    console.log(`${questions.length} Fragen gefunden.\n`);

    // 5. Analysieren
    console.log('Analysiere Kategorien...');
    const categories = analyzeQuestions(questions);

    // 6. Bericht erstellen
    const report = generateReport(categories);

    const reportPath = path.join(OUTPUT_DIR, 'faq-analysis.md');
    fs.writeFileSync(reportPath, report);
    console.log(`\nBericht gespeichert: ${reportPath}`);

    // Auch auf Konsole ausgeben
    console.log('\n' + '='.repeat(50) + '\n');
    console.log(report);

    // 7. Raw Questions speichern
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'questions.json'),
      JSON.stringify(questions, null, 2)
    );

  } catch (error) {
    console.error('Fehler:', error.message);

    if (error.message.includes('401')) {
      console.error('\nAuthentifizierungsfehler - Access Token prüfen!');
    } else if (error.message.includes('403')) {
      console.error('\nZugriff verweigert - API Berechtigungen prüfen!');
    }

    process.exit(1);
  }
}

// Script ausführen
main().catch(console.error);
