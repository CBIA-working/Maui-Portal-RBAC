import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log received data
    console.log('Received data:', data);

    // Extract data and handle defaults
    const {
      roomNumber,
      buildingName,
      floor,
      isSingleOccupancy,
      numberOfRoommates = 0, // Default to 0 if not provided
      roommateNames = "",  // Use empty string if no roommate names
      hostfamily = "",
      roommateNumber = "", // Default to empty string
      roommates = [] // Ensure `roommates` is defaulted to an empty array
    } = data;

    // Log destructured values
    console.log('Destructured values:', {
      roomNumber,
      buildingName,
      floor,
      isSingleOccupancy,
      numberOfRoommates,
      roommateNames,
      hostfamily,
      roommateNumber
    });

    // Aggregate roommate details if needed
    const aggregatedRoommateNumbers = roommates
      .map((roommate: { roommateNumber: string }) => roommate.roommateNumber)
      .join(', ');

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
        roommateNames: roommateNames.length === null ? undefined : roommateNames, // Set to undefined if empty
        hostfamily: hostfamily === null ? undefined : hostfamily,
        roommateNumber: aggregatedRoommateNumbers === null ? undefined : aggregatedRoommateNumbers // Use aggregated value
      },
    });

    // Log the created accommodation
    console.log('Created accommodation:', newAccomodation);

    return NextResponse.json(newAccomodation, { status: 201 });
  } catch (error) {
    // Log any errors that occur
    console.error('Error creating accommodation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
