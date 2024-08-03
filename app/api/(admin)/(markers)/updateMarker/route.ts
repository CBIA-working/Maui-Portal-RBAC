import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, position, label, info } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedMarkerData = {
      ...(position && { position }),
      ...(label && { label }),
      ...(info && { info })
    };

    const marker = await prisma.marker.update({
      where: { id: Number(id) },
      data: updatedMarkerData,
    });

    console.log('Marker updated successfully:', marker);

    return NextResponse.json(marker, { status: 200 });
  } catch (error) {
    console.error('Error updating marker:', error);
    return NextResponse.json({ error: 'Error updating marker.' }, { status: 500 });
  }
}
