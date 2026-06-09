"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Heart } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-yellow-500/30">
                <Image
                  src="https://ninjakid.cl/wp-content/uploads/2026/03/ChatGPT-Image-22-ene-2026-14_54_24.png"
                  alt="NinjaKid"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Ninja</span>
                <span className="text-yellow-400">Kid</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Transformamos momentos ordinarios en recuerdos extraordinarios. Entretenimiento inflable para los eventos más épicos de Santiago.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ninjakidchile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-pink-400 hover:border-pink-500/30 transition-all"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:soporte@ninjakid.cl"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-yellow-400 hover:border-yellow-500/30 transition-all"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-green-400 hover:border-green-500/30 transition-all"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Paquetes", href: "#paquetes" },
                { label: "Galería", href: "#galeria" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "#contacto" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-white/50 hover:text-yellow-400 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/70">WhatsApp</p>
                  <a href="https://wa.me/56912345678" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">+56 9 1234 5678</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <a href="mailto:soporte@ninjakid.cl" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">soporte@ninjakid.cl</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <InstagramIcon size={16} />
                <div>
                  <p className="text-sm text-white/70">Instagram</p>
                  <a href="https://instagram.com/ninjakidchile" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-pink-400 transition-colors">@ninjakidchile</a>
                </div>
              </div>
            </div>
            <Link href="/agendar" className="btn-primary inline-block text-sm mt-2">
              Reservar ahora →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 NinjaKid Chile. Todos los derechos reservados.</p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Hecho con <Heart size={12} className="text-pink-500 fill-pink-500" /> para Roberto Padilla
          </p>
        </div>
      </div>
    </footer>
  );
}
