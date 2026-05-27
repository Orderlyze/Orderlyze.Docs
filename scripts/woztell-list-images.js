/**
 * Listet alle Bilder/Medien aus der Konversation eines Members.
 * Usage: node scripts/woztell-list-images.js <memberId> [fromISO] [toISO]
 */
const fs = require('fs');
const path = require('path');
const ENV_FILE = path.join(__dirname, '..', 'woztell.env');
const env = {};
fs.readFileSync(ENV_FILE, 'utf-8').split('\n').forEach(l => {
  const t = l.trim(); if (!t || t.startsWith('#')) return;
  const [k, ...r] = t.split('='); env[k.trim()] = r.join('=').trim();
});
const token = env.WOZTELL_ACCESS_TOKEN;

async function gql(query, variables) {
  const r = await fetch('https://open.api.woztell.com/v3', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return r.json();
}

const CONV_Q = `
  query getConv($memberId: String!, $first: IntMax100!, $after: String, $from: Long, $to: Long) {
    apiViewer {
      conversationHistory(memberId: $memberId, first: $first, after: $after, from: $from, to: $to) {
        pageInfo { hasNextPage endCursor }
        edges { node { id createdAt from messageEvent } }
      }
    }
  }
`;

(async () => {
  const memberId = process.argv[2];
  const fromTs = process.argv[3] ? Date.parse(process.argv[3]) : null;
  const toTs = process.argv[4] ? Date.parse(process.argv[4]) : null;
  if (!memberId) { console.error('Usage: node scripts/woztell-list-images.js <memberId> [fromISO] [toISO]'); process.exit(1); }

  const all = [];
  let after = null;
  while (true) {
    const res = await gql(CONV_Q, { memberId, first: 100, after, from: fromTs, to: toTs });
    if (res.errors) { console.error(JSON.stringify(res.errors)); break; }
    const conn = res?.data?.apiViewer?.conversationHistory;
    if (!conn) break;
    all.push(...conn.edges.map(e => e.node));
    if (!conn.pageInfo.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }

  const media = all.filter(c => {
    const ev = c.messageEvent || {};
    return ev.type === 'IMAGE' || ev.type === 'VIDEO' || ev.type === 'DOCUMENT' || ev.data?.url || ev.data?.id;
  }).sort((a,b) => a.createdAt - b.createdAt);

  console.log(`${media.length} Medien gefunden (von ${all.length} Nachrichten gesamt)\n`);
  for (const m of media) {
    const ev = m.messageEvent;
    console.log(`[${new Date(m.createdAt).toISOString()}] ${m.from} – ${ev.type}`);
    console.log(`  msgId=${ev.messageId || ''}`);
    console.log(`  data.id=${ev.data?.id || ''}  url=${ev.data?.url || ''}  mime=${ev.data?.mimeType || ev.data?.mime_type || ''}`);
    console.log(`  caption=${ev.data?.caption || ''}`);
    console.log('');
  }
})();
