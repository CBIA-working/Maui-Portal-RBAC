import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, date, time, name, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedProgramData = {
      ...(date && { date }),
      ...(time && { time }),
      ...(name && { name }),
      ...(description && { description })
    };

    const program = await prisma.keyProgramDate.update({
      where: { id: Number(id) },
      data: updatedProgramData,
    });

    console.log('Program date updated successfully:', program);

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.error('Error updating program date:', error);
    return NextResponse.json({ error: 'Error updating program date.' }, { status: 500 });
  }
}
