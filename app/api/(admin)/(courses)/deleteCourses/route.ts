import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related StudentCourse records first
    await prisma.studentCourse.deleteMany({
      where: { courseId: Number(id) },
    });

    // Delete the Course
    const course = await prisma.course.delete({
      where: { id: Number(id) },
    });

    console.log('Course deleted successfully:', course);

    return NextResponse.json({ message: 'Course deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Error deleting course.' }, { status: 500 });
  }
}
