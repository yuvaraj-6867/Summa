import React, { useState, useEffect } from "react";

interface ModalProps { onClose: () => void; onSubmit: () => void; }

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const BHK_DESC: Record<string, string> = {
  "1 BHK": "One bedroom", "2 BHK": "Two bedroom",
  "3 BHK": "Three bedroom", "4 BHK": "Four bedroom", "5+ BHK": "Five+ bedroom"
};
const ROOMS = ["Living Room", "Kitchen", "Bedroom", "Bathroom", "Foyer", "Balcony"];
const BUDGET: Record<string, [number, number]> = {
  "1 BHK": [2, 4], "2 BHK": [3, 6], "3 BHK": [5, 9], "4 BHK": [8, 14], "5+ BHK": [12, 20]
};
const CALC_STEPS = ["Analyzing your requirements", "Processing room selections", "Calculating budget range", "Preparing your estimate..."];

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
  const [step, setStep] = useState(1);
  const [bhk, setBhk] = useState("");
  const [rooms, setRooms] = useState<Record<string, number>>(
    Object.fromEntries(ROOMS.map(r => [r, r === "Bedroom" || r === "Bathroom" ? 2 : 1]))
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calcStep, setCalcStep] = useState(0);
  const [done, setDone] = useState(false);

  // Step 4: animate calc steps
  useEffect(() => {
    if (step !== 4) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCalcStep(i);
      if (i >= CALC_STEPS.length) {
        clearInterval(t);
        setTimeout(() => setDone(true), 600);
      }
    }, 700);
    return () => clearInterval(t);
  }, [step]);

  const adjustRoom = (r: string, delta: number) =>
    setRooms(prev => ({ ...prev, [r]: Math.max(0, prev[r] + delta) }));

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""))) e.phone = "Enter valid 10-digit mobile";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitAndNext = async () => {
    if (!validateDetails()) return;
    setStep(4);
    try {
      await fetch("https://summa-3m4t.onrender.com/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: name, lastName: "", email, phone, propertyType: "Apartment", bhk, service: "Full Home Interiors" }),
      });
    } catch {}
  };

  const [min, max] = BUDGET[bhk] || [0, 0];

  const stepLabels = ["Property", "Rooms", "Details", "Estimate"];

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 640, padding: "2rem" }}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem", gap: 0 }}>
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done2 = step > n;
            return (
              <React.Fragment key={n}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: done2 ? "#4CAF50" : active ? "#E8651A" : "#e0e0e0",
                    color: done2 || active ? "#fff" : "#999", fontWeight: 600, fontSize: 14, marginBottom: 4,
                  }}>{n}</div>
                  <span style={{ fontSize: 11, color: active ? "#E8651A" : done2 ? "#4CAF50" : "#999" }}>{label}</span>
                </div>
                {i < 3 && (
                  <div style={{ flex: 2, height: 3, background: step > n ? "#E8651A" : "#e0e0e0", marginBottom: 18 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step 1: Property */}
        {step === 1 && (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: "1.25rem" }}>Select Your Property Type</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
              {BHK_OPTIONS.map(b => (
                <div key={b} onClick={() => setBhk(b)} style={{
                  border: `1.5px solid ${bhk === b ? "#E8651A" : "#e0e0e0"}`,
                  borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                  background: bhk === b ? "#fff5f0" : "#fff",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: bhk === b ? "#E8651A" : "#222" }}>🏠 {b}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{BHK_DESC[b]}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => bhk && setStep(2)} style={btnStyle(!bhk)}>Next</button>
            </div>
          </>
        )}

        {/* Step 2: Rooms */}
        {step === 2 && (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: "1.25rem" }}>Select Rooms to Design</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.5rem" }}>
              {ROOMS.map(r => (
                <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e0e0e0", borderRadius: 10, padding: "12px 16px" }}>
                  <span style={{ fontSize: 14 }}>{r}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => adjustRoom(r, -1)} style={counterBtn}>−</button>
                    <span style={{ fontWeight: 600, minWidth: 16, textAlign: "center" }}>{rooms[r]}</span>
                    <button onClick={() => adjustRoom(r, 1)} style={counterBtn}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} style={backBtn}>Back</button>
              <button onClick={() => setStep(3)} style={btnStyle(false)}>Next</button>
            </div>
          </>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: "1.25rem" }}>Your Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
              {[
                { label: "Full Name", val: name, set: setName, key: "name", placeholder: "Priya Rajan", type: "text" },
                { label: "Phone Number", val: phone, set: setPhone, key: "phone", placeholder: "98765 43210", type: "tel" },
                { label: "Email Address", val: email, set: setEmail, key: "email", placeholder: "priya@email.com", type: "email" },
              ].map(f => (
                <div key={f.key}>
                  <input
                    type={f.type} placeholder={f.placeholder} value={f.val}
                    onChange={e => { f.set(e.target.value); setErrors(prev => ({ ...prev, [f.key]: "" })); }}
                    style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors[f.key] ? "#c0392b" : "#e0e0e0"}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                  {errors[f.key] && <span style={{ fontSize: 11, color: "#c0392b" }}>{errors[f.key]}</span>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={backBtn}>Back</button>
              <button onClick={submitAndNext} style={btnStyle(false)}>Get Free Estimate</button>
            </div>
          </>
        )}

        {/* Step 4: Calculating / Result */}
        {step === 4 && !done && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: 60, height: 60, border: "4px solid #e0e0e0", borderTop: "4px solid #E8651A", borderRadius: "50%", margin: "0 auto 1.5rem", animation: "spin 1s linear infinite" }} />
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: "1rem" }}>Calculating Your Estimate...</div>
            <div style={{ background: "#f5f5f5", borderRadius: 10, padding: "12px 20px", marginBottom: "1.5rem", fontSize: 13, color: "#666" }}>
              Please wait while we prepare your personalized cost estimate
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
              {CALC_STEPS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: calcStep > i ? "#4CAF50" : calcStep === i ? "#E8651A" : "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0 }}>
                    {calcStep > i ? "✓" : ""}
                  </span>
                  <span style={{ color: calcStep >= i ? "#222" : "#aaa" }}>{s}</span>
                </div>
              ))}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === 4 && done && (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#4CAF50", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 28, color: "#fff" }}>✓</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: "0.75rem" }}>Your Interior Cost Estimate Is Ready</div>
            <div style={{ display: "inline-block", background: "#E8651A", color: "#fff", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: "1.5rem" }}>{bhk} Property</div>
            <div style={{ border: "2px solid #E8651A", borderRadius: 12, padding: "1.5rem", background: "#fff8f5", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Here's Your Estimated Budget Range</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#4CAF50" }}>₹{min}L – ₹{max}L*</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: "0.75rem", borderLeft: "3px solid #e0e0e0", paddingLeft: 10 }}>
                Note: This isn't a final quote and can be customised to suit your needs.
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: "0.5rem" }}>Thank You, {name} For Giving Us This Opportunity! 🎉</div>
            <div style={{ fontSize: 13, color: "#666" }}>We will get in touch with you shortly via email <strong>{email}</strong></div>
            <button onClick={() => { onSubmit(); }} style={{ ...btnStyle(false), marginTop: "1.5rem", width: "100%" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  background: disabled ? "#ccc" : "#E8651A", color: "#fff", border: "none",
  borderRadius: 24, padding: "10px 28px", fontWeight: 600, fontSize: 14,
  cursor: disabled ? "not-allowed" : "pointer",
});

const backBtn: React.CSSProperties = {
  background: "#666", color: "#fff", border: "none",
  borderRadius: 24, padding: "10px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer",
};

const counterBtn: React.CSSProperties = {
  width: 30, height: 30, borderRadius: "50%", background: "#E8651A",
  color: "#fff", border: "none", fontSize: 18, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
};
