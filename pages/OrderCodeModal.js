import React from 'react';
// Import these via CDN in _document.js or add to package.json if not present
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const OrderCodeModal = ({ orderCode, onClose }) => {
  // Use window.html2canvas and window.jspdf if loaded via CDN
  const handleSaveAsImage = async () => {
    if (!window.html2canvas) {
      alert('Image export not available.');
      return;
    }
    const orderCodeElement = document.getElementById('order-code');
    const canvas = await window.html2canvas(orderCodeElement);
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'order-code.png';
    link.click();
  };

  const handleSaveAsPDF = async () => {
    if (!window.html2canvas || !window.jspdf) {
      alert('PDF export not available.');
      return;
    }
    const orderCodeElement = document.getElementById('order-code');
    const canvas = await window.html2canvas(orderCodeElement);
    const pdf = new window.jspdf.jsPDF();
    const imgData = canvas.toDataURL('image/png');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('order-code.pdf');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', color: '#222', borderRadius: 10, padding: 32, minWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', textAlign: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888' }}>&times;</button>
        <h2 style={{ marginBottom: 16 }}>Order Confirmation</h2>
        <div id="order-code" style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2, background: '#f2ff86', color: '#222', padding: '16px 0', borderRadius: 8, margin: '16px 0', boxShadow: '0 2px 8px #e0e0e0' }}>{orderCode}</div>
        <p style={{ color: '#357b49', fontWeight: 600, marginBottom: 12 }}>Thanks for your request, check your inbox for a message from us soon!</p>
        <p style={{ color: '#444', marginBottom: 24 }}>Please save this order number for your records.</p>
        <button className="btn" style={{ marginRight: 12 }} onClick={handleSaveAsImage}>Save as Image</button>
        <button className="btn" onClick={handleSaveAsPDF}>Save as PDF</button>
      </div>
    </div>
  );
};

export default OrderCodeModal;
