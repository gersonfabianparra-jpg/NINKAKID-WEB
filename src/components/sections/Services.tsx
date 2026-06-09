"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" ref={ref} style={{ paddingBlock: "100px" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="label">✦ Servicios</span>
          <h2 className="heading-1" style={{ maxWidth: 480, marginInline: "auto" }}>
            Todo lo que necesitas en un solo lugar
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="card"
              style={{ overflow: "hidden" }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <Image
                  src={svc.image}
                  alt={svc.name}
                  fill
                  className="object-cover"
                  style={{ transition: "transform 0.6s ease" }}
                  unoptimized
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 16,
                    fontSize: 28,
                  }}
                >
                  {svc.emoji}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{svc.name}</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 20 }}>
                  {svc.shortDesc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                  {svc.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-3)" }}>
                      <span style={{ color: "var(--gold)", fontSize: 10 }}>●</span>
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/agendar"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--gold)",
                    textDecoration: "none",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget.style.gap = "10px"))}
                  onMouseLeave={e => ((e.currentTarget.style.gap = "6px"))}
                >
                  Incluir en mi reserva <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
