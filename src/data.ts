// Shared types and data

export interface StatItem { n: string; l: string; }
export interface Service { tag: string; name: string; desc: string; img: string; }
export interface PortfolioItem { name: string; cat: string; img: string; }
export interface ProcessStep { n: string; t: string; d: string; }
export interface Testimonial { text: string; name: string; loc: string; }
export interface AboutFeature { icon: string; t: string; d: string; }

export const IMG: Record<string, string> = {
  wardrobe: "/images/img6.jpg",
  bedroom1: "/images/img5.jpg",
  living:   "/images/img8.jpg",
  kitchen1: "/images/img9.jpg",
  kitchen2: "/images/img10.jpg",
  kitchen3: "/images/img7.jpg",
  pooja:    "/images/img1.jpg",
  bedroom2: "/images/img2.jpg",
  dining:   "/images/img3.jpg",
  kitchen4: "/images/img4.jpg",
};

export const services: Service[] = [
  { tag: "Full Home", name: "Complete Home Interiors",  desc: "End-to-end design and execution from concept to handover — every room, every detail.", img: IMG.dining   },
  { tag: "Kitchen",  name: "Modular Kitchen Design",    desc: "L-shaped, U-shaped and island kitchens crafted for beauty and functionality.",           img: IMG.kitchen1 },
  { tag: "Bedroom",  name: "Luxury Bedrooms",           desc: "Master suites and children's rooms designed for comfort and personal style.",             img: IMG.bedroom1 },
  { tag: "Wardrobe", name: "Wardrobes & Storage",       desc: "Custom floor-to-ceiling wardrobes with premium hardware and internal lighting.",          img: IMG.wardrobe },
  { tag: "Pooja",    name: "Pooja & Sacred Spaces",     desc: "Devotional spaces crafted with reverence — warm light, stone, and sacred symmetry.",      img: IMG.pooja    },
  { tag: "Turnkey",  name: "Turnkey Execution",         desc: "Civil, electrical, and interiors — all under one roof with zero-stress delivery.",        img: IMG.living   },
];

export const portfolio: PortfolioItem[] = [
  { name: "Master Bedroom Suite", cat: "Bedroom",         img: IMG.bedroom1 },
  { name: "Luxury Kitchen",       cat: "Kitchen",         img: IMG.kitchen4 },
  { name: "Premium Wardrobe",     cat: "Storage",         img: IMG.wardrobe },
  { name: "Pooja Room",           cat: "Pooja",           img: IMG.pooja    },
  { name: "Dining Room",          cat: "Living & Dining", img: IMG.dining   },
  { name: "Open Kitchen",         cat: "Kitchen",         img: IMG.kitchen1 },
  { name: "Green Bedroom",        cat: "Bedroom",         img: IMG.bedroom2 },
];

export const heroStats: StatItem[] = [
  { n: "3D",   l: "Design"        },
  { n: "100%", l: "Turnkey"       },
  { n: "∞",    l: "Possibilities" },
];

export const processSteps: ProcessStep[] = [
  { n: "01", t: "Consultation", d: "We meet to understand your vision, lifestyle, and budget. No commitment required." },
  { n: "02", t: "3D Design",    d: "Our designers create photorealistic 3D renders so you see exactly what you'll get." },
  { n: "03", t: "Production",   d: "Materials are sourced and all woodwork is crafted with precision in our workshop." },
  { n: "04", t: "Handover",     d: "Installation is completed on schedule with a walkthrough and post-service support." },
];

export const testimonials: Testimonial[] = [
  { text: "The team at Eastlake transformed our home into something truly extraordinary. Every detail — from the wardrobe lighting to the kitchen backsplash — was perfect.", name: "Ramesh & Priya K.", loc: "Karumathampatti, Full Home Interiors" },
  { text: "Our modular kitchen is now the heart of our home. The dark grey cabinets with the marble backsplash are everything we dreamed of. Delivered in 45 days!", name: "Suresh Babu", loc: "Coimbatore, Modular Kitchen" },
  { text: "The pooja room they designed for us is beyond beautiful. The layered lighting, the woodwork, the elevation — it feels sacred and special. We are deeply grateful.", name: "Lakshmi & Venkat R.", loc: "Saravanampatti, Pooja Room Design" },
];

export const aboutFeatures: AboutFeature[] = [
  { icon: "◈", t: "3D Designs",               d: "Visualise your space before a single wall is touched"   },
  { icon: "◉", t: "Execution",                d: "In-house team with meticulous project management"        },
  { icon: "◎", t: "Turnkey",                  d: "From concept to keys — we handle everything"             },
  { icon: "◐", t: "Residential & Commercial", d: "Homes, offices, and retail interiors"                    },
];

export const TABS = ["All", "Kitchen", "Bedroom", "Living", "Pooja"];
