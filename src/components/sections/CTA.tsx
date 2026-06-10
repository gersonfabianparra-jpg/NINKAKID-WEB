"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE  = [0.22, 1, 0.36, 1] as const;
const EASE2 = [0.34, 1.56, 0.64, 1] as const;

/* Massive confetti field */
const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  color: ["#FFCA00","#3B8FFF","#FF5050","#22c55e","#FF8C00"][i % 5],
  size: 4 + (i % 6) * 1.5,
  x: (i * 4.2) % 98,
  y: (i * 6.7 + 3) % 92,
  dur: 5 + (i % 5),
  delay: i * 0.22,
}));

/* Light beams */
const BEAMS = [
  { angle: 22,  dur: 5,  repeatDelay: 9,  delay: 0,   opacity: 0.07 },
  { angle: -18, dur: 6,  repeatDelay: 11, delay: 3.5, opacity: 0.06 },
  { angle: 38,  dur: 4.5,repeatDelay: 13, delay: 7,   opacity: 0.05 },
];

export default function CTA() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "80px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="spin-border"
          style={{
            position: "relative",
            borderRadius: 32,
            padding: "clamp(64px, 10vw, 104px) clamp(28px, 6vw, 80px)",
            textAlign: "center",
            overflow: "hidden",
            /* dark glass background (the .spin-border::after bg override) */
            background: "linear-gradient(135deg, #09081f 0%, #0a0921 100%)",
          }}
        >
          {/* ── Animated gradient bg layer ── */}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(-45deg, rgba(255,202,0,0.06), rgba(59,143,255,0.05), rgba(255,80,80,0.05), rgba(34,197,94,0.04))", backgroundSize: "400% 400%", animation: "gradShift 10s ease infinite", pointerEvents: "none", zIndex: 0 }} />

          {/* ── Dot grid overlay ── */}
          <div aria-hidden className="dot-grid" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%)", pointerEvents: "none", zIndex: 0 }} />

          {/* ── 3 diagonal light beams ── */}
          {BEAMS.map((b, i) => (
            <motion.div key={i} aria-hidden
              animate={{ x: ["-130%", "160%"] }}
              transition={{ duration: b.dur, repeat: Infinity, repeatDelay: b.repeatDelay, ease: "easeInOut", delay: b.delay }}
              style={{ position: "absolute", top: "-20%", left: 0, width: 5, height: "140%", background: `linear-gradient(to bottom, transparent, rgba(255,255,255,${b.opacity}), transparent)`, transform: `rotate(${b.angle}deg)`, filter: "blur(8px)", pointerEvents: "none", zIndex: 1 }}
            />
          ))}

          {/* ── Confetti particles ── */}
          {CONFETTI.map((p, i) => (
            <motion.div key={i} aria-hidden
              animate={{ y: [0, -26, 0], x: [0, i % 2 ? 7 : -7, 0], opacity: [0.3, 0.85, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}40`, pointerEvents: "none", zIndex: 1 }}
            />
          ))}

          {/* ── Giant ghost text — breathes ── */}
          <motion.div aria-hidden
            animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-bebas)", fontSize: "clamp(90px, 24vw, 310px)", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.038)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "0.04em", zIndex: 1, lineHeight: 1 }}
          >
            NINJA KID
          </motion.div>

          {/* ── Animated glow blobs ── */}
          <motion.div aria-hidden animate={{ x: [0, 50, 0], y: [0, -35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "-30%", left: "-10%", width: 700, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,202,0,0.10) 0%, transparent 65%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 1 }} />
          <motion.div aria-hidden animate={{ x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }} style={{ position: "absolute", bottom: "-25%", right: "-8%", width: 600, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,143,255,0.09) 0%, transparent 65%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 1 }} />
          <motion.div aria-hidden animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} style={{ position: "absolute", top: "15%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,80,0.07) 0%, transparent 65%)", filter: "blur(55px)", pointerEvents: "none", zIndex: 1 }} />
          <motion.div aria-hidden animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }} style={{ position: "absolute", bottom: "10%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none", zIndex: 1 }} />

          {/* ── CONTENT ── */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, ease: EASE }}
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 22 }}
            >
              🎊 ¿Listo para la mejor fiesta?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.35, duration: 1, ease: EASE }}
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 8.5vw, 104px)", fontWeight: 400, letterSpacing: "0.02em", textTransform: "uppercase", lineHeight: 1, marginBottom: 22 }}
            >
              Reserva hoy y nosotros{" "}
              <span className="text-shimmer">nos encargamos</span>
              {" "}del resto
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: EASE }}
              style={{ height: 3, width: "clamp(100px, 20vw, 280px)", background: "linear-gradient(90deg, #FFCA00, #FF8C00, #FF5050, #3B8FFF)", borderRadius: 99, transformOrigin: "center", margin: "0 auto 28px", boxShadow: "0 0 20px rgba(255,202,0,0.4)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, ease: EASE }}
              style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 500, marginInline: "auto", marginBottom: 44, lineHeight: 1.7 }}
            >
              Elige el paquete, la fecha y deja que NinjaKid convierta el cumpleaños en un evento que nadie olvidará.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.62, ease: EASE }}
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14 }}
            >
              {/* Primary CTA with glow ring */}
              <div style={{ position: "relative" }}>
                <div aria-hidden style={{ position: "absolute", inset: -4, borderRadius: 100, border: "1.5px solid rgba(255,202,0,0.5)", animation: "ripple 2.2s ease-out infinite" }} />
                <div aria-hidden style={{ position: "absolute", inset: -4, borderRadius: 100, border: "1.5px solid rgba(255,202,0,0.3)", animation: "ripple 2.2s ease-out infinite", animationDelay: "0.7s" }} />
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 16 }}>
                  <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 16, padding: "17px 40px", fontWeight: 800, boxShadow: "0 0 40px rgba(255,202,0,0.3)", position: "relative", zIndex: 1 }}>
                    Reservar mi fiesta ahora <ArrowRight size={17} />
                  </Link>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 16 }}>
                <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="btn"
                  style={{ fontSize: 16, padding: "17px 40px", background: "rgba(37,211,102,0.12)", color: "#25d366", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 100, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 9 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
