"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAT_PALETTE = [
  { color: "#FFCA00", glow: "rgba(255,202,0,0.18)",  icon: "🎉" },
  { color: "#3B8FFF", glow: "rgba(59,143,255,0.18)", icon: "⭐" },
  { color: "#FF5050", glow: "rgba(255,80,80,0.18)",  icon: "🎮" },
  { color: "#22c55e", glow: "rgba(34,197,94,0.18)",  icon: "🏆" },
];

function ScrambleCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const FRAMES = 52;
    const SCRAMBLE_UNTIL = 0.55;
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
    }, 35);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: "80px 100px", position: "relative", overflow: "hidden" }}>
      {/* Subtle background gradient */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,202,0,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="label">✦ Números que hablan</span>
        </motion.div>

        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
        >
          <style>{`
            @media(min-width:768px){ .stats-grid{ grid-template-columns: repeat(4,1fr)!important; } }
          `}</style>

          {STATS.map((s, i) => {
            const pal = STAT_PALETTE[i % STAT_PALETTE.length];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "40px 20px 36px",
                  position: "relative",
                  borderRadius: 24,
                  background: `${pal.glow.replace("0.18)", "0.05)")}`,
                  border: `1px solid ${pal.color}22`,
                }}
              >
                {/* Glow behind number */}
                <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${pal.glow} 0%, transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />

                <span style={{ fontSize: 22, marginBottom: 8, position: "relative", zIndex: 1 }}>{pal.icon}</span>

                <p style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(56px, 8vw, 88px)",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: pal.color,
                  lineHeight: 1,
                  position: "relative",
                  zIndex: 1,
                  textShadow: `0 0 40px ${pal.glow}`,
                }}>
                  <ScrambleCounter value={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500, marginTop: 10, textAlign: "center", position: "relative", zIndex: 1 }}>{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
