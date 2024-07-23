import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // // Delete related StudentEvents first
    // await prisma.studentEvents.deleteMany({
    //   where: { eventId: Number(id) },
    // });

    // Delete the CulturalEvent
    const event = await prisma.keyProgramDate.delete({
      where: { id: Number(id) },
    });

    console.log('key Program Date deleted successfully:', event);

    return NextResponse.json({ message: 'key Program Date deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting key Program Date:', error);
    return NextResponse.json({ error: 'Error deleting key Program Date.' }, { status: 500 });
  }
}
