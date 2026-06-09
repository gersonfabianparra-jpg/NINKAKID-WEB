"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAT_COLORS = ["#FFCA00", "#3B8FFF", "#FF5050", "#22c55e"];

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

      if (frame >= FRAMES) {
        setDisplay(String(value));
        clearInterval(id);
      }
    }, 35);

    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: 0 }}>
      <div className="container">
        <div className="divider" style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />

        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 0 }}>
          <style>{`
            .stats-grid > *:nth-child(odd) { border-right: 1px solid var(--border); }
            @media(min-width:768px){
              .stats-grid { grid-template-columns: repeat(4,1fr)!important; }
              .stats-grid > * { border-right: 1px solid var(--border); }
              .stats-grid > *:last-child { border-right: none; }
            }
          `}</style>

          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              style={{ padding: "40px 28px", textAlign: "center" }}
            >
              <p style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: STAT_COLORS[i % STAT_COLORS.length], lineHeight: 1, marginBottom: 8 }}>
                <ScrambleCounter value={s.value} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="divider" style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
      </div>
    </section>
  );
}
