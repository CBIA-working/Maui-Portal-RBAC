import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
  const body = await req.json();
  const { Id,eventId } = body;

  const studentEvents = await prisma.studentEvents.findMany({
    where: {
      OR: [
        { studentId: Id },
        { eventId: eventId }
      ]
    },
    include: {
      event: true // Changed from 'culturalEvent' to 'event' based on the model relationship name
    }
  });

  if (!studentEvents || studentEvents.length === 0) {
    return NextResponse.json({ error: "No Events found" }, { status: 404 });
  }

  const eventDetails = studentEvents.map(se => se.event);
  return NextResponse.json(eventDetails);
} catch (error) {
  console.error("Error fetching Events:", error);
  return NextResponse.json({ error: "An error occurred" }, { status: 500 });
}
}
