import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBookingInNotion } from "@/lib/notion";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      clientName,
      clientEmail,
      clientPhone,
      eventDate,
      eventTime,
      eventAddress,
      guestCount,
      services,
      packageId,
      totalPrice,
      notes,
    } = body;

    if (!clientName || !clientEmail || !clientPhone || !eventDate || !eventTime || !eventAddress) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        eventDate: new Date(eventDate),
        eventTime,
        eventAddress,
        guestCount: Number(guestCount),
        services: JSON.stringify(Array.isArray(services) ? services : [services]),
        packageId: packageId || null,
        totalPrice: Number(totalPrice),
        notes: notes || null,
        status: "pending",
      },
    });

    // Sync to Notion (non-blocking)
    createBookingInNotion({
      clientName,
      clientEmail,
      clientPhone,
      eventDate: new Date(eventDate),
      eventTime,
      eventAddress,
      guestCount: Number(guestCount),
      services: Array.isArray(services) ? services : [services],
      totalPrice: Number(totalPrice),
      notes,
    }).then(async (notionPageId) => {
      if (notionPageId) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { notionPageId },
        });
      }
    });

    return NextResponse.json({ id: booking.id, status: "pending" }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(bookings);
}
