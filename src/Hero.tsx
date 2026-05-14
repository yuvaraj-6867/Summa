import { IMG, heroStats } from "./data";

interface HeroProps {
  onQuote: () => void;
}

export default function Hero({ onQuote }: HeroProps) {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div className="hero-grid">
        <div className="hero-grid-cell"><img src={IMG.dining}   alt="dining"   /></div>
        <div className="hero-grid-cell"><img src={IMG.bedroom1} alt="bedroom"  /></div>
        <div className="hero-grid-cell"><img src={IMG.wardrobe} alt="wardrobe" /></div>
        <div className="hero-grid-cell"><img src={IMG.kitchen4} alt="kitchen"  /></div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content animate-in">
        <div className="hero-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Karumathampatti, Coimbatore</span>
        </div>
        <h1 className="hero-title">Crafted Interiors<br />for <em>Modern Living</em></h1>
        <p className="hero-sub">
          3D Designs · Execution · Turnkey Solutions<br />
          Residential &amp; Commercial spaces designed with precision and soul.
        </p>
        <div className="hero-actions">
          <button className="btn-gold" onClick={onQuote}>Get Free Quote</button>
          <button className="btn-ghost" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
            View Portfolio
          </button>
        </div>
      </div>
      <div className="hero-stats">
        {heroStats.map(s => (
          <div key={s.l}>
            <div className="stat-num">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
