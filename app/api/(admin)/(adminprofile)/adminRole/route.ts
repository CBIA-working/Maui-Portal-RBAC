import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { AdminId, RoleId } = body;

    if (!AdminId || !RoleId) {
      return NextResponse.json({ message: 'Admin ID and Role ID are required' }, { status: 400 });
    }

    // Check if the AdminId already has a role assigned
    const existingAdminRole = await prisma.adminRole.findFirst({
      where: { AdminId }
    });

    if (existingAdminRole) {
      return NextResponse.json({ message: 'This admin already has a role assigned' }, { status: 400 });
    }

    // If no existing role, create the new adminRole
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
