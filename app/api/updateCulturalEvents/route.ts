import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { id, eventName, description, date, signedUp } = body;

  try {
    const existingEvent = await prisma.culturalEvent.findUnique({
      where: { id: id },
    });

    if (!existingEvent) {
      return NextResponse.json({
        message: "Record to update not found",
        status: 404,
      });
    }

    const updateMessage = await prisma.culturalEvent.update({
      where: { id: id },
      data: {
        eventName: eventName,
        description: description,
        date: date,
        signedUp: signedUp,
      },
    });

    return NextResponse.json({
      message: "Data updated successfully",
      status: 200,
      data: updateMessage,
    });
  } catch (error) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({
      message: "Error updating content",
      status: 500,
      error: errorMessage,
    });
  }
}

export default withAuth(PATCH, 'update', 'UpdateCulturalEvents');