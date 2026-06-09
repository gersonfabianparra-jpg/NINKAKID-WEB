import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/shared/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NinjaKid — Arriendo de Juegos para Fiestas Infantiles | Santiago, Chile",
  description:
    "Transforma tu evento en una aventura épica. Inflables temáticos, juegos arcade y amplificación de sonido para fiestas infantiles en la Región Metropolitana.",
  keywords: ["arriendo juegos infantiles", "inflables fiesta", "entretenimiento infantil", "fiestas cumpleaños Santiago", "NinjaKid"],
  authors: [{ name: "NinjaKid" }],
  openGraph: {
    title: "NinjaKid — Arriendo de Juegos para Fiestas Infantiles",
    description: "Transforma tu evento en una aventura épica con NinjaKid",
    type: "website",
    locale: "es_CL",
    siteName: "NinjaKid",
  },
  twitter: {
    card: "summary_large_image",
    title: "NinjaKid — Fiestas Infantiles Épicas",
    description: "Inflables, arcade y sonido para eventos únicos en Santiago",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#04020f] text-white overflow-x-hidden">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
