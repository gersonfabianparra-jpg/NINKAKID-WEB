"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EASE = [0.22, 1, 0.36, 1] as const;

function InstagramIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const schema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Cuéntanos más sobre tu evento"),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSent(true); reset(); }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" ref={ref} style={{ paddingBlock: "100px", background: "var(--bg-2)" }}>
      <div className="container">
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
          }}
        >
          <style>{`@media(min-width:768px){ .contact-grid{ grid-template-columns:1fr 1fr; gap:60px; } }`}</style>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="label">✦ Contacto</span>
            <h2 className="heading-1" style={{ marginBottom: 16 }}>
              Hablemos de<br />tu fiesta
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 36, lineHeight: 1.7 }}>
              ¿Tienes dudas? ¿Quieres un presupuesto? Escríbenos y te respondemos antes de 24 horas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <Phone size={16} />, label: "WhatsApp", value: "+56 9 1234 5678", href: "https://wa.me/56912345678" },
                { icon: <Mail size={16} />, label: "Email", value: "soporte@ninjakid.cl", href: "mailto:soporte@ninjakid.cl" },
                { icon: <InstagramIcon />, label: "Instagram", value: "@ninjakidchile", href: "https://instagram.com/ninjakidchile" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    textDecoration: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget.style.borderColor = "rgba(245,197,24,0.25)"))}
                  onMouseLeave={e => ((e.currentTarget.style.borderColor = "var(--border)"))}
                >
                  <span style={{ color: "var(--gold)", opacity: 0.8 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "28px",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <CheckCircle size={40} style={{ color: "#22c55e", margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>¡Mensaje enviado!</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)" }}>Roberto te responderá pronto.</p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: 20 }}
                >
                  Enviar otro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Envíanos un mensaje</p>

                <div>
                  <input {...register("name")} placeholder="Tu nombre" className="field" />
                  {errors.name && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("email")} type="email" placeholder="Email" className="field" />
                  {errors.email && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.email.message}</p>}
                </div>
                <input {...register("phone")} type="tel" placeholder="Teléfono (opcional)" className="field" />
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Cuéntanos sobre tu evento..."
                    rows={4}
                    className="field"
                    style={{ resize: "none" }}
                  />
                  {errors.message && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 4 }}>
                  {loading
                    ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} /> Enviando...</>
                    : <><Send size={15} /> Enviar mensaje</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin{ to{ transform:rotate(360deg); } }`}</style>
    </section>
  );
}
