const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerName, customerEmail, orderTotal } = req.body;

  // Zapier Webhook URL
  const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/12660997/2njtow9/';

  try {
    const zapRes = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName,
        customerEmail,
        orderTotal
      })
    });

    if (!zapRes.ok) {
      const errorText = await zapRes.text();
      return res.status(zapRes.status).json({ error: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 