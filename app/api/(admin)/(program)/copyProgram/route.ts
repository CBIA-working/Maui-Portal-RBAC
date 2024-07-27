import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { id } = await request.json();
  
  try {
    // Fetch the existing program details
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        StudentProgram: true,
        CourseProgram: true
      }
    });

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Create a new program
    const newProgram = await prisma.program.create({
      data: {
        name: `${program.name} - Copy`,
        batch: program.batch
      }
    });

    // Copy students and courses
    await Promise.all([
      ...program.StudentProgram.map(studentProgram =>
        prisma.studentProgram.create({
          data: {
            studentId: studentProgram.studentId,
            ProgramId: newProgram.id // Use the correct field name
          }
        })
      ),
      ...program.CourseProgram.map(courseProgram =>
        prisma.courseProgram.create({
          data: {
            courseId: courseProgram.courseId,
            ProgramId: newProgram.id // Use the correct field name
          }
        })
      )
    ]);

    return NextResponse.json({ message: 'Program copied successfully', newProgram }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to copy program' }, { status: 500 });
  }
}
