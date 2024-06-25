// import { defineAbilityFor } from '../lib/abilities';
// import { getSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const withAuth = (handler, action, subject) => {
//   return async (req, res) => {
//     const session = await getSession({ req });

//     if (!session) {
//       return res.status(401).json({ message: 'Not authenticated' });
//     }

//     const user = await prisma.adminUser.findUnique({
//       where: { email: session.user.email },
//       include: { roles: { include: { permissions: true } } },
//     });

//     const ability = defineAbilityFor(user.roles);

//     if (!ability.can(action, subject)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     return handler(req, res);
//   };
// };

// export default withAuth;


// import { defineAbilityFor } from '../lib/abilities';
// import { getSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const withAuth = (handler, action, subject) => {
//   return async (req, res) => {
//     const session = await getSession({ req });

//     if (!session) {
//       return res.status(401).json({ message: 'Not authenticated' });
//     }

//     const user = await prisma.adminUser.findUnique({
//       where: { email: session.user.email },
//       include: { roles: { include: { permissions: true } } },
//     });

//     const ability = defineAbilityFor(user.roles);

//     if (!ability.can(action, subject)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     return handler(req, res);
//   };
// };

// export default withAuth;


import { defineAbilityFor } from '../lib/abilities';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const withAuth = (handler, action, subject) => {
  return async (req) => {
    const authorization = req.headers.get('authorization');

    if (!authorization) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.adminUser.findUnique({
        where: { email: decoded.email },
        include: { roles: { include: { permissions: true } } },
      });

      if (!user) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }

      const ability = defineAbilityFor(user.roles);

      if (!ability.can(action, subject)) {
        return NextResponse.json({ message: 'Access denied' }, { status: 403 });
      }

      return handler(req);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  };
};

export default withAuth;

