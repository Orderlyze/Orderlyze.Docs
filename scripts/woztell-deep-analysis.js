/**
 * WoZTell Deep FAQ Analysis
 *
 * Analysiert Konversationen um Frage-Antwort-Paare zu extrahieren
 * und die häufigsten Support-Themen zu identifizieren.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'woztell-data');
const MESSAGES_FILE = path.join(DATA_DIR, 'all-messages.json');

// Kategorien mit Keywords
const CATEGORIES = {
  'preise-kosten': {
    name: 'Preise & Kosten',
    keywords: ['kostet', 'kosten', 'preis', 'euro', '€', 'angebot', 'rabatt', 'günstig', 'teuer', 'monatlich', 'gebühr']
  },
  'drucker': {
    name: 'Drucker & Drucken',
    keywords: ['drucker', 'drucken', 'druck', 'bondrucker', 'küchendrucker', 'thermodrucker', 'epson', 'star', 'print', 'ausdrucken']
  },
  'hardware': {
    name: 'Hardware & Geräte',
    keywords: ['tablet', 'ipad', 'handy', 'smartphone', 'laptop', 'gerät', 'hardware', 'samsung', 'apple', 'android', 'ios']
  },
  'login-zugang': {
    name: 'Login & Zugang',
    keywords: ['login', 'passwort', 'anmelden', 'zugang', 'einloggen', 'kennwort', 'pin', 'benutzer', 'account', 'konto', 'zugangsdaten']
  },
  'rechnung-zahlung': {
    name: 'Rechnung & Zahlung',
    keywords: ['rechnung', 'zahlung', 'bezahlen', 'sepa', 'überweis', 'iban', 'karte', 'kartenzahlung', 'ec', 'kredit', 'bar', 'trinkgeld', 'storno']
  },
  'mwst-steuer': {
    name: 'MwSt & Steuern',
    keywords: ['mwst', 'mehrwertsteuer', 'steuer', 'finanzamt', 'tse', 'fiskalisierung', '7%', '19%', '10%', '20%', 'steuernummer']
  },
  'produkte': {
    name: 'Produkte & Speisekarte',
    keywords: ['produkt', 'artikel', 'speisekarte', 'kategorie', 'extra', 'zutat', 'menu', 'gericht', 'getränk']
  },
  'berichte': {
    name: 'Berichte & Auswertungen',
    keywords: ['bericht', 'tagesbericht', 'tagesabschluss', 'z-bon', 'umsatz', 'statistik', 'auswertung', 'export', 'abschluss']
  },
  'einrichtung': {
    name: 'Einrichtung & Setup',
    keywords: ['einrichten', 'setup', 'installation', 'konfigur', 'einstell', 'anfang', 'start', 'verbinden']
  },
  'kuechenbon': {
    name: 'Küchenbons & Bestellungen',
    keywords: ['küche', 'bon', 'bestellung', 'kellner', 'tisch', 'gang', 'küchendisplay']
  },
  'standort': {
    name: 'Mehrere Standorte',
    keywords: ['standort', 'filiale', 'zweiter', 'mehrere', 'franchise']
  }
};

// Frage-Patterns
const QUESTION_PATTERNS = [
  /\?$/,
  /^(wie|warum|was|wann|wo|wer|welche|kann|geht|ist|haben|gibt|funktioniert|muss|soll|brauche)/i,
  /^(hilfe|problem|fehler|nicht|klappt nicht|geht nicht)/i,
];

function isQuestion(text) {
  if (!text || typeof text !== 'string' || text.length < 5) return false;
  const normalized = text.trim().toLowerCase();
  return QUESTION_PATTERNS.some(pattern => pattern.test(normalized));
}

function categorizeText(text) {
  const lower = text.toLowerCase();

  for (const [id, category] of Object.entries(CATEGORIES)) {
    if (category.keywords.some(kw => lower.includes(kw))) {
      return { id, name: category.name };
    }
  }

  return { id: 'sonstiges', name: 'Sonstiges' };
}

function normalizeQuestion(text) {
  // Entferne Grüße und normalisiere
  return text
    .replace(/^(hallo|guten (tag|morgen|abend)|hi|hey)[,!.\s]*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findSimilarQuestions(questions) {
  const groups = {};

  for (const q of questions) {
    const normalized = normalizeQuestion(q.text).toLowerCase();
    const words = normalized.split(/\s+/).filter(w => w.length > 3);

    // Finde ähnliche basierend auf Schlüsselwörtern
    let matched = false;
    for (const [key, group] of Object.entries(groups)) {
      const keyWords = key.split('|');
      const matchCount = words.filter(w => keyWords.includes(w)).length;
      if (matchCount >= 2 || (words.length <= 3 && matchCount >= 1)) {
        group.questions.push(q);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const key = words.slice(0, 5).join('|');
      groups[key] = {
        questions: [q],
        category: q.category
      };
    }
  }

  return groups;
}

function extractQAPairs(messages) {
  // Gruppiere nach Member
  const memberConversations = {};

  for (const msg of messages) {
    const memberId = msg.memberName || msg.id?.substring(0, 20) || 'unknown';
    if (!memberConversations[memberId]) {
      memberConversations[memberId] = [];
    }
    memberConversations[memberId].push(msg);
  }

  // Sortiere jede Konversation nach Zeit
  for (const memberId of Object.keys(memberConversations)) {
    memberConversations[memberId].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }

  // Extrahiere Q&A Paare
  const qaPairs = [];

  for (const [memberId, conversation] of Object.entries(memberConversations)) {
    for (let i = 0; i < conversation.length - 1; i++) {
      const msg = conversation[i];
      const nextMsg = conversation[i + 1];

      // Wenn aktuelle Nachricht eine Frage vom Member ist
      if (msg.from === 'MEMBER' && msg.content && isQuestion(msg.content)) {
        // Suche nach Antwort (BOT oder ADMIN)
        if (nextMsg.from === 'BOT' || nextMsg.from === 'ADMIN') {
          if (nextMsg.content && nextMsg.content.length > 10) {
            qaPairs.push({
              question: msg.content,
              answer: nextMsg.content,
              answeredBy: nextMsg.from,
              category: categorizeText(msg.content),
              timestamp: msg.createdAt
            });
          }
        }
      }
    }
  }

  return qaPairs;
}

function analyzeFrequency(questions) {
  const frequency = {};

  for (const q of questions) {
    // Normalisiere für Häufigkeitszählung
    const normalized = normalizeQuestion(q.text)
      .toLowerCase()
      .replace(/[^\wäöüß\s]/g, '')
      .trim();

    if (normalized.length < 10) continue;

    // Extrahiere Kern der Frage
    let key = normalized;

    // Spezielle Erkennung für häufige Fragen
    if (normalized.includes('kostet') || normalized.includes('kosten') || normalized.includes('preis')) {
      key = 'wie viel kostet das kassensystem';
    } else if (normalized.includes('drucker') && normalized.includes('verbinden')) {
      key = 'wie kann ich meinen drucker verbinden';
    } else if (normalized.includes('tagesbericht') || normalized.includes('tagesabschluss')) {
      key = 'wie erstelle ich einen tagesbericht';
    } else if (normalized.includes('passwort') || normalized.includes('zugangsdaten')) {
      key = 'wie sind meine zugangsdaten';
    } else if ((normalized.includes('ipad') || normalized.includes('tablet')) && (normalized.includes('brauch') || normalized.includes('welch'))) {
      key = 'welches tablet brauche ich';
    } else if (normalized.includes('mwst') || normalized.includes('mehrwertsteuer') || (normalized.includes('7') && normalized.includes('19'))) {
      key = 'wie stelle ich verschiedene mwst saetze ein';
    } else if (normalized.includes('tse')) {
      key = 'ist tse inklusive';
    } else if (normalized.includes('demo') || normalized.includes('test')) {
      key = 'kann ich eine demo testen';
    } else if (normalized.includes('standort') || normalized.includes('filiale')) {
      key = 'mehrere standorte verwalten';
    } else if (normalized.includes('kartenzahlung') || normalized.includes('ec')) {
      key = 'wie funktioniert kartenzahlung';
    }

    if (!frequency[key]) {
      frequency[key] = {
        count: 0,
        examples: [],
        category: q.category
      };
    }
    frequency[key].count++;
    if (frequency[key].examples.length < 3) {
      frequency[key].examples.push(q.text);
    }
  }

  return frequency;
}

function main() {
  console.log('=== WoZTell Deep FAQ Analysis ===\n');

  // Lade Nachrichten
  if (!fs.existsSync(MESSAGES_FILE)) {
    console.error('Fehler: all-messages.json nicht gefunden. Bitte zuerst woztell-faq-analyzer.js ausführen.');
    process.exit(1);
  }

  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  console.log(`${messages.length} Nachrichten geladen.\n`);

  // Statistiken
  const memberMessages = messages.filter(m => m.from === 'MEMBER');
  const botMessages = messages.filter(m => m.from === 'BOT');
  const adminMessages = messages.filter(m => m.from === 'ADMIN');

  console.log('Nachrichtenverteilung:');
  console.log(`  MEMBER: ${memberMessages.length}`);
  console.log(`  BOT: ${botMessages.length}`);
  console.log(`  ADMIN: ${adminMessages.length}\n`);

  // Extrahiere Fragen
  const questions = memberMessages
    .filter(m => m.content && isQuestion(m.content))
    .map(m => ({
      text: m.content,
      timestamp: m.createdAt,
      category: categorizeText(m.content)
    }));

  console.log(`${questions.length} Fragen identifiziert.\n`);

  // Kategorisiere
  const byCategory = {};
  for (const q of questions) {
    const cat = q.category.id;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    byCategory[cat].push(q);
  }

  console.log('Fragen nach Kategorie:');
  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length);
  for (const [cat, qs] of sortedCategories) {
    const catName = CATEGORIES[cat]?.name || 'Sonstiges';
    console.log(`  ${catName}: ${qs.length}`);
  }
  console.log('');

  // Häufigkeitsanalyse
  const frequency = analyzeFrequency(questions);
  const sortedFrequency = Object.entries(frequency)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 30);

  console.log('Top 30 häufigste Fragen/Themen:');
  console.log('─'.repeat(60));
  for (const [key, data] of sortedFrequency) {
    console.log(`[${data.count}x] ${key}`);
    console.log(`     Kategorie: ${data.category?.name || 'Sonstiges'}`);
    if (data.examples.length > 0) {
      console.log(`     Beispiel: "${data.examples[0].substring(0, 80)}..."`);
    }
    console.log('');
  }

  // Extrahiere Q&A Paare
  console.log('\n--- Extrahiere Frage-Antwort-Paare ---\n');
  const qaPairs = extractQAPairs(messages);
  console.log(`${qaPairs.length} Q&A-Paare gefunden.\n`);

  // Gruppiere Q&A nach Kategorie
  const qaByCategory = {};
  for (const qa of qaPairs) {
    const cat = qa.category.id;
    if (!qaByCategory[cat]) {
      qaByCategory[cat] = [];
    }
    qaByCategory[cat].push(qa);
  }

  // Speichere detaillierte Analyse
  const analysisReport = {
    totalMessages: messages.length,
    memberMessages: memberMessages.length,
    botMessages: botMessages.length,
    adminMessages: adminMessages.length,
    totalQuestions: questions.length,
    questionsByCategory: Object.fromEntries(
      Object.entries(byCategory).map(([k, v]) => [k, v.length])
    ),
    topQuestions: sortedFrequency.map(([key, data]) => ({
      question: key,
      count: data.count,
      category: data.category?.name,
      examples: data.examples
    })),
    qaPairs: qaPairs.slice(0, 100), // Top 100 Q&A Paare
    qaByCategory: Object.fromEntries(
      Object.entries(qaByCategory).map(([k, v]) => [k, v.slice(0, 20)])
    )
  };

  fs.writeFileSync(
    path.join(DATA_DIR, 'deep-analysis.json'),
    JSON.stringify(analysisReport, null, 2)
  );

  // Erstelle markdown Report
  let mdReport = `# WoZTell FAQ Tiefenanalyse

Analysiert am: ${new Date().toISOString()}

## Übersicht

- **Nachrichten gesamt:** ${messages.length}
- **Kundennachrichten:** ${memberMessages.length}
- **Bot-Antworten:** ${botMessages.length}
- **Admin-Antworten:** ${adminMessages.length}
- **Identifizierte Fragen:** ${questions.length}
- **Q&A-Paare:** ${qaPairs.length}

## Top Fragen nach Häufigkeit

`;

  for (const [key, data] of sortedFrequency.slice(0, 20)) {
    mdReport += `### ${key} (${data.count}x)\n`;
    mdReport += `**Kategorie:** ${data.category?.name || 'Sonstiges'}\n\n`;
    mdReport += `**Beispiele:**\n`;
    for (const ex of data.examples) {
      mdReport += `- "${ex.substring(0, 100)}${ex.length > 100 ? '...' : ''}"\n`;
    }
    mdReport += '\n';
  }

  mdReport += `\n## Fragen nach Kategorie\n\n`;

  for (const [cat, qs] of sortedCategories) {
    const catName = CATEGORIES[cat]?.name || 'Sonstiges';
    mdReport += `### ${catName} (${qs.length})\n\n`;

    // Zeige Top 5 Fragen dieser Kategorie
    const topInCat = qs.slice(0, 10);
    for (const q of topInCat) {
      mdReport += `- ${q.text.substring(0, 150)}${q.text.length > 150 ? '...' : ''}\n`;
    }
    mdReport += '\n';
  }

  mdReport += `\n## Ausgewählte Q&A-Paare\n\n`;

  // Zeige beste Q&A Paare pro Kategorie
  for (const [cat, pairs] of Object.entries(qaByCategory)) {
    const catName = CATEGORIES[cat]?.name || 'Sonstiges';
    if (pairs.length === 0) continue;

    mdReport += `### ${catName}\n\n`;

    for (const qa of pairs.slice(0, 5)) {
      mdReport += `**F:** ${qa.question.substring(0, 200)}\n\n`;
      mdReport += `**A:** ${qa.answer.substring(0, 300)}${qa.answer.length > 300 ? '...' : ''}\n\n`;
      mdReport += `---\n\n`;
    }
  }

  fs.writeFileSync(
    path.join(DATA_DIR, 'deep-analysis.md'),
    mdReport
  );

  console.log('\nAnalyse abgeschlossen!');
  console.log(`Gespeichert in:`);
  console.log(`  - ${path.join(DATA_DIR, 'deep-analysis.json')}`);
  console.log(`  - ${path.join(DATA_DIR, 'deep-analysis.md')}`);
}

main();
