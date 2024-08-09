import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    await prisma.studentTasks.deleteMany({
      where: { taskId: Number(id) },
    });


    const task = await prisma.tasks.delete({
      where: { id: Number(id) },
    });

    console.log('tasks deleted successfully:', task);

    return NextResponse.json({ message: 'tasks deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting tasks:', error);
    return NextResponse.json({ error: 'Error deleting tasks.' }, { status: 500 });
  }
}
