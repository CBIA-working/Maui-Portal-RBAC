import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const adminRoles = await prisma.adminStudent.findMany({
            include: {
                Admin: true,  // Include admin details
                student: true,  // Include student details (relation to User model)
            },
            orderBy: {
                id: 'asc',  // Ordering by 'id' in ascending order
            },
        });

        return NextResponse.json(adminRoles);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
