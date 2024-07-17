// app/api/(admin)/(courses)/assignStudent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, courseId } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ message: 'Student ID and Course ID are required' }, { status: 400 });
    }

    const studentCourse = await prisma.studentCourse.create({
      data: {
        studentId,
        courseId,
      },
    });

    return NextResponse.json(studentCourse, { status: 201 });
  } catch (error) {
    console.error('Error assigning student to course:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Define other HTTP methods if needed
