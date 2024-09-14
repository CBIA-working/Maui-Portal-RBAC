import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { email, deviceToken, action } = await req.json(); // Use await req.json() to parse the body

  try {
    await prisma.notificationResponse.create({
      data: { email, deviceToken, action }
    });
    return new Response(JSON.stringify({ message: 'Response saved successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error saving response: ' + error.message }), { status: 500 });
  }
}
