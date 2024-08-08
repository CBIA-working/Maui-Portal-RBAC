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
    const library = await prisma.library.delete({
      where: { id: Number(id) },
    });

    console.log('library deleted successfully:', library);

    return NextResponse.json({ message: 'library deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting library:', error);
    return NextResponse.json({ error: 'Error deleting library.' }, { status: 500 });
  }
}
