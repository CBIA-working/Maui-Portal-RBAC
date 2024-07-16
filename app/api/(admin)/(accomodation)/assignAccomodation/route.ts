// app/api/(admin)/(accomodation)/assignAccomodation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, accomodationId } = body;

    if (!studentId || !accomodationId) {
      return NextResponse.json({ message: 'Student ID and Accommodation ID are required' }, { status: 400 });
    }

    const studentAccomodation = await prisma.studentAccomodation.create({
      data: {
        studentId,
        accomodationId,
      },
    });

    return NextResponse.json(studentAccomodation, { status: 201 });
  } catch (error) {
    console.error('Error assigning student to accommodation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Define other HTTP methods if needed
