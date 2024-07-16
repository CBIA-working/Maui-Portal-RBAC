import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, accomodationId } = body;

    if (!studentId || !accomodationId) {
      return NextResponse.json({ message: 'Student ID and Accommodation ID are required' }, { status: 400 });
    }

    // Delete the StudentAccomodation record
    await prisma.studentAccomodation.deleteMany({
      where: {
        studentId: Number(studentId),
        accomodationId: Number(accomodationId),
      },
    });

    return NextResponse.json({ message: 'StudentAccomodation deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting StudentAccomodation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
