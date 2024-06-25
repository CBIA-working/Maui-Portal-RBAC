import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await prisma.adminUser.findUnique({
      where: { email: decoded.email },
      include: { roles: { include: { permissions: true } } },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const roles = user.roles.map(role => ({
      name: role.name,
      permissions: role.permissions.map(permission => ({
        action: permission.action,
        subject: permission.subject,
      })),
    }));

    return NextResponse.json({ roles });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// app/api/getUserRolesAndPermissions/route.js
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import { withCors } from '@/lib/middleware';

// const prisma = new PrismaClient();

// export const GET = withCors(async (req: Request, res:Response) => {
//   const authorization = req.headers.get('authorization');

//   if (!authorization) {
//     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
//   }

//   const token = authorization.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
//     const user = await prisma.adminUser.findUnique({
//       where: { email: decoded.email },
//       include: { roles: { include: { permissions: true } } },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const roles = user.roles.map(role => ({
//       name: role.name,
//       permissions: role.permissions.map(permission => ({
//         action: permission.action,
//         subject: permission.subject,
//       })),
//     }));

//     return NextResponse.json({ roles });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// });
