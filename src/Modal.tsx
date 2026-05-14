interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Book a Free Consultation</div>
        <div className="modal-sub">Tell us about your space — our designer will call you within 24 hours.</div>
        <div className="form-grid">
          <div className="form-row"><label>First Name</label><input type="text" placeholder="Priya" /></div>
          <div className="form-row"><label>Last Name</label><input type="text" placeholder="Rajan" /></div>
        </div>
        <div className="form-row"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div className="form-grid">
          <div className="form-row">
            <label>Property Type</label>
            <select><option>Apartment</option><option>Villa</option><option>Independent House</option><option>Commercial</option></select>
          </div>
          <div className="form-row">
            <label>BHK / Size</label>
            <select><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>5+ BHK</option></select>
          </div>
        </div>
        <div className="form-row">
          <label>What are you looking for?</label>
          <select><option>Full Home Interiors</option><option>Modular Kitchen</option><option>Bedroom &amp; Wardrobe</option><option>Pooja Room</option><option>Turnkey Project</option></select>
        </div>
        <button
          className="btn-gold"
          style={{ width: "100%", marginTop: 8, padding: 14, fontSize: 12, letterSpacing: 2 }}
          onClick={onClose}
        >
          Submit Enquiry →
        </button>
      </div>
    </div>
  );
}
