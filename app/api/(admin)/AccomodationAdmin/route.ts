import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";


export async function GET(req: NextRequest) {
  try{
  const accomodationId = req.headers.get("accomodationId");
  if ( !accomodationId) {
    const getMessages = await prisma.viewAccomodation.findMany({
      orderBy: {
        id: 'asc', // Ensure the accomodation are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.viewAccomodation.findUnique(
    {
      where:{
        id:Number(accomodationId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
  }
  return NextResponse.json(getMessage);
  } catch (error) {
  console.error('Error retrieving accomodation:', error);
  return NextResponse.json({ error: 'Error retrieving accomodation.' }, { status: 500 });
}
}