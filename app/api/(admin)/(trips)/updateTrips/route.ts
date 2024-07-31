import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, eventName, date, description, signedUp, userId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedEventData = {
      ...(eventName && { eventName }),
      ...(date && { date }),
      ...(description && { description }),
      ...(signedUp !== undefined && { signedUp }),
      ...(userId && { userId })
    };

    const event = await prisma.culturalEvent.update({
      where: { id: Number(id) },
      data: updatedEventData,
    });

    console.log('Event updated successfully:', event);

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Error updating event.' }, { status: 500 });
  }
}
