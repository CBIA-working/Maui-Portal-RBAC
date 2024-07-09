import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const courseId = req.headers.get("courseId");
  if ( !courseId) {
    const getMessages = await prisma.course.findMany();
    const response = await getMessages;
    return NextResponse.json(response);
  }
  const getMessages = await prisma.course.findUnique(
    {
      where:{
        id:Number(courseId)
      }
    }
  );
    const response = await getMessages;
    return NextResponse.json(response);
}

// export const GET = withAuth(handler, 'read', 'CulturalEvent');
