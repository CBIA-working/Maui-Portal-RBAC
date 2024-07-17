// app/api/(admin)/(courses)/removeStudent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, courseId } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ message: 'Student ID and Course ID are required' }, { status: 400 });
    }

    // Delete the StudentCourse record
    await prisma.studentCourse.deleteMany({
      where: {
        studentId: Number(studentId),
        courseId: Number(courseId),
      },
    });

    return NextResponse.json({ message: 'StudentCourse deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting StudentCourse:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
