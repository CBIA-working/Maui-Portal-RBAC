import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Delete the CulturalEvent
    const faq = await prisma.faq.delete({
      where: { id: Number(id) },
    });

    console.log('faq deleted successfully:', faq);

    return NextResponse.json({ message: 'faq deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting faq:', error);
    return NextResponse.json({ error: 'Error deleting faq.' }, { status: 500 });
  }
}
