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
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Package,
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PACKAGES, SERVICES, TIME_SLOTS } from "@/lib/data";
import { formatCLP } from "@/lib/utils";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isPast,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";

const schema = z.object({
  clientName: z.string().min(2, "Ingresa tu nombre completo"),
  clientEmail: z.string().email("Email inválido"),
  clientPhone: z.string().min(8, "Ingresa tu teléfono"),
  eventAddress: z.string().min(5, "Ingresa la dirección del evento"),
  guestCount: z.number().min(1, "Mínimo 1").max(200, "Máximo 200"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { id: 1, label: "Paquete", icon: <Package size={16} /> },
  { id: 2, label: "Fecha", icon: <Calendar size={16} /> },
  { id: 3, label: "Detalles", icon: <User size={16} /> },
  { id: 4, label: "Confirmar", icon: <CheckCircle size={16} /> },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "";

  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPackage);

  const totalPrice = selectedPkg
    ? selectedPkg.price
    : selectedServices.length * 30000;

  // Calendar logic
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart); // 0=Sunday

  const isDateDisabled = (date: Date) => isPast(date) && !isToday(date);

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          eventDate: selectedDate.toISOString(),
          eventTime: selectedTime,
          services: selectedPkg
            ? [selectedPkg.name]
            : selectedServices,
          packageId: selectedPackage || null,
          totalPrice,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setBookingId(json.id);
        setStep(5);
      } else {
        alert("Error al procesar la reserva. Inténtalo de nuevo.");
      }
    } catch {
      alert("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const canGoNext = () => {
    if (step === 1) return selectedPackage !== "" || selectedServices.length > 0;
    if (step === 2) return selectedDate !== null && selectedTime !== "";
    return true;
  };

  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-green-400" />
        </motion.div>
        <h2 className="text-3xl font-black text-white mb-3">¡Reserva confirmada!</h2>
        <p className="text-white/60 mb-2">ID de reserva: <span className="text-yellow-400 font-mono font-bold">{bookingId}</span></p>
        <p className="text-white/50 text-sm mb-8">
          Roberto revisará tu solicitud y se pondrá en contacto contigo en menos de 24 horas para confirmar los detalles.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Confirmar por WhatsApp
          </a>
          <Link href="/" className="btn-outline">
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center mb-12 gap-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                step === s.id
                  ? "bg-yellow-500 text-black"
                  : step > s.id
                  ? "text-green-400"
                  : "text-white/30"
              }`}
            >
              {step > s.id ? <CheckCircle size={15} /> : s.icon}
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 mx-1 transition-colors duration-300 ${
                  step > s.id ? "bg-green-400/40" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Package selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-2">¿Qué paquete quieres?</h2>
            <p className="text-white/50 text-sm mb-8">Selecciona un paquete o elige servicios individuales.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg.id === selectedPackage ? "" : pkg.id);
                    setSelectedServices([]);
                  }}
                  className={`relative glass rounded-2xl p-5 text-left transition-all duration-300 border ${
                    selectedPackage === pkg.id
                      ? "border-yellow-500/60 bg-yellow-500/8"
                      : "border-white/8 hover:border-white/20"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[10px] font-black px-3 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}
                  <div className="text-3xl mb-3">{pkg.icon}</div>
                  <p className="font-bold text-white text-sm">{pkg.name}</p>
                  <p className={`text-xl font-black mt-1 ${selectedPackage === pkg.id ? "gradient-text" : "text-white/80"}`}>
                    {formatCLP(pkg.price)}
                  </p>
                  {selectedPackage === pkg.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                      <CheckCircle size={12} className="text-black" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">O elige servicios individuales</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setSelectedPackage("");
                      setSelectedServices((prev) =>
                        prev.includes(svc.id)
                          ? prev.filter((s) => s !== svc.id)
                          : [...prev, svc.id]
                      );
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all duration-200 ${
                      selectedServices.includes(svc.id)
                        ? "border-yellow-500/50 bg-yellow-500/8 text-white"
                        : "border-white/8 text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{svc.emoji}</span>
                    <span className="font-medium">{svc.name}</span>
                    {selectedServices.includes(svc.id) && (
                      <CheckCircle size={14} className="text-yellow-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Date & time */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-2">¿Cuándo es la fiesta?</h2>
            <p className="text-white/50 text-sm mb-8">Selecciona la fecha y hora del evento.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
                    className="p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <p className="text-sm font-bold text-white capitalize">
                    {format(calendarMonth, "MMMM yyyy", { locale: es })}
                  </p>
                  <button
                    onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                    className="p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((d) => (
                    <div key={d} className="text-center text-xs text-white/30 font-semibold py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((day) => {
                    const disabled = isDateDisabled(day);
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    const today = isToday(day);
                    return (
                      <button
                        key={day.toString()}
                        disabled={disabled}
                        onClick={() => setSelectedDate(day)}
                        className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                          disabled
                            ? "text-white/15 cursor-not-allowed"
                            : selected
                            ? "bg-yellow-500 text-black font-bold"
                            : today
                            ? "border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                            : "text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div className="glass rounded-2xl p-5">
                <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock size={14} />
                  Hora del evento
                </p>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-yellow-500 border-yellow-500 text-black font-bold"
                            : "border-white/10 text-white/60 hover:border-yellow-500/30 hover:text-yellow-400 hover:bg-yellow-500/5"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center py-8">
                    <p className="text-white/30 text-sm text-center">Selecciona una fecha primero</p>
                  </div>
                )}
              </div>
            </div>

            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 glass rounded-2xl p-4 flex items-center gap-3 border border-green-500/20"
              >
                <CheckCircle size={18} className="text-green-400 shrink-0" />
                <p className="text-sm text-white/70">
                  <span className="text-white font-semibold capitalize">
                    {format(selectedDate, "EEEE dd 'de' MMMM yyyy", { locale: es })}
                  </span>{" "}
                  a las <span className="text-yellow-400 font-semibold">{selectedTime}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 3: Contact details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-2">Tus datos de contacto</h2>
            <p className="text-white/50 text-sm mb-8">Roberto usará esta info para confirmar tu reserva.</p>

            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                    Nombre completo *
                  </label>
                  <input
                    {...register("clientName")}
                    placeholder="Roberto Padilla"
                    className="input-dark"
                  />
                  {errors.clientName && (
                    <p className="text-xs text-red-400 mt-1">{errors.clientName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                    Email *
                  </label>
                  <input
                    {...register("clientEmail")}
                    type="email"
                    placeholder="tu@email.com"
                    className="input-dark"
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-red-400 mt-1">{errors.clientEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    {...register("clientPhone")}
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    className="input-dark"
                  />
                  {errors.clientPhone && (
                    <p className="text-xs text-red-400 mt-1">{errors.clientPhone.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                    N° de invitados *
                  </label>
                  <input
                    {...register("guestCount", { valueAsNumber: true })}
                    type="number"
                    placeholder="20"
                    min="1"
                    className="input-dark"
                  />
                  {errors.guestCount && (
                    <p className="text-xs text-red-400 mt-1">Ingresa un número válido</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                  Dirección del evento *
                </label>
                <input
                  {...register("eventAddress")}
                  placeholder="Av. Las Condes 1234, Las Condes"
                  className="input-dark"
                />
                {errors.eventAddress && (
                  <p className="text-xs text-red-400 mt-1">{errors.eventAddress.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                  Notas adicionales
                </label>
                <textarea
                  {...register("notes")}
                  placeholder="Algún detalle especial, temática del evento, acceso al lugar..."
                  rows={3}
                  className="input-dark resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation summary */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-2">Confirma tu reserva</h2>
            <p className="text-white/50 text-sm mb-8">Revisa los detalles antes de confirmar.</p>

            <div className="glass rounded-2xl overflow-hidden mb-6">
              <div className="p-5 border-b border-white/5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Resumen del pedido</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package size={15} className="text-yellow-400" />
                      <span className="text-sm text-white/80">
                        {selectedPkg ? selectedPkg.name : `${selectedServices.length} servicio(s)`}
                      </span>
                    </div>
                    <span className="text-sm font-bold gradient-text">{formatCLP(totalPrice)}</span>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar size={15} className="text-yellow-400" />
                      <span className="capitalize">
                        {format(selectedDate, "EEEE dd 'de' MMMM yyyy", { locale: es })} · {selectedTime}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm text-white/60">
                    <MapPin size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                    <span>{getValues("eventAddress")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Users size={15} className="text-yellow-400" />
                    <span>{getValues("guestCount")} invitados</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Datos de contacto</p>
                <div className="space-y-1">
                  <p className="text-sm text-white/70"><span className="text-white font-medium">{getValues("clientName")}</span></p>
                  <p className="text-sm text-white/50">{getValues("clientEmail")}</p>
                  <p className="text-sm text-white/50">{getValues("clientPhone")}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 flex items-start gap-3 border border-yellow-500/15 mb-6">
              <span className="text-xl">💡</span>
              <p className="text-xs text-white/50 leading-relaxed">
                Al confirmar, Roberto recibirá tu solicitud y se pondrá en contacto contigo para coordinar el pago (30% anticipo) y confirmar disponibilidad.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Confirmar reserva
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 5 && step < 4 && (
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="btn-outline flex items-center gap-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Anterior
          </button>
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canGoNext()}
            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="flex items-center justify-start mt-4">
          <button
            onClick={() => setStep(3)}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Editar datos
          </button>
        </div>
      )}
    </div>
  );
}

export default function AgendarPage() {
  return (
    <div className="min-h-screen bg-[#04020f] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="pt-8 pb-12">
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <Image
                src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                alt="NinjaKid"
                width={32}
                height={32}
                className="rounded-lg"
                unoptimized
              />
              <span>NinjaKid</span>
            </Link>
            <span className="text-white/15">/</span>
            <span className="text-sm text-white/50">Agendar fiesta</span>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-white mb-3"
            >
              Agenda tu{" "}
              <span className="gradient-text">fiesta épica</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50"
            >
              Completa los pasos y Roberto confirmará tu reserva en menos de 24 horas.
            </motion.p>
          </div>
        </div>

        <Suspense fallback={<div className="text-white/50 text-center py-20">Cargando...</div>}>
          <BookingContent />
        </Suspense>

        <div className="h-20" />
      </div>
    </div>
  );
}
