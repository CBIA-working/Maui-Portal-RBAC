import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete the orientation
    const orientation = await prisma.orientationFile.delete({
      where: { id: Number(id) },
    });

    console.log('orientation deleted successfully:', orientation);

    return NextResponse.json({ message: 'orientation deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting orientation:', error);
    return NextResponse.json({ error: 'Error deleting orientation.' }, { status: 500 });
  }
}
