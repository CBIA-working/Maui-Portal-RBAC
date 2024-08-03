// pages/api/addMarker.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { position, label, info } = await request.json();

    // Validate input: Check if any required field is missing
    if (!position || typeof label !== 'string' || typeof info !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Create a new marker in the database
    const newMarker = await prisma.marker.create({
      data: {
        position,
        label,
        info,
      },
    });

    // Return the newly created marker data with a 201 status code (Created)
    return NextResponse.json(newMarker, { status: 201 });
  } catch (error) {
    console.error('Error creating marker:', error);
    // Return a generic error message with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
