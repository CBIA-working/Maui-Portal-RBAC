import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import { stat, mkdir, writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

function isNodeError(error: any): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    let imageUrl: string | undefined;

    const image = formData.get('image') as File | undefined;
    if (image) {
      const avatarDir = join(process.cwd(), 'public', 'avatar');

      try {
        await stat(avatarDir);
      } catch (error: unknown) {
        if (isNodeError(error) && error.code === 'ENOENT') {
          await mkdir(avatarDir, { recursive: true });
        } else {
          console.error('Error checking directory:', error);
          throw error;
        }
      }

      const filename = `${id}.jpg`;
      const filePath = join(avatarDir, filename);

      try {
        await unlink(filePath);
      } catch (error: unknown) {
        if (isNodeError(error) && error.code !== 'ENOENT') {
          console.error('Error removing old file:', error);
          throw error;
        }
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      await writeFile(filePath, buffer);
      console.log(`Image written successfully to ${filePath}`);

      imageUrl = `http://localhost:3000/avatar/${filename}`;
    }

    const dobEntry = formData.get("dob");
    const dob = dobEntry ? new Date(dobEntry.toString()).toISOString() : undefined;

    const updatedUserData = {
      fname: formData.get("fname")?.toString() || undefined,
      lname: formData.get("lname")?.toString() || undefined,
      email: formData.get("email")?.toString() || undefined,
      dob,
      address: formData.get("address")?.toString() || undefined,
      gender: formData.get("gender")?.toString() || undefined,
      bloodGroup: formData.get("bloodGroup")?.toString() || undefined,
      dietaryPreference: formData.get("dietaryPreference")?.toString() || undefined,
      emergencyContactName: formData.get("emergencyContactName")?.toString() || undefined,
      emergencyContactNumber: formData.get("emergencyContactNumber")?.toString() || undefined,
      emergencyContactRelation: formData.get("emergencyContactRelation")?.toString() || undefined,
      imageUrl: imageUrl || undefined
    };

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedUserData,
    });

    console.log('student updated successfully:', user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Error updating student.' }, { status: 500 });
  }
}
