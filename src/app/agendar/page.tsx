"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  CheckCircle, Check,
} from "lucide-react";
import { PACKAGES, SERVICES, TIME_SLOTS } from "@/lib/data";
import { formatCLP } from "@/lib/utils";
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameDay, isToday, isPast, getDay,
} from "date-fns";
import { es } from "date-fns/locale";

const EASE = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  clientName: z.string().min(2, "Nombre muy corto"),
  clientEmail: z.string().email({ message: "Email inválido" }),
  clientPhone: z.string().min(8, "Teléfono inválido"),
  eventAddress: z.string().min(5, "Ingresa la dirección"),
  guestCount: z.number().min(1).max(300),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const STEPS = ["Paquete", "Fecha y hora", "Tus datos", "Confirmar"];

function BookingFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [pkg, setPkg] = useState(params.get("package") || "");
  const [services, setServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedPkg = PACKAGES.find((p) => p.id === pkg);
  const totalPrice = selectedPkg ? selectedPkg.price : services.length * 30000;

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const startDay = getDay(startOfMonth(month));

  const canNext =
    (step === 1 && (pkg !== "" || services.length > 0)) ||
    (step === 2 && date !== null && time !== "") ||
    step === 3;

  const onSubmit = async (data: FormData) => {
    if (!date || !time) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          eventDate: date.toISOString(),
          eventTime: time,
          services: selectedPkg ? [selectedPkg.name] : services,
          packageId: pkg || null,
          totalPrice,
        }),
      });
      const json = await res.json();
      if (res.ok) { setBookingId(json.id); setStep(5); }
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success ── */
  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", maxWidth: 420, margin: "0 auto", padding: "60px 0" }}
      >
        <div
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <CheckCircle size={32} style={{ color: "#22c55e" }} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>¡Reserva enviada!</h2>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 6 }}>
          ID: <span style={{ color: "var(--gold)", fontFamily: "monospace" }}>{bookingId}</span>
        </p>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 32 }}>
          Roberto revisará tu solicitud y se contactará en menos de 24 horas para confirmar los detalles y el pago.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="https://wa.me/56958250256" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: "center" }}>
            Confirmar por WhatsApp
          </a>
          <Link href="/" className="btn btn-ghost" style={{ justifyContent: "center" }}>
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>

      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 48, gap: 0 }}>
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "initial" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700,
                    background: done ? "#22c55e" : active ? "var(--gold)" : "rgba(255,255,255,0.06)",
                    color: done || active ? "#000" : "rgba(255,255,255,0.3)",
                    border: `1px solid ${done ? "#22c55e" : active ? "var(--gold)" : "var(--border)"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {done ? <Check size={14} /> : n}
                </div>
                <span style={{ fontSize: 11, color: active ? "#fff" : "var(--text-3)", fontWeight: active ? 600 : 400, whiteSpace: "nowrap" }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, background: done ? "rgba(34,197,94,0.4)" : "var(--border)", margin: "0 8px", marginBottom: 20, transition: "background 0.3s" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Steps content */}
      <AnimatePresence mode="wait">

        {/* Step 1: Package */}
        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Elige tu paquete</h2>
            <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Selecciona uno de nuestros paquetes o arma el tuyo eligiendo servicios individuales.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10, marginBottom: 24 }}>
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPkg(p.id === pkg ? "" : p.id); setServices([]); }}
                  style={{
                    position: "relative",
                    background: pkg === p.id ? "rgba(245,197,24,0.06)" : "var(--bg-card)",
                    border: `1px solid ${pkg === p.id ? "rgba(245,197,24,0.35)" : "var(--border)"}`,
                    borderRadius: 16, padding: "20px 16px",
                    textAlign: "left", cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  {p.popular && (
                    <span style={{
                      position: "absolute", top: -1, right: 12,
                      background: "var(--gold)", color: "#000",
                      fontSize: 9, fontWeight: 800, padding: "3px 8px",
                      borderRadius: "0 0 8px 8px", letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>Popular</span>
                  )}
                  <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{p.icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontSize: 18, fontWeight: 900, color: pkg === p.id ? "var(--gold)" : "#fff" }}>{formatCLP(p.price)}</p>
                  {pkg === p.id && (
                    <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={11} color="#000" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "18px" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>O elige servicios individuales</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setPkg(""); setServices((prev) => prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                      background: services.includes(s.id) ? "rgba(245,197,24,0.04)" : "transparent",
                      border: `1px solid ${services.includes(s.id) ? "rgba(245,197,24,0.25)" : "var(--border)"}`,
                      borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{s.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: services.includes(s.id) ? "#fff" : "rgba(255,255,255,0.6)" }}>{s.name}</span>
                    {services.includes(s.id) && <Check size={14} style={{ marginLeft: "auto", color: "var(--gold)", flexShrink: 0 }} />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>¿Cuándo es la fiesta?</h2>
            <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Selecciona la fecha y la hora de inicio del evento.</p>

            <div className="date-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              <style>{`@media(min-width:560px){ .date-grid{ grid-template-columns:1fr 1fr; } }`}</style>

              {/* Calendar */}
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <button onClick={() => setMonth(subMonths(month, 1))} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><ChevronLeft size={16} /></button>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", textTransform: "capitalize" }}>{format(month, "MMMM yyyy", { locale: es })}</p>
                  <button onClick={() => setMonth(addMonths(month, 1))} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><ChevronRight size={16} /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
                  {["Do","Lu","Ma","Mi","Ju","Vi","Sá"].map((d) => (
                    <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "var(--text-3)", padding: "4px 0" }}>{d}</div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
                  {Array.from({ length: startDay }).map((_, i) => <div key={`e-${i}`} />)}
                  {days.map((d) => {
                    const disabled = isPast(d) && !isToday(d);
                    const sel = date && isSameDay(d, date);
                    const today = isToday(d);
                    return (
                      <button
                        key={d.toString()}
                        disabled={disabled}
                        onClick={() => setDate(d)}
                        style={{
                          aspectRatio: "1", borderRadius: 8,
                          fontSize: 13, fontWeight: sel ? 700 : 500,
                          cursor: disabled ? "not-allowed" : "pointer",
                          border: today && !sel ? "1px solid rgba(245,197,24,0.35)" : "1px solid transparent",
                          background: sel ? "var(--gold)" : "transparent",
                          color: disabled ? "rgba(255,255,255,0.15)" : sel ? "#000" : today ? "var(--gold)" : "rgba(255,255,255,0.7)",
                          transition: "all 0.15s",
                        }}
                      >
                        {format(d, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Hora de inicio</p>
                {date ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        style={{
                          padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                          border: `1px solid ${time === t ? "var(--gold)" : "var(--border)"}`,
                          background: time === t ? "var(--gold)" : "transparent",
                          color: time === t ? "#000" : "rgba(255,255,255,0.6)",
                          transition: "all 0.15s",
                        }}
                      >{t}</button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 160 }}>
                    <p style={{ fontSize: 13, color: "var(--text-3)", textAlign: "center" }}>Selecciona una fecha primero</p>
                  </div>
                )}
              </div>
            </div>

            {date && time && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 12, padding: "14px 18px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}
              >
                <CheckCircle size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ fontWeight: 600, color: "#fff", textTransform: "capitalize" }}>{format(date, "EEEE d 'de' MMMM", { locale: es })}</span>
                  {" "}a las{" "}
                  <span style={{ fontWeight: 600, color: "var(--gold)" }}>{time}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 3: Contact details */}
        {step === 3 && (
          <motion.div key="s3"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Tus datos de contacto</h2>
            <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Roberto usará esta información para confirmar tu reserva.</p>

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                <style>{`@media(min-width:480px){ .form-row{ grid-template-columns:1fr 1fr!important; } }`}</style>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Nombre completo</label>
                    <input {...register("clientName")} placeholder="Roberto Padilla" className="field" />
                    {errors.clientName && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.clientName.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Email</label>
                    <input {...register("clientEmail")} type="email" placeholder="tu@email.com" className="field" />
                    {errors.clientEmail && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.clientEmail.message}</p>}
                  </div>
                </div>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Teléfono / WhatsApp</label>
                    <input {...register("clientPhone")} type="tel" placeholder="+56 9 1234 5678" className="field" />
                    {errors.clientPhone && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.clientPhone.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>N° de invitados</label>
                    <input {...register("guestCount", { valueAsNumber: true })} type="number" placeholder="20" min="1" className="field" />
                    {errors.guestCount && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>Ingresa un número válido</p>}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Dirección del evento</label>
                  <input {...register("eventAddress")} placeholder="Av. Las Condes 1234, Las Condes" className="field" />
                  {errors.eventAddress && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.eventAddress.message}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Notas adicionales</label>
                  <textarea {...register("notes")} placeholder="Temática, acceso al lugar, algún detalle especial..." rows={3} className="field" style={{ resize: "none" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <motion.div key="s4"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Confirma tu reserva</h2>
            <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Revisa los detalles antes de enviar.</p>

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: 14 }}>
              {[
                ["Paquete", selectedPkg ? selectedPkg.name : `${services.length} servicio(s) individual(es)`],
                ["Total", formatCLP(totalPrice)],
                ["Fecha", date ? format(date, "EEEE d 'de' MMMM yyyy", { locale: es }) : ""],
                ["Hora", time],
                ["Dirección", getValues("eventAddress")],
                ["Invitados", `${getValues("guestCount")}`],
                ["Nombre", getValues("clientName")],
                ["Email", getValues("clientEmail")],
                ["Teléfono", getValues("clientPhone")],
              ].map(([label, val], i) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 20px", borderBottom: i < 8 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: 13, color: "var(--text-3)", flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 500, textAlign: "right", textTransform: "capitalize" }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "14px 16px", background: "rgba(245,197,24,0.04)", border: "1px solid rgba(245,197,24,0.12)", borderRadius: 12, marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                Al confirmar, Roberto recibirá tu solicitud y te contactará para coordinar el <strong style={{ color: "rgba(255,255,255,0.8)" }}>30% de anticipo</strong> y confirmar disponibilidad.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "16px" }}>
                {submitting
                  ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", animation: "spin 0.6s linear infinite", display: "inline-block" }} /> Enviando reserva...</>
                  : <>Confirmar reserva <ArrowRight size={16} /></>
                }
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav buttons */}
      {step < 4 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="btn btn-ghost"
            style={{ opacity: step === 1 ? 0.3 : 1, cursor: step === 1 ? "not-allowed" : "pointer" }}
          >
            <ArrowLeft size={15} /> Anterior
          </button>
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="btn btn-primary"
            style={{ opacity: !canNext ? 0.4 : 1, cursor: !canNext ? "not-allowed" : "pointer" }}
          >
            Siguiente <ArrowRight size={15} />
          </button>
        </div>
      )}
      {step === 4 && (
        <button onClick={() => setStep(3)} className="btn btn-ghost" style={{ marginTop: 12 }}>
          <ArrowLeft size={15} /> Editar datos
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", paddingBottom: 80 }}>
      {/* Background */}
      <div aria-hidden style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,197,24,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top bar */}
        <div style={{ paddingTop: 28, paddingBottom: 48 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 40 }}>
            <div style={{ position: "relative", width: 28, height: 28, borderRadius: 8, overflow: "hidden" }}>
              <Image
                src="/images/logo.png"
                alt="NinjaKid"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>NinjaKid</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>/</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>Reservar fiesta</span>
          </Link>

          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 10 }}>
              Reserva tu fiesta
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-2)" }}>
              4 pasos simples. Roberto confirma en menos de 24 horas.
            </p>
          </div>

          <Suspense fallback={null}>
            <BookingFlow />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
