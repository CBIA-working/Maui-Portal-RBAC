import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, title, description, startDate, endDate, events, agreements, keyDates } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedCourseData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) }),
      ...(events && { events }),
      ...(agreements && { agreements }),
      ...(keyDates && { keyDates }),
    };

    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: updatedCourseData,
    });

    console.log('Course updated successfully:', course);

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Error updating course.' }, { status: 500 });
  }
}
