import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const findUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  const Otp = await prisma.passwordResetToken.findMany({
    where: {
      email: body.email,
      token: body.otp,
    },
    orderBy: {
      expires: "desc",
    },
  });
  console.log("validateOtp", Otp[0]);
  if (Otp[0]?.token === body.otp && Otp[0]?.expires > new Date()) {

    return Response.json({
      message: "OTP verified",
      data: {
        password: findUser?.password,
      },
      status: 200,
    });
  }
  return Response.json({
    message: "Invalid OTP",
    status: 400,
  });
}
