import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";


export async function GET(req: NextRequest) {
  try{
  const OrientationId = req.headers.get("OrientationId");
  if ( !OrientationId) {
    const getMessages = await prisma.orientationFile.findMany({
      orderBy: {
        id: 'asc', // Ensure the accomodation are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.orientationFile.findUnique(
    {
      where:{
        id:Number(OrientationId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'Orientation not found.' }, { status: 404 });
  }
  return NextResponse.json(getMessage);
  } catch (error) {
  console.error('Error retrieving Orientation:', error);
  return NextResponse.json({ error: 'Error retrieving Orientation.' }, { status: 500 });
}
}