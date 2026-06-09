"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "100px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            position: "relative",
            background: "var(--bg-card)",
            border: "1px solid rgba(245,197,24,0.15)",
            borderRadius: 24,
            padding: "clamp(40px, 8vw, 80px) clamp(24px, 6vw, 80px)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 300,
              background: "radial-gradient(ellipse, rgba(245,197,24,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              ¿Listo para la mejor fiesta?
            </p>
            <h2
              className="heading-1"
              style={{ marginBottom: 16, maxWidth: 560, marginInline: "auto" }}
            >
              Reserva hoy y nosotros<br />nos encargamos del resto
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-2)",
                maxWidth: 440,
                marginInline: "auto",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              Elige el paquete, la fecha y deja que NinjaKid convierta el cumpleaños en un evento inolvidable.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center"
              style={{ gap: 12 }}
            >
              <Link
                href="/agendar"
                className="btn btn-primary"
                style={{ fontSize: 15, padding: "15px 32px" }}
              >
                Reservar mi fiesta ahora
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ fontSize: 15, padding: "15px 32px" }}
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
