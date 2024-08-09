import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
  const taskId = req.headers.get("taskId");
  if ( !taskId) {
    const getMessages = await prisma.tasks.findMany({
      orderBy: {
        id: 'asc', // Ensure the tasks are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.tasks.findUnique(
    {
      where:{
        id:Number(taskId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'tasks not found.' }, { status: 404 });
  }

  return NextResponse.json(getMessage);
} catch (error) {
  console.error('Error retrieving tasks:', error);
  return NextResponse.json({ error: 'Error retrieving tasks.' }, { status: 500 });
}
}
