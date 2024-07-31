// app/api/(admin)/(cultural)/assignEvent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, tripId } = body;

    if (!studentId || !tripId) {
      return NextResponse.json({ message: 'Student ID and Trip ID are required' }, { status: 400 });
    }

    const studentTrip = await prisma.studentTrip.create({
      data: {
        studentId,
        tripId,
      },
    });

    return NextResponse.json(studentTrip, { status: 201 });
  } catch (error) {
    console.error('Error assigning student to trip:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Define other HTTP methods if needed
