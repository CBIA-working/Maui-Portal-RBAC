import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, roleName, permissions } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    // Update role name if provided
    if (roleName) {
      await prisma.role.update({
        where: { id: Number(id) },
        data: { roleName },
      });
    }

    // Handle permissions update
    if (permissions && Array.isArray(permissions)) {
      await Promise.all(permissions.map(permission => {
        if (permission.id) {
          return prisma.permission.update({
            where: { id: permission.id },
            data: {
              type: permission.type,
              pageName: permission.pageName,
            },
          });
        } else {
          return prisma.permission.create({
            data: {
              type: permission.type,
              pageName: permission.pageName,
              roleId: id, // Link permission to the role
            },
          });
        }
      }));
    }

    const updatedRoleWithPermissions = await prisma.role.findUnique({
      where: { id: Number(id) },
      include: {
        permissions: true,
      },
    });

    console.log('Role updated successfully:', updatedRoleWithPermissions);

    return NextResponse.json(updatedRoleWithPermissions, { status: 200 });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Error updating role.' }, { status: 500 });
  }
}
