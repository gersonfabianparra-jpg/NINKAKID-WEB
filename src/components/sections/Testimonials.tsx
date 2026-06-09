"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const REVIEWS = [
  {
    name: "María José López",
    initials: "MJ",
    date: "Enero 2026",
    rating: 5,
    text: "Roberto llegó puntualísimo y armó todo en menos de 45 minutos. Los niños quedaron felices toda la tarde. Definitivamente volvería a contratar.",
  },
  {
    name: "Cristián Morales",
    initials: "CM",
    date: "Febrero 2026",
    rating: 5,
    text: "El paquete completo fue una inversión que valió cada peso. La calidad de los inflables es increíble y el servicio fue impecable de principio a fin.",
  },
  {
    name: "Andrea Fuentes",
    initials: "AF",
    date: "Marzo 2026",
    rating: 5,
    text: "Contratamos para el cumpleaños de nuestra hija. Superó todas nuestras expectativas. Muy recomendable para quienes quieren una fiesta sin estrés.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "120px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="label">✦ Testimonios</span>
          <h2 className="heading-1" style={{ marginBottom: 14 }}>Lo que dicen las familias</h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 380, marginInline: "auto" }}>
            Más de 500 fiestas felices en Santiago. Aquí algunas historias.
          </p>
        </motion.div>

        <div
          className="reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}
        >
          <style>{`@media(min-width:768px){ .reviews-grid{ grid-template-columns: repeat(3,1fr)!important; } }`}</style>

          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.13, ease: EASE }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Decorative quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -14,
                  right: 16,
                  fontSize: 140,
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                  color: "rgba(245,197,24,0.045)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                "
              </div>

              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>

              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: 26, position: "relative", zIndex: 1 }}>
                "{r.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(245,197,24,0.08)",
                  border: "1px solid rgba(245,197,24,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "var(--gold)", flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)" }}>{r.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
