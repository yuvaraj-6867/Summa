import React, { useState, useEffect } from "react";

interface Props { onClose: () => void; onSubmit: () => void; }

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const ROOMS = ["Living Room", "Kitchen", "Bedroom", "Bathroom", "Foyer", "Balcony"];
// Base cost per BHK (in Lakhs) [min, max]
const BHK_BASE: Record<string, [number, number]> = {
  "1 BHK": [1, 2], "2 BHK": [1.5, 3], "3 BHK": [2, 4], "4 BHK": [3, 5], "5+ BHK": [4, 7],
};
// Cost per room unit (in Lakhs) [min, max]
const ROOM_COST: Record<string, [number, number]> = {
  "Living Room": [0.6, 1.2], "Kitchen": [0.8, 1.5], "Bedroom": [0.5, 1.0],
  "Bathroom": [0.3, 0.6], "Foyer": [0.2, 0.4], "Balcony": [0.15, 0.3],
};

const calcBudget = (bhk: string, rooms: Record<string, number>): [number, number] => {
  const [bMin, bMax] = BHK_BASE[bhk] || [0, 0];
  let rMin = 0, rMax = 0;
  Object.entries(rooms).forEach(([room, count]) => {
    const [cMin, cMax] = ROOM_COST[room] || [0, 0];
    rMin += cMin * count;
    rMax += cMax * count;
  });
  return [Math.round((bMin + rMin) * 10) / 10, Math.round((bMax + rMax) * 10) / 10];
};
const BHK_ROOMS: Record<string, Record<string, number>> = {
  "1 BHK": { "Living Room": 1, "Kitchen": 1, "Bedroom": 1, "Bathroom": 1, "Foyer": 0, "Balcony": 0 },
  "2 BHK": { "Living Room": 1, "Kitchen": 1, "Bedroom": 2, "Bathroom": 2, "Foyer": 0, "Balcony": 1 },
  "3 BHK": { "Living Room": 1, "Kitchen": 1, "Bedroom": 3, "Bathroom": 3, "Foyer": 1, "Balcony": 1 },
  "4 BHK": { "Living Room": 1, "Kitchen": 1, "Bedroom": 4, "Bathroom": 4, "Foyer": 1, "Balcony": 2 },
  "5+ BHK": { "Living Room": 2, "Kitchen": 1, "Bedroom": 5, "Bathroom": 5, "Foyer": 1, "Balcony": 2 },
};
const CALC_STEPS = [
  "Processing room selections",
  "Calculating budget range",
  "Preparing your estimate...",
];

export default function EstimateModal({ onClose, onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [bhk, setBhk] = useState("");
  const [rooms, setRooms] = useState<Record<string, number>>(
    Object.fromEntries(ROOMS.map(r => [r, 0]))
  );
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState("Full Home Interiors");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calcStep, setCalcStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step !== 4) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCalcStep(i);
      if (i >= CALC_STEPS.length) { clearInterval(t); setTimeout(() => setDone(true), 600); }
    }, 700);
    return () => clearInterval(t);
  }, [step]);

  const adjustRoom = (r: string, d: number) =>
    setRooms(prev => ({ ...prev, [r]: Math.max(0, prev[r] + d) }));

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""))) e.phone = "Enter valid 10-digit mobile";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter valid email";
    if (!budget) e.budget = "Required";
    if (!timeline) e.timeline = "Required";
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
        body: JSON.stringify({ firstName: name, lastName: "", email, phone, city, area, propertyType: "Apartment", bhk, service, budget, timeline }),
      });
    } catch {}
  };

  const [min, max] = calcBudget(bhk, rooms);
  const stepLabels = ["Property", "Rooms", "Details", "Estimate"];

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 640, padding: "2rem" }}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const active = step === n, completed = step > n;
            return (
              <React.Fragment key={n}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 600, fontSize: 14, marginBottom: 4,
                    background: completed ? "#4CAF50" : active ? "#E8651A" : "#e0e0e0",
                    color: completed || active ? "#fff" : "#999",
                  }}>{n}</div>
                  <span style={{ fontSize: 11, color: active ? "#E8651A" : completed ? "#4CAF50" : "#999" }}>{label}</span>
                </div>
                {i < 3 && <div style={{ flex: 2, height: 3, background: step > n ? "#E8651A" : "#e0e0e0", marginBottom: 18 }} />}
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
                <div key={b} onClick={() => { setBhk(b); setRooms(BHK_ROOMS[b]); }} style={{
                  border: `1.5px solid ${bhk === b ? "#E8651A" : "#e0e0e0"}`,
                  borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                  background: bhk === b ? "#fff5f0" : "#fff",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: bhk === b ? "#E8651A" : "#222" }}>🏠 {b}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={onClose} style={backBtn}>Back</button>
              <button onClick={() => bhk && setStep(2)} style={btn(!bhk)}>Next</button>
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
              <button onClick={() => setStep(3)} style={btn(false)}>Next</button>
            </div>
          </>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: "1.25rem" }}>Your Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
              {([
                { label: "Full Name", val: name, set: setName, key: "name", placeholder: "Enter your name", type: "text" },
                { label: "Phone Number", val: phone, set: setPhone, key: "phone", placeholder: "Enter your phone number", type: "tel" },
                { label: "Email Address", val: email, set: setEmail, key: "email", placeholder: "Enter your email address", type: "email" },
                { label: "City", val: city, set: setCity, key: "city", placeholder: "Enter your city", type: "text" },
                { label: "Area / Locality", val: area, set: setArea, key: "area", placeholder: "Enter your area or locality", type: "text" },
              ] as const).map(f => (
                <div key={f.key}>
                  <input
                    type={f.type} placeholder={f.placeholder} value={f.val}
                    onChange={e => { f.set(e.target.value as any); setErrors(p => ({ ...p, [f.key]: "" })); }}
                    style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors[f.key] ? "#c0392b" : "#e0e0e0"}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                  {errors[f.key] && <span style={{ fontSize: 11, color: "#c0392b" }}>{errors[f.key]}</span>}
                </div>
              ))}
              <select value={service} onChange={e => setService(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: "1px solid #e0e0e0", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff" }}>
                {["Full Home Interiors","Modular Kitchen","Bedroom & Wardrobe","Pooja Room","Turnkey Project"].map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors.budget ? "#c0392b" : "#e0e0e0"}`, borderRadius: 10, fontSize: 14, outline: "none", background: "#fff" }}>
                <option value="">Budget Ready?</option>
                {["Yes","No","Maybe"].map(s => <option key={s}>{s}</option>)}
              </select>
              {errors.budget && <span style={{ fontSize: 11, color: "#c0392b" }}>{errors.budget}</span>}
              <select value={timeline} onChange={e => setTimeline(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors.timeline ? "#c0392b" : "#e0e0e0"}`, borderRadius: 10, fontSize: 14, outline: "none", background: "#fff" }}>
                <option value="">When do you want to start?</option>
                {["Yes - Immediately","Within 1 Month","1-3 Months","3-6 Months","Just Exploring"].map(s => <option key={s}>{s}</option>)}
              </select>
              {errors.timeline && <span style={{ fontSize: 11, color: "#c0392b" }}>{errors.timeline}</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={backBtn}>Back</button>
              <button onClick={submitAndNext} style={btn(false)}>Get Free Estimate</button>
            </div>
          </>
        )}

        {/* Step 4: Calculating */}
        {step === 4 && !done && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: 60, height: 60, border: "4px solid #e0e0e0", borderTop: "4px solid #E8651A", borderRadius: "50%", margin: "0 auto 1.5rem", animation: "spin 1s linear infinite" }} />
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: "1rem" }}>Calculating Your Estimate...</div>
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

        {/* Step 4: Result */}
        {step === 4 && done && (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#4CAF50", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 28, color: "#fff" }}>✓</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: "0.75rem" }}>Your Interior Cost Estimate Is Ready</div>
            <div style={{ display: "inline-block", background: "#E8651A", color: "#fff", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: "1.5rem" }}>{bhk} Property</div>
            <div style={{ border: "2px solid #E8651A", borderRadius: 12, padding: "1.5rem", background: "#fff8f5", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Estimated Budget Range</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#4CAF50" }}>₹{min}L – ₹{max}L*</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: "0.75rem", borderLeft: "3px solid #e0e0e0", paddingLeft: 10 }}>
                Note: This isn't a final quote and can be customised to suit your needs.
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: "0.5rem" }}>Thank You, {name}! 🎉</div>
            <div style={{ fontSize: 13, color: "#666" }}>We will get in touch via <strong>{email}</strong></div>
            <button onClick={onSubmit} style={{ ...btn(false), marginTop: "1.5rem", width: "100%" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

const btn = (disabled: boolean): React.CSSProperties => ({
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
  display: "flex", alignItems: "center", justifyContent: "center",
};
