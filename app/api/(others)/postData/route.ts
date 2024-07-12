import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
    const saveMessage = await prisma.pageData.update({
        where:{
            page: body.page
        },
        data: {
        title: body.title,
        description: body.description,
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
