import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      roomNumber,
      buildingName,
      floor,
      isSingleOccupancy,
      numberOfRoommates = 0, // Default to null if not provided
      roommateNames = " "       // Default to empty array if not provided
    } = await request.json();

    // Validate required fields
    if (
      roomNumber === undefined ||
      !buildingName ||
      !floor ||
      isSingleOccupancy === undefined
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create accommodation with optional fields
    const newAccomodation = await prisma.viewAccomodation.create({
      data: {
        roomNumber,
        buildingName,
        floor,
        isSingleOccupancy,
        numberOfRoommates: numberOfRoommates === null ? undefined : numberOfRoommates, // Set to undefined if null
        roommateNames: roommateNames.length === 0 ? undefined : roommateNames // Set to undefined if empty
      },
    });

    return NextResponse.json(newAccomodation, { status: 201 });
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
