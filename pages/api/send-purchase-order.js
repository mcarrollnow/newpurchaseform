// api/send-purchase-order.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    // Validate required fields
    if (!data.from || !data.subject) {
      return res.status(400).json({
        success: false,
        error: 'Missing required email fields'
      });
    }

    // Set up nodemailer transporter for Gmail using App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    // Compose email (recipients are hardcoded and not exposed to the client)
    const mailOptions = {
      from: data.from,
      to: ['info@totalhealthonline.com', 'admin@vanguardhalo.com'],
      subject: data.subject,
      text: data.text,
      html: data.html
    };

    await transporter.sendMail(mailOptions);
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