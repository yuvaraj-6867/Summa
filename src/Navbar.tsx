import { useState, useEffect } from "react";

interface NavbarProps {
  onEnquire: () => void;
}

export default function Navbar({ onEnquire }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">EASTLAKE<span>Emporium Interiors</span></div>
      <ul className="nav-links">
        {["About", "Services", "Portfolio", "Process", "Contact"].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <button className="nav-cta" onClick={onEnquire}>Enquire Now</button>
    </nav>
  );
}
