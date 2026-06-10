"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="galeria" ref={ref} style={{ paddingBlock: "120px", background: "var(--bg-2)" }}>
      <div className="container">

        {/* Header with parallax */}
        <motion.div style={{ y: headerY }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <SectionHeading
              label="✦ Galería"
              title="Momentos reales"
              ghost="GALERÍA"
              align="left"
              color="#3B8FFF"
              mb={0}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              <a href="https://instagram.com/ninjakidchile" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13, padding: "10px 18px" }}>
                Ver Instagram →
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <style>{`@media(min-width:640px){ .gallery-grid{ grid-template-columns: repeat(3,1fr); } }`}</style>

          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              onClick={() => setLightbox(img.src)}
              initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
              style={{ position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", cursor: "pointer", display: "block", padding: 0, background: "transparent" }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" unoptimized style={{ transition: "transform 0.6s ease" }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.08)")}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
              />
              {/* Hover overlay with zoom icon */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ZoomIn size={18} style={{ color: "var(--gold)" }} />
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.94)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "100%", maxWidth: 700, maxHeight: "80vh", borderRadius: 16, overflow: "hidden", aspectRatio: "3/4" }}
            >
              <Image src={lightbox} alt="" fill className="object-contain" unoptimized />
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              style={{ position: "fixed", top: 20, right: 20, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,197,24,0.15)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
