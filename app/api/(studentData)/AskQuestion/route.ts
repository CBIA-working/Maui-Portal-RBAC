import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";


// export async function POST(req: NextRequest, res: NextResponse) {
  async function handler(req: Request,res:Response) {
  const body = await req.json();
    const saveMessage = await prisma.question.create({
        data: {
        StudentId: 1234,
        QuestionAsked: body.QuestionAsked,
        Date: new Date(),
        Answer: "",
        Solved: false,
      },
    });
    if (!saveMessage)
      return Response.json({
        message: "Unable to process request!",
        status: 500,
      });
    return Response.json({
      message: "Record created successfully!",
      status: 200,
    });
}

export const POST = withAuth(handler, 'create', 'AskQuestion');
