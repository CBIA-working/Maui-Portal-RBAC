import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

export async function POST(req: NextRequest, res: NextResponse) {
  // Parse the request body
  const body = await req.json();
  const { userId } = body;

  const getMessages = await prisma.viewAccomodation.findMany({
    where: {
      userId: userId
    }
  });
  const response = await getMessages;
  return NextResponse.json(response);
}