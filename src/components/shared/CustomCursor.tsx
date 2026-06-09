"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(mx, { stiffness: 130, damping: 18, mass: 0.25 });
  const ry = useSpring(my, { stiffness: 130, damping: 18, mass: 0.25 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setActive(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Dot — exact position */}
      <motion.div
        style={{
          x: mx, y: my,
          translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          pointerEvents: "none",
          width: active ? 10 : 6,
          height: active ? 10 : 6,
          borderRadius: "50%",
          background: "var(--gold)",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
          boxShadow: active ? "0 0 12px var(--gold)" : "none",
        }}
      />
      {/* Ring — spring lag */}
      <motion.div
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          pointerEvents: "none",
          width: active ? 52 : 30,
          height: active ? 52 : 30,
          borderRadius: "50%",
          border: `1.5px solid rgba(245,197,24,${active ? 0.7 : 0.35})`,
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s, opacity 0.3s",
        }}
      />
    </>
  );
}
