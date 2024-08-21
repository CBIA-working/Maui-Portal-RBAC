import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE method handler
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Role ID is required' }, { status: 400 });
    }

    // First, delete the associated permissions
    await prisma.permission.deleteMany({
      where: {
        roleId: Number(id),
      },
    });

    // Then, delete the role
    const deletedRole = await prisma.role.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: 'Role and associated permissions deleted successfully', deletedRole }, { status: 200 });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}
