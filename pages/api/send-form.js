import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;

  // Generate order code: 4 uppercase letters, dash, 4 numbers (AJWD-2942)
  function generateOrderCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    code += '-';
    for (let i = 0; i < 4; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return code;
  }
  const orderCode = generateOrderCode();

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

  // Format order for HTML
  const { customerName, email, specialInstructions, products = [], totalAmount } = formData;
  const productsRows = products.map(p => `
    <tr>
      <td style="padding:8px;border:1px solid #ccc;">${p.name}</td>
      <td style="padding:8px;border:1px solid #ccc;">$${p.price.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #ccc;">${p.quantity}</td>
      <td style="padding:8px;border:1px solid #ccc;">$${(p.price * p.quantity).toFixed(2)}</td>
    </tr>`).join('');
  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px;margin:auto;">
      <h2>New Purchase Order</h2>
      <p><strong>Order Code:</strong> ${orderCode}</p>
      <p><strong>Customer Name:</strong> ${customerName || ''}</p>
      <p><strong>Email:</strong> ${email || ''}</p>
      <p><strong>Special Instructions:</strong> ${specialInstructions || ''}</p>
      <h3>Order Details:</h3>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
        <thead>
          <tr style="background:#f4f4f4;">
            <th style="padding:8px;border:1px solid #ccc;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:left;">Price</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:left;">Qty</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:left;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${productsRows}
        </tbody>
      </table>
      <p style="font-size:1.1em;"><strong>Total Amount:</strong> $${totalAmount?.toFixed(2) || '0.00'}</p>
    </div>
  `;
  // Plain text version
  const text = `New Purchase Order\nOrder Code: ${orderCode}\n\nCustomer Name: ${customerName || ''}\nEmail: ${email || ''}\nSpecial Instructions: ${specialInstructions || ''}\n\nOrder Details:\n${products.map(p => `${p.name} | $${p.price.toFixed(2)} x ${p.quantity} = $${(p.price * p.quantity).toFixed(2)}`).join('\n')}\n\nTotal Amount: $${totalAmount?.toFixed(2) || '0.00'}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipients,
    subject: `New Purchase Order: ${orderCode}`,
    text,
    html
  };

  try {
    // Send email
    // Send admin/internal email
    await transporter.sendMail(mailOptions);

    // Do NOT send confirmation to user anymore
    res.status(200).json({ success: true, orderCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 