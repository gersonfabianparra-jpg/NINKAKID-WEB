"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  ghost?: string;
  align?: "center" | "left";
  color?: string;
  mb?: number;
}

const EASE  = [0.22, 1, 0.36, 1] as const;
const EASE2 = [0.34, 1.56, 0.64, 1] as const;

export default function SectionHeading({
  label, title, subtitle, ghost,
  align = "center", color = "#FFCA00", mb = 64,
}: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });
  const isCenter = align === "center";

  return (
    <div ref={ref} style={{ textAlign: align, position: "relative", marginBottom: mb }}>

      {/* Ghost background word */}
      {ghost && (
        <div
          aria-hidden
          className="section-ghost"
          style={{
            fontSize: "clamp(88px, 17vw, 210px)",
            top: "50%",
            left: isCenter ? "50%" : "-2%",
            transform: isCenter ? "translate(-50%,-50%)" : "translateY(-50%)",
            WebkitTextStroke: "1px rgba(255,255,255,0.028)",
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          {ghost}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Label badge — slides in ── */}
        <motion.div
          initial={{ opacity: 0, x: isCenter ? 0 : -28, y: 14 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 16 }}
        >
          <span className="label">{label}</span>
        </motion.div>

        {/* ── Main heading — slide-up clip reveal ── */}
        <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
          <motion.h2
            initial={{ y: "115%", opacity: 0, filter: "blur(10px)", skewY: 3 }}
            animate={inView ? { y: "0%", opacity: 1, filter: "blur(0px)", skewY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="heading-1 text-shimmer"
            style={{ display: "block", marginBottom: 0 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* ── Animated accent bar ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
          style={{
            height: 3,
            width: isCenter ? "clamp(56px, 9vw, 110px)" : "clamp(56px, 9vw, 90px)",
            background: `linear-gradient(90deg, ${color}, ${color}99, transparent)`,
            borderRadius: 99,
            transformOrigin: isCenter ? "center" : "left",
            margin: isCenter ? "16px auto 0" : "16px 0 0",
            boxShadow: `0 0 16px ${color}55, 0 0 32px ${color}22`,
          }}
        />

        {/* ── Two flanking glow dots around the bar ── */}
        {isCenter && inView && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7, ease: EASE2 }}
              style={{ position: "absolute", left: "calc(50% - clamp(56px,9vw,110px)/2 - 8px)", top: "100%", marginTop: 14, width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}` }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.75, ease: EASE2 }}
              style={{ position: "absolute", right: "calc(50% - clamp(56px,9vw,110px)/2 - 8px)", top: "100%", marginTop: 14, width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}` }}
            />
          </>
        )}

        {/* ── Subtitle ── */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.75, delay: 0.32, ease: EASE }}
            style={{
              fontSize: 16, color: "var(--text-2)",
              maxWidth: 440,
              marginInline: isCenter ? "auto" : 0,
              marginTop: 20,
              lineHeight: 1.75,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
