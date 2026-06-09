"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlock: "48px 32px",
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <style>{`@media(min-width:640px){ .footer-grid{ grid-template-columns:1.5fr 1fr 1fr; gap:40px; } }`}</style>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 14 }}>
              <div style={{ position: "relative", width: 32, height: 32, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Image
                  src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                  alt="NinjaKid"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
                Ninja<span style={{ color: "var(--gold)" }}>Kid</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              Arriendo de inflables, arcade y sonido para fiestas infantiles en Santiago. Llegamos a tu domicilio.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: <InstagramIcon />, href: "https://instagram.com/ninjakidchile" },
                { icon: <Phone size={16} />, href: "https://wa.me/56912345678" },
                { icon: <Mail size={16} />, href: "mailto:soporte@ninjakid.cl" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "rgba(245,197,24,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Navegación</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Paquetes", href: "#paquetes" },
                { label: "Galería", href: "#galeria" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "#contacto" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Contacto</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <a href="https://wa.me/56912345678" style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none" }}>+56 9 1234 5678</a>
              <a href="mailto:soporte@ninjakid.cl" style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none" }}>soporte@ninjakid.cl</a>
              <a href="https://instagram.com/ninjakidchile" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none" }}>@ninjakidchile</a>
            </div>
            <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 13, padding: "10px 18px", display: "inline-flex" }}>
              Reservar →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>© 2026 NinjaKid Chile. Todos los derechos reservados.</p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>Santiago, Región Metropolitana</p>
        </div>
      </div>
    </footer>
  );
}
