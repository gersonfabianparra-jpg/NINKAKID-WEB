"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        reset();
      }
    } catch {
      alert("Hubo un error. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">💬 Contacto</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Hablemos de tu{" "}
              <span className="gradient-text">próxima fiesta</span>
            </h2>
            <p className="text-white/55 text-lg mb-10 leading-relaxed">
              ¿Tienes dudas sobre nuestros servicios? ¿Quieres un presupuesto personalizado?
              Escríbenos y te respondemos en menos de 24 horas.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <Phone size={18} className="text-yellow-400" />,
                  label: "WhatsApp",
                  value: "+56 9 1234 5678",
                  href: "https://wa.me/56912345678",
                },
                {
                  icon: <Mail size={18} className="text-yellow-400" />,
                  label: "Email",
                  value: "soporte@ninjakid.cl",
                  href: "mailto:soporte@ninjakid.cl",
                },
                {
                  icon: <InstagramIcon size={18} />,
                  label: "Instagram",
                  value: "@ninjakidchile",
                  href: "https://instagram.com/ninjakidchile",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-2xl p-4 hover:border-yellow-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass rounded-3xl p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                  <p className="text-white/50 text-sm">
                    Roberto te responderá pronto. ¡Gracias por contactarnos!
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-outline text-sm mt-6 px-6"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-6">Envíanos un mensaje</h3>

                  <div>
                    <input
                      {...register("name")}
                      placeholder="Tu nombre"
                      className="input-dark"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Tu email"
                      className="input-dark"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Teléfono (opcional)"
                      className="input-dark"
                    />
                  </div>

                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="Cuéntanos sobre tu evento..."
                      rows={4}
                      className="input-dark resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
