// app/api/(admin)/(courses)/assignStudent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { AdminId, RoleId } = body;

    if (!AdminId || !RoleId) {
      return NextResponse.json({ message: 'Admin ID and Role ID are required' }, { status: 400 });
    }

    const adminRole = await prisma.adminRole.create({
      data: {
        AdminId,
        RoleId,
      },
    });

    return NextResponse.json(adminRole, { status: 201 });
  } catch (error) {
    console.error('Error assigning admin to role:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Define other HTTP methods if needed
