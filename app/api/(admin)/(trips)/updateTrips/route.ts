import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id,TripName,Location,DepartureDate,ReturnDate,FullName,StudentId,PhoneNumber,Purpose,GoingFormFilled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedTripData = {
      ...(TripName && { TripName }),
      ...(Location && { Location }),
      ...(DepartureDate && { DepartureDate: new Date(DepartureDate) }),
      ...(ReturnDate && { ReturnDate: new Date(ReturnDate) }),
      ...(FullName && { FullName }),
      ...(StudentId && { StudentId }),
      ...(PhoneNumber && { PhoneNumber }),
      ...(Purpose && { Purpose }),
      ...(GoingFormFilled !== undefined && { GoingFormFilled }),
    };

    const trip = await prisma.trip.update({
      where: { id: Number(id) },
      data: updatedTripData,
    });

    console.log('trip updated successfully:', trip);

    return NextResponse.json(trip, { status: 200 });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json({ error: 'Error updating trip.' }, { status: 500 });
  }
}
