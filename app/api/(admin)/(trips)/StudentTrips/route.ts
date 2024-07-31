import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentTrips;

  if (type == "student") {
    studentTrips = await prisma.studentTrip.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "trip") {
    studentTrips = await prisma.studentTrip.findMany({
      where: {
        tripId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedStudentTrips = await Promise.all(
    studentTrips.map(async (studentTrips) => {
      const tripDetails = await prisma.trip.findUnique({
        where: { id: studentTrips.tripId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentTrips.studentId }
      });

      return {
        ...studentTrips,
        tripDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedStudentTrips);
}
