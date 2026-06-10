"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const PALETTE: Record<string, { accent: string; dim: string; glow: string }> = {
  inflables: { accent: "#FFCA00", dim: "rgba(255,202,0,0.10)",  glow: "rgba(255,202,0,0.16)"  },
  arcade:    { accent: "#3B8FFF", dim: "rgba(59,143,255,0.10)", glow: "rgba(59,143,255,0.16)" },
  sonido:    { accent: "#FF5050", dim: "rgba(255,80,80,0.10)",  glow: "rgba(255,80,80,0.16)"  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" ref={ref} style={{ paddingBlock: "120px" }}>
      <div className="container">
        <SectionHeading
          label="✦ Servicios"
          title="Todo lo que necesitas en un solo lugar"
          subtitle="Equipos de primera calidad, instalados y retirados por nosotros."
          ghost="SERVICIOS"
          color="#FFCA00"
          mb={68}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  i,
  inView,
}: {
  svc: (typeof SERVICES)[0];
  i: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg-card)", transition: "border-color 0.3s, transform 0.12s linear, box-shadow 0.3s" }}
      onMouseMove={(e) => {
        const c = PALETTE[svc.id] ?? PALETTE.inflables;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
        e.currentTarget.style.borderColor = c.dim.replace("0.10", "0.35");
        e.currentTarget.style.boxShadow = `0 20px 60px ${c.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transition = "border-color 0.3s, transform 0.5s ease, box-shadow 0.4s";
      }}
    >
      <div
        className="svc-row"
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}
      >
        <style>{`@media(min-width:640px){ .svc-row{ grid-template-columns:320px 1fr!important; } }`}</style>

        {/* Image panel */}
        <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
          {/* Glow overlay */}
          <div
            aria-hidden
            style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 100% at 10% 50%, ${(PALETTE[svc.id] ?? PALETTE.inflables).dim}, transparent 65%)`, zIndex: 1, pointerEvents: "none" }}
          />
          <Image
            src={svc.image}
            alt={svc.name}
            fill
            className="object-cover"
            unoptimized
            style={{ transition: "transform 0.7s ease" }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,6,12,0.75) 0%, rgba(6,6,12,0.05) 100%)", zIndex: 2 }} />
          <span style={{ position: "absolute", bottom: 18, left: 18, fontSize: 50, zIndex: 3, lineHeight: 1 }}>{svc.emoji}</span>
          <span style={{ position: "absolute", top: 16, left: 16, zIndex: 3, width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Text panel */}
        <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>{svc.name}</h3>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 22, maxWidth: 400 }}>{svc.shortDesc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 26 }}>
            {svc.features.map((f) => (
              <span
                key={f}
                style={{ fontSize: 12, fontWeight: 500, color: "var(--text-2)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 100, padding: "5px 13px" }}
              >
                {f}
              </span>
            ))}
          </div>

          <Link
            href="/agendar"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: (PALETTE[svc.id] ?? PALETTE.inflables).accent, textDecoration: "none", width: "fit-content" }}
            onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
          >
            Incluir en mi reserva <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
