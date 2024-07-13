import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related StudentEvents first
    await prisma.studentEvents.deleteMany({
      where: { studentId: Number(id) },
    });

    // Delete related StudentAccomodation
    await prisma.studentAccomodation.deleteMany({
      where: { studentId: Number(id) },
    });

    // Delete related StudentCourse
    await prisma.studentCourse.deleteMany({
      where: { studentId: Number(id) },
    });


    // Delete the User
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    console.log('User deleted successfully:', user);

    return NextResponse.json({ message: 'User deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user.' }, { status: 500 });
  }
}
