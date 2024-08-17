import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

interface RequestBody {
  month: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { month } = body;

    // Validate month
    if (!month || typeof month !== 'number' || month < 1 || month > 12) {
      return NextResponse.json({ error: 'Invalid month number. It must be between 1 and 12.' }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();

    // Helper function to create valid date ranges
    const getDateRange = (year: number, month: number) => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1); // first day of the next month
      return { startDate, endDate };
    };

    // Fetch current month data
    const { startDate: currentMonthStart, endDate: currentMonthEnd } = getDateRange(currentYear, month);
    const currentMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: currentMonthStart,
          lt: currentMonthEnd,
        },
      },
    });

    // Fetch previous month data
    const { startDate: prevMonthStart, endDate: prevMonthEnd } = getDateRange(currentYear, month - 1);
    const prevMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: prevMonthStart,
          lt: prevMonthEnd,
        },
      },
    });

    // Fetch next month data
    const { startDate: nextMonthStart, endDate: nextMonthEnd } = getDateRange(currentYear, month + 1);
    const nextMonthDates = await prisma.keyProgramDate.findMany({
      where: {
        date: {
          gte: nextMonthStart,
          lt: nextMonthEnd,
        },
      },
    });

    // Function to transform the date object to include only hh:mm
    const transformDates = (dates: any[]) => {
      return dates.map(date => ({
        ...date,
        time: date.time.slice(0, 5), // Extracting hh:mm part
      }));
    };

    return NextResponse.json({
      currentMonthDates: transformDates(currentMonthDates),
      prevMonthDates: transformDates(prevMonthDates),
      nextMonthDates: transformDates(nextMonthDates),
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
