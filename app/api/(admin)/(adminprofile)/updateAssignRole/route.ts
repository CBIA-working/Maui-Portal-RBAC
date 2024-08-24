import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the PUT handler
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { AdminId, RoleId } = body;

    // Validate input
    if (!AdminId || !RoleId) {
      return NextResponse.json({ message: 'Admin ID and Role ID are required' }, { status: 400 });
    }

    // Update the RoleId for the given AdminId
    const updatedAdminRole = await prisma.adminRole.updateMany({
      where: { AdminId },
      data: {
        RoleId,
      },
    });

    // Check if any records were updated
    if (updatedAdminRole.count === 0) {
      return NextResponse.json({ message: 'No matching AdminRole found for the given Admin ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Role updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating admin role:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
