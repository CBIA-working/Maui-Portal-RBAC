import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentProgram;

  if (type == "student") {
    studentProgram = await prisma.studentProgram.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "program") {
    studentProgram = await prisma.studentProgram.findMany({
      where: {
        ProgramId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedstudentProgram = await Promise.all(
    studentProgram.map(async (studentProgram) => {
      const programDetails = await prisma.program.findUnique({
        where: { id: studentProgram.ProgramId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentProgram.studentId }
      });

      return {
        ...studentProgram,
        programDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedstudentProgram);
}
