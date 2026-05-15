import { useState, useEffect } from "react";

interface NavbarProps {
  onEnquire: () => void;
}

export default function Navbar({ onEnquire }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">EASTLAKE<span>Emporium Interiors</span></div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {["About", "Services", "Portfolio", "Process", "Contact"].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a></li>
        ))}
        <li className="nav-links-cta">
          <button className="nav-cta" onClick={() => { onEnquire(); closeMenu(); }}>Enquire Now</button>
        </li>
      </ul>
      <button className="nav-cta nav-cta-desktop" onClick={onEnquire}>Enquire Now</button>
      <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
      </button>
    </nav>
  );
}
