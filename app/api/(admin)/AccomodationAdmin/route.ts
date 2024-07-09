import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

// export async function POST(req: NextRequest, res: NextResponse) {
//   // Parse the request body
//   // const body = await req.json();
//   // const { userId } = body;

//   const getMessages = await prisma.viewAccomodation.findMany({
//     // where: {
//     //   userId: userId
//     // }
//   });
//   const response = await getMessages;
//   return NextResponse.json(response);
// }
export async function GET(req: NextRequest, res: NextResponse) {
  const accomodationId = req.headers.get("accomodationId");
  if ( !accomodationId) {
    const getMessages = await prisma.viewAccomodation.findMany();
    const response = await getMessages;
    return NextResponse.json(response);
  }
  const getMessages = await prisma.viewAccomodation.findUnique(
    {
      where:{
        id:Number(accomodationId)
      }
    }
  );
    const response = await getMessages;
    return NextResponse.json(response);
}