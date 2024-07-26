import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, name, batch } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedProgramData = {
      ...(name && { name }),
      ...(batch && { batch }),
    };

    const program = await prisma.program.update({
      where: { id: Number(id) },
      data: updatedProgramData,
    });

    console.log('Program updated successfully:', program);

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Error updating program.' }, { status: 500 });
  }
}
