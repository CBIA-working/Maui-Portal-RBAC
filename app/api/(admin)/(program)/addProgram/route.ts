import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name,batch } = await request.json();

    if (!name || !batch ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProgram = await prisma.program.create({
      data: {
        name,
        batch
      },
    });

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
