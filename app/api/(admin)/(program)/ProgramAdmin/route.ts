// app/api/(admin)/(program)/programadmin/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const programs = await prisma.program.findMany();
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch programs' }, { status: 500 });
  }
}
