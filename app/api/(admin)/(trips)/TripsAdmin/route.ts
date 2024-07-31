import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const tripId = req.headers.get("tripId");

    if (!tripId) {
      const getMessages = await prisma.trip.findMany({
        orderBy: {
          id: 'asc', // Ensure the events are ordered by ID in ascending order
        },
      });
      return NextResponse.json(getMessages);
    }

    const getMessage = await prisma.trip.findUnique({
      where: {
        id: Number(tripId),
      },
    });

    if (!getMessage) {
      return NextResponse.json({ error: 'trip not found.' }, { status: 404 });
    }

    return NextResponse.json(getMessage);
  } catch (error) {
    console.error('Error retrieving trip:', error);
    return NextResponse.json({ error: 'Error retrieving trip.' }, { status: 500 });
  }
}
