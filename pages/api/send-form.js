import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

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

  // Compose email
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipients,
    subject: 'New Form Submission',
    text: JSON.stringify(formData, null, 2),
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 