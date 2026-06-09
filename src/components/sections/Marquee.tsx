"use client";

const DOT_COLORS = ["#FFCA00", "#3B8FFF", "#FF5050", "#22c55e"];

const ITEMS = [
  "🏰 Inflables Temáticos",
  "🕹️ Juegos Arcade",
  "🎵 Sonido Profesional",
  "🚚 Entrega a Domicilio",
  "✅ Instalación Incluida",
  "📍 Toda la RM",
  "⭐ 5 Estrellas",
  "🎉 +500 Fiestas",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)",
        paddingBlock: 14,
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              paddingInline: 24,
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {item}
            <span
              aria-hidden
              style={{ width: 5, height: 5, borderRadius: "50%", background: DOT_COLORS[i % DOT_COLORS.length], opacity: 0.7, flexShrink: 0 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
