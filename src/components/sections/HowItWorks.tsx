"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE  = [0.22, 1, 0.36, 1] as const;
const EASE2 = [0.34, 1.56, 0.64, 1] as const;

const STEPS = [
  { n: "01", icon: "🎯", title: "Elige tu paquete",  desc: "Selecciona el paquete que mejor se adapta a tu evento y al número de invitados que esperan.",  color: "#FFCA00", glow: "rgba(255,202,0,0.18)"  },
  { n: "02", icon: "📅", title: "Reserva la fecha",   desc: "Elige el día y la hora. Confirmamos disponibilidad y recibes tu reserva en minutos.",            color: "#3B8FFF", glow: "rgba(59,143,255,0.18)" },
  { n: "03", icon: "🚚", title: "Nosotros llegamos",  desc: "El equipo de NinjaKid llega 1 hora antes para instalarlo todo. Tú no mueves ni un dedo.",         color: "#FF5050", glow: "rgba(255,80,80,0.18)"  },
  { n: "04", icon: "🎉", title: "Disfruta la fiesta", desc: "Solo vive el momento. Al terminar recogemos todo y dejamos el espacio impecable.",               color: "#22c55e", glow: "rgba(34,197,94,0.18)"  },
];

/* Background particles */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  color: ["#FFCA00","#3B8FFF","#FF5050","#22c55e"][i % 4],
  size: 3 + (i % 4),
  x: (i * 7.3) % 100,
  y: (i * 11.7 + 5) % 90,
  dur: 6 + (i % 5),
  delay: i * 0.4,
}));

export default function HowItWorks() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="proceso" ref={ref} style={{ paddingBlock: "120px", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>

      {/* Animated gradient bg */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(-45deg, rgba(255,202,0,0.025), rgba(59,143,255,0.025), rgba(255,80,80,0.02), rgba(34,197,94,0.02))", backgroundSize: "400% 400%", animation: "gradShift 18s ease infinite", pointerEvents: "none" }} />

      {/* Dot grid */}
      <div aria-hidden className="dot-grid" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, black 20%, transparent 80%)", pointerEvents: "none" }} />

      {/* Background particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} aria-hidden
          animate={{ y: [0, -20, 0], x: [0, i % 2 ? 8 : -8, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`, pointerEvents: "none", zIndex: 0 }}
        />
      ))}

      {/* Ghost title background */}
      <div aria-hidden className="section-ghost" style={{ fontSize: "clamp(100px,18vw,220px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", WebkitTextStroke: "1px rgba(255,255,255,0.022)", whiteSpace: "nowrap" }}>
        PROCESO
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <span className="label">✦ Cómo funciona</span>
          <h2 className="heading-1 text-shimmer" style={{ marginBottom: 14, display: "block" }}>
            Así de simple
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 400, marginInline: "auto" }}>
            4 pasos y tu fiesta está lista. Nosotros hacemos el trabajo pesado.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, position: "relative" }}>
          <style>{`@media(min-width:900px){ .steps-grid{ grid-template-columns: repeat(4, 1fr)!important; gap:14px!important; } }`}</style>

          {/* Animated connector line (desktop only) */}
          <div className="steps-connector" style={{ display: "none" }}>
            <style>{`@media(min-width:900px){ .steps-connector{ display:block!important; position:absolute; top:54px; left:calc(12.5% + 25px); right:calc(12.5% + 25px); height:2px; z-index:0; overflow:hidden; background:rgba(255,255,255,0.05); border-radius:2px; } }`}</style>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
              style={{ height: "100%", transformOrigin: "left center", background: "linear-gradient(90deg, #FFCA00, #3B8FFF, #FF5050, #22c55e)", boxShadow: "0 0 12px rgba(255,202,0,0.4)" }}
            />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.75, delay: i * 0.15, ease: EASE }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 16 } }}
              style={{
                position: "relative",
                background: "var(--bg-card)",
                border: `1px solid ${step.color}22`,
                borderRadius: 20,
                padding: "32px 24px",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              {/* Card glow background */}
              <div aria-hidden style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`, filter: "blur(24px)", pointerEvents: "none", animation: "glowPulse 3.5s ease-in-out infinite", animationDelay: `${i * 0.6}s` }} />

              {/* Colored accent top line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: EASE }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`, transformOrigin: "left", boxShadow: `0 0 12px ${step.color}` }}
              />

              {/* Giant background number */}
              <div aria-hidden className="section-number">{step.n}</div>

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Icon with bounce animation */}
                <motion.div
                  animate={inView ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  style={{
                    width: 54, height: 54, borderRadius: 16,
                    background: `${step.color}14`,
                    border: `1.5px solid ${step.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, marginBottom: 24,
                    boxShadow: `0 0 16px ${step.glow}`,
                    position: "relative",
                  }}
                >
                  {step.icon}
                  {/* Ping ring on the icon */}
                  <div aria-hidden style={{ position: "absolute", inset: -4, borderRadius: 20, border: `1px solid ${step.color}30`, animation: "ripple 2.8s ease-out infinite", animationDelay: `${i * 0.5}s`, pointerEvents: "none" }} />
                </motion.div>

                <p style={{ fontSize: 11, fontWeight: 800, color: step.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Paso {step.n}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.68 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE2 }}
          style={{ textAlign: "center", marginTop: 56 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 16 }} style={{ display: "inline-block" }}>
            <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 36px" }}>
              Empezar ahora →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
