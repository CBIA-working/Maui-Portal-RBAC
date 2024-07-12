import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { stat, mkdir, writeFile, unlink } from 'fs/promises';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      
      let imageUrl: string | undefined;
      const image = formData.get('image') as File | undefined;
  
      if (image) {
        const avatarDir = join(process.cwd(), 'public', 'avatar');
        try {
          await stat(avatarDir);
        } catch (error) {
          if (isNodeError(error) && error.code === 'ENOENT') {
            await mkdir(avatarDir, { recursive: true });
          } else {
            console.error('Error checking directory:', error);
            throw error;
          }
        }
  
        const filename = `${new Date().getTime()}.jpg`;
        const filePath = join(avatarDir, filename);
        await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
        imageUrl = `http://localhost:3000/avatar/${filename}`;
      }
  
      const dobEntry = formData.get("dob");
      const dob = dobEntry ? new Date(dobEntry.toString()).toISOString() : "1900-01-01"; // Default date if undefined
  
      const user = await prisma.user.create({
        data: {
          fname: formData.get("fname")?.toString() || '',
          lname: formData.get("lname")?.toString() || '',
          email: formData.get("email")?.toString() || '',
          password: formData.get("password")?.toString() || '',
          dob,
          address: formData.get("address")?.toString() || '',
          gender: formData.get("gender")?.toString() || '',
          bloodGroup: formData.get("bloodGroup")?.toString() || '',
          dietaryPreference: formData.get("dietaryPreference")?.toString() || '',
          emergencyContactName: formData.get("emergencyContactName")?.toString() || '',
          emergencyContactNumber: formData.get("emergencyContactNumber")?.toString() || '',
          emergencyContactRelation: formData.get("emergencyContactRelation")?.toString() || '',
          imageUrl
        }
      });
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error('Error registering user:', error);
      return NextResponse.json({ error: 'Error registering user.' }, { status: 500 });
    }
  }
  
  function isNodeError(error: any): error is NodeJS.ErrnoException {
    return error instanceof Error && 'code' in error;
  }
  