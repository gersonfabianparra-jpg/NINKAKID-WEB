"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/data";
import { formatCLP } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Packages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="paquetes" ref={ref} style={{ paddingBlock: "100px", background: "var(--bg-2)" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="label">✦ Paquetes</span>
          <h2 className="heading-1">Elige tu paquete</h2>
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
              initial={{ opacity: 0, y: 24 }}
              animate={inView
                ? pkg.popular
                  ? {
                      opacity: 1, y: 0,
                      boxShadow: [
                        "0 0 0 1px rgba(245,197,24,0.2), 0 0 0 0 rgba(245,197,24,0)",
                        "0 0 0 1px rgba(245,197,24,0.45), 0 8px 48px -8px rgba(245,197,24,0.18)",
                        "0 0 0 1px rgba(245,197,24,0.2), 0 0 0 0 rgba(245,197,24,0)",
                      ],
                    }
                  : { opacity: 1, y: 0 }
                : {}}
              transition={pkg.popular
                ? {
                    opacity: { duration: 0.6, delay: i * 0.1, ease: EASE },
                    y: { duration: 0.6, delay: i * 0.1, ease: EASE },
                    boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }
                : { duration: 0.6, delay: i * 0.1, ease: EASE }}
              style={{
                background: pkg.popular ? "rgba(245,197,24,0.05)" : "var(--bg-card)",
                border: `1px solid ${pkg.popular ? "rgba(245,197,24,0.3)" : "var(--border)"}`,
                borderRadius: 20,
                padding: 28,
                position: "relative",
                transition: "transform 0.12s linear, box-shadow 0.3s",
              }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width  - 0.5;
                const y = (e.clientY - r.top)  / r.height - 0.5;
                e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-4px) scale(1.01)`;
                e.currentTarget.style.boxShadow = pkg.popular
                  ? "0 24px 60px rgba(245,197,24,0.15)"
                  : "0 20px 50px rgba(0,0,0,0.35)";
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
                    background: "var(--gold)",
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
                    color: pkg.popular ? "var(--gold)" : "#fff",
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
                        color: pkg.popular ? "var(--gold)" : "rgba(255,255,255,0.35)",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: pkg.popular ? "rgba(255,255,255,0.8)" : "var(--text-2)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/agendar?package=${pkg.id}`}
                className={pkg.popular ? "btn btn-primary" : "btn btn-ghost"}
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
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
