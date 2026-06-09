"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios", color: "#FFCA00" },
  { label: "Proceso",   href: "#proceso",   color: "#3B8FFF" },
  { label: "Paquetes",  href: "#paquetes",  color: "#FF5050" },
  { label: "Contacto",  href: "#contacto",  color: "#22c55e" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar — multicolor */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, #FFCA00 0%, #FF5050 40%, #3B8FFF 75%, #22c55e 100%)",
          zIndex: 200,
        }}
      />

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(7,6,26,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            height: 80,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 48,
                height: 48,
                borderRadius: 14,
                overflow: "hidden",
                border: "1.5px solid rgba(255,202,0,0.3)",
                boxShadow: "0 0 20px rgba(255,202,0,0.15), 0 2px 10px rgba(0,0,0,0.5)",
                flexShrink: 0,
              }}
            >
              <Image
                src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                alt="NinjaKid"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1, whiteSpace: "nowrap" }}>
              Ninja<span style={{ color: "#3B8FFF" }}>Kid</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flex: 1,
              justifyContent: "center",
            }}
            className="desktop-nav"
          >
            <style>{`
              @media (max-width: 767px) { .desktop-nav { display: none !important; } }
            `}</style>

            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                style={{
                  position: "relative",
                  padding: "10px 20px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: active === l.href ? "#fff" : "rgba(255,255,255,0.5)",
                  background: active === l.href ? "rgba(255,255,255,0.07)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 10,
                  transition: "color 0.15s ease, background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active === l.href ? "#fff" : "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = active === l.href ? "rgba(255,255,255,0.07)" : "transparent";
                }}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: l.color,
                      boxShadow: `0 0 6px ${l.color}`,
                    }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* ── Right ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link
              href="/agendar"
              className="btn btn-primary"
              style={{
                fontSize: 14,
                padding: "12px 24px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              🎉 Reservar fiesta
            </Link>
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                flexShrink: 0,
              }}
              className="mobile-menu-btn"
            >
              <style>{`
                @media (max-width: 767px) {
                  .mobile-menu-btn { display: flex !important; }
                  .navbar-cta { display: none !important; }
                }
              `}</style>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position: "fixed",
              left: 0, right: 0,
              top: 88,
              zIndex: 40,
              padding: "0 14px",
            }}
          >
            <div
              style={{
                borderRadius: 20,
                background: "rgba(10,9,32,0.97)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                overflow: "hidden",
              }}
            >
              {links.map((l, i) => (
                <button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "18px 22px",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                    background: "transparent",
                    border: "none",
                    borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: l.color,
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${l.color}`,
                    }}
                  />
                  {l.label}
                </button>
              ))}
              <div style={{ padding: "14px" }}>
                <Link
                  href="/agendar"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", display: "flex", fontSize: 15 }}
                  onClick={() => setOpen(false)}
                >
                  🎉 Reservar mi fiesta
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
