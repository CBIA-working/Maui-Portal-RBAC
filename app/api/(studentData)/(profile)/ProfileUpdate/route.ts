import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, fname,lname,email,dob,address,gender,bloodGroup,dietaryPreference,emergencyContactName,emergencyContactNumber,emergencyContactRelation} = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    const updatedProfile = {
      ...(fname && { fname }),
      ...(lname && { lname }),
      ...(email && { email }),
      ...(dob && { dob }),
      ...(address && { address }),
      ...(gender && { gender }),
      ...(bloodGroup && { bloodGroup }),
      ...(dietaryPreference && { dietaryPreference }),
      ...(emergencyContactName && { emergencyContactName }),
      ...(emergencyContactNumber && { emergencyContactNumber }),
      ...(emergencyContactRelation && { emergencyContactRelation }),
    };

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedProfile,
    });

    console.log('user updated successfully:', user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user.' }, { status: 500 });
  }
}
