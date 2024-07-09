import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let StudentAccomodation;

  if (type == "student") {
    StudentAccomodation = await prisma.studentAccomodation.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "accomodation") {
    StudentAccomodation = await prisma.studentAccomodation.findMany({
      where: {
        accomodationId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedStudentAccomodation = await Promise.all(
    StudentAccomodation.map(async (studentAccomodation) => {
      const accomodationDetails = await prisma.viewAccomodation.findUnique({
        where: { id: studentAccomodation.accomodationId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentAccomodation.studentId }
      });

      return {
        ...studentAccomodation,
        accomodationDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedStudentAccomodation);
}
