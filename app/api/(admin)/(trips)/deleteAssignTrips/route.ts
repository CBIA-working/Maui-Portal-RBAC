import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, eventId } = body;

    if (!studentId || !eventId) {
      return NextResponse.json({ message: 'Student ID and Event ID are required' }, { status: 400 });
    }

    // Delete the StudentEvent record
    await prisma.studentEvents.deleteMany({
      where: {
        studentId: Number(studentId),
        eventId: Number(eventId),
      },
    });

    return NextResponse.json({ message: 'StudentEvent deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting StudentEvent:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
