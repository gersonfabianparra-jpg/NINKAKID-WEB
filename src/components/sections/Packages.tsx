"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/data";
import { formatCLP } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PKG_PALETTE: Record<string, { accent: string; glow: string; bg: string; border: string }> = {
  starter: {
    accent: "#3B8FFF",
    glow:   "rgba(59,143,255,0.18)",
    bg:     "rgba(59,143,255,0.05)",
    border: "rgba(59,143,255,0.28)",
  },
  ninja: {
    accent: "#FFCA00",
    glow:   "rgba(255,202,0,0.18)",
    bg:     "rgba(255,202,0,0.05)",
    border: "rgba(255,202,0,0.30)",
  },
  ultra: {
    accent: "#FF5050",
    glow:   "rgba(255,80,80,0.18)",
    bg:     "rgba(255,80,80,0.05)",
    border: "rgba(255,80,80,0.28)",
  },
};

export default function Packages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="paquetes" ref={ref} style={{ paddingBlock: "100px", background: "var(--bg-2)" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="label">✦ Paquetes</span>
          <h2 className="heading-1 text-shimmer" style={{ display: "block" }}>Elige tu paquete</h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", marginTop: 12, maxWidth: 400, marginInline: "auto" }}>
            Sin letras chicas. Instalación, tiempo y retiro incluidos.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            alignItems: "start",
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32, scale: 0.93 }}
              animate={inView
                ? {
                    opacity: 1, y: 0,
                    ...(pkg.popular && {
                      boxShadow: [
                        `0 0 0 1px ${PKG_PALETTE[pkg.id]?.border}, 0 0 0 0 transparent`,
                        `0 0 0 1px ${PKG_PALETTE[pkg.id]?.border}, 0 8px 48px -8px ${PKG_PALETTE[pkg.id]?.glow}`,
                        `0 0 0 1px ${PKG_PALETTE[pkg.id]?.border}, 0 0 0 0 transparent`,
                      ],
                    }),
                  }
                : {}}
              transition={pkg.popular
                ? {
                    opacity: { duration: 0.6, delay: i * 0.1, ease: EASE },
                    y: { duration: 0.6, delay: i * 0.1, ease: EASE },
                    boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }
                : { duration: 0.6, delay: i * 0.1, ease: EASE }}
              className={pkg.popular ? "spin-border" : ""}
              style={{
                background: PKG_PALETTE[pkg.id]?.bg ?? "var(--bg-card)",
                border: pkg.popular ? "none" : `1px solid ${PKG_PALETTE[pkg.id]?.border ?? "var(--border)"}`,
                borderRadius: 20,
                padding: 28,
                position: "relative",
                transition: "transform 0.12s linear, box-shadow 0.3s",
              }}
              onMouseMove={(e) => {
                const c = PKG_PALETTE[pkg.id];
                const r = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width  - 0.5;
                const y = (e.clientY - r.top)  / r.height - 0.5;
                e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-4px) scale(1.01)`;
                e.currentTarget.style.boxShadow = `0 24px 60px ${c?.glow ?? "rgba(0,0,0,0.35)"}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transition = "transform 0.5s ease, box-shadow 0.4s";
              }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: PKG_PALETTE[pkg.id]?.accent ?? "var(--yellow)",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 14px",
                    borderRadius: "0 0 10px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Más popular
                </div>
              )}

              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, marginTop: pkg.popular ? 8 : 0 }}>
                <span style={{ fontSize: 32 }}>{pkg.icon}</span>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16 }}>{pkg.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{pkg.tagline}</p>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                {pkg.originalPrice && (
                  <p style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "line-through", marginBottom: 2 }}>
                    {formatCLP(pkg.originalPrice)}
                  </p>
                )}
                <p
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: PKG_PALETTE[pkg.id]?.accent ?? "#fff",
                    lineHeight: 1,
                  }}
                >
                  {formatCLP(pkg.price)}
                </p>
              </div>

              {/* Divider */}
              <div className="divider" style={{ marginBottom: 20 }} />

              {/* Features */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {pkg.includes.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                    <Check
                      size={14}
                      style={{
                        color: PKG_PALETTE[pkg.id]?.accent ?? "rgba(255,255,255,0.35)",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/agendar?package=${pkg.id}`}
                className="btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  background: PKG_PALETTE[pkg.id]?.accent ?? "var(--yellow)",
                  color: "#000",
                  fontWeight: 700,
                }}
              >
                Elegir {pkg.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", fontSize: 13, color: "var(--text-3)", marginTop: 28 }}
        >
          ¿Necesitas algo distinto?{" "}
          <a
            href="#contacto"
            style={{ color: "var(--gold)", textDecoration: "none" }}
            onClick={(e) => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Cuéntanos y armamos un paquete a medida.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
