import { useState } from 'react';

const products = [
  { name: "Oxytocin Acetate - 2mg", price: 59.99, image: "/images/oxytocin_acetate.png" },
  { name: "PEG-MGF", price: 70, image: "/images/peg_mgf.png" },
  { name: "PT-141 5mg", price: 52, image: "/images/pt_141.png" },
  { name: "Selank 5mg", price: 55, image: "/images/selank.png" },
  { name: "Semaglutide 2mg", price: 50, image: "/images/semaglutide.png" },
  { name: "Semax 10mg", price: 74.99, image: "/images/semax.png" },
  { name: "Sermorelin 2mg", price: 100, image: "/images/sermorelin.png" },
  { name: "Snap-8 10mg", price: 33, image: "/images/snap_8.png" },
  { name: "Thymulin", price: 119.99, image: "/images/thymulin.png" },
  { name: "Tesamorelin 10 mg", price: 140, image: "/images/tesamorelin.png" },
  { name: "Tesamorelin 5 mg", price: 80, image: "/images/tesamorelin.png" },
  { name: "Tesamorelin 2 mg", price: 60, image: "/images/tesamorelin.png" },
  { name: "Thymosin alpha 1 - 5 MG", price: 70, image: "/images/thymosin_alpha_1.png" },
  { name: "TB-500 2mg", price: 36, image: "/images/tb_500.png" },
  { name: "Retatrutide 10 MG", price: 144, image: "/images/retatrutiude.png" },
  { name: "Adipotide - 10 MG", price: 88.99, image: "/images/adipotide.png" },
  { name: "NAD+ 500mg", price: 84, image: "/images/nad_.png" },
  { name: "AOD-9604 2mg", price: 42, image: "/images/aod_9604.png" },
  { name: "BPC 157 2mg", price: 27, image: "/images/bpc157.png" },
  { name: "Cagrilintide 5mg", price: 90, image: "/images/cagrilintide.png" },
  { name: "DSIP (Delta Sleep-Inducing Peptide) 5mg", price: 50, image: "/images/dsip.png" },
  { name: "Epithalon 10mg", price: 90, image: "/images/epithalon.png" },
  { name: "GHK-Cu 50mg", price: 45, image: "/images/ghk_cu.png" },
  { name: "GHRP-2 - 2mg", price: 36, image: "/images/ghrp_2.png" },
  { name: "HCG 5,000iu", price: 60, image: "/images/hcg.png" },
  { name: "Hexarelin 2mg", price: 45, image: "/images/hexarelin.png" },
  { name: "IGF-1 LR3 1mg", price: 110, image: "/images/igf_lr3.png" },
  { name: "Kisspeptin-10 5mg", price: 65, image: "/images/kisspeptin_10.png" },
  { name: "MOTS-C 10mg", price: 65, image: "/images/mots_c.png" },
  { name: "Melanotan 2 10mg", price: 30, image: "/images/melanotan_2.png" },
  { name: "CJC-1295 with DAC 5mg", price: 56, image: "/images/cjc_1295_with_dac.png" },
  { name: "Tirzepatide 5mg", price: 84, image: "/images/tirzepatide.png" },
  { name: "Tirzepatide 10 mg", price: 117, image: "/images/tirzepatide.png" },
  { name: "Tirzepatide 15 mg", price: 150, image: "/images/tirzepatide.png" },
  { name: "Tirzepatide 30 mg", price: 210, image: "/images/tirzepatide.png" },
  { name: "Tirzepatide 60 mg", price: 360, image: "/images/tirzepatide.png" },
  { name: "Thymosin alpha 1 - 10 MG", price: 105, image: "/images/thymosin_alpha_1.png" },
  { name: "TB-500 5mg", price: 63, image: "/images/tb_500.png" },
  { name: "TB-500 10mg", price: 96, image: "/images/tb_500.png" },
  { name: "Semaglutide 5mg", price: 84, image: "/images/semaglutide.png" },
  { name: "Semaglutide 10mg", price: 120, image: "/images/semaglutide.png" },
  { name: "Sermorelin 5mg", price: 81, image: "/images/sermorelin.png" },
  { name: "SS-31 10mg", price: 63, image: "/images/ss_31.png" },
  { name: "SS-31 50mg", price: 168, image: "/images/ss_31.png" },
  { name: "HMG 75iu/vial", price: 36, image: "/images/character.png" },
  { name: "Hexarelin 5mg", price: 45, image: "/images/hexarelin.png" },
  { name: "GHRP-2 5mg", price: 39, image: "/images/ghrp_2.png" },
  { name: "GHK-Cu 100mg", price: 75, image: "/images/ghk_cu.png" },
  { name: "IGF-1 LR3 .1mg", price: 35, image: "/images/igf_lr3.png" },
  { name: "Ipamorelin 2mg", price: 27, image: "/images/ipamorelin.png" },
  { name: "Ipamorelin 5mg", price: 27, image: "/images/ipamorelin.png" },
  { name: "Ipamorelin 10mg", price: 27, image: "/images/ipamorelin.png" },
  { name: "CJC-1295 without DAC 2mg", price: 30, image: "/images/cjc_1295_with_dac.png" },
  { name: "CJC-1295 without DAC 5mg", price: 48, image: "/images/cjc_1295_with_dac.png" },
  { name: "CJC-1295 without DAC 10mg", price: 81, image: "/images/cjc_1295_with_dac.png" },
  { name: "BPC 157 5mg", price: 36, image: "/images/bpc157.png" },
  { name: "BPC 157 10mg", price: 60, image: "/images/bpc157.png" },
  { name: "CJC-1295 WITH DAC 2mg", price: 36, image: "/images/cjc_1295_with_dac.png" },
  { name: "Cagrilintide 10mg", price: 150, image: "/images/cagrilintide.png" },
  { name: "PT-141 10mg", price: 104, image: "/images/pt_141.png" },
];

export default function Home() {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleQuantityChange = (idx, value) => {
    const newQuantities = [...quantities];
    newQuantities[idx] = Math.max(0, parseInt(value) || 0);
    setQuantities(newQuantities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    setSuccess(false);

    const selectedProducts = products
      .map((p, i) => ({ ...p, quantity: quantities[i] }))
      .filter(p => p.quantity > 0);

    if (!selectedProducts.length) {
      setError('Please select at least one product.');
      setSubmitting(false);
      return;
    }

    const totalAmount = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          specialInstructions,
          products: selectedProducts,
          totalAmount,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setCustomerName('');
        setEmail('');
        setSpecialInstructions('');
        setQuantities(Array(products.length).fill(0));
      } else {
        setError('There was a problem submitting your order.');
      }
    } catch {
      setError('There was a problem submitting your order.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <style jsx global>{`
        body { background: #22262c; color: #f8f8f8; font-family: Inter, sans-serif; }
        .container { max-width: 1180px; margin: 0 auto; background: #2d3138; padding: 30px 20px; }
        .site-header { background: #22262c; border-bottom: 1px solid #4a4e58; }
        .site-header-wrapper { max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 94px; }
        .site-logo img { height: 40px; margin: 20px 0 20px 10px; }
        .site-title { font-size: 2rem; font-weight: 700; color: #f8f8f8; margin-left: 20px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: 500; }
        input[type="text"], input[type="email"] { width: 100%; padding: 12px; border: 1px solid #4a4e58; border-radius: 4px; background: #343842; color: #f8f8f8; font-size: 1rem; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 24px; margin-bottom: 30px; }
        .product-card { border: 1px solid #4a4e58; border-radius: 8px; padding: 18px 14px 20px 14px; background: #2d3138; }
        .product-card.selected { border-color: #e00b25; background-color: #343842; }
        .product-image { width: 100%; height: 200px; object-fit: contain; margin-bottom: 10px; background: #40434e; border-radius: 4px; }
        .product-name-main { font-size: 1.25rem; color: #fff; display: block; margin-bottom: 2px; }
        .product-price-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .product-original-price { color: #93989f; font-size: 1.1rem; text-decoration: line-through; margin-right: 6px; }
        .product-sale-price { color: #fff; font-size: 1.2rem; font-weight: 400; margin-right: 8px; }
        .discount-pill { background: transparent; color: #f2ff86; border-radius: 16px; padding: 2px 14px; font-size: 0.97rem; border: 1px solid #f2ff86; }
        .product-quantity { display: flex; align-items: center; }
        .quantity-btn { width: 32px; height: 32px; background: #343842; border: 1px solid #4a4e58; font-size: 18px; color: #f8f8f8; border-radius: 4px; }
        .quantity-btn:hover { background: #4a4e58; }
        .quantity-input { width: 50px; height: 32px; text-align: center; margin: 0 5px; border: 1px solid #4a4e58; border-radius: 4px; font-size: 1rem; background: #343842; color: #f8f8f8; }
        .btn { padding: 12px 24px; background: #f8f8f8; color: #22262c; border: none; border-radius: 4px; font-size: 1rem; font-weight: 600; }
        .btn:hover { background: #e00b25; color: #fff; }
        .btn-secondary { background: #2196F3; color: #fff; }
        .actions { display: flex; justify-content: space-between; margin-top: 20px; }
        .order-summary { margin-top: 30px; border-top: 1px solid #4a4e58; padding-top: 20px; }
        .order-summary h3 { margin-bottom: 15px; }
        .order-table { width: 100%; border-collapse: collapse; }
        .order-table th, .order-table td { padding: 12px; text-align: left; border-bottom: 1px solid #4a4e58; }
        .order-table th { background: #343842; color: #f8f8f8; }
        .site-footer-bar-wrapper { background: #22262c; border-top: 1px solid #4a4e58; margin-top: 40px; }
        .site-footer-bar { max-width: 1180px; margin: 0 auto; padding: 30px 20px 20px 20px; display: flex; justify-content: flex-end; align-items: center; }
        .site-info { color: #f8f8f8; font-size: 1rem; }
        .success-message { text-align: center; background: #357b49; color: #f8f8f8; padding: 20px; border-radius: 4px; margin-top: 20px; }
        .error-message { text-align: center; background: #b71c1c; color: #f8f8f8; padding: 20px; border-radius: 4px; margin-top: 20px; }
      `}</style>
      <header className="site-header">
        <div className="site-header-wrapper">
          <div className="site-logo">
            <img src="/images/character.png" alt="Total Health Online" />
          </div>
          <span className="site-title">Purchase Order Form</span>
        </div>
      </header>
      <div className="container">
        {success && <div className="success-message"><h2>Thank you for your order!</h2><p>Your purchase order has been submitted and an invoice will be sent to your email address shortly.</p></div>}
        {error && <div className="error-message"><h2>There was a problem with your order</h2><p>{error}</p></div>}
        <form onSubmit={handleSubmit} style={{ display: success ? 'none' : 'block' }}>
          <div className="form-group">
            <label htmlFor="customerName">Your Name</label>
            <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="specialInstructions">Special Instructions</label>
            <input type="text" id="specialInstructions" value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} placeholder="Any special instructions for your order..." />
          </div>
          <div className="form-group">
            <label>Select Products</label>
            <div className="product-grid">
              {products.map((product, idx) => (
                <div className={`product-card${quantities[idx] > 0 ? ' selected' : ''}`} key={idx}>
                  <div className="product-name-row">
                    <span className="product-name-main">{product.name}</span>
                  </div>
                  <div className="product-price-row">
                    <span className="product-original-price">${(product.price * 1.5).toFixed(2)}</span>
                    <span className="product-sale-price">${product.price.toFixed(2)}</span>
                    <span className="discount-pill">-{Math.round(100 * (product.price * 0.5) / (product.price * 1.5))}%</span>
                  </div>
                  <img src={product.image} alt={product.name} className="product-image" onError={e => e.target.style.display = 'none'} />
                  <div className="product-quantity">
                    <button type="button" className="quantity-btn decrease" onClick={() => handleQuantityChange(idx, quantities[idx] - 1)}>-</button>
                    <input type="number" min="0" value={quantities[idx]} className="quantity-input" onChange={e => handleQuantityChange(idx, e.target.value)} />
                    <button type="button" className="quantity-btn increase" onClick={() => handleQuantityChange(idx, quantities[idx] + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  quantities[idx] > 0 && (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td>{quantities[idx]}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>${(product.price * quantities[idx]).toFixed(2)}</td>
                    </tr>
                  )
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right' }}><strong>Total:</strong></td>
                  <td>${products.reduce((sum, p, i) => sum + p.price * quantities[i], 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="encryption-notice" style={{ marginTop: 20, color: '#93989f', fontSize: 14 }}>
            <svg className="encryption-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>Your item details are encrypted and not shared with our servers. Only your name, email, and total amount will be used for invoicing.</span>
          </div>
          <div className="actions">
            <button type="button" className="btn btn-secondary" onClick={() => { setCustomerName(''); setEmail(''); setSpecialInstructions(''); setQuantities(Array(products.length).fill(0)); }}>Clear Form</button>
            <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Order'}</button>
          </div>
        </form>
      </div>
      <footer>
        <div className="site-footer-bar-wrapper">
          <div className="site-footer-bar">
            <div className="site-info">© 2025 Total Health Standard</div>
          </div>
        </div>
      </footer>
    </div>
  );
} 