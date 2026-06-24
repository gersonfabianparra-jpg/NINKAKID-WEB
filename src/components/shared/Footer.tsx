"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso",   href: "#proceso"   },
  { label: "Paquetes",  href: "#paquetes"  },
  { label: "Galería",   href: "#galeria"   },
  { label: "FAQ",       href: "#faq"       },
  { label: "Contacto",  href: "#contacto"  },
];

const SOCIAL = [
  { icon: <InstagramIcon />, href: "https://instagram.com/ninjakidchile", label: "Instagram", hoverColor: "#FFCA00" },
  { icon: <Phone size={15} />, href: "https://wa.me/56912345678",         label: "WhatsApp",  hoverColor: "#25d366" },
  { icon: <Mail size={15} />, href: "mailto:soporte@ninjakid.cl",          label: "Email",     hoverColor: "#3B8FFF" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", paddingTop: 60, paddingBottom: 32, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 220, background: "radial-gradient(ellipse, rgba(255,202,0,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        {/* ── Horizontal columns via flexbox (no breakpoint classes) ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px 56px", marginBottom: 52, alignItems: "flex-start" }}>

          {/* Brand — widest */}
          <div style={{ flex: "2 1 220px", maxWidth: 320 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 16 }}>
              <div style={{ position: "relative", width: 40, height: 40, borderRadius: 11, overflow: "hidden", border: "1.5px solid rgba(255,202,0,0.25)", boxShadow: "0 0 14px rgba(255,202,0,0.1)", flexShrink: 0 }}>
                <Image
                  src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                  alt="NinjaKid" fill className="object-cover" unoptimized
                />
              </div>
              <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.025em" }}>
                Ninja<span style={{ color: "var(--blue)" }}>Kid</span>
              </span>
            </Link>

            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.8, marginBottom: 22 }}>
              Arriendo de inflables, arcade y sonido para fiestas infantiles en Santiago. Llegamos a tu domicilio, instalamos todo y recogemos al terminar.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" title={s.label}
                  style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = s.hoverColor; e.currentTarget.style.borderColor = s.hoverColor + "55"; e.currentTarget.style.background = s.hoverColor + "14"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ flex: "1 1 130px" }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 18 }}>
              Navegación
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}
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
          <div style={{ flex: "1 1 170px" }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 18 }}>
              Contacto
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <a href="https://wa.me/56912345678"
                style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none", display: "flex", alignItems: "center", gap: 9, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#25d366")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                <Phone size={13} style={{ flexShrink: 0, opacity: 0.4 }} />
                +56 9 1234 5678
              </a>
              <a href="mailto:soporte@ninjakid.cl"
                style={{ fontSize: 14, color: "var(--text-3)", textDecoration: "none", display: "flex", alignItems: "center", gap: 9, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#3B8FFF")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                <Mail size={13} style={{ flexShrink: 0, opacity: 0.4 }} />
                soporte@ninjakid.cl
              </a>
              <span style={{ fontSize: 14, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 9 }}>
                <MapPin size={13} style={{ flexShrink: 0, opacity: 0.4 }} />
                Santiago, R.M.
              </span>
            </div>
          </div>

          {/* CTA */}
          <div style={{ flex: "1 1 190px" }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 18 }}>
              ¿Lista tu fiesta?
            </p>
            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.75, marginBottom: 20 }}>
              Reserva en minutos. Instalamos todo y recogemos al terminar.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/agendar" className="btn btn-primary"
                style={{ fontSize: 13, padding: "11px 20px", display: "inline-flex", width: "fit-content" }}>
                🎉 Reservar fiesta
              </Link>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, padding: "11px 20px", display: "inline-flex", alignItems: "center", gap: 7, width: "fit-content", background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.22)", borderRadius: 100, textDecoration: "none", fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Consultar WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>© 2026 NinjaKid Chile · Todos los derechos reservados.</p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>Hecho con ❤️ en Santiago</p>
        </div>
      </div>
    </footer>
  );
}
