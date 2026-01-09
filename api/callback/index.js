// OAuth Callback - Exchanges code for token
module.exports = async function (context, req) {
  const { code } = req.query;

  if (!code) {
    context.res = {
      status: 400,
      body: 'Missing code parameter'
    };
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      context.res = {
        status: 400,
        body: `Error: ${data.error_description}`
      };
      return;
    }

    // Send token back to Decap CMS via postMessage
    const script = `
<!DOCTYPE html>
<html>
<head><title>OAuth Callback</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
      e.origin
    );
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: script
    };

  } catch (error) {
    context.res = {
      status: 500,
      body: `Error: ${error.message}`
    };
  }
};
