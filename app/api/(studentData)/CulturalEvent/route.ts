import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id } = body;

  const studentEvents = await prisma.studentEvents.findMany({
    where: {
      OR: [
        { studentId: Id },
        { eventId: Id }
      ]
    },
    include: {
      event: true // Changed from 'culturalEvent' to 'event' based on the model relationship name
    }
  });

  // Map to get only event details from each studentEvent
  const eventDetails = studentEvents.map(studentEvent => studentEvent.event);

  return NextResponse.json(eventDetails);
}
