const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerName, customerEmail, orderTotal } = req.body;

  // Use the provided Wix API key (for demo; use env var in production)
  const wixApiKey = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjMxNmRiZTJjLWYyNzctNDQ3OS1hYWNiLTkwZDc2ZDUwM2VjZlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImQ3YjczZDNjLWQwNmMtNDEwZC1iODY3LWJiZDM2Mjg3OTAwN1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzNzQyNTRlZS05MDQ3LTQ0ODYtYTY4Ni00NmVhNjA3YzZmZGFcIn19IiwiaWF0IjoxNzQ3MDg5MDg5fQ.kRQVdWgBboRgGHgmjasf9d0vaOmmMTI8WPauHoeYvlC_hfCvqT9BvpIfHgGg7gO62nbZBmy6KnhDmdfpQH_qhL-XmcozQUReCp4on3X9B3lvGMhW42aE7TtuVT0qBOTjN3TlgVsW0XdZ3OWLySTvlqCMAb9171f16zjGXf9K2yMn-OMi1qiYpZYONrwTR69tdU6PD53yjUy1PAk6TLYEbqr8LkoLFAvkqosYxYqCgQcdmQZfn1QqirILJqeW32OnwxsHeLvDBXOorWtwRVXOxLIvbXpQKb7vXD_TvRu0y41sdb6E-IH3gvTcrZ5_QpX4twlqo27_0b9Gw3jL0ktjJg';
  const wixEndpoint = 'https://www.wixapis.com/invoices/v1/invoices'; // Example endpoint

  // Build the invoice payload according to Wix API docs
  const invoicePayload = {
    contact: {
      name: customerName,
      emails: [customerEmail]
    },
    amount: orderTotal,
    // Add other required fields as per Wix API documentation
  };

  try {
    const wixRes = await fetch(wixEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': wixApiKey, // Or 'Bearer ...' if using OAuth
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoicePayload)
    });

    const wixData = await wixRes.json();
    if (!wixRes.ok) {
      return res.status(wixRes.status).json({ error: wixData });
    }

    return res.status(200).json({ success: true, wixData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 