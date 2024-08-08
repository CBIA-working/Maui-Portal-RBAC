import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { Name, Description, Status, LibraryPdf } = await request.json();

    if (!Name || !Description || !Status || !LibraryPdf) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newlibrary = await prisma.library.create({
      data: {
        Name,
        Description,
        Status,
        LibraryPdf
      },
    });

    return NextResponse.json(newlibrary, { status: 201 });
  } catch (error) {
    console.error('Error creating library:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
