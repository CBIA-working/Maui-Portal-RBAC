import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newfaq = await prisma.faq.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(newfaq, { status: 201 });
  } catch (error) {
    console.error('Error creating faq:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
