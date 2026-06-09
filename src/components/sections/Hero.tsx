"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.5 + 0.1,
}));

const FLOATING_EMOJIS = [
  { emoji: "🎈", x: "10%", y: "20%", delay: 0 },
  { emoji: "🎉", x: "85%", y: "15%", delay: 1 },
  { emoji: "🥳", x: "5%", y: "70%", delay: 2 },
  { emoji: "⭐", x: "92%", y: "65%", delay: 0.5 },
  { emoji: "🎊", x: "20%", y: "85%", delay: 1.5 },
  { emoji: "🏰", x: "78%", y: "80%", delay: 2.5 },
  { emoji: "🕹️", x: "50%", y: "90%", delay: 3 },
  { emoji: "🎵", x: "65%", y: "10%", delay: 1.2 },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ["#FFD700", "#FF2D78", "#7C3AED", "#00F5FF", "#FF9500"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connection lines for nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - dist / 100) * 0.04})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb absolute -top-40 left-1/4 w-[600px] h-[600px] bg-yellow-500/8" />
        <div className="orb absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-purple-600/10" />
        <div className="orb absolute top-1/3 -right-20 w-[400px] h-[400px] bg-pink-500/8" />
        <div className="orb absolute top-1/2 -left-20 w-[300px] h-[300px] bg-cyan-500/6" />
      </div>

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
            scale: [0, 1.2, 1, 1.1, 1],
            y: [0, -20, 0, -10, 0],
            rotate: [-5, 5, -3, 3, 0],
          }}
          transition={{
            duration: 6,
            delay: item.delay + 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-400 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          </span>
          <span className="text-sm text-white/70">Disponible para eventos en Santiago</span>
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
        >
          <span className="block text-white">La fiesta más</span>
          <span className="block gradient-text py-1">épica</span>
          <span className="block text-white">empieza aquí</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Inflables temáticos, juegos arcade y amplificación profesional para transformar
          el cumpleaños de tu hijo en una{" "}
          <span className="text-yellow-400 font-semibold">aventura que nunca olvidará</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/agendar" className="btn-primary flex items-center gap-2 text-base group">
            Reservar mi fiesta ahora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#servicios"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline text-base flex items-center gap-2"
          >
            Ver servicios
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
        >
          {[
            { icon: <Shield size={15} className="text-green-400" />, text: "Equipos certificados" },
            { icon: <Zap size={15} className="text-yellow-400" />, text: "Instalación incluida" },
            { icon: <Star size={15} className="text-pink-400 fill-pink-400" />, text: "+500 fiestas realizadas" },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-white/20 cursor-pointer"
            onClick={() => document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-xs tracking-widest uppercase">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
