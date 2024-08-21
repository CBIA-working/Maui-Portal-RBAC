import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Log the request body to inspect it
    const { roleName, permissions } = body;

    // Check for proper structure of permissions
    if (typeof permissions !== 'object' || !permissions.read || !permissions.write || !permissions.both) {
      return NextResponse.json({ error: "Invalid permissions structure" }, { status: 400 });
    }

    // Create a new role with associated permissions
    const newRole = await prisma.role.create({
      data: {
        roleName,
        permissions: {
          create: [
            ...permissions.read.map((pageName: string) => ({ type: 'read', pageName })),
            ...permissions.write.map((pageName: string) => ({ type: 'write', pageName })),
            ...permissions.both.map((pageName: string) => ({ type: 'both', pageName })),
          ],
        },
      },
    });

    return NextResponse.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Error creating role" }, { status: 500 });
  }
}
