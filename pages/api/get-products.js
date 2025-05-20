// api/get-products.js
// API NO LONGER USED: All product data is now sourced from pages/index.js only.

module.exports = (req, res) => {
  return res.status(410).json({ error: 'This API is deprecated. All product data is now sourced from pages/index.js.' });
};