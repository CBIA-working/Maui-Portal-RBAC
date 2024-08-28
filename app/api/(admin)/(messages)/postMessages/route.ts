import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { content, studentId, adminId, sender,seen } = await req.json();

    const message = await prisma.message.create({
      data: {
        content,
        studentId,
        adminId,
        sender,
        seen,
      },
    });

    return NextResponse.json({ message: 'Message posted successfully', data: message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error posting message' }, { status: 500 });
  }
}
