import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const { userId, roleId } = await req.json();

  try {
    const user = await prisma.adminUser.update({
      where: { id: userId },
      data: {
        roles: {
          connect: { id: roleId },
        },
      },
    });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to assign role', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
