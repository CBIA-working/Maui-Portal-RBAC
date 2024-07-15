// app/api/(admin)/(cultural)/assignEvent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, eventId } = body;

    if (!studentId || !eventId) {
      return NextResponse.json({ message: 'Student ID and Event ID are required' }, { status: 400 });
    }

    const studentEvent = await prisma.studentEvents.create({
      data: {
        studentId,
        eventId,
      },
    });

    return NextResponse.json(studentEvent, { status: 201 });
  } catch (error) {
    console.error('Error assigning student to event:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Define other HTTP methods if needed
