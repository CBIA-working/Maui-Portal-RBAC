import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentEvents;

  if (type == "student") {
    studentEvents = await prisma.studentEvents.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "event") {
    studentEvents = await prisma.studentEvents.findMany({
      where: {
        eventId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedStudentEvents = await Promise.all(
    studentEvents.map(async (studentEvent) => {
      const eventDetails = await prisma.culturalEvent.findUnique({
        where: { id: studentEvent.eventId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentEvent.studentId }
      });

      return {
        ...studentEvent,
        eventDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedStudentEvents);
}
