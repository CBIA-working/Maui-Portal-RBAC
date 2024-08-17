

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, AdminUser, Admin } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

type UserWithRoles = AdminUser & {
  roles: {
    name: string;
    permissions: {
      action: string;
      subject: string;
    }[];
  }[];
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Attempt to find the user in the admin table
    let user: Admin | UserWithRoles | null = await prisma.admin.findUnique({
      where: { email },
    });

    // If not found in admin table, attempt to find in adminUser table
    if (!user) {
      user = await prisma.adminUser.findUnique({
        where: { email },
        include: { roles: { include: { permissions: true } } }, // Include roles and permissions
      }) as UserWithRoles | null;
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Prepare token payload
    let tokenPayload: any = {
      id: user.id,
      email: user.email,
    };

    // Include roles and permissions if the user is an AdminUser
    if ('roles' in user) {
      const roles = user.roles.map(role => ({
        name: role.name,
        permissions: role.permissions.map(permission => ({
          action: permission.action,
          subject: permission.subject,
        })),
      }));

      tokenPayload.roles = roles;
    }

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, ...tokenPayload });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


