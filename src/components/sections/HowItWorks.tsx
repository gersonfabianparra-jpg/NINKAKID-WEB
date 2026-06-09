"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { n: "01", icon: "🎯", title: "Elige tu paquete", desc: "Selecciona el paquete que mejor se adapta a tu evento y al número de invitados que esperan.", color: "#FFCA00" },
  { n: "02", icon: "📅", title: "Reserva la fecha", desc: "Elige el día y la hora. Confirmamos disponibilidad y recibes tu reserva en minutos.", color: "#3B8FFF" },
  { n: "03", icon: "🚚", title: "Nosotros llegamos", desc: "El equipo de NinjaKid llega 1 hora antes para instalarlo todo. Tú no mueves ni un dedo.", color: "#FF5050" },
  { n: "04", icon: "🎉", title: "Disfruta la fiesta", desc: "Solo vive el momento. Al terminar recogemos todo y dejamos el espacio impecable.", color: "#22c55e" },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="proceso" ref={ref} style={{ paddingBlock: "120px", background: "var(--bg-2)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <span className="label">✦ Cómo funciona</span>
          <h2 className="heading-1" style={{ marginBottom: 14 }}>Así de simple</h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 400, marginInline: "auto" }}>
            4 pasos y tu fiesta está lista. Nosotros hacemos el trabajo pesado.
          </p>
        </motion.div>

        <div
          className="steps-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}
        >
          <style>{`@media(min-width:900px){ .steps-grid{ grid-template-columns: repeat(4, 1fr)!important; gap:14px!important; } }`}</style>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                position: "relative",
                background: "var(--bg-card)",
                border: `1px solid ${step.color}22`,
                borderRadius: 20,
                padding: "32px 26px",
                overflow: "hidden",
              }}
            >
              {/* Giant background number */}
              <div
                aria-hidden
                className="section-number"
              >
                {step.n}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: `${step.color}14`,
                  border: `1px solid ${step.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 24,
                }}>
                  {step.icon}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Paso {step.n}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.68 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginTop: 52 }}
        >
          <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 36px" }}>
            Empezar ahora →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
