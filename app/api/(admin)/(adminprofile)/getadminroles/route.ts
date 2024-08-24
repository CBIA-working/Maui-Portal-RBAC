import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const adminRoles = await prisma.adminRole.findMany({
            include: {
                Admin: true,
                Role: {
                    include: {
                        permissions: true
                    }
                }
            },
            orderBy: {
                id: 'asc'  // Ordering by 'roleId' in ascending order
            }
        });

        return NextResponse.json(adminRoles);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
