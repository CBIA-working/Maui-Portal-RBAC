// app/api/faqs/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Fetch the updated list of FAQs, ordered by the `order` field
    const faqs = await prisma.faq.findMany({
      orderBy: {
        order: 'asc', // Ensure FAQs are ordered by the `order` field
      },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error retrieving FAQs:', error);
    return NextResponse.json({ error: 'Error retrieving FAQs.' }, { status: 500 });
  }
}
