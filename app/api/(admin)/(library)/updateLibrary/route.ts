import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, Name, Description, OrientationPdf } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedOrientationFileData = {
      ...(Name && { Name }),
      ...(Description && { Description }),
      ...(OrientationPdf && { OrientationPdf }),
    };

    const orientationFile = await prisma.orientationFile.update({
      where: { id: Number(id) },
      data: updatedOrientationFileData,
    });

    console.log('orientation File updated successfully:', orientationFile);

    return NextResponse.json(orientationFile, { status: 200 });
  } catch (error) {
    console.error('Error updating orientation File:', error);
    return NextResponse.json({ error: 'Error updating orientation File.' }, { status: 500 });
  }
}
