import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete related Studenttrip first
    await prisma.studentTrip.deleteMany({
      where: { tripId: Number(id) },
    });

    // Delete the trip
    const trip = await prisma.trip.delete({
      where: { id: Number(id) },
    });

    console.log('trip deleted successfully:', trip);

    return NextResponse.json({ message: 'trip deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json({ error: 'Error deleting trip.' }, { status: 500 });
  }
}
