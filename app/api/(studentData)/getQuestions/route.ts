import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

async function handler(req: Request) {
  const getMessages = await prisma.question.findMany({});
  const res = await getMessages;
  return NextResponse.json(res);
}

export const GET = withAuth(handler, 'read', 'GetQuestion');