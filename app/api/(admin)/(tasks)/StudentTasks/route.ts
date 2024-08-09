import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let studentTasks;

  if (type == "student") {
    studentTasks = await prisma.studentTasks.findMany({
      where: {
        studentId: Id
      }
    });
  } else if (type == "task") {
    studentTasks = await prisma.studentTasks.findMany({
      where: {
        taskId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedstudentTasks = await Promise.all(
    studentTasks.map(async (studentTasks) => {
      const taskDetails = await prisma.tasks.findUnique({
        where: { id: studentTasks.taskId }
      });

      const studentDetails = await prisma.user.findUnique({
        where: { id: studentTasks.studentId }
      });

      return {
        ...studentTasks,
        taskDetails,
        studentDetails
      };
    })
  );

  return NextResponse.json(enhancedstudentTasks);
}
