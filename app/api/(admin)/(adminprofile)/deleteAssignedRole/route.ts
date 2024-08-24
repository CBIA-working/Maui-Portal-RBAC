import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'ID is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const adminRole = await prisma.adminRole.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify({ message: 'AdminRole deleted successfully.', adminRole }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting AdminRole:', error);
      return new NextResponse(JSON.stringify({ error: 'Error deleting AdminRole.', details: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } else {
      console.error('Unexpected error type:', error);
      return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
}
