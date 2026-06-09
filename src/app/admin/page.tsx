"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Lock,
} from "lucide-react";
import { formatCLP, formatDate } from "@/lib/utils";

type Booking = {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  eventTime: string;
  eventAddress: string;
  guestCount: number;
  services: string;
  packageId: string | null;
  totalPrice: number;
  status: string;
  notes: string | null;
};

const STATUS_CONFIG = {
  pending: { label: "Pendiente", class: "badge-pending", icon: <Clock size={12} /> },
  confirmed: { label: "Confirmado", class: "badge-confirmed", icon: <CheckCircle size={12} /> },
  cancelled: { label: "Cancelado", class: "badge-cancelled", icon: <XCircle size={12} /> },
  completed: { label: "Completado", class: "badge-completed", icon: <CheckCircle size={12} /> },
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async (adminKey: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        setError("Clave incorrecta");
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setBookings(data);
      setAuthenticated(true);
      setError("");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings(key);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": key,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#04020f] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 w-full max-w-sm text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-yellow-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Panel Admin</h1>
          <p className="text-white/40 text-sm mb-6">NinjaKid — Solo para Roberto</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Clave de acceso"
              className="input-dark text-center tracking-widest"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04020f] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">
              Panel de <span className="gradient-text">Reservas</span>
            </h1>
            <p className="text-white/40 text-sm">Bienvenido, Roberto 👋</p>
          </div>
          <button
            onClick={() => fetchBookings(key)}
            disabled={loading}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Actualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total reservas", value: stats.total, icon: <Calendar size={18} />, color: "text-yellow-400" },
            { label: "Pendientes", value: stats.pending, icon: <Clock size={18} />, color: "text-orange-400" },
            { label: "Confirmadas", value: stats.confirmed, icon: <CheckCircle size={18} />, color: "text-green-400" },
            { label: "Ingresos totales", value: formatCLP(stats.revenue), icon: <DollarSign size={18} />, color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings list */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <Users size={15} className="text-yellow-400" />
              Todas las reservas
            </h2>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <Calendar size={32} className="mx-auto mb-3 opacity-30" />
              <p>No hay reservas aún</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {bookings.map((booking) => {
                const status = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
                const services = JSON.parse(booking.services || "[]");
                return (
                  <div key={booking.id} className="p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <p className="font-bold text-white">{booking.clientName}</p>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 ${status.class}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                          <p className="text-sm text-white/50 flex items-center gap-1.5">
                            <Calendar size={12} className="text-yellow-400/70" />
                            {formatDate(booking.eventDate)} · {booking.eventTime}
                          </p>
                          <p className="text-sm text-white/50">📧 {booking.clientEmail}</p>
                          <p className="text-sm text-white/50 flex items-center gap-1.5">
                            <Users size={12} className="text-yellow-400/70" />
                            {booking.guestCount} invitados
                          </p>
                          <p className="text-sm text-white/50">📞 {booking.clientPhone}</p>
                          <p className="text-sm text-white/50 col-span-full">
                            📍 {booking.eventAddress}
                          </p>
                          <p className="text-sm text-white/50">
                            🎮 {services.join(", ")}
                          </p>
                          <p className="text-sm font-bold text-yellow-400">
                            {formatCLP(booking.totalPrice)}
                          </p>
                        </div>
                        {booking.notes && (
                          <p className="text-xs text-white/30 mt-2 italic">"{booking.notes}"</p>
                        )}
                      </div>

                      {/* Status actions */}
                      <div className="flex gap-2 flex-wrap shrink-0">
                        {booking.status === "pending" && (
                          <button
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            className="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                          >
                            ✓ Confirmar
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "completed")}
                            className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                          >
                            ✓ Completado
                          </button>
                        )}
                        {booking.status !== "cancelled" && booking.status !== "completed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "cancelled")}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                          >
                            ✕ Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
