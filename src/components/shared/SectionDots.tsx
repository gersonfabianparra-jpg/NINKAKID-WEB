"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "servicios", label: "Servicios", color: "#FFCA00" },
  { id: "proceso",   label: "Proceso",   color: "#3B8FFF" },
  { id: "paquetes",  label: "Paquetes",  color: "#FF5050" },
  { id: "galeria",   label: "Galería",   color: "#22c55e" },
  { id: "faq",       label: "FAQ",       color: "#FFCA00" },
  { id: "contacto",  label: "Contacto",  color: "#3B8FFF" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SectionDots() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35, rootMargin: "-10% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="section-dots-nav"
          style={{
            position: "fixed",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 60,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <style>{`@media(max-width:1100px){ .section-dots-nav{ display:none!important; } }`}</style>

          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <div
                key={s.id}
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}
              >
                {/* Label */}
                <AnimatePresence>
                  {hovered === s.id && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15, ease: EASE }}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: s.color,
                        background: "rgba(7,6,26,0.92)",
                        backdropFilter: "blur(10px)",
                        padding: "4px 12px",
                        borderRadius: 100,
                        border: `1px solid ${s.color}33`,
                        whiteSpace: "nowrap",
                        cursor: "default",
                      }}
                    >
                      {s.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.button
                  onClick={() => scrollTo(s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    width:  isActive ? 10 : 7,
                    height: isActive ? 10 : 7,
                    background: isActive ? s.color : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? `0 0 10px ${s.color}` : "none",
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
