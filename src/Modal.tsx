import React, { useState } from "react";

interface ModalProps { onClose: () => void; onSubmit: () => void; }
interface FormData {
  firstName: string; lastName: string; email: string;
  phone: string; propertyType: string; bhk: string; service: string;
}

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  propertyType: "Apartment", bhk: "2 BHK", service: "Full Home Interiors",
};

export function Toast({ message, onHide }: { message: string; onHide: () => void }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
      background: "#1C1710", color: "#fff", padding: "14px 24px",
      borderRadius: 40, display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)", zIndex: 500,
      fontSize: 14, fontFamily: "'Jost', sans-serif", fontWeight: 500,
    }}>
      <span style={{ background: "#B8924A", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</span>
      {message}
      <button onClick={onHide} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 16, marginLeft: 4 }}>×</button>
    </div>
  );
}

export default function Modal({ onClose, onSubmit }: ModalProps) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter valid email";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))) e.phone = "Enter valid 10-digit mobile";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:4000/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { onSubmit(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Book a Free Consultation</div>
        <div className="modal-sub">Fill in your details — our designer will call you within 24 hours.</div>

        <div className="form-grid">
          <div className="form-row">
            <label>First Name</label>
            <input type="text" placeholder="Priya" value={form.firstName} onChange={set("firstName")} />
            {errors.firstName && <span style={err}>{errors.firstName}</span>}
          </div>
          <div className="form-row">
            <label>Last Name</label>
            <input type="text" placeholder="Rajan" value={form.lastName} onChange={set("lastName")} />
            {errors.lastName && <span style={err}>{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-row">
          <label>Email Address</label>
          <input type="email" placeholder="priya@email.com" value={form.email} onChange={set("email")} />
          {errors.email && <span style={err}>{errors.email}</span>}
        </div>
        <div className="form-row">
          <label>Phone Number</label>
          <input type="tel" placeholder="98765 43210" value={form.phone} onChange={set("phone")} />
          {errors.phone && <span style={err}>{errors.phone}</span>}
        </div>
        <div className="form-grid">
          <div className="form-row">
            <label>Property Type</label>
            <select value={form.propertyType} onChange={set("propertyType")}>
              <option>Apartment</option><option>Villa</option>
              <option>Independent House</option><option>Commercial</option>
            </select>
          </div>
          <div className="form-row">
            <label>BHK / Size</label>
            <select value={form.bhk} onChange={set("bhk")}>
              <option>1 BHK</option><option>2 BHK</option>
              <option>3 BHK</option><option>4 BHK</option><option>5+ BHK</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <label>What are you looking for?</label>
          <select value={form.service} onChange={set("service")}>
            <option>Full Home Interiors</option><option>Modular Kitchen</option>
            <option>Bedroom &amp; Wardrobe</option><option>Pooja Room</option>
            <option>Turnkey Project</option>
          </select>
        </div>

        {status === "error" && <p style={{ ...err, marginBottom: 8 }}>Something went wrong. Please try again.</p>}

        <button
          className="btn-gold"
          style={{ width: "100%", marginTop: 8, padding: 14, fontSize: 12, letterSpacing: 2, opacity: status === "loading" ? 0.7 : 1 }}
          onClick={submit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Enquiry →"}
        </button>
      </div>
    </div>
  );
}

const err: React.CSSProperties = { display: "block", fontSize: 11, color: "#c0392b", marginTop: 4 };
