import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    console.log("Request data submitted:", requestData);

    const { name, date, status, FullName, StudentId } = requestData;

    if (name === undefined || date === undefined || FullName === undefined || StudentId === undefined || typeof status !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newTask = await prisma.tasks.create({
      data: {
        name,
        date: new Date(date),
        status,
        FullName,
        StudentId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
