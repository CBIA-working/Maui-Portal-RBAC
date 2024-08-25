import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Permission {
  id?: number;
  type: string;
  pageName: string;
}

interface RoleUpdateRequest {
  id: number;
  roleName?: string;
  permissions: Permission[];
}

export async function POST(req: NextRequest) {
  try {
    const { id, roleName, permissions }: RoleUpdateRequest = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    if (roleName) {
      await prisma.role.update({
        where: { id: Number(id) },
        data: { roleName },
      });
    }

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
            roleId: id,
          },
        });
      }
    }));

    const updatedRoleWithPermissions = await prisma.role.findUnique({
      where: { id: Number(id) },
      include: {
        permissions: true,
      },
    });

    return NextResponse.json(updatedRoleWithPermissions, { status: 200 });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Error updating role.' }, { status: 500 });
  }
}
