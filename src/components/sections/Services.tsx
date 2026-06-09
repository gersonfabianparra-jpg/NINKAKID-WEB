"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import Link from "next/link";

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="section-tag">✨ Nuestros Servicios</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Todo lo que necesitas<br />
            <span className="gradient-text">para una fiesta épica</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Combinamos diversión, seguridad y calidad premium para crear momentos que los niños recordarán toda la vida.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative glass rounded-3xl overflow-hidden hover:border-white/15 transition-all duration-500 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                y: -8,
                boxShadow:
                  service.glow === "yellow"
                    ? "0 20px 60px rgba(255,215,0,0.15)"
                    : service.glow === "pink"
                    ? "0 20px 60px rgba(255,45,120,0.15)"
                    : "0 20px 60px rgba(0,245,255,0.15)",
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04020f] via-[#04020f]/40 to-transparent" />

                {/* Emoji badge */}
                <div className="absolute top-4 left-4 text-4xl">{service.emoji}</div>

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{service.shortDesc}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                      <Check size={14} className="text-yellow-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <Link
                  href="/agendar"
                  className="flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors group/link"
                >
                  Incluir en mi paquete
                  <ArrowRight
                    size={15}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
