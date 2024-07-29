import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, name, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedFaqData = {
      ...(name && { name }),
      ...(description && { description }),

    };

    const course = await prisma.faq.update({
      where: { id: Number(id) },
      data: updatedFaqData,
    });

    console.log('faq updated successfully:', course);

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Error updating faq:', error);
    return NextResponse.json({ error: 'Error updating faq.' }, { status: 500 });
  }
}
