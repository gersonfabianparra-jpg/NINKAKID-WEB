"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONFETTI = [
  { color: "#FFCA00", size: 10, x: 5,  y: 15, dur: 5   },
  { color: "#3B8FFF", size: 7,  x: 18, y: 70, dur: 7   },
  { color: "#FF5050", size: 12, x: 80, y: 10, dur: 6   },
  { color: "#22c55e", size: 8,  x: 92, y: 65, dur: 8   },
  { color: "#FFCA00", size: 6,  x: 50, y: 85, dur: 6.5 },
  { color: "#3B8FFF", size: 9,  x: 95, y: 30, dur: 7   },
  { color: "#FF5050", size: 7,  x: 3,  y: 80, dur: 5.5 },
  { color: "#22c55e", size: 5,  x: 70, y: 5,  dur: 9   },
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "80px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            position: "relative",
            borderRadius: 28,
            padding: "clamp(56px, 10vw, 96px) clamp(28px, 6vw, 80px)",
            textAlign: "center",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,202,0,0.10) 0%, rgba(59,143,255,0.08) 45%, rgba(255,80,80,0.08) 100%)",
            border: "1px solid rgba(255,202,0,0.2)",
          }}
        >
          {/* Animated confetti */}
          {CONFETTI.map((p, i) => (
            <motion.div
              key={i}
              aria-hidden
              animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              style={{
                position: "absolute",
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                borderRadius: "50%",
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Multi-color glow blobs */}
          <div aria-hidden style={{ position: "absolute", top: "-30%", left: "-10%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,202,0,0.08) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", bottom: "-20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,143,255,0.07) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", top: "20%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,80,0.06) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }} />

          {/* Ghost NINJA KID text */}
          <div aria-hidden style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(60px, 16vw, 200px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            whiteSpace: "nowrap",
            pointerEvents: "none", userSelect: "none",
            letterSpacing: "0.05em",
          }}>FIESTA</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, ease: EASE }}
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 20 }}
            >
              🎊 ¿Listo para la mejor fiesta?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, ease: EASE }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: 20,
              }}
            >
              Reserva hoy y nosotros{" "}
              <span style={{ color: "var(--yellow)" }}>nos encargamos</span>
              {" "}del resto
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, ease: EASE }}
              style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 480, marginInline: "auto", marginBottom: 40, lineHeight: 1.65 }}
            >
              Elige el paquete, la fecha y deja que NinjaKid convierta el cumpleaños en un evento que nadie olvidará.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, ease: EASE }}
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}
            >
              <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 15, padding: "16px 36px", fontWeight: 800 }}>
                Reservar mi fiesta ahora <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  fontSize: 15, padding: "16px 36px",
                  background: "rgba(37,211,102,0.12)",
                  color: "#25d366",
                  border: "1px solid rgba(37,211,102,0.25)",
                  borderRadius: 100, fontWeight: 600,
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
