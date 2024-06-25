import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth  from '@/lib/withAuth'


// export async function POST(req: NextRequest, res: NextResponse) {
  async function handler(req: Request,res: Response) {

  const body = await req.json();
    const saveMessage = await prisma.culturalEvent.create({
        
        data: {
        eventName: body.eventName,
        description: body.description,
        date: body.date,
        signedUp: false,
      },
    });
    if (!saveMessage)
      return Response.json({
        message: "Error saving content",
        status: 500,
      });
    return Response.json({
      message: "Data updated Successfully",
      status: 200,
    });
}

export const POST=  withAuth(handler, 'create', 'CulturalEvent');