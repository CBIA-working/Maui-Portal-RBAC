import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { Name, Description, OrientationPdf } = await request.json();

    if (!Name || !Description || !OrientationPdf) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newOrientation = await prisma.orientationFile.create({
      data: {
        Name,
        Description,
        OrientationPdf,
      },
    });

    return NextResponse.json(newOrientation, { status: 201 });
  } catch (error) {
    console.error('Error creating Orientation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
