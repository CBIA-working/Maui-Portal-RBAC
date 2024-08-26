import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related studentProgram
    await prisma.adminRole.deleteMany({
        where: { AdminId: Number(id) },
    });

    // Delete related studentProgram
    await prisma.adminStudent.deleteMany({
      where: { AdminId: Number(id) },
    });

    // Delete the admin
    const admin = await prisma.admin.delete({
      where: { id: Number(id) },
    });

    console.log('admin deleted successfully:', admin);

    return NextResponse.json({ message: 'admin deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json({ error: 'Error deleting admin.' }, { status: 500 });
  }
}
