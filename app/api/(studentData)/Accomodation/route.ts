import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { Id } = await req.json();

  // Fetching student accommodations based on the student ID directly
  const StudentAccomodation = await prisma.studentAccomodation.findMany({
    where: {
      studentId: Id
    },
    include: {
      accomodation: true, // Correct relation name for accommodation details
    }
  });

  if (StudentAccomodation.length === 0) {
    return new Response(JSON.stringify({ error: "No accommodations found for this student" }), { status: 404 });
  }

  return new Response(JSON.stringify(StudentAccomodation));
}
