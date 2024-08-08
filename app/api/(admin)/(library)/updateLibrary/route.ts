import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id,Name, Description, Status, LibraryPdf } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedlibraryData = {
      ...(Name && { Name }),
      ...(Description && { Description }),
      ...(Status && { Status }),
      ...(LibraryPdf && { LibraryPdf }),
    };

    const library = await prisma.library.update({
      where: { id: Number(id) },
      data: updatedlibraryData,
    });

    console.log('Library updated successfully:', library);

    return NextResponse.json(library, { status: 200 });
  } catch (error) {
    console.error('Error updating library:', error);
    return NextResponse.json({ error: 'Error updating library.' }, { status: 500 });
  }
}
