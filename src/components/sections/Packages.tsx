"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { PACKAGES } from "@/lib/data";
import { formatCLP } from "@/lib/utils";
import Link from "next/link";

export default function Packages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="paquetes" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">💰 Paquetes</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            Elige tu nivel de{" "}
            <span className="gradient-text">epicidad</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Paquetes diseñados para cada tipo de fiesta. Sin sorpresas, sin letras chicas.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative rounded-3xl overflow-hidden border ${pkg.borderColor} transition-all duration-500 group hover:-translate-y-2`}
              style={{
                background: pkg.popular
                  ? "linear-gradient(135deg, rgba(255,215,0,0.06), rgba(255,149,0,0.04))"
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-black px-6 py-1.5 rounded-b-xl flex items-center gap-1.5">
                    <Star size={11} className="fill-black" />
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <div className={`p-8 ${pkg.popular ? "pt-12" : ""}`}>
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{pkg.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                    <p className="text-sm text-white/40">{pkg.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  {pkg.originalPrice && (
                    <p className="text-sm text-white/30 line-through mb-1">
                      {formatCLP(pkg.originalPrice)}
                    </p>
                  )}
                  <div className="flex items-end gap-2">
                    <span className={`text-5xl font-black ${pkg.popular ? "gradient-text" : "text-white"}`}>
                      {formatCLP(pkg.price)}
                    </span>
                  </div>
                  {pkg.originalPrice && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-400 font-bold mt-1">
                      <Zap size={11} />
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% de descuento
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          pkg.popular
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-white/8 text-white/50"
                        }`}
                      >
                        <Check size={11} />
                      </div>
                      <span className={pkg.popular ? "text-white/80" : "text-white/55"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/agendar?package=${pkg.id}`}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    pkg.popular
                      ? "btn-primary"
                      : "btn-outline hover:border-white/30"
                  }`}
                >
                  Elegir {pkg.name}
                </Link>
              </div>

              {/* Glow on hover for popular */}
              {pkg.popular && (
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 40px rgba(255,215,0,0.05)" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Custom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-white/35 mt-8"
        >
          ¿Necesitas algo personalizado?{" "}
          <a href="#contacto" className="text-yellow-400 hover:text-yellow-300 transition-colors underline underline-offset-2">
            Contáctanos y armamos tu paquete a medida
          </a>
        </motion.p>
      </div>
    </section>
  );
}
