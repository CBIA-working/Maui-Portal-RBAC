import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const image = formData.get('image') as File | undefined;
        console.log('Received image:', image); // Debug log to check if image is received

        const dobEntry = formData.get("dob");
        const dob = dobEntry ? new Date(dobEntry.toString()).toISOString() : "1900-01-01"; // Default date if undefined
        
        // Create admin entry without imageUrl
        const admin = await prisma.admin.create({
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
            }
        });

        let imageUrl: string | undefined;
        if (image) {
            const avatarDir = join(process.cwd(), 'public', 'avatar');
            try {
                await stat(avatarDir);
            } catch (error) {
                if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
                    await mkdir(avatarDir, { recursive: true });
                    console.log('Directory created:', avatarDir); // Debug log
                } else {
                    console.error('Error accessing directory:', error); // Error log
                    throw error;
                }
            }

            const filename = `${admin.id}.jpg`;
            const filePath = join(avatarDir, filename);
            await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
            imageUrl = `http://localhost:3000/avatar/${filename}`;
            console.log('Image URL:', imageUrl); // Debug log

            // Update admin entry with imageUrl
            await prisma.admin.update({
                where: { id: admin.id },
                data: { imageUrl }
            });
        } else {
            console.log('No image provided'); // Debug log
        }

        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        console.error('Error registering admin:', error);
        if (error instanceof Error) {
            console.log('Error details:', error.message); // Detailed error log
        }
        return NextResponse.json({ error: 'Error registering admin.' }, { status: 500 });
    }
}
