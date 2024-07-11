import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import withAuth from "@/lib/withAuth";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  // Fetch all users from the database
  const users = await prisma.user.findMany({});

  // Map over the users and add the imageUrl to each user object
  const usersWithImages = users.map(user => ({
    ...user,
    imageUrl: `${req.nextUrl.origin}/avatar/${user.id}.jpg` // Adding dynamic imageUrl based on user id
  }));

  // Return the modified list of users with image URLs
  return NextResponse.json(usersWithImages);
}

// Uncomment and use the line below if you want to protect this API with authentication
// export const GET = withAuth(handler, 'read', 'GetStudents');
