// api/get-products.js
const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync'); // Updated for version 5.6.0

module.exports = async (req, res) => {
  try {
    // Path to the CSV file
    const csvFilePath = path.join(process.cwd(), 'data', 'product_20250512_163321.csv');
    
    // Read the CSV file
    const fileContent = await fs.readFile(csvFilePath, 'utf-8');
    
    // Parse the CSV content with newer version syntax
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    // Extract only the needed fields (Name and Price)
    const products = records.map((record, index) => {
      return {
        id: index + 1,
        name: record.Name || record.Item || 'Product ' + (index + 1),
        price: parseFloat(record.Price) || 0.00,
        image: record['Image URL (Import)'] || record['Internal Image URL (Export)'] || '/api/placeholder/200/200',
        sku: record.SKU || '',
      };
    });
    
    // Return the products as JSON
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error(error.stack); // This will give more detailed error information
    
    // For development, if the CSV reading fails, return some sample products
    const sampleProducts = [
      { id: 1, name: "Widget A", price: 29.99, image: "/api/placeholder/200/200" },
      { id: 2, name: "Deluxe Widget", price: 49.99, image: "/api/placeholder/200/200" },
      { id: 3, name: "Basic Widget", price: 19.99, image: "/api/placeholder/200/200" },
      { id: 4, name: "Super Gadget", price: 39.99, image: "/api/placeholder/200/200" },
      { id: 5, name: "Mega Gadget", price: 59.99, image: "/api/placeholder/200/200" },
      { id: 6, name: "Mini Gadget", price: 24.99, image: "/api/placeholder/200/200" }
    ];
    
    return res.status(200).json({ 
      products: sampleProducts,
      error: 'Could not load actual products, showing samples instead. Error: ' + error.message
    });
  }
};