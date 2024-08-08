import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentLibrary;

  if (type == "student") {
    studentLibrary = await prisma.studentLibrary.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "library") {
    studentLibrary = await prisma.studentLibrary.findMany({
      where: {
        libraryId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedstudentLibrary = await Promise.all(
    studentLibrary.map(async (studentLibrary) => {
      const libraryDetails = await prisma.library.findUnique({
        where: { id: studentLibrary.libraryId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentLibrary.studentId }
      });

      return {
        ...studentLibrary,
        libraryDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedstudentLibrary);
}
