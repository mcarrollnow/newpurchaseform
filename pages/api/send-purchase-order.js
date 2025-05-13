// api/send-purchase-order.js
const sgMail = require('@sendgrid/mail');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Set your SendGrid API key from environment variables
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Get data from request body
    const data = req.body;
    
    // Validate required fields
    if (!data.to || !data.from || !data.subject) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required email fields' 
      });
    }
    
    // Send the email
    await sgMail.send({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html
    });
    
    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Purchase order sent successfully' 
    });
  } catch (error) {
    console.error('Error sending purchase order:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send purchase order',
      details: error.message
    });
  }
};