import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

async function handler(req: Request) {
  const jsonData = [
    {
      "id": 1,
      "eventName": "Welcome Week Concert",
      "date": "2024-09-03T06:40:51.74",
      "description": "The perfect kickoff to the new school year, where music brings us together to celebrate and get pumped for what's ahead.",
      "signedUp": true
    },
    {
      "id": 3,
      "eventName": "Startup Workshop",
      "date": "2024-05-03T08:59:59.102",
      "description": "Discover the world of startups at our workshop, where we'll guide you through turning ideas into action. Engage with fellow dreamers, learn practical skills, and get inspired to make a difference.",
      "signedUp": true
    }
  ];

  const getMessages = await prisma.culturalEvent.findMany({});
  const res = await getMessages;
  return NextResponse.json(jsonData);
}

export const GET = withAuth(handler, 'read', 'CulturalEvent');

