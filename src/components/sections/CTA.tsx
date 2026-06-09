"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-orange-500/10 to-pink-500/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,215,0,0.15),transparent_60%)]" />

          {/* Animated border */}
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,215,0,0.2), transparent 40%, rgba(255,45,120,0.15) 100%)",
              maskImage: "linear-gradient(white, white)",
              WebkitMask: "padding-box",
              padding: "1px",
            }}
          />

          <div className="absolute inset-[1px] rounded-[calc(2.5rem-1px)] bg-[#04020f]" />

          {/* Floating decorations */}
          <div className="absolute top-6 right-8 text-4xl opacity-30 float">🎈</div>
          <div className="absolute bottom-6 left-8 text-3xl opacity-20 float-delayed">🎉</div>
          <div className="absolute top-1/2 right-16 text-2xl opacity-15 float-slow">⭐</div>

          {/* Content */}
          <div className="relative z-10 text-center py-16 px-8 sm:px-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Reserva en 2 minutos</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              ¿Listo para hacer una{" "}
              <span className="gradient-text">fiesta legendaria?</span>
            </h2>

            <p className="text-white/55 text-lg max-w-xl mx-auto mb-10">
              Elige la fecha, el paquete y deja que NinjaKid se encargue del resto.
              Tu hijo merece la mejor fiesta de su vida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/agendar" className="btn-primary text-base flex items-center gap-2 group">
                <Calendar size={18} />
                Agendar mi fiesta ahora
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-base"
              >
                Consultar por WhatsApp
              </a>
            </div>

            <p className="text-xs text-white/30 mt-6">
              Sin pagos por adelantado para consultas • Respuesta en menos de 2 horas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
