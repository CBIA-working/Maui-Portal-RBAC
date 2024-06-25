import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const findUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (findUser?.email === body.email) {
    const generateOTP = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };
    const otp = generateOTP();
    console.log("OTP________", otp);
    const saveOtp = await prisma.passwordResetToken.create({
      data: {
        token: otp,
        email: body.email,
        expires: new Date(Date.now() + 600000), //expiry after 10 mins
      },
    });
    console.log("saveOtp", saveOtp);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: body.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      });
    });
  }
  return Response.json({
    message: "OTP sent to your email",
    status: 200,
  });
}
