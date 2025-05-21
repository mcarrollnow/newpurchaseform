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
        pass: process.env.GMAIL_PASS
      }
    });

    // Compose email (recipients are hardcoded and not exposed to the client)
    // Compose email
    // Debug: log the receiver env variable
    console.log('GMAIL_RECEIVER:', process.env.GMAIL_RECEIVER);
    let recipients = process.env.GMAIL_RECEIVER;
    if (!recipients) {
      return res.status(500).json({ error: 'No recipients defined in GMAIL_RECEIVER env variable.' });
    }
    recipients = recipients.includes(',')
      ? recipients.split(',').map(email => email.trim()).filter(Boolean)
      : [recipients.trim()];
    if (!recipients.length || !recipients[0]) {
      return res.status(500).json({ error: 'No valid recipients found in GMAIL_RECEIVER env variable.' });
    }
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipients,
      subject: data.subject,
      replyTo: data.from || undefined,
      text: `User Email: ${data.from || 'N/A'}\n\n${data.text || ''}`,
      html: `<p><strong>User Email:</strong> ${data.from || 'N/A'}</p>` + (data.html || '')
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