import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const getMessages = await prisma.pageData.findUnique({
    where: {
      page: body.page,
    }
  });
  const res = await getMessages;
  return NextResponse.json({
    data: res,
  });
}
