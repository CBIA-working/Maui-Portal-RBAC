import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { TripName,Location,DepartureDate,ReturnDate,FullName,StudentId,PhoneNumber,Purpose,GoingFormFilled  } = await request.json();

    if (!TripName || !Location  || !DepartureDate || !ReturnDate || !FullName || !StudentId  || !PhoneNumber || !Purpose || !GoingFormFilled === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newtrip= await prisma.trip.create({
      data: {
        TripName,
        Location,
        DepartureDate:new Date(DepartureDate),
        ReturnDate:new Date(ReturnDate),
        FullName,
        StudentId,
        PhoneNumber,
        Purpose,
        GoingFormFilled,
      },
    });

    return NextResponse.json(newtrip, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
