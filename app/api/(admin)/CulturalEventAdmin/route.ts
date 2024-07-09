import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";
import { headers } from "next/headers";
import { number } from "zod";

// export async function POST(req: NextRequest, res: NextResponse) {
//   // // Parse the request body
//   // const body = await req.json();
//   // const { userId } = body;

//   const getMessages = await prisma.culturalEvent.findMany(
//   //   {
//   //   where: {
//   //     userId: userId
//   //   }
//   // }
// );
//   const response = await getMessages;
//   return NextResponse.json(response);
// }
export async function GET(req: NextRequest, res: NextResponse) {
  const eventId = req.headers.get("eventId");
  if ( !eventId) {
    const getMessages = await prisma.culturalEvent.findMany();
    const response = await getMessages;
    return NextResponse.json(response);
  }
  const getMessages = await prisma.culturalEvent.findUnique(
    {
      where:{
        id:Number(eventId)
      }
    }
  );
    const response = await getMessages;
    return NextResponse.json(response);
}

// export const GET = withAuth(handler, 'read', 'CulturalEvent');
