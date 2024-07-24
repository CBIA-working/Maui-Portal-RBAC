import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id } = body;

  const studentAccomodation = await prisma.studentAccomodation.findMany({
    where: {
      OR: [
        { studentId: Id },
        { accomodationId: Id }
      ]
    },
    include: {
      accomodation: true // Changed from 'culturalEvent' to 'event' based on the model relationship name
    }
  });

  // Map to get only event details from each studentEvent
  const accomodationDetails = studentAccomodation.map(studentAccomodation => studentAccomodation.accomodation);

  return NextResponse.json(accomodationDetails);
}
