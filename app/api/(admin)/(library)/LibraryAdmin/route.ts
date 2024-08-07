import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {
  try{
  const LibraryId = req.headers.get("LibraryId");
  if ( !LibraryId) {
    const getMessages = await prisma.library.findMany({
      orderBy: {
        id: 'asc', // Ensure the accomodation are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.library.findUnique(
    {
      where:{
        id:Number(LibraryId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'Library not found.' }, { status: 404 });
  }
  return NextResponse.json(getMessage);
  } catch (error) {
  console.error('Error retrieving Library:', error);
  return NextResponse.json({ error: 'Error retrieving Library.' }, { status: 500 });
}
}