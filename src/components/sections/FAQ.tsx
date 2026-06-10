"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} style={{ paddingBlock: "120px" }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <SectionHeading
          label="✦ FAQ"
          title="Preguntas frecuentes"
          ghost="FAQ"
          color="#FF5050"
          mb={56}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: i * 0.075, ease: EASE }}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${open === i ? "rgba(245,197,24,0.22)" : "var(--border)"}`,
                borderRadius: 14,
                overflow: "hidden",
                transition: "border-color 0.25s ease",
              }}
              onMouseMove={(e) => {
                if (open === i) return;
                const r = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`;
                e.currentTarget.style.transition = "transform 0.1s linear, border-color 0.25s";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
                e.currentTarget.style.transition = "transform 0.5s ease, border-color 0.25s";
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.75)", lineHeight: 1.4, transition: "color 0.2s ease" }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flexShrink: 0, color: open === i ? "var(--gold)" : "rgba(255,255,255,0.3)" }}
                >
                  <Plus size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ padding: "0 22px 20px", fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
