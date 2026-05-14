import { useState } from "react";
import "./eastlake.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Modal, { Toast } from "./Modal";
import EstimateModal from "./EstimateModal";
import { IMG, services, portfolio, processSteps, testimonials, aboutFeatures, TABS } from "./data";

export default function EastlakeEmporium() {
  const [modal, setModal] = useState(false);
  const [estimateModal, setEstimateModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const handleModalClose = (submitted = false) => {
    setModal(false);
    if (submitted) { setToast(true); setTimeout(() => setToast(false), 4000); }
  };

  const handleEstimateClose = (submitted = false) => {
    setEstimateModal(false);
    if (submitted) { setToast(true); setTimeout(() => setToast(false), 4000); }
  };

  const filtered = activeTab === "All"
    ? portfolio
    : portfolio.filter(p => p.cat.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <>
      <Navbar onEnquire={() => setModal(true)} />
      <Hero onQuote={() => setEstimateModal(true)} />

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-badge">
              <div className="about-badge-num">10+</div>
              <div className="about-badge-text">Years<br />Design</div>
            </div>
            <img className="about-img-main" src={IMG.living} alt="Living Room" />
            <img className="about-img-accent" src={IMG.pooja} alt="Pooja Room" />
          </div>
          <div style={{ paddingBottom: 40 }}>
            <div className="section-eyebrow"><div className="line" /><span className="label">About Us</span></div>
            <h2 className="section-title" style={{ color: "#fff" }}>Where <em>Craftsmanship</em><br />Meets Vision</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
              Eastlake Emporium is a Coimbatore-based interior design studio specialising in 3D design, full execution, and turnkey delivery. We transform spaces for modern living — blending local sensibilities with contemporary elegance.
            </p>
            <div className="about-features">
              {aboutFeatures.map(f => (
                <div className="about-feat" key={f.t}>
                  <div className="feat-icon">{f.icon}</div>
                  <div className="feat-title">{f.t}</div>
                  <div className="feat-desc">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="services-header">
          <div>
            <div className="section-eyebrow"><div className="line" /><span className="label">Our Services</span></div>
            <h2 className="section-title">Spaces We <em>Transform</em></h2>
          </div>
          <button className="btn-gold" onClick={() => setModal(true)}>Book Consultation</button>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div className="service-card" key={s.name}>
              <img src={s.img} alt={s.name} />
              <div className="service-card-overlay" />
              <div className="service-card-content">
                <div className="service-tag">{s.tag}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="portfolio" id="portfolio">
        <div className="section-eyebrow"><div className="line" /><span className="label">Portfolio</span></div>
        <h2 className="section-title">Our <em>Finest</em> Work</h2>
        <div className="portfolio-tabs">
          {TABS.map(t => (
            <button key={t} className={`ptab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <div className="portfolio-masonry">
          {filtered.slice(0, 7).map(p => (
            <div className="p-item" key={p.name}>
              <img src={p.img} alt={p.name} />
              <div className="p-item-overlay">
                <div className="p-item-info">
                  <div className="p-item-name">{p.name}</div>
                  <div className="p-item-cat">{p.cat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <div className="line" /><span className="label">How We Work</span><div className="line" />
          </div>
          <h2 className="section-title" style={{ color: "#fff", textAlign: "center" }}>Your Journey to a <em>Dream Space</em></h2>
        </div>
        <div className="process-steps">
          {processSteps.map(s => (
            <div className="process-step" key={s.n}>
              <div className="step-connector" />
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.t}</div>
              <div className="step-desc">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="contact">
        <div className="section-eyebrow"><div className="line" /><span className="label">Client Stories</span></div>
        <h2 className="section-title">What Our Clients <em>Say</em></h2>
        <div className="testi-grid">
          {testimonials.map(t => (
            <div className="testi-card" key={t.name}>
              <div className="stars">★★★★★</div>
              <div className="testi-quote-mark">"</div>
              <div className="testi-text">{t.text}</div>
              <div className="testi-divider" />
              <div className="testi-name">{t.name}</div>
              <div className="testi-loc">{t.loc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2 className="cta-title">Ready to transform your<br /><em>space into a masterpiece?</em></h2>
        <div className="cta-right">
          <button className="btn-gold" style={{ fontSize: 12, letterSpacing: 2 }} onClick={() => setModal(true)}>Book Free Consultation</button>
          <div className="cta-contact">
            <span>DM for enquiries</span>
            <strong>eastlake.interiors</strong>
            <span>Karumathampatti, Coimbatore 641659</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">EASTLAKE</div>
            <div className="footer-logo-sub">Emporium Interiors</div>
            <p className="footer-desc">Crafted Interiors for Modern Living. 3D Designs · Execution · Turnkey solutions for Residential &amp; Commercial spaces in Coimbatore.</p>
            <div className="footer-contact">
              <a href="#">📍 Karumathampatti, Coimbatore 641659</a>
              <a href="#">📸 @eastlake.interiors</a>
              <a href="#">✉ DM for Enquiries</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {["Full Home Interiors","Modular Kitchen","Master Bedroom","Wardrobe Design","Pooja Rooms","Turnkey Projects"].map(s => <a key={s} href="#">{s}</a>)}
          </div>
          <div className="footer-col">
            <h4>Locations</h4>
            {["Karumathampatti","RS Puram","Saibaba Colony","Peelamedu","Avinashi Road","Saravanampatti"].map(l => <a key={l} href="#">{l}</a>)}
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            {["About Us","Our Portfolio","Design Process","3D Visualisation","Careers","Contact"].map(c => <a key={c} href="#">{c}</a>)}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Eastlake Emporium. All rights reserved.</div>
          <div className="footer-social">
            {["f","in","▶","◉"].map(i => <div className="social-icon" key={i}>{i}</div>)}
          </div>
        </div>
      </footer>

      {modal && <Modal onClose={() => handleModalClose(false)} onSubmit={() => handleModalClose(true)} />}
      {estimateModal && <EstimateModal onClose={() => handleEstimateClose(false)} onSubmit={() => handleEstimateClose(true)} />}
      {toast && <Toast message="Enquiry submitted successfully!" onHide={() => setToast(false)} />}
    </>
  );
}
