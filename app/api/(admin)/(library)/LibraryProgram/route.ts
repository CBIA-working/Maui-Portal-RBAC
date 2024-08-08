import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let libraryProgram;

  if (type == "library") {
    libraryProgram = await prisma.libraryProgram.findMany({
      where: {
        libraryId: Id
      }
    });
  } else if (type == "program") {
    libraryProgram = await prisma.libraryProgram.findMany({
      where: {
        programId: Id
      }
    });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedlibraryProgram = await Promise.all(
    libraryProgram.map(async (libraryProgram) => {
      const programDetails = await prisma.program.findUnique({
        where: { id: libraryProgram.programId }
      });

      const libraryDetails = await prisma.library.findUnique({
        where: { id: libraryProgram.libraryId }
      });

      return {
        ...libraryProgram,
        programDetails,
        libraryDetails
      };
    })
  );

  return NextResponse.json(enhancedlibraryProgram);
}
