import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to fetch all roles
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: true,
      },
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}
