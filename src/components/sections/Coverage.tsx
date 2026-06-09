"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Clock, CheckCircle, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const COMMUNES = [
  "Las Condes","Providencia","Ñuñoa","La Florida","Maipú",
  "Santiago","Vitacura","Lo Barnechea","Peñalolén","La Reina",
  "San Miguel","Macul","Pudahuel","Quilicura","Huechuraba","Recoleta",
  "Independencia","Conchalí","Renca","Cerrillos","Estación Central",
];

const PERKS = [
  { icon: <Truck size={18} />, title: "Delivery incluido", desc: "Llevamos todo a tu domicilio" },
  { icon: <Clock size={18} />, title: "1 hora antes", desc: "Instalamos antes del evento" },
  { icon: <CheckCircle size={18} />, title: "Nosotros lo armamos", desc: "Tú solo disfruta la fiesta" },
  { icon: <MapPin size={18} />, title: "30+ comunas", desc: "Cobertura en toda la RM" },
];

export default function Coverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cobertura" ref={ref} style={{ paddingBlock: "100px", background: "var(--bg-2)" }}>
      <div className="container">
        <div
          className="coverage-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 60,
          }}
        >
          <style>{`@media(min-width:768px){ .coverage-grid{ grid-template-columns:1fr 1fr; } }`}</style>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="label">✦ Cobertura</span>
            <h2 className="heading-1" style={{ marginBottom: 16 }}>
              Llegamos a toda<br />
              <span className="text-gold">la RM</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 36, lineHeight: 1.7 }}>
              No importa en qué comuna estés. Llevamos, instalamos y retiramos todo. Sin preocupaciones.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {PERKS.map((p) => (
                <div
                  key={p.title}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>{p.icon}</span>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{p.title}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "28px",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 20 }}>
              Comunas que cubrimos
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {COMMUNES.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.025 }}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--text-2)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    padding: "5px 12px",
                  }}
                >
                  {c}
                </motion.span>
              ))}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--gold)",
                  background: "var(--gold-dim)",
                  border: "1px solid rgba(245,197,24,0.2)",
                  borderRadius: 100,
                  padding: "5px 12px",
                }}
              >
                + más
              </span>
            </div>

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {[["30+", "Comunas"], ["RM", "Completa"], ["1h", "Anticipación"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: "var(--gold)", letterSpacing: "-0.02em" }}>{v}</p>
                  <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
