"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Check, ChevronDown } from "lucide-react";

const EASE  = [0.22, 1, 0.36, 1] as const;
const EASE2 = [0.34, 1.56, 0.64, 1] as const; // spring-like

const CYCLING   = ["ÉPICO", "MÁGICO", "INCREÍBLE", "ÚNICO"];
const LONGEST   = "INCREÍBLE"; // ghost spacer — always reserves this width

/* Sparkles fired when the cycling word changes */
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return {
    x: Math.cos(angle) * (44 + (i % 3) * 22),
    y: Math.sin(angle) * (28 + (i % 2) * 18),
    size: 3 + (i % 4),
    color: ["#FFCA00","#FF8C00","#FF5050","#3B8FFF","#22c55e","#FFCA00","#FF8C00","#3B8FFF","#FF5050","#22c55e","#FFCA00","#FF5050"][i],
    delay: i * 0.035,
  };
});

const PARTICLES = [
  { color: "#FFCA00", size: 9,  x: 12, y: 18, dur: 6,   delay: 0   },
  { color: "#3B8FFF", size: 6,  x: 22, y: 70, dur: 8,   delay: 1.2 },
  { color: "#FF5050", size: 11, x: 72, y: 12, dur: 7,   delay: 0.5 },
  { color: "#22c55e", size: 7,  x: 82, y: 65, dur: 9,   delay: 2   },
  { color: "#FFCA00", size: 5,  x: 48, y: 88, dur: 6.5, delay: 1.8 },
  { color: "#3B8FFF", size: 9,  x: 92, y: 35, dur: 7.5, delay: 3   },
  { color: "#FF5050", size: 6,  x: 6,  y: 80, dur: 8.5, delay: 2.5 },
  { color: "#22c55e", size: 8,  x: 58, y: 8,  dur: 7,   delay: 0.9 },
  { color: "#FFCA00", size: 5,  x: 35, y: 45, dur: 10,  delay: 4   },
  { color: "#FF5050", size: 7,  x: 65, y: 92, dur: 6,   delay: 1.5 },
  { color: "#3B8FFF", size: 4,  x: 78, y: 52, dur: 9,   delay: 3.5 },
  { color: "#FFCA00", size: 6,  x: 15, y: 40, dur: 7.2, delay: 5   },
  { color: "#FF5050", size: 8,  x: 42, y: 62, dur: 8,   delay: 2.2 },
  { color: "#22c55e", size: 4,  x: 88, y: 22, dur: 6.8, delay: 1   },
  { color: "#FFCA00", size: 5,  x: 55, y: 75, dur: 9.5, delay: 3.8 },
  { color: "#3B8FFF", size: 7,  x: 3,  y: 55, dur: 7,   delay: 0.3 },
];

/* Star-shaped "✦" floating chips */
const CHIPS = [
  { icon: "🎉", x: 8,  y: 25, dur: 7,  delay: 0.5 },
  { icon: "🎂", x: 88, y: 18, dur: 8,  delay: 2   },
  { icon: "🎪", x: 75, y: 75, dur: 6,  delay: 1.2 },
  { icon: "✨", x: 28, y: 82, dur: 9,  delay: 3   },
  { icon: "🎠", x: 95, y: 50, dur: 7.5,delay: 1.8 },
];

const HERO_STATS = [
  { n: "500+", label: "Fiestas realizadas", color: "#FFCA00" },
  { n: "5.0 ★", label: "Valoración promedio", color: "#3B8FFF" },
  { n: "30+",  label: "Comunas cubiertas",   color: "#FF5050" },
];

const SERVICES = [
  { label: "Inflables", color: "#FFCA00", bg: "rgba(255,202,0,0.1)",  border: "rgba(255,202,0,0.22)"  },
  { label: "Arcade",    color: "#3B8FFF", bg: "rgba(59,143,255,0.1)", border: "rgba(59,143,255,0.22)" },
  { label: "Sonido",    color: "#FF5050", bg: "rgba(255,80,80,0.1)",  border: "rgba(255,80,80,0.22)"  },
  { label: "Domicilio", color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.22)"  },
];

export default function Hero() {
  const ref       = useRef<HTMLElement>(null);
  const [cycleIdx, setCycleIdx] = useState(0);
  const [sparkKey, setSparkKey] = useState(0); // increments to retrigger sparkles

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY   = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const gridBgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const t = setInterval(() => {
      setCycleIdx((i) => (i + 1) % CYCLING.length);
      setSparkKey((k) => k + 1);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100svh", paddingTop: 80, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <style>{`
        @keyframes heroShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes lightBeam {
          0%   { transform: translateX(-120vw) rotate(20deg); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateX(140vw) rotate(20deg); opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(1.12); }
        }
        @keyframes floatChip {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%      { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>

      {/* ── Light beam sweep (every ~12s) ── */}
      <motion.div aria-hidden
        animate={{ x: ["-120vw", "140vw"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 11, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", left: 0, width: 3, height: "130%", background: "linear-gradient(to bottom, transparent 0%, rgba(255,202,0,0.08) 30%, rgba(255,255,255,0.06) 50%, rgba(255,202,0,0.08) 70%, transparent 100%)", filter: "blur(6px)", transform: "rotate(20deg)", pointerEvents: "none", zIndex: 0 }}
      />

      {/* ── Ghost background text ── */}
      <motion.div aria-hidden style={{ y: bgTextY, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-bebas)", fontSize: "clamp(150px,28vw,360px)", fontWeight: 400, letterSpacing: "0.05em", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.038)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", zIndex: 0, lineHeight: 1 }}>
        NINJA KID
      </motion.div>

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} aria-hidden
          animate={{ y: [0, -30, 0], x: [0, p.x % 2 === 0 ? 9 : -9, 0], opacity: [0.45, 0.9, 0.45], scale: [1, 1.2, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: p.color, boxShadow: `0 0 ${p.size * 2.5}px ${p.color}, 0 0 ${p.size * 5}px ${p.color}40`, pointerEvents: "none", zIndex: 0 }}
        />
      ))}

      {/* ── Floating emoji chips ── */}
      {CHIPS.map((c, i) => (
        <motion.div key={i} aria-hidden
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0], scale: [0, 1, 1, 0], y: [0, -18, -18, 0] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: c.delay + 2 }}
          style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, fontSize: 22, pointerEvents: "none", zIndex: 0, filter: "drop-shadow(0 0 8px rgba(255,202,0,0.3))" }}
        >
          {c.icon}
        </motion.div>
      ))}

      {/* ── Ambient orbs ── */}
      <motion.div aria-hidden animate={{ x: [0, 55, 0], y: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "-15%", left: "-8%", width: 820, height: 820, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,202,0,0.11) 0%, transparent 65%)", filter: "blur(55px)", pointerEvents: "none", zIndex: 0 }} />
      <motion.div aria-hidden animate={{ x: [0, -55, 0], y: [0, 65, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 7 }} style={{ position: "absolute", bottom: "-5%", right: "-8%", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,143,255,0.10) 0%, transparent 65%)", filter: "blur(65px)", pointerEvents: "none", zIndex: 0 }} />
      <motion.div aria-hidden animate={{ x: [0, 30, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }} style={{ position: "absolute", top: "35%", left: "42%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,80,0.07) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
      <motion.div aria-hidden animate={{ x: [0, -20, 0], y: [0, -35, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }} style={{ position: "absolute", top: "60%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)", filter: "blur(45px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── Dot grid ── */}
      <motion.div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 20%, transparent 100%)", y: gridBgY, pointerEvents: "none", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-split" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center", paddingBlock: "80px 60px" }}>
          <style>{`
            @media(min-width:900px){ .hero-split{ grid-template-columns:1.15fr 0.85fr!important; gap:80px!important; } }
            @media(max-width:899px){ .hero-card-float{ display:none!important; } }
          `}</style>

          {/* ── Left: Text ── */}
          <motion.div style={{ y: textY }}>

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: 36 }}>
              <span className="badge">
                <span className="dot-pulse" />
                <MapPin size={11} style={{ opacity: 0.5 }} />
                Santiago · Región Metropolitana
              </span>
            </motion.div>

            {/* ════════════════════════════════════
                HEADLINE
            ════════════════════════════════════ */}
            <div style={{ marginBottom: 8 }}>

              {/* Line 1 — "EL CUMPLEAÑOS" */}
              <motion.p
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(1.9rem, 4.2vw, 4rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "0.07em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 0 }}
              >
                EL CUMPLEAÑOS
              </motion.p>

              {/* Line 2 — "MÁS" + cycling accent word */}
              <motion.div
                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.05, delay: 0.18, ease: EASE }}
                style={{ display: "flex", alignItems: "baseline", gap: "0.15em", lineHeight: 0.88, marginBottom: 2, overflow: "visible" }}
              >
                {/* "MÁS" — outline ghost stroke */}
                <span style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(4.5rem, 11.5vw, 10.5rem)", fontWeight: 400, letterSpacing: "0.01em", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.28)", textTransform: "uppercase", flexShrink: 0, lineHeight: 0.88 }}>
                  MÁS
                </span>

                {/* Fixed-width wrapper — uses invisible LONGEST word as spacer */}
                <div style={{ position: "relative", display: "inline-block", lineHeight: 0.88, overflow: "hidden" }}>

                  {/* ── Pulsing glow behind the word ── */}
                  <div aria-hidden style={{ position: "absolute", inset: "-30px -20px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,202,0,0.18) 0%, transparent 65%)", animation: "glowPulse 2.2s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />

                  {/* Invisible spacer — reserves max width always */}
                  <span aria-hidden style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(4.5rem, 11.5vw, 10.5rem)", fontWeight: 400, letterSpacing: "0.01em", textTransform: "uppercase", visibility: "hidden", display: "block", lineHeight: 0.88, WebkitTextFillColor: "transparent" }}>
                    {LONGEST}
                  </span>

                  {/* Cycling word — absolute on top of spacer */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={CYCLING[cycleIdx]}
                      initial={{ y: "105%", opacity: 0, filter: "blur(10px)", skewY: 4 }}
                      animate={{ y: "0%",   opacity: 1, filter: "blur(0px)",  skewY: 0 }}
                      exit={{    y: "-105%", opacity: 0, filter: "blur(10px)", skewY: -4 }}
                      transition={{ duration: 0.52, ease: EASE }}
                      style={{
                        position: "absolute", left: 0, top: 0, width: "100%",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(4.5rem, 11.5vw, 10.5rem)",
                        fontWeight: 400, letterSpacing: "0.01em", textTransform: "uppercase",
                        background: "linear-gradient(100deg, #FFCA00 0%, #FF8C00 28%, #FF5050 60%, #FFCA00 100%)",
                        backgroundSize: "300% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "heroShimmer 3.5s linear infinite",
                        lineHeight: 0.88,
                        display: "block",
                        zIndex: 1,
                      }}
                    >
                      {CYCLING[cycleIdx]}
                    </motion.span>
                  </AnimatePresence>

                  {/* ── Sparkle burst on word change ── */}
                  <AnimatePresence>
                    {SPARKS.map((s) => (
                      <motion.div
                        key={`${sparkKey}-${s.x}-${s.y}`}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: s.x, y: s.y, scale: 0 }}
                        exit={{}}
                        transition={{ duration: 0.55, delay: s.delay, ease: "easeOut" }}
                        style={{ position: "absolute", left: "45%", top: "50%", width: s.size, height: s.size, borderRadius: "50%", background: s.color, boxShadow: `0 0 ${s.size * 3}px ${s.color}`, pointerEvents: "none", zIndex: 2 }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Line 3 — "DE SU VIDA" */}
              <motion.div
                initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.34, ease: EASE }}
              >
                <span style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "0.03em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>
                  DE SU VIDA
                </span>
              </motion.div>
            </div>

            {/* ── Service pills ── */}
            <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32, marginTop: 22 }}>
              {SERVICES.map((s, i) => (
                <motion.span key={s.label}
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.52 + i * 0.07, ease: EASE2 }}
                  style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 100, background: s.bg, color: s.color, border: `1px solid ${s.border}`, cursor: "default" }}
                >
                  {s.label}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
              style={{ fontSize: "clamp(15px,1.7vw,18px)", color: "var(--text-2)", maxWidth: 460, lineHeight: 1.75, marginBottom: 38 }}
            >
              Inflables temáticos, arcade y sonido profesional directo a tu domicilio en Santiago. Instalamos todo — tú solo disfruta.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.74, ease: EASE }}
              style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                <Link href="/agendar" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 32px" }}>
                  Reservar mi fiesta <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="btn"
                  style={{ fontSize: 15, padding: "15px 32px", background: "rgba(37,211,102,0.12)", color: "#25d366", border: "1px solid rgba(37,211,102,0.25)", borderRadius: 100, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
              style={{ display: "flex", flexWrap: "wrap", gap: 28, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              {HERO_STATS.map((s, i) => (
                <motion.div key={s.n}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: EASE2 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <p style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 400, color: s.color, letterSpacing: "0.02em", lineHeight: 1, textShadow: `0 0 20px ${s.color}55` }}>{s.n}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Card ── */}
          <motion.div style={{ position: "relative", y: cardY }}
            initial={{ opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}>
            <div className="gradient-border">
              <div style={{ background: "var(--bg-card)", borderRadius: 23, padding: 28, position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", top: -50, right: -50, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,202,0,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🎪</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>NinjaKid</p>
                      <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1 }}>Plataforma de reservas</p>
                    </div>
                  </div>
                  <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.8, repeat: Infinity }}
                    style={{ fontSize: 11, fontWeight: 700, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 100, padding: "5px 12px" }}>
                    ● Activo
                  </motion.span>
                </div>

                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", marginBottom: 18 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Próximo evento</p>
                  <p style={{ fontWeight: 800, fontSize: 17, marginBottom: 12 }}>Cumpleaños de Sofía 🎂</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                    {[["📅","Sáb 15 Jun"],["🕒","15:00 hrs"],["📍","Las Condes"]].map(([icon, text]) => (
                      <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-2)" }}>
                        <span>{icon}</span><span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 11 }}>Paquete incluye</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
                  {[
                    ["🏰","Inflable temático XL",   "#FFCA00"],
                    ["🕹️","Máquinas arcade × 2",    "#3B8FFF"],
                    ["🎵","Sonido profesional",      "#FF5050"],
                    ["🚚","Instalación y retiro",    "#22c55e"],
                  ].map(([emoji, text, color], i) => (
                    <motion.div key={String(text)}
                      initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: EASE }}
                      style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                      <Check size={12} style={{ color: String(color), flexShrink: 0 }} />
                      <span style={{ color: "rgba(255,255,255,0.72)" }}><span style={{ marginRight: 5 }}>{emoji}</span>{text}</span>
                    </motion.div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 17 }}>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2 }}>Total reserva</p>
                    <p style={{ fontSize: 26, fontWeight: 900, color: "var(--yellow)", letterSpacing: "-0.025em", lineHeight: 1 }}>$75.990</p>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1,2,3,4,5].map((i) => <Star key={i} size={13} fill="var(--yellow)" color="var(--yellow)" />)}
                  </div>
                </div>
              </div>
            </div>

            <motion.div className="hero-card-float"
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: -18, right: -20, background: "#0d0c1a", border: "1px solid rgba(255,202,0,0.22)", borderRadius: 100, padding: "9px 16px", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 10px 36px rgba(0,0,0,0.55)", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 16 }}>🎉</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>+32 fiestas esta semana</span>
            </motion.div>

            <motion.div className="hero-card-float"
              animate={{ y: [0, 9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              style={{ position: "absolute", bottom: -18, left: -20, background: "#0d0c1a", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 100, padding: "9px 16px", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 10px 36px rgba(0,0,0,0.55)", whiteSpace: "nowrap" }}>
              <span className="dot-pulse" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#22c55e" }}>Disponible hoy</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.8 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.22)" }} />
        </motion.div>
      </motion.div>

      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />
    </section>
  );
}
