import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const eventId = req.headers.get("eventId");

    if (!eventId) {
      const getMessages = await prisma.culturalEvent.findMany({
        orderBy: {
          id: 'asc', // Ensure the events are ordered by ID in ascending order
        },
      });
      return NextResponse.json(getMessages);
    }

    const getMessage = await prisma.culturalEvent.findUnique({
      where: {
        id: Number(eventId),
      },
    });

    if (!getMessage) {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json(getMessage);
  } catch (error) {
    console.error('Error retrieving events:', error);
    return NextResponse.json({ error: 'Error retrieving events.' }, { status: 500 });
  }
}
