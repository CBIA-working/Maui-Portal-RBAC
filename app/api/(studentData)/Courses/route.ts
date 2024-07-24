import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id } = body;

  const studentCourse = await prisma.studentCourse.findMany({
    where: {
      OR: [
        { studentId: Id },
        { courseId: Id }
      ]
    },
    include: {
      course: true // Changed from 'culturalEvent' to 'event' based on the model relationship name
    }
  });

  // Map to get only event details from each studentEvent
  const courseDetails = studentCourse.map(studentCourse => studentCourse.course);

  return NextResponse.json(courseDetails);
}
