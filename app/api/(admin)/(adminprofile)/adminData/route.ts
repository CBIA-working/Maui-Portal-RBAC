import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
  const adminId = req.headers.get("adminId");
  if ( !adminId) {
    const getMessages = await prisma.admin.findMany({
      orderBy: {
        id: 'asc', // Ensure the admin are ordered by ID in ascending order
      },
    });
    return NextResponse.json(getMessages);
  }
  const getMessage = await prisma.admin.findUnique(
    {
      where:{
        id:Number(adminId)
      }
    }
  );
  if (!getMessage) {
    return NextResponse.json({ error: 'admin not found.' }, { status: 404 });
  }

  return NextResponse.json(getMessage);
} catch (error) {
  console.error('Error retrieving admin:', error);
  return NextResponse.json({ error: 'Error retrieving admin.' }, { status: 500 });
}
}
