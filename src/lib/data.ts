export const SERVICES = [
  {
    id: "inflables",
    name: "Inflables Temáticos",
    emoji: "🏰",
    shortDesc: "Castillos, toboganes y estructuras inflables que convierten cualquier espacio en un parque de diversiones.",
    description:
      "Nuestros inflables temáticos son el centro de atención de cualquier fiesta. Seguros, limpios y con diseños únicos para cada edad.",
    features: ["Castillos temáticos", "Toboganes gigantes", "Laberintos inflables", "Piscinas de pelotas"],
    color: "from-yellow-500 to-orange-500",
    glow: "yellow",
    image: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-17-at-10.19.01-PM-1-682x1024.jpeg",
  },
  {
    id: "arcade",
    name: "Juegos Arcade",
    emoji: "🕹️",
    shortDesc: "Máquinas arcade clásicas y modernas que entretienen a niños y adultos por igual.",
    description:
      "Lleva la emoción del arcade a tu evento. Consolas retro, pinball, juegos de destreza y mucho más para crear momentos inolvidables.",
    features: ["Máquinas retro clásicas", "Juegos de destreza", "Pinball y flipper", "Juegos de disparos"],
    color: "from-pink-500 to-purple-600",
    glow: "pink",
    image: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-02-at-6.17.07-PM-682x1024.jpeg",
  },
  {
    id: "sonido",
    name: "Amplificación de Sonido",
    emoji: "🎵",
    shortDesc: "Sistema de sonido profesional para que la música llene el ambiente y la fiesta no pare.",
    description:
      "Equipo de audio de primera calidad. Parlantes, luces LED y DJ set para transformar tu evento en una experiencia sensorial completa.",
    features: ["Parlantes profesionales", "Luces LED sincronizadas", "Micrófono inalámbrico", "Playlist personalizada"],
    color: "from-cyan-400 to-blue-600",
    glow: "cyan",
    image: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-02-at-6.18.09-PM-2-683x1024.jpeg",
  },
];

export const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    tagline: "La aventura comienza",
    price: 30000,
    originalPrice: null,
    popular: false,
    color: "from-slate-700 to-slate-800",
    borderColor: "border-white/10",
    includes: [
      "1 inflable a elección",
      "Instalación incluida",
      "2 horas de arriendo",
      "Retiro al finalizar",
    ],
    icon: "⭐",
  },
  {
    id: "ninja",
    name: "Ninja Party",
    tagline: "La experiencia completa",
    price: 45000,
    originalPrice: 60000,
    popular: true,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/40",
    includes: [
      "2 inflables a elección",
      "1 máquina arcade",
      "Instalación incluida",
      "3 horas de arriendo",
      "Retiro al finalizar",
      "Luces decorativas gratis",
    ],
    icon: "🥷",
  },
  {
    id: "ultra",
    name: "Ultra Ninja",
    tagline: "Modo leyenda activado",
    price: 75000,
    originalPrice: 99000,
    popular: false,
    color: "from-purple-600/20 to-pink-600/20",
    borderColor: "border-purple-500/40",
    includes: [
      "3 inflables a elección",
      "2 máquinas arcade",
      "Sistema de sonido completo",
      "Instalación incluida",
      "4 horas de arriendo",
      "Retiro al finalizar",
      "Luces LED + efectos",
      "DJ set digital",
    ],
    icon: "🔥",
  },
];

export const STATS = [
  { value: 500, label: "Fiestas realizadas", suffix: "+" },
  { value: 98, label: "Clientes felices", suffix: "%" },
  { value: 50, label: "Juegos disponibles", suffix: "+" },
  { value: 3, label: "Años de experiencia", suffix: "" },
];

export const FAQS = [
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con al menos 7 días de anticipación para garantizar disponibilidad, especialmente los fines de semana.",
  },
  {
    q: "¿Cubren toda la Región Metropolitana?",
    a: "Sí, llegamos a todas las comunas de la RM. Para comunas alejadas del centro puede aplicar un cargo adicional por traslado.",
  },
  {
    q: "¿Qué pasa si llueve el día del evento?",
    a: "En caso de lluvia intensa reagendamos sin costo adicional. Los inflables no se instalan bajo lluvia por seguridad.",
  },
  {
    q: "¿Incluye instalación y retiro?",
    a: "Sí, todos nuestros paquetes incluyen traslado, instalación y retiro del equipo. Solo tienes que disfrutar.",
  },
  {
    q: "¿Cómo realizo el pago?",
    a: "Aceptamos transferencia bancaria, tarjetas de débito/crédito y efectivo. Se solicita un 30% de anticipo para confirmar la reserva.",
  },
  {
    q: "¿Los equipos son seguros para niños pequeños?",
    a: "Absolutamente. Todos nuestros equipos cumplen normas de seguridad y son inspeccionados antes de cada evento.",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-17-at-10.19.01-PM-1-682x1024.jpeg",
    alt: "Inflable temático fiesta infantil",
    category: "inflables",
    span: "row-span-2",
  },
  {
    src: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-02-at-6.17.07-PM-682x1024.jpeg",
    alt: "Máquina arcade retro",
    category: "arcade",
    span: "",
  },
  {
    src: "https://ninjakid.cl/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-02-at-6.18.09-PM-2-683x1024.jpeg",
    alt: "Sistema de sonido profesional",
    category: "sonido",
    span: "",
  },
  {
    src: "https://ninjakid.cl/wp-content/uploads/2026/03/image.jpg",
    alt: "Evento cumpleaños NinjaKid",
    category: "eventos",
    span: "col-span-2",
  },
];

export const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];
