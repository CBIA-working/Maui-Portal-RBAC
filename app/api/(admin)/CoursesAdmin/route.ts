import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
  const courseId = req.headers.get("courseId");
  if ( !courseId) {
    const getMessages = await prisma.course.findMany({
      orderBy: {
        id: 'asc', // Ensure the courses are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.course.findUnique(
    {
      where:{
        id:Number(courseId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'courses not found.' }, { status: 404 });
  }

  return NextResponse.json(getMessage);
} catch (error) {
  console.error('Error retrieving courses:', error);
  return NextResponse.json({ error: 'Error retrieving courses.' }, { status: 500 });
}
}
