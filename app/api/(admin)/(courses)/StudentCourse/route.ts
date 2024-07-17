import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentCourse;

  if (type == "student") {
    studentCourse = await prisma.studentCourse.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "course") {
    studentCourse = await prisma.studentCourse.findMany({
      where: {
        courseId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedstudentCourse = await Promise.all(
    studentCourse.map(async (studentCourse) => {
      const courseDetails = await prisma.course.findUnique({
        where: { id: studentCourse.courseId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentCourse.studentId }
      });

      return {
        ...studentCourse,
        courseDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedstudentCourse);
}
