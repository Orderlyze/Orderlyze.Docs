/**
 * WoZTell Member Search
 *
 * Sucht einen Member anhand eines Suchbegriffs (Name, E-Mail, Telefon) und gibt
 * die letzte Konversation zurück.
 *
 * Usage: node scripts/woztell-search-member.js <suchbegriff>
 * Beispiel: node scripts/woztell-search-member.js velten
 */

const fs = require('fs');
const path = require('path');

const WOZTELL_API_URL = 'https://open.api.woztell.com/v3';
const ENV_FILE = path.join(__dirname, '..', 'woztell.env');

function loadEnv() {
  const content = fs.readFileSync(ENV_FILE, 'utf-8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      env[key.trim()] = rest.join('=').trim();
    }
  });
  return env;
}

async function gql(token, query, variables) {
  const res = await fetch(WOZTELL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
  }
  return json;
}

const MEMBERS_QUERY = `
  query getMembers($first: IntMax100!, $after: String) {
    apiViewer {
      members(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            _id
            createdAt
            updatedAt
            name
            firstName
            lastName
            email
            externalId
            tags
            profile { firstName lastName }
          }
        }
      }
    }
  }
`;

const CONV_QUERY = `
  query getConv($memberId: String!, $first: IntMax100!) {
    apiViewer {
      conversationHistory(memberId: $memberId, first: $first) {
        edges {
          node {
            id
            createdAt
            from
            messageEvent
          }
        }
      }
    }
  }
`;

function memberMatches(m, q) {
  const haystacks = [
    m.name, m.firstName, m.lastName, m.email, m.externalId,
    m.profile?.firstName, m.profile?.lastName,
    ...(m.tags || []),
  ].filter(Boolean).map(s => String(s).toLowerCase());
  return haystacks.some(h => h.includes(q));
}

(async () => {
  const query = (process.argv[2] || '').toLowerCase();
  if (!query) { console.error('Usage: node scripts/woztell-search-member.js <suchbegriff>'); process.exit(1); }

  const env = loadEnv();
  const token = env.WOZTELL_ACCESS_TOKEN;
  if (!token) { console.error('WOZTELL_ACCESS_TOKEN not found in woztell.env'); process.exit(1); }

  let after = null;
  let page = 0;
  const matches = [];
  while (true) {
    page++;
    const res = await gql(token, MEMBERS_QUERY, { first: 100, after });
    const conn = res?.data?.apiViewer?.members;
    if (!conn) { console.error('No members data returned. Response:', JSON.stringify(res)); break; }
    for (const e of conn.edges) {
      if (memberMatches(e.node, query)) matches.push(e.node);
    }
    process.stdout.write(`\rPage ${page} – ${matches.length} matches so far…`);
    if (!conn.pageInfo.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }
  process.stdout.write('\n');

  console.log(`\n=== ${matches.length} Treffer für "${query}" ===\n`);
  for (const m of matches) {
    console.log(`- ${m.firstName || ''} ${m.lastName || ''} | name=${m.name} | email=${m.email} | extId=${m.externalId}`);
    console.log(`  id=${m.id}  created=${new Date(m.createdAt).toISOString()}`);
  }

  if (matches.length === 0) return;

  console.log('\n=== Letzte Konversation pro Treffer ===\n');
  for (const m of matches) {
    const res = await gql(token, CONV_QUERY, { memberId: m.id, first: 50 });
    const edges = res?.data?.apiViewer?.conversationHistory?.edges || [];
    console.log(`\n--- ${m.firstName || ''} ${m.lastName || ''} (${m.id}) – ${edges.length} Nachrichten ---`);
    for (const e of edges.slice().reverse()) {
      const text = e.node.messageEvent?.message?.text || JSON.stringify(e.node.messageEvent).slice(0, 200);
      console.log(`[${new Date(e.node.createdAt).toISOString()}] ${e.node.from}: ${text}`);
    }
  }
})();
