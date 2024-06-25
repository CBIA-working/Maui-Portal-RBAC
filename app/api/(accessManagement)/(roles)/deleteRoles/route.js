import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (req, res) => {
  const { id } = await req.json();

  try {
    await prisma.role.delete({
      where: { id },
    });
    return new Response(JSON.stringify({ message: 'Role deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to delete role', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
