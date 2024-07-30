import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const faqs = await req.json();

    if (!Array.isArray(faqs)) {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    const updatePromises = faqs.map((faq: { id: number; order: number }, index: number) =>
      prisma.faq.update({
        where: { id: faq.id },
        data: { order: index },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while updating the order' }, { status: 500 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST',
      'Content-Length': '0', // Required for a 204 response
    },
  });
}
