import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const NOTION_BOOKINGS_DB = process.env.NOTION_BOOKINGS_DB_ID || "";
export const NOTION_GALLERY_DB = process.env.NOTION_GALLERY_DB_ID || "";

export async function createBookingInNotion(booking: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: Date;
  eventTime: string;
  eventAddress: string;
  guestCount: number;
  services: string[];
  totalPrice: number;
  notes?: string;
}) {
  if (!process.env.NOTION_TOKEN || !NOTION_BOOKINGS_DB) return null;

  try {
    const page = await notion.pages.create({
      parent: { database_id: NOTION_BOOKINGS_DB },
      properties: {
        Name: {
          title: [{ text: { content: `🎉 ${booking.clientName} — ${booking.eventDate.toLocaleDateString("es-CL")}` } }],
        },
        Cliente: {
          rich_text: [{ text: { content: booking.clientName } }],
        },
        Email: {
          email: booking.clientEmail,
        },
        Teléfono: {
          phone_number: booking.clientPhone,
        },
        "Fecha Evento": {
          date: { start: booking.eventDate.toISOString().split("T")[0] },
        },
        Hora: {
          rich_text: [{ text: { content: booking.eventTime } }],
        },
        Dirección: {
          rich_text: [{ text: { content: booking.eventAddress } }],
        },
        "N° Invitados": {
          number: booking.guestCount,
        },
        Servicios: {
          multi_select: booking.services.map((s) => ({ name: s })),
        },
        "Total CLP": {
          number: booking.totalPrice,
        },
        Estado: {
          select: { name: "Pendiente" },
        },
      },
    });
    return page.id;
  } catch (err) {
    console.error("Notion sync error:", err);
    return null;
  }
}

export async function getGalleryImages() {
  if (!process.env.NOTION_TOKEN || !NOTION_GALLERY_DB) return [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.dataSources.query as any)({
      data_source_id: NOTION_GALLERY_DB,
      filter: { property: "Publicado", checkbox: { equals: true } },
      sorts: [{ property: "Orden", direction: "ascending" }],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Título?.title[0]?.text?.content || "",
      url: page.properties.URL?.url || "",
      category: page.properties.Categoría?.select?.name || "General",
    }));
  } catch {
    return [];
  }
}
