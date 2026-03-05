"use client";

import { useState, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Micro-Perf Letters",
    description:
      "Stainless steel channel letters with a mirrored finish that transforms to brilliant white or colored illumination when lit.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-4.png",
    tag: null,
  },
  {
    id: 2,
    name: "Micro-Perf 2.0",
    description:
      "Next-generation acrylic LED technology that faithfully replicates the warm, atmospheric glow of classic neon signs.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-5.png",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Neon Style Acrylic",
    description:
      "Modern acrylic LED technology that captures the timeless aesthetic of old-fashioned neon with modern LED efficiency.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-3.png",
    tag: null,
  },
  {
    id: 4,
    name: "ChangeGlas™",
    description:
      "Proprietary color-changing acrylic with special pigment chemistry that transforms from colored to pure white when illuminated.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-1.png",
    tag: "SIGNATURE",
  },
  {
    id: 5,
    name: "Prestige Metallic Letters",
    description:
      "Block acrylic with premium metalized finishes — available in polished or matte, opaque or translucent formats.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-2.png",
    tag: null,
  },
  {
    id: 6,
    name: "Micro-Perf Wall Cover",
    description:
      "Revolutionary technology extending Micro-Perf imaging to entire wall surfaces for full-scale immersive brand environments.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-6.png",
    tag: "NEW",
  },
  {
    id: 7,
    name: "Future Signage",
    description:
      "As a world leader in sign technology R&D, we stay at the forefront of emerging innovations for brand identity.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-7.png",
    tag: null,
  },
  {
    id: 8,
    name: "Thin Letter Light",
    description:
      "Block acrylic with embedded LED lighting and ultra-thin stroke capability — minimum stroke width of just 1mm.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-8.png",
    tag: null,
  },
  {
    id: 9,
    name: "Specialty Acrylics",
    description:
      "Expert LED and acrylic combinations for innovative sign making. Specialists in block acrylic machining and fabrication.",
    image: "http://www.flex-america.com/assets/img/photos/ProductCard-9.png",
    tag: null,
  },
];

const CAPABILITIES = [
  {
    title: "Channel Letter Manufacturing",
    desc: "Full-service fabrication of illuminated LED channel letters for sign companies nationwide.",
  },
  {
    title: "Advanced LED Integration",
    desc: "Color-changing systems, ultra-thin designs, and proprietary Micro-Perf LED technologies.",
  },
  {
    title: "Acrylic Machining",
    desc: "Precision CNC machining of block acrylic for custom letter shapes, depths, and profiles.",
  },
  {
    title: "Stainless Steel Fabrication",
    desc: "Expert stainless steel channel letter fabrication including our signature Micro-Perf patterns.",
  },
  {
    title: "Color Science",
    desc: "Proprietary ChangeGlas™ and special pigment chemistry for unique color-shifting visual effects.",
  },
  {
    title: "Quality Assurance",
    desc: "Rigorous multi-stage QC processes ensuring every product meets our Top 1% industry standard.",
  },
];

const STATS = [
  { value: "#1", label: "Top 1% Technology Rank" },
  { value: "9+", label: "Proprietary Product Lines" },
  { value: "100%", label: "Quality Commitment" },
  { value: "24hr", label: "Rush Capability" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Contact Our Team",
    desc: "Reach out via phone or email to discuss your project requirements, specifications, and timeline.",
  },
  {
    step: "02",
    title: "Receive a Custom Quote",
    desc: "Get a detailed, transparent quote outlining materials, production timeline, and full pricing.",
  },
  {
    step: "03",
    title: "Precision Manufacturing",
    desc: "Our specialists craft your order with exacting standards and provide updates throughout production.",
  },
];

const MARQUEE_ITEMS = [
  "Micro-Perf Letters",
  "ChangeGlas™",
  "Neon Style Acrylic",
  "Prestige Metallic",
  "Thin Letter Light",
  "Specialty Acrylics",
  "Micro-Perf 2.0",
  "Future Signage",
  "LED Channel Letters",
  "Block Letter Signs",
];

/* ──────────────────────────────────────────────────────────
   HOOKS
   ────────────────────────────────────────────────────────── */

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ──────────────────────────────────────────────────────────
   SHARED STYLES
   ────────────────────────────────────────────────────────── */

const S = {
  section: (bg = "#060606"): React.CSSProperties => ({
    padding: "120px 8vw",
    backgroundColor: bg,
  }),
  label: (): React.CSSProperties => ({
    display: "block",
    fontSize: "11px",
    color: "#FF4500",
    fontWeight: 700,
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "14px",
  }),
  h2: (): React.CSSProperties => ({
    fontFamily: "var(--font-bebas)",
    fontSize: "clamp(42px, 5vw, 72px)",
    color: "#fff",
    lineHeight: 0.93,
    letterSpacing: "1px",
    marginBottom: "20px",
  }),
  body: (): React.CSSProperties => ({
    fontSize: "16px",
    color: "#666",
    lineHeight: 1.75,
  }),
  btnPrimary: (): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 28px",
    backgroundColor: "#FF4500",
    color: "#fff",
    borderRadius: "3px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.2s, transform 0.2s",
  }),
  btnSecondary: (): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 28px",
    backgroundColor: "transparent",
    color: "#ccc",
    borderRadius: "3px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer",
    transition: "border-color 0.2s, transform 0.2s",
  }),
  card: (): React.CSSProperties => ({
    backgroundColor: "#111",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.25s ease",
  }),
};

/* ──────────────────────────────────────────────────────────
   NAV
   ────────────────────────────────────────────────────────── */

function Nav() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5vw",
        backgroundColor: scrolled ? "rgba(6,6,6,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.05)"
          : "none",
        transition: "all 0.35s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{ textDecoration: "none", display: "flex", gap: "4px" }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "26px",
            color: "#fff",
            letterSpacing: "3px",
          }}
        >
          FLEX
        </span>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "26px",
            color: "#FF4500",
            letterSpacing: "3px",
          }}
        >
          AMERICA
        </span>
      </a>

      {/* Desktop links */}
      <div
        className="desktop-nav"
        style={{ display: "flex", alignItems: "center", gap: "36px" }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: "#777",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          style={S.btnPrimary()}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#FF6020")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#FF4500")
          }
        >
          Get a Quote
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "22px",
              height: "2px",
              backgroundColor: "#fff",
              borderRadius: "2px",
              transition: "all 0.2s",
            }}
          />
        ))}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            backgroundColor: "rgba(6,6,6,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 5vw 32px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                color: "#ccc",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              ...S.btnPrimary(),
              marginTop: "16px",
              justifyContent: "center",
            }}
          >
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "100px 8vw 80px",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 75% 65% at 65% 50%, rgba(255,69,0,0.09) 0%, transparent 70%), #060606",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      {/* Orange glow blob */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,69,0,0.14) 0%, rgba(255,179,71,0.04) 45%, transparent 70%)",
          filter: "blur(48px)",
          pointerEvents: "none",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "7px 16px",
            borderRadius: "100px",
            border: "1px solid rgba(255,69,0,0.35)",
            backgroundColor: "rgba(255,69,0,0.07)",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#FF4500",
              display: "inline-block",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#FF4500",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Top 1% Sign Technology
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(62px, 9vw, 118px)",
            lineHeight: 0.88,
            color: "#fff",
            marginBottom: "32px",
            letterSpacing: "1px",
          }}
        >
          ILLUMINATING
          <br />
          <span style={{ color: "#FF4500" }}>AMERICA&apos;S</span>
          <br />
          BRANDS
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "17px",
            color: "#777",
            lineHeight: 1.75,
            maxWidth: "480px",
            marginBottom: "44px",
          }}
        >
          Premium subcontract manufacturing services for sign companies.
          We deliver the highest quality channel letters and specialty signage
          — on time, every time.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <a
            href="#products"
            style={S.btnPrimary()}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6020";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FF4500";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Products →
          </a>
          <a
            href="tel:6034984662"
            style={S.btnSecondary()}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📞 (603) 498-4662
          </a>
        </div>

        {/* Social proof */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex" }}>
            {"★★★★★".split("").map((s, i) => (
              <span key={i} style={{ color: "#FFB347", fontSize: "15px" }}>
                {s}
              </span>
            ))}
          </div>
          <span style={{ color: "#444", fontSize: "13px" }}>
            Trusted by sign companies across America
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.3,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, #fff, transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   MARQUEE
   ────────────────────────────────────────────────────────── */

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      style={{
        backgroundColor: "#FF4500",
        padding: "13px 0",
        overflow: "hidden",
      }}
    >
      <div
        className="animate-marquee"
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              padding: "0 32px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              display: "inline-flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            {item}
            <span style={{ opacity: 0.35, fontSize: "10px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS
   ────────────────────────────────────────────────────────── */

function Stats() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: "#0C0C0C",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "0",
      }}
    >
      <div
        className="stats-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "52px 40px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "60px",
                lineHeight: 1,
                color: "#FF4500",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "13px", color: "#555", letterSpacing: "0.3px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   PRODUCTS
   ────────────────────────────────────────────────────────── */

function Products() {
  const { ref, inView } = useInView();
  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      style={S.section("#060606")}
    >
      <div style={{ marginBottom: "64px" }}>
        <span style={S.label()}>Product Line</span>
        <h2 style={S.h2()}>
          INDUSTRY-LEADING
          <br />
          <span style={{ color: "#444" }}>SIGN TECHNOLOGY</span>
        </h2>
        <p style={{ ...S.body(), maxWidth: "500px" }}>
          From color-changing acrylics to stainless steel Micro-Perf letters,
          our product line represents the pinnacle of sign manufacturing
          innovation.
        </p>
      </div>

      <div
        className="products-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}
      >
        {PRODUCTS.map((p, i) => (
          <div
            key={p.id}
            style={{
              backgroundColor: "#111",
              position: "relative",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease ${Math.min(i * 0.07, 0.45)}s, transform 0.6s ease ${Math.min(i * 0.07, 0.45)}s`,
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#181818";
              const img = e.currentTarget.querySelector(
                ".prod-img"
              ) as HTMLElement;
              if (img) img.style.transform = "scale(1.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#111";
              const img = e.currentTarget.querySelector(
                ".prod-img"
              ) as HTMLElement;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {p.tag && (
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  zIndex: 2,
                  padding: "4px 10px",
                  backgroundColor: p.tag === "NEW" ? "#FF4500" : "#FFB347",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  borderRadius: "2px",
                }}
              >
                {p.tag}
              </div>
            )}

            <div
              style={{
                height: "220px",
                overflow: "hidden",
                backgroundColor: "#0A0A0A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="prod-img"
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onError={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.background =
                      "linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)";
                  }
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div style={{ padding: "22px 24px 28px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "20px",
                  color: "#fff",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                {p.name}
              </h3>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65 }}>
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   CAPABILITIES
   ────────────────────────────────────────────────────────── */

function Capabilities() {
  const { ref, inView } = useInView();
  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        ...S.section("#0A0A0A"),
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="two-col"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
      >
        {/* Left */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span style={S.label()}>Capabilities</span>
          <h2 style={S.h2()}>
            WHAT WE
            <br />
            <span style={{ color: "#FF4500" }}>MANUFACTURE</span>
          </h2>
          <p style={{ ...S.body(), marginBottom: "36px" }}>
            We perform subcontract manufacturing services for sign companies
            across America. Our customers value our commitment to the highest
            quality standards, attention to detail, excellent communication,
            and quick manufacturing turnaround time.
          </p>
          <a
            href="tel:6034984662"
            style={S.btnPrimary()}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF6020")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF4500")
            }
          >
            Call for a Quote: (603) 498-4662 →
          </a>
        </div>

        {/* Right: grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {CAPABILITIES.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "28px 22px",
                backgroundColor: "#111",
                borderTop: "2px solid transparent",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = "#FF4500";
                e.currentTarget.style.backgroundColor = "#171717";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = "transparent";
                e.currentTarget.style.backgroundColor = "#111";
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "#FF4500",
                  marginBottom: "12px",
                }}
              >
                ◈
              </div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#ddd",
                  marginBottom: "8px",
                  lineHeight: 1.4,
                }}
              >
                {c.title}
              </h4>
              <p style={{ fontSize: "13px", color: "#4a4a4a", lineHeight: 1.6 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   WHY US
   ────────────────────────────────────────────────────────── */

function WhyUs() {
  const { ref, inView } = useInView();
  const items = [
    {
      num: "01",
      title: "Top 1% Quality",
      desc: "Our unwavering commitment to quality standards sets us apart. Every product is manufactured to exceed expectations.",
      accent: "#FF4500",
    },
    {
      num: "02",
      title: "Innovation Leader",
      desc: "We pioneer technologies like Micro-Perf and ChangeGlas™ that become the benchmarks others follow.",
      accent: "#FFB347",
    },
    {
      num: "03",
      title: "Clear Communication",
      desc: "Excellent, responsive communication at every stage of your order. No surprises — just results.",
      accent: "#FF4500",
    },
    {
      num: "04",
      title: "Fast Turnaround",
      desc: "Industry-leading manufacturing speed that keeps your sign projects on schedule and clients satisfied.",
      accent: "#FFB347",
    },
  ];

  return (
    <section
      id="why-us"
      ref={ref as React.RefObject<HTMLElement>}
      style={S.section("#060606")}
    >
      <div style={{ textAlign: "center", marginBottom: "72px" }}>
        <span style={S.label()}>Why Choose Us</span>
        <h2
          style={{
            ...S.h2(),
            margin: "0 auto 0",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          THE FLEX AMERICA
          <br />
          <span style={{ color: "#333" }}>DIFFERENCE</span>
        </h2>
      </div>

      <div
        className="four-col"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "44px 32px",
              backgroundColor: "#0E0E0E",
              position: "relative",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#141414")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0E0E0E")
            }
          >
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "88px",
                color: "rgba(255,255,255,0.025)",
                position: "absolute",
                top: "8px",
                right: "16px",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {item.num}
            </div>
            <div
              style={{
                width: "40px",
                height: "3px",
                backgroundColor: item.accent,
                marginBottom: "22px",
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "24px",
                color: "#fff",
                marginBottom: "14px",
                letterSpacing: "0.5px",
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   PROCESS
   ────────────────────────────────────────────────────────── */

function Process() {
  const { ref, inView } = useInView();
  return (
    <section
      id="process"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        ...S.section("#0A0A0A"),
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ marginBottom: "72px" }}>
        <span style={S.label()}>How It Works</span>
        <h2 style={S.h2()}>
          GET STARTED
          <br />
          <span style={{ color: "#333" }}>IN 3 STEPS</span>
        </h2>
      </div>

      <div
        className="three-col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          position: "relative",
        }}
      >
        {PROCESS_STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "0 48px 0 0",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                border: "2px solid rgba(255,69,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
                backgroundColor: "rgba(255,69,0,0.07)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "20px",
                  color: "#FF4500",
                  letterSpacing: "1px",
                }}
              >
                {s.step}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "26px",
                color: "#fff",
                marginBottom: "14px",
                letterSpacing: "0.5px",
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   BROCHURE CTA BANNER
   ────────────────────────────────────────────────────────── */

function BrochureBanner() {
  return (
    <section
      style={{
        padding: "72px 8vw",
        background:
          "linear-gradient(135deg, rgba(255,69,0,0.12) 0%, rgba(255,179,71,0.04) 100%)",
        borderTop: "1px solid rgba(255,69,0,0.12)",
        borderBottom: "1px solid rgba(255,69,0,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#fff",
              marginBottom: "8px",
              letterSpacing: "1px",
            }}
          >
            DOWNLOAD OUR PRODUCT BROCHURE
          </h2>
          <p style={{ fontSize: "15px", color: "#666" }}>
            Top 1% in LED, Acrylic &amp; Stainless Steel Micro-Perf Sign
            Technology
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="http://www.flex-america.com/assets/Brochure/flex-america.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={S.btnPrimary()}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF6020")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF4500")
            }
          >
            ↓ Download Now
          </a>
          <a
            href="tel:6034984662"
            style={S.btnSecondary()}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
          >
            Call (603) 498-4662
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────── */

function About() {
  const { ref, inView } = useInView();
  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={S.section("#060606")}
    >
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left: visual card */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "52px",
              position: "relative",
              overflow: "hidden",
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "130px",
                lineHeight: 0.82,
                color: "rgba(255,255,255,0.035)",
                letterSpacing: "2px",
                userSelect: "none",
                position: "absolute",
                top: "24px",
                left: "40px",
              }}
            >
              TOP
              <br />
              1%
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "30px",
                  color: "#FF4500",
                  letterSpacing: "2px",
                  marginBottom: "6px",
                }}
              >
                FLEX AMERICA
              </div>
              <div style={{ fontSize: "13px", color: "#444", letterSpacing: "0.5px" }}>
                Subcontract Manufacturing Excellence
              </div>
            </div>
          </div>
          {/* Corner accents */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
              width: "44px",
              height: "44px",
              borderTop: "3px solid #FF4500",
              borderLeft: "3px solid #FF4500",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              width: "44px",
              height: "44px",
              borderBottom: "3px solid #FFB347",
              borderRight: "3px solid #FFB347",
            }}
          />
        </div>

        {/* Right: text */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <span style={S.label()}>About Us</span>
          <h2 style={S.h2()}>
            SUPPLIER OF
            <br />
            <span style={{ color: "#FF4500" }}>HIGH-END SIGNAGE</span>
          </h2>
          <p style={{ ...S.body(), marginBottom: "20px" }}>
            Flex America performs subcontract manufacturing services for sign
            companies nationwide. Our customers value our commitment to the
            highest quality standards, attention to detail, excellent
            communication, and quick manufacturing turnaround time.
          </p>
          <p style={{ ...S.body(), marginBottom: "44px" }}>
            We supply innovative color-changing cast acrylic sheets and thick
            block letter sheets. We manufacture high-technology finished channel
            letters and block letter signs with technologies including
            Micro-Perf stainless steel, metalized block acrylic, neon style
            letters, and ultra-thin letters.
          </p>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[
              { val: "Top 1%", label: "Technology Rank" },
              { val: "9+", label: "Product Lines" },
              { val: "Fast", label: "Turnaround" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "34px",
                    color: "#FF4500",
                    letterSpacing: "1px",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: "12px", color: "#444" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   CONTACT
   ────────────────────────────────────────────────────────── */

function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email service (Resend, SendGrid, etc.)
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#0A0A0A",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-inter)",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        ...S.section("#0A0A0A"),
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left info */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span style={S.label()}>Get in Touch</span>
          <h2 style={S.h2()}>
            REQUEST A
            <br />
            <span style={{ color: "#FF4500" }}>QUOTE TODAY</span>
          </h2>
          <p style={{ ...S.body(), marginBottom: "48px" }}>
            Ready to elevate your sign projects? Contact our team for a detailed
            quote on your subcontract manufacturing needs.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              {
                icon: "📞",
                label: "Phone",
                value: "(603) 498-4662",
                href: "tel:6034984662",
              },
              {
                icon: "🌐",
                label: "Website",
                value: "flex-america.com",
                href: "http://www.flex-america.com",
              },
              {
                icon: "📄",
                label: "Brochure",
                value: "Download Product Catalog",
                href: "http://www.flex-america.com/assets/Brochure/flex-america.pdf",
              },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                  padding: "18px 22px",
                  backgroundColor: "#111",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "3px",
                  transition: "border-color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,69,0,0.3)";
                  e.currentTarget.style.backgroundColor = "#171717";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.backgroundColor = "#111";
                }}
              >
                <span style={{ fontSize: "22px" }}>{c.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#444",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginBottom: "3px",
                    }}
                  >
                    {c.label}
                  </div>
                  <div style={{ fontSize: "15px", color: "#bbb", fontWeight: 500 }}>
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          {submitted ? (
            <div
              style={{
                padding: "56px",
                backgroundColor: "#111",
                border: "1px solid rgba(255,69,0,0.25)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,69,0,0.1)",
                  border: "2px solid #FF4500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "22px",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "30px",
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                MESSAGE RECEIVED
              </h3>
              <p style={{ color: "#666", fontSize: "15px" }}>
                We&apos;ll get back to you shortly with a detailed quote.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "44px",
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "26px",
                  color: "#fff",
                  marginBottom: "4px",
                  letterSpacing: "1px",
                }}
              >
                REQUEST A QUOTE
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {(
                  [
                    { key: "name", label: "Full Name *", type: "text", required: true },
                    { key: "company", label: "Company", type: "text", required: false },
                  ] as const
                ).map((f) => (
                  <div key={f.key}>
                    <label
                      style={{
                        fontSize: "11px",
                        color: "#444",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: "7px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [f.key]: e.target.value }))
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(255,69,0,0.45)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.07)")
                      }
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {(
                  [
                    { key: "email", label: "Email *", type: "email", required: true },
                    { key: "phone", label: "Phone", type: "tel", required: false },
                  ] as const
                ).map((f) => (
                  <div key={f.key}>
                    <label
                      style={{
                        fontSize: "11px",
                        color: "#444",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: "7px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [f.key]: e.target.value }))
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(255,69,0,0.45)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.07)")
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  style={{
                    fontSize: "11px",
                    color: "#444",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "7px",
                  }}
                >
                  Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Describe your project, quantities, and special requirements..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "110px",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(255,69,0,0.45)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.07)")
                  }
                />
              </div>

              <button
                type="submit"
                style={{ ...S.btnPrimary(), justifyContent: "center", paddingTop: "15px", paddingBottom: "15px" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FF6020")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FF4500")
                }
              >
                Send Request →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#060606",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "72px 8vw 32px",
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "56px",
        }}
      >
        {/* Brand col */}
        <div>
          <div style={{ display: "flex", gap: "4px", marginBottom: "18px" }}>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "26px",
                color: "#fff",
                letterSpacing: "3px",
              }}
            >
              FLEX
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "26px",
                color: "#FF4500",
                letterSpacing: "3px",
              }}
            >
              AMERICA
            </span>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#444",
              lineHeight: 1.75,
              maxWidth: "260px",
              marginBottom: "24px",
            }}
          >
            Top 1% sign technology. Premium subcontract manufacturing for sign
            companies across America.
          </p>
          <a
            href="tel:6034984662"
            style={{
              fontSize: "16px",
              color: "#FF4500",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            (603) 498-4662
          </a>
        </div>

        {/* Products */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            Products
          </h4>
          {[
            "Micro-Perf Letters",
            "ChangeGlas™",
            "Neon Style",
            "Prestige Metallic",
            "Thin Letter Light",
          ].map((p) => (
            <div key={p} style={{ marginBottom: "10px" }}>
              <a
                href="#products"
                style={{
                  fontSize: "13px",
                  color: "#444",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#bbb")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                {p}
              </a>
            </div>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            Company
          </h4>
          {(
            [
              ["#about", "About Us"],
              ["#services", "Services"],
              ["#why-us", "Why Us"],
              ["#process", "Process"],
              ["#contact", "Contact"],
            ] as [string, string][]
          ).map(([href, label]) => (
            <div key={href} style={{ marginBottom: "10px" }}>
              <a
                href={href}
                style={{
                  fontSize: "13px",
                  color: "#444",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#bbb")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                {label}
              </a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            Contact
          </h4>
          <div
            style={{ fontSize: "13px", color: "#444", lineHeight: 2 }}
          >
            <a
              href="tel:6034984662"
              style={{
                display: "block",
                color: "#FF4500",
                textDecoration: "none",
                marginBottom: "4px",
              }}
            >
              (603) 498-4662
            </a>
            <a
              href="http://www.flex-america.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#444",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#bbb")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
            >
              flex-america.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "12px", color: "#2a2a2a" }}>
          © {year} Flex America. All rights reserved.
        </span>
        <span style={{ fontSize: "12px", color: "#2a2a2a" }}>
          Top 1% Sign Technology
        </span>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <Capabilities />
      <WhyUs />
      <Process />
      <BrochureBanner />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
