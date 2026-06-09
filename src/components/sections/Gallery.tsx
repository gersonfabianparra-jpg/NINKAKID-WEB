"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="galeria" ref={ref} style={{ paddingBlock: "100px" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <div>
            <span className="label">✦ Galería</span>
            <h2 className="heading-1">Momentos reales</h2>
          </div>
          <a
            href="https://instagram.com/ninjakidchile"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ fontSize: 13, padding: "10px 18px" }}
          >
            Ver Instagram →
          </a>
        </motion.div>

        {/* Grid */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          <style>{`@media(min-width:640px){ .gallery-grid{ grid-template-columns: repeat(3,1fr); } }`}</style>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              onClick={() => setLightbox(img.src)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--border)",
                cursor: "pointer",
                display: "block",
                padding: 0,
                background: "transparent",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                unoptimized
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0)",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget.style.background = "rgba(0,0,0,0.25)"))}
                onMouseLeave={e => ((e.currentTarget.style.background = "rgba(0,0,0,0)"))}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 700,
                maxHeight: "80vh",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "3/4",
              }}
            >
              <Image src={lightbox} alt="" fill className="object-contain" unoptimized />
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
