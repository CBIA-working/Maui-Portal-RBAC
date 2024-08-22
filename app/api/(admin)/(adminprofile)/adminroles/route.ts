import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { Id, type } = body;

  let adminRole;

  if (type == "admin") {
    adminRole = await prisma.adminRole.findMany({
      where: {
        AdminId: Id
      }
    });
  } 
//   else if (type == "course") {
//     adminRole = await prisma.adminRole.findMany({
//       where: {
//         RoleId: Id
//       }
//     });
//   }
   else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const enhancedadminRole = await Promise.all(
    adminRole.map(async (adminRole) => {
      const roleDetails = await prisma.role.findUnique({
        where: { id: adminRole.RoleId },
        include: { permissions: true }  
      });

    //   const adminDetails = await prisma.admin.findUnique({
    //     where: { id: adminRole.AdminId }
    //   });

      return {
        ...adminRole,
        roleDetails,
        // adminDetails
      };
    })
  );

  return NextResponse.json(enhancedadminRole);
}
