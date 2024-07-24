import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const faqId = req.headers.get("faqId");

    if (!faqId) {
      const getMessages = await prisma.faq.findMany({
        orderBy: {
          id: 'asc', // Ensure the events are ordered by ID in ascending order
        },
      });
      return NextResponse.json(getMessages);
    }

    const getMessage = await prisma.faq.findUnique({
      where: {
        id: Number(faqId),
      },
    });

    if (!getMessage) {
      return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 });
    }

    return NextResponse.json(getMessage);
  } catch (error) {
    console.error('Error retrieving FAQ:', error);
    return NextResponse.json({ error: 'Error retrieving FAQ.' }, { status: 500 });
  }
}
