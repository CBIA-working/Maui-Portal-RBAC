import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let courseProgram;

  if (type == "course") {
    courseProgram = await prisma.courseProgram.findMany({
      where: {
        courseId: Id
      }
    });
  } else if (type == "program") {
    courseProgram = await prisma.courseProgram.findMany({
      where: {
        ProgramId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedcourseProgram = await Promise.all(
    courseProgram.map(async (courseProgram) => {
      const programDetails = await prisma.program.findUnique({
        where: { id: courseProgram.ProgramId }
      });

      const courseDetails = await prisma.course.findUnique({
        where: { id: courseProgram.courseId }
      });

      return {
        ...courseProgram,
        programDetails,
        courseDetails
      };
    })
  );

  return NextResponse.json(enhancedcourseProgram);
}
