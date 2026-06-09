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
    emoji: "🏰",
    color: "#FFCA00",
    text: "Roberto llegó puntualísimo y armó todo en menos de 45 minutos. Los niños quedaron felices toda la tarde. Definitivamente volvería a contratar.",
  },
  {
    name: "Cristián Morales",
    initials: "CM",
    date: "Febrero 2026",
    rating: 5,
    emoji: "🕹️",
    color: "#3B8FFF",
    text: "El paquete completo fue una inversión que valió cada peso. La calidad de los inflables es increíble y el servicio fue impecable de principio a fin.",
  },
  {
    name: "Andrea Fuentes",
    initials: "AF",
    date: "Marzo 2026",
    rating: 5,
    emoji: "🎵",
    color: "#FF5050",
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
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${r.color}22`,
                borderRadius: 20,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "transform 0.12s linear, border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width  - 0.5;
                const y = (e.clientY - rect.top)  / rect.height - 0.5;
                e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-5px)`;
                e.currentTarget.style.borderColor = `${r.color}44`;
                e.currentTarget.style.boxShadow = `0 20px 50px ${r.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
                e.currentTarget.style.borderColor = `${r.color}22`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transition = "transform 0.5s ease, border-color 0.3s, box-shadow 0.4s";
              }}
            >
              {/* Colored top accent line */}
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: r.color, borderRadius: "20px 20px 0 0" }} />

              {/* Glow */}
              <div aria-hidden style={{ position: "absolute", top: -30, left: -30, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${r.color}0d 0%, transparent 70%)`, pointerEvents: "none" }} />

              {/* Quote mark in brand color */}
              <div aria-hidden style={{ position: "absolute", top: -10, right: 16, fontSize: 120, fontFamily: "Georgia, serif", lineHeight: 1, color: `${r.color}10`, userSelect: "none", pointerEvents: "none" }}>"</div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 18, marginTop: 12 }}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} fill={r.color} color={r.color} />
                ))}
              </div>

              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: 26, position: "relative", zIndex: 1 }}>
                "{r.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: `${r.color}14`,
                  border: `1.5px solid ${r.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: r.color, flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{r.emoji} {r.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
