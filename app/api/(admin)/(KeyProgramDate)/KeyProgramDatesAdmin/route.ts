// pages/api/admin/KeyProgramDatesAdmin/route.ts

import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

interface RequestBody {
  month: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { month } = body;

    if (!month || typeof month !== 'number') {
      return NextResponse.json({ error: 'Invalid month number.' }, { status: 400 });
    }

    // Your logic to fetch data based on the month
    const currentMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: new Date(`${new Date().getFullYear()}-${month}-01`),
          lt: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
        },
      },
    });

    // Fetch previous month data
    const prevMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: new Date(`${new Date().getFullYear()}-${month - 1}-01`),
          lt: new Date(`${new Date().getFullYear()}-${month}-01`),
        },
      },
    });

    // Fetch next month data
    const nextMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
          lt: new Date(`${new Date().getFullYear()}-${month + 2}-01`),
        },
      },
    });

    return NextResponse.json({
      currentMonthDates,
      prevMonthDates,
      nextMonthDates,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
