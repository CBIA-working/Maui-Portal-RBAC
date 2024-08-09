import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id,name,date,status,FullName,StudentId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedTaskData = {
      ...(name && { name }),
      ...(date && { date: new Date(date) }),
      ...(status && { status }),
      ...(FullName && { FullName }),
      ...(StudentId && { StudentId }),
    };

    const tasks = await prisma.tasks.update({
      where: { id: Number(id) },
      data: updatedTaskData,
    });

    console.log('tasks updated successfully:', tasks);

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error updating tasks:', error);
    return NextResponse.json({ error: 'Error updating tasks.' }, { status: 500 });
  }
}
