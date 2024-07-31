import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, tripId } = body;

    if (!studentId || !tripId) {
      return NextResponse.json({ message: 'Student ID and Trip ID are required' }, { status: 400 });
    }

    // Delete the StudentEvent record
    await prisma.studentTrip.deleteMany({
      where: {
        studentId: Number(studentId),
        tripId: Number(tripId),
      },
    });

    return NextResponse.json({ message: 'studentTrip deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting studentTrip:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
