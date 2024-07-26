import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related studentProgram first
    await prisma.studentProgram.deleteMany({
      where: { ProgramId: Number(id) },
    });

    // Delete related courseProgram
    await prisma.courseProgram.deleteMany({
      where: { ProgramId: Number(id) },
    });

   
    // Delete the program
    const program = await prisma.program.delete({
      where: { id: Number(id) },
    });

    console.log('program deleted successfully:', program);

    return NextResponse.json({ message: 'program deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Error deleting program.' }, { status: 500 });
  }
}
