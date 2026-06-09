"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Truck, CheckCircle } from "lucide-react";

const COMMUNES = [
  "Las Condes", "Providencia", "Ñuñoa", "La Florida",
  "Maipú", "Santiago Centro", "Vitacura", "Lo Barnechea",
  "Peñalolén", "La Reina", "San Miguel", "Macul",
  "Pudahuel", "Quilicura", "Huechuraba", "Recoleta",
];

export default function Coverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cobertura" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background orbs */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-tag">📍 Zona de Cobertura</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Llegamos a toda la{" "}
                <span className="gradient-text-cool">Región Metropolitana</span>
              </h2>
              <p className="text-white/55 text-lg mb-8 leading-relaxed">
                No importa en qué comuna estés, llevamos toda la diversión hasta tu puerta.
                Transporte, instalación y retiro incluidos en todos los paquetes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: <Truck size={20} className="text-cyan-400" />,
                    title: "Delivery incluido",
                    desc: "Llegamos a tu dirección sin costo extra*",
                  },
                  {
                    icon: <Clock size={20} className="text-yellow-400" />,
                    title: "Llegamos a tiempo",
                    desc: "Instalación 1 hora antes del evento",
                  },
                  {
                    icon: <CheckCircle size={20} className="text-green-400" />,
                    title: "Sin estrés",
                    desc: "Nosotros armamos y desarmamos todo",
                  },
                  {
                    icon: <MapPin size={20} className="text-pink-400" />,
                    title: "+30 comunas",
                    desc: "Cobertura en toda la RM",
                  },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-2xl p-4 flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-white/45 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-white/25">
                * Para comunas fuera del sector oriente puede aplicar cargo adicional.
              </p>
            </motion.div>
          </div>

          {/* Right: Commune tags */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative map blob */}
            <div className="absolute inset-0 glass rounded-3xl" />
            <div className="relative p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={18} className="text-yellow-400" />
                <span className="text-sm font-semibold text-white/80">Algunas comunas que cubrimos</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {COMMUNES.map((commune, i) => (
                  <motion.span
                    key={commune}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                    className="px-4 py-2 rounded-full text-sm border border-white/10 text-white/60 hover:border-yellow-500/30 hover:text-yellow-400 hover:bg-yellow-500/5 transition-all duration-300 cursor-default"
                  >
                    {commune}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="px-4 py-2 rounded-full text-sm bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold"
                >
                  + muchas más
                </motion.span>
              </div>

              {/* Decorative elements */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">30+</p>
                  <p className="text-xs text-white/40">Comunas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black gradient-text">RM</p>
                  <p className="text-xs text-white/40">Completa</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-white">1h</p>
                  <p className="text-xs text-white/40">Anticipación</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
