import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        id: 'asc'  // Order by 'id' in ascending order
      },
      include: {
        permissions: true,
      },
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error fetching roles', message: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error fetching roles', message: 'Unknown error' }, { status: 500 });
  }
}
