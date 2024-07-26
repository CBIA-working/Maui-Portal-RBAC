// app/api/(admin)/(program)/archive/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const updatedProgram = await prisma.program.update({
      where: { id: Number(id) },
      data: { archived: true },
    });
    return NextResponse.json(updatedProgram);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to archive program' }, { status: 500 });
  }
}
