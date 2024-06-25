import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";


// export async function POST(req: NextRequest, res: NextResponse) {
  async function handler(req: NextRequest, res: NextResponse) {
  const body = await req.json();
    const saveMessage = await prisma.goingAwayForm.create({
        data: {
        Name: body.Name,
        Location: body.Location,
        DepartureDate: new Date(body.DepartureDate),
        ReturnDate: new Date(body.ReturnDate),
        GoingFormFilled: body.GoingFormFilled,
        FullName: body.FullName,
        StudentId: body.StudentId,
        PhoneNumber: body.PhoneNumber,
        Purpose: body.Purpose,
      },
    });
    if (!saveMessage)
      return Response.json({
        message: "Error saving content",
        status: 500,
      });
    return Response.json({
      message: "Data updated Successfully",
      status: 200,
    });
}
export const POST = withAuth(handler, 'create', 'CreateGoingAwayForm');