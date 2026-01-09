// OAuth Start - Redirects to GitHub
module.exports = async function (context, req) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const host = req.headers['x-ms-original-url']
    ? new URL(req.headers['x-ms-original-url']).origin
    : `https://${req.headers.host}`;
  const redirectUri = `${host}/api/callback`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  context.res = {
    status: 302,
    headers: {
      'Location': authUrl
    }
  };
};
