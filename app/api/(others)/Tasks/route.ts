import withAuth from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";

// export async function GET() {
  async function handler(req: Request) {
  const jsonData = [
    {
      Description: "Attend orientation session",
      IsCompleted: false,
    },
    {
      Description: "Attend Diwali celebration event",
      IsCompleted: true,
    },
    {
      Description: "Register for classes",
      IsCompleted: false,
    },
    {
      Description: "Get student ID card",
      IsCompleted: false,
    },
  ];
  return NextResponse.json(jsonData);
}

export const GET = withAuth(handler,'read', 'View Task');