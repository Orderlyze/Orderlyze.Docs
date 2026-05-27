/**
 * WoZTell Conversation fetch
 *
 * Holt die Konversation für eine bekannte Member-ID.
 *
 * Usage: node scripts/woztell-get-conversation.js <memberId> [maxMessages]
 */

const fs = require('fs');
const path = require('path');

const WOZTELL_API_URL = 'https://open.api.woztell.com/v3';
const ENV_FILE = path.join(__dirname, '..', 'woztell.env');

function loadEnv() {
  const env = {};
  fs.readFileSync(ENV_FILE, 'utf-8').split('\n').forEach(l => {
    const t = l.trim(); if (!t || t.startsWith('#')) return;
    const [k, ...r] = t.split('='); env[k.trim()] = r.join('=').trim();
  });
  return env;
}

async function gql(token, query, variables) {
  const res = await fetch(WOZTELL_API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

const MEMBER_Q = `
  query getMember($memberId: ID!) {
    apiViewer {
      member(memberId: $memberId) {
        id name firstName lastName email externalId createdAt updatedAt tags
        profile { firstName lastName }
      }
    }
  }
`;

const CONV_Q = `
  query getConv($memberId: String!, $first: IntMax100!, $after: String) {
    apiViewer {
      conversationHistory(memberId: $memberId, first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges { node { id createdAt from messageEvent } }
      }
    }
  }
`;

(async () => {
  const memberId = process.argv[2];
  const maxMessages = parseInt(process.argv[3] || '500', 10);
  if (!memberId) { console.error('Usage: node scripts/woztell-get-conversation.js <memberId> [maxMessages]'); process.exit(1); }

  const token = loadEnv().WOZTELL_ACCESS_TOKEN;

  const mres = await gql(token, MEMBER_Q, { memberId });
  if (mres.errors) console.error('Member errors:', JSON.stringify(mres.errors));
  const m = mres?.data?.apiViewer?.member;
  if (m) {
    console.log(`\n=== ${m.firstName || ''} ${m.lastName || ''} ===`);
    console.log(`id=${m.id}  name=${m.name}  email=${m.email}  ext=${m.externalId}  tags=${(m.tags || []).join(',')}`);
    console.log(`profile=${m.profile?.firstName || ''} ${m.profile?.lastName || ''}`);
    console.log(`created=${new Date(m.createdAt).toISOString()}  updated=${new Date(m.updatedAt).toISOString()}\n`);
  }

  const all = [];
  let after = null;
  while (all.length < maxMessages) {
    const res = await gql(token, CONV_Q, { memberId, first: 100, after });
    if (res.errors) { console.error('Conv errors:', JSON.stringify(res.errors)); break; }
    const conn = res?.data?.apiViewer?.conversationHistory;
    if (!conn) break;
    all.push(...conn.edges.map(e => e.node));
    if (!conn.pageInfo.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }

  all.sort((a, b) => a.createdAt - b.createdAt);
  console.log(`Nachrichten: ${all.length}\n`);
  for (const c of all) {
    const ev = c.messageEvent || {};
    const text = ev.data?.text || ev.message?.text || ev.data?.caption || (ev.type ? `[${ev.type}]` : '') || JSON.stringify(ev).slice(0, 160);
    console.log(`[${new Date(c.createdAt).toISOString()}] ${c.from}: ${text}`);
  }
})();
