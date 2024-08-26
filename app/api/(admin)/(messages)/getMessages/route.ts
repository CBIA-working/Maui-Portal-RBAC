import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');
  const adminId = searchParams.get('adminId');

  try {
    const messages = await prisma.message.findMany({
      where: {
        studentId: parseInt(studentId as string),
        adminId: parseInt(adminId as string),
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        content: true,
        createdAt: true,
        sender: true,
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving messages' }, { status: 500 });
  }
}
