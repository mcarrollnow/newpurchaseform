import React from 'react';
// Import these via CDN in _document.js or add to package.json if not present
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const OrderCodeModal = ({ orderCode, onClose, timestamp }) => {
  // Ensure export is 1080x1080 and style matches ORDERSTAMP.png
  const handleSaveAsImage = async () => {
    if (!window.html2canvas) {
      alert('Image export not available.');
      return;
    }
    const node = document.getElementById('order-stamp-export');
    const canvas = await window.html2canvas(node, { width: 1080, height: 1080, backgroundColor: '#fff', scale: 1 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'order-stamp.png';
    link.click();
  };

  const handleSaveAsPDF = async () => {
    if (!window.html2canvas || !window.jspdf) {
      alert('PDF export not available.');
      return;
    }
    const node = document.getElementById('order-stamp-export');
    const canvas = await window.html2canvas(node, { width: 1080, height: 1080, backgroundColor: '#fff', scale: 1 });
    const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'px', format: [1080, 1080] });
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 1080, 1080);
    pdf.save('order-stamp.pdf');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#0b0b0b', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', background: 'none', boxShadow: 'none', padding: 0 }}>
          <button onClick={onClose} style={{ position: 'absolute', right: 24, top: 24, background: 'none', border: 'none', fontSize: 48, cursor: 'pointer', color: '#fff', zIndex: 2 }}>&times;</button>
          {/* Exportable stamp area */}
          <div id="order-stamp-export" style={{ width: 1080, height: 1080, background: '#0b0b0b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '4.3rem', fontWeight: 900, color: '#000', letterSpacing: '0.18em', marginTop: 80, marginBottom: 'auto', textAlign: 'center' }}>{orderCode}</div>
            <div style={{ fontSize: '1.7rem', color: '#000', position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center' }}>{timestamp}</div>
          </div>
          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 36 }}>
            <button className="btn" style={{ marginRight: 12, marginBottom: 8, width: 220 }} onClick={handleSaveAsImage}>Save as Image</button>
            <button className="btn" style={{ width: 220 }} onClick={handleSaveAsPDF}>Save as PDF</button>
            <div style={{ color: '#fff', fontSize: 16, marginTop: 20, marginBottom: 0, textAlign: 'center', maxWidth: 400 }}>
              To save to your camera roll, tap the downloaded image or PDF and choose Save Image/Share.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCodeModal;
