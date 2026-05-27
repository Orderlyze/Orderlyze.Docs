const fs = require('fs');
const path = require('path');
const ENV_FILE = path.join(__dirname, '..', 'woztell.env');
const env = {};
fs.readFileSync(ENV_FILE, 'utf-8').split('\n').forEach(l => {
  const t = l.trim(); if (!t || t.startsWith('#')) return;
  const [k, ...r] = t.split('='); env[k.trim()] = r.join('=').trim();
});
const token = env.WOZTELL_ACCESS_TOKEN;

async function q(query, variables) {
  const r = await fetch('https://open.api.woztell.com/v3', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return r.json();
}

(async () => {
  const which = process.argv[2] || 'ApiScope';
  const res = await q(`
    query I($n: String!) {
      __type(name: $n) {
        name
        fields {
          name
          args { name type { name kind ofType { name kind } } }
          type { name kind ofType { name kind } }
        }
      }
    }
  `, { n: which });
  console.log(JSON.stringify(res, null, 2));
})();
