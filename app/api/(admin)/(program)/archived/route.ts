// app/api/(admin)/(program)/archived/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const archivedPrograms = await prisma.program.findMany({
      where: { archived: true },
    });
    return NextResponse.json(archivedPrograms);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch archived programs' }, { status: 500 });
  }
}
