import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const markerId = req.headers.get("markerId");

    if (!markerId) {
      const getMessages = await prisma.marker.findMany({
        orderBy: {
          id: 'asc', // Ensure the events are ordered by ID in ascending order
        },
      });
      return NextResponse.json(getMessages);
    }

    const getMessage = await prisma.marker.findUnique({
      where: {
        id: Number(markerId),
      },
    });

    if (!getMessage) {
      return NextResponse.json({ error: 'marker not found.' }, { status: 404 });
    }

    return NextResponse.json(getMessage);
  } catch (error) {
    console.error('Error retrieving marker:', error);
    return NextResponse.json({ error: 'Error retrieving marker.' }, { status: 500 });
  }
}
