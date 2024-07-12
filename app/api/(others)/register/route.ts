import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
    const saveMessage = await prisma.user.create({
        data: {
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        password: body.password,
        dob: body.dob,
        address: body.address,
        gender: body.gender,
        bloodGroup: body.bloodGroup,
        dietaryPreference: body.dietaryPreference,
        emergencyContactNumber: body.emergencyContactNumber,
        emergencyContactName: body.emergencyContactName,
        emergencyContactRelation: body.emergencyContactRelation,
      },
    });
    if (!saveMessage)
      return Response.json({
        message: "Error registering user",
        status: 500,
      });
    return Response.json({
      message: "User Registered Successfully",
      status: 200,
    });
}
