import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { Id, courseId } = body;

    const studentCourse = await prisma.studentCourse.findMany({
      where: {
        OR: [
          { studentId: Id },
          { courseId: courseId }
        ]
      },
      include: {
        course: true
      }
    });

    if (!studentCourse || studentCourse.length === 0) {
      return NextResponse.json({ error: "No courses found" }, { status: 404 });
    }

    const courseDetails = studentCourse.map(sc => sc.course);
    return NextResponse.json(courseDetails);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
