"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} style={{ paddingBlock: "100px" }}>
      <div className="container" style={{ maxWidth: 760 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          <span className="label">✦ FAQ</span>
          <h2 className="heading-1">Preguntas frecuentes</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${open === i ? "rgba(245,197,24,0.2)" : "var(--border)"}`,
                borderRadius: 14,
                overflow: "hidden",
                transition: "border-color 0.25s ease",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "20px 22px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: open === i ? "#fff" : "rgba(255,255,255,0.75)",
                    lineHeight: 1.4,
                    transition: "color 0.2s ease",
                  }}
                >
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
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        padding: "0 22px 20px",
                        fontSize: 14,
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                      }}
                    >
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
