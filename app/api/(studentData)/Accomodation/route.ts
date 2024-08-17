import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
  const body = await req.json();
  const { Id,accomodationId } = body;

  const studentAccomodation = await prisma.studentAccomodation.findMany({
    where: {
      AND: [
        { studentId: Id },
        { accomodationId: accomodationId }
      ]
    },
    include: {
      accomodation: true // Changed from 'culturalEvent' to 'event' based on the model relationship name
    }
  });
  if (!studentAccomodation || studentAccomodation.length === 0) {
    return NextResponse.json({ error: "No accomodation found" }, { status: 404 });
  }

  const accomodationDetails = studentAccomodation.map(sa => sa.accomodation);
  return NextResponse.json(accomodationDetails);
} catch (error) {
  console.error("Error fetching accomodation:", error);
  return NextResponse.json({ error: "An error occurred" }, { status: 500 });
}
}

