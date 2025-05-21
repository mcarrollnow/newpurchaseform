import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const filePath = path.join(process.cwd(), 'order-records.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const records = JSON.parse(data);
    res.status(200).json(records);
  } catch (err) {
    res.status(200).json([]);
  }
}
