import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, roomNumber,buildingName,floor, isSingleOccupancy,numberOfRoommates,roommateNames,userId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedAccomodationData = {
      ...(roomNumber && { roomNumber }),
      ...(buildingName && { buildingName }),
      ...(floor && { floor }),
      ...(isSingleOccupancy && { isSingleOccupancy }),
      ...(numberOfRoommates && { numberOfRoommates }),
      ...(roommateNames && { roommateNames }),
      ...(userId && { userId })
    };

    const accomodation = await prisma.viewAccomodation.update({
      where: { id: Number(id) },
      data: updatedAccomodationData,
    });

    console.log('Accomodation updated successfully:', accomodation);

    return NextResponse.json(accomodation, { status: 200 });
  } catch (error) {
    console.error('Error updating accomodation:', error);
    return NextResponse.json({ error: 'Error updating accomodation.' }, { status: 500 });
  }
}
