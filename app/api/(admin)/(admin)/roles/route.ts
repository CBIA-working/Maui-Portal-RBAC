import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Log the request body to inspect it
    const { roleName, permissions } = body;

    // Ensure permissions is an array
    if (!Array.isArray(permissions)) {
      return NextResponse.json({ error: "Permissions should be an array" }, { status: 400 });
    }

    // Create a new role with associated permissions
    const newRole = await prisma.role.create({
      data: {
        roleName,
        permissions: {
          create: permissions.map((permission: string) => ({
            type: permission,
          })),
        },
      },
    });

    return NextResponse.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Error creating role" }, { status: 500 });
  }
}
