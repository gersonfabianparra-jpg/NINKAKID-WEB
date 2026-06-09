"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso",   href: "#proceso"   },
  { label: "Paquetes",  href: "#paquetes"  },
  { label: "Contacto",  href: "#contacto"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold), #ffb800)", zIndex: 200 }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10">
              <Image
                src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                alt="NinjaKid"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-bold text-base tracking-tight">
              Ninja<span style={{ color: "var(--gold)" }}>Kid</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/agendar" className="btn btn-primary hidden sm:inline-flex" style={{ fontSize: 13, padding: "10px 20px" }}>
              Reservar fiesta
            </Link>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "rgba(255,255,255,0.7)" }}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
            style={{ padding: "0 16px 16px" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#111", border: "1px solid var(--border)" }}
            >
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  className="w-full text-left px-5 py-4 text-sm font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.65)", borderBottom: "1px solid var(--border)" }}
                >
                  {l.label}
                </button>
              ))}
              <div style={{ padding: "12px" }}>
                <Link
                  href="/agendar"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  Reservar mi fiesta
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
