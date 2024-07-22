import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, name, description } = body;

    if (!date || !time || !name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newKeyProgramDate = await prisma.keyProgramDate.create({
      data: {
        date: new Date(date),
        time,
        name,
        description,
      },
    });

    return NextResponse.json(newKeyProgramDate, { status: 201 });
  } catch (error) {
    console.error('Error creating KeyProgramDate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: true, // Enable the default body parser since you are parsing JSON
  },
};
