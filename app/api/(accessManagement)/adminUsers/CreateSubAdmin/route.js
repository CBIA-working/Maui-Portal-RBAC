import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const { fname, lname, email, password, roles } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.adminUser.create({
      data: {
        fname,
        lname,
        email,
        password: hashedPassword,
        roles: {
          connect: roles.map(roleId => ({ id: roleId })),
        },
      },
    });
    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user', error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
