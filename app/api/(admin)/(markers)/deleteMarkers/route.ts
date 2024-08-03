import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const marker = await prisma.marker.delete({
      where: { id: Number(id) },
    });

    console.log('marker deleted successfully:', marker);

    return NextResponse.json({ message: 'marker deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting marker:', error);
    return NextResponse.json({ error: 'Error deleting marker.' }, { status: 500 });
  }
}
