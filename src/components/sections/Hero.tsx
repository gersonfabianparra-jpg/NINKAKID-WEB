"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: 80 }}
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,197,24,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center" style={{ padding: "60px 0 80px" }}>

          {/* Status badge */}
          <motion.div {...fade(0)} style={{ marginBottom: 32 }}>
            <span className="badge">
              <span className="dot-pulse" />
              <MapPin size={12} style={{ opacity: 0.6 }} />
              Región Metropolitana, Santiago
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fade(0.1)} className="display" style={{ marginBottom: 24 }}>
            La fiesta que<br />
            <span className="gradient-gold">tu hijo merece</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fade(0.2)}
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--text-2)",
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Inflables temáticos, juegos arcade y amplificación profesional.
            Llegamos a tu domicilio y nos encargamos de todo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade(0.3)}
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 12 }}
          >
            <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 32px" }}>
              Reservar mi fiesta
              <ArrowRight size={16} />
            </Link>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 15, padding: "15px 32px" }}
              onClick={() => document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver qué ofrecemos
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...fade(0.45)}
            className="flex flex-wrap items-center justify-center"
            style={{ gap: "8px 24px", marginTop: 48 }}
          >
            {[
              "🏆 +500 fiestas realizadas",
              "✅ Instalación incluida",
              "📍 Toda la RM",
            ].map((t) => (
              <span key={t} style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
