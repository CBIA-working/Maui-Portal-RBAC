// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { name, permissions } = req.body;

//   try {
//     const role = await prisma.role.create({
//       data: {
//         name,
//         permissions: {
//           create: permissions,
//           read:permissions,
//           update:permissions,
//           delete:permissions
//         },
//       },
//     });
//     res.status(201).json(role);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating role', error });
//   }
// };

// pages/api/roles/create.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const { name, permissions } = await req.json();

  try {
    const role = await prisma.role.create({
      data: {
        name,
        permissions: {
          create: permissions.map((permission) => ({
            action: permission.action,
            subject: permission.subject,
          })),
        },
      },
    });
    return new Response(JSON.stringify(role), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to create role', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

