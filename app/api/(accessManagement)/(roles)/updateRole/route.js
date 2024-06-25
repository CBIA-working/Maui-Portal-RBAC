import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PATCH = async (req, res) => {
  const { id, name, permissions } = await req.json();

  try {
    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        permissions: {
          deleteMany: {}, // Remove existing permissions
          create: permissions.map((permission) => ({
            action: permission.action,
            subject: permission.subject,
          })),
        },
      },
    });
    return new Response(JSON.stringify(role), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to update role', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
