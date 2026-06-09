import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
