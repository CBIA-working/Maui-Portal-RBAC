import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related Studentaccomodations first
    await prisma.studentAccomodation.deleteMany({
      where: { accomodationId: Number(id) },
    });

    // Delete the accomodation
    const accomodation = await prisma.viewAccomodation.delete({
      where: { id: Number(id) },
    });

    console.log('accomodation deleted successfully:', accomodation);

    return NextResponse.json({ message: 'accomodation deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting accomodation:', error);
    return NextResponse.json({ error: 'Error deleting accomodation.' }, { status: 500 });
  }
}
