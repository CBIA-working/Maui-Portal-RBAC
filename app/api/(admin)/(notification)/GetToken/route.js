// app/api/get-device-tokens/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have a prisma instance set up

export async function POST(request) {
  try {
    // Parse the request body to extract emails
    const { emails } = await request.json();

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Invalid input. Provide a list of emails.' }, { status: 400 });
    }

    // Query the database for device tokens
    const users = await prisma.user.findMany({
      where: { email: { in: emails } },
      select: { deviceToken: true },
    });

    // Ensure deviceToken is in string format and return the result
    const deviceTokens = users.map(user => user.deviceToken.toString('utf-8'));

    return NextResponse.json({ deviceTokens });
  } catch (error) {
    console.error('Error retrieving device tokens:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
