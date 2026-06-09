"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 50;
    const id = setInterval(() => {
      start += step;
      if (start >= value) { setN(value); clearInterval(id); }
      else setN(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ paddingBlock: 0 }}>
      <div className="container">
        <div
          className="divider"
          style={{ marginBottom: 0, background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
        />
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
          }}
        >
          {/* On md+: 4 columns */}
          <style>{`@media(min-width:768px){ .stats-grid{ grid-template-columns: repeat(4,1fr)!important; } }`}</style>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stats-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: "36px 28px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div
          className="divider"
          style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
        />
      </div>
    </section>
  );
}
