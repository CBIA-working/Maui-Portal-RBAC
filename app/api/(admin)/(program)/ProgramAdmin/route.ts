import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch programs' }, { status: 500 });
  }
}
