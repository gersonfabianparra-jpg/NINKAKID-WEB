"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { STATS } from "@/lib/data";

const EASE  = [0.22, 1, 0.36, 1] as const;
const EASE2 = [0.34, 1.56, 0.64, 1] as const;

const STAT_PALETTE = [
  { color: "#FFCA00", glow: "rgba(255,202,0,0.22)",  icon: "🎉", ringColor: "rgba(255,202,0,0.35)" },
  { color: "#3B8FFF", glow: "rgba(59,143,255,0.22)", icon: "⭐", ringColor: "rgba(59,143,255,0.35)" },
  { color: "#FF5050", glow: "rgba(255,80,80,0.22)",  icon: "🎮", ringColor: "rgba(255,80,80,0.35)"  },
  { color: "#22c55e", glow: "rgba(34,197,94,0.22)",  icon: "🏆", ringColor: "rgba(34,197,94,0.35)"  },
];

/* Floating particles around each stat */
const ORBIT_DOTS = Array.from({ length: 6 }, (_, i) => ({
  angle: (i / 6) * 360,
  size: 3 + (i % 3),
  dur: 8 + i * 0.5,
}));

function ScrambleCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const FRAMES = 60;
    const SCRAMBLE_UNTIL = 0.5;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const progress = frame / FRAMES;
      if (progress < SCRAMBLE_UNTIL) {
        setDisplay(String(Math.floor(Math.random() * (value * 1.5))));
      } else {
        const p = (progress - SCRAMBLE_UNTIL) / (1 - SCRAMBLE_UNTIL);
        setDisplay(String(Math.floor(value * Math.min(p, 1))));
      }
      if (frame >= FRAMES) { setDisplay(String(value)); clearInterval(id); }
    }, 30);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "80px 100px", position: "relative", overflow: "hidden" }}>

      {/* Animated gradient background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(-45deg, rgba(255,202,0,0.03), rgba(59,143,255,0.03), rgba(255,80,80,0.03), rgba(34,197,94,0.03))", backgroundSize: "400% 400%", animation: "gradShift 14s ease infinite", pointerEvents: "none" }} />

      {/* Ghost background text */}
      <div aria-hidden className="section-ghost" style={{ fontSize: "clamp(120px,20vw,240px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", WebkitTextStroke: "1px rgba(255,255,255,0.025)", whiteSpace: "nowrap" }}>
        NÚMEROS
      </div>

      {/* Dot grid */}
      <div aria-hidden className="dot-grid" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          label="✦ Números que hablan"
          title="Los números no mienten"
          ghost="NÚMEROS"
          color="#FFCA00"
          mb={52}
        />

        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }}>
          <style>{`@media(min-width:768px){ .stats-grid{ grid-template-columns: repeat(4,1fr)!important; } }`}</style>

          {STATS.map((s, i) => {
            const pal = STAT_PALETTE[i % STAT_PALETTE.length];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 48, scale: 0.88, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.85, delay: i * 0.14, ease: EASE }}
                whileHover={{ scale: 1.04, y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "44px 20px 38px",
                  position: "relative", borderRadius: 24,
                  background: pal.glow.replace("0.22)", "0.05)"),
                  border: `1px solid ${pal.color}28`,
                  cursor: "default",
                  overflow: "hidden",
                }}
              >
                {/* Animated pulsing glow behind the card */}
                <div aria-hidden style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${pal.glow} 0%, transparent 70%)`, animation: "glowPulse 3s ease-in-out infinite", animationDelay: `${i * 0.5}s`, pointerEvents: "none" }} />

                {/* Ripple rings */}
                <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 24, border: `1px solid ${pal.color}22`, animation: "ripple 3s ease-out infinite", animationDelay: `${i * 0.4}s`, pointerEvents: "none" }} />
                <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 24, border: `1px solid ${pal.color}18`, animation: "ripple 3s ease-out infinite", animationDelay: `${i * 0.4 + 1}s`, pointerEvents: "none" }} />

                {/* Orbit dot */}
                {inView && (
                  <motion.div aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: 8, borderRadius: "50%", pointerEvents: "none" }}
                  >
                    <div style={{ position: "absolute", top: 0, left: "50%", width: 5, height: 5, borderRadius: "50%", background: pal.color, boxShadow: `0 0 8px ${pal.color}`, transform: "translateX(-50%)" }} />
                  </motion.div>
                )}

                {/* Icon with bounce */}
                <motion.span
                  animate={inView ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  style={{ fontSize: 26, marginBottom: 12, position: "relative", zIndex: 1, display: "block" }}
                >
                  {pal.icon}
                </motion.span>

                {/* Big number */}
                <p style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(58px, 8.5vw, 92px)",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: pal.color,
                  lineHeight: 1,
                  position: "relative", zIndex: 1,
                  textShadow: `0 0 30px ${pal.glow}, 0 0 60px ${pal.glow.replace("0.22","0.1")}`,
                }}>
                  <ScrambleCounter value={s.value} suffix={s.suffix} />
                </p>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.14, ease: EASE }}
                  style={{ width: 40, height: 2, borderRadius: 2, background: pal.color, transformOrigin: "center", margin: "10px auto 8px", boxShadow: `0 0 8px ${pal.color}` }}
                />

                <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 500, textAlign: "center", position: "relative", zIndex: 1, letterSpacing: "0.02em" }}>
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
