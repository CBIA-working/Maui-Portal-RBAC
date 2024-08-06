import { PrismaClient } from "@prisma/client";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log('FormData:', formData); // Log formData

    const image = formData.get("image") as File | undefined;

    if (!image) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    console.log('Image File:', image); // Log the image file details

    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

// ...
try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
  
    // Prepare file path
    const filePath = `${uploadDir}/${filename}`;
  
    // Write the file to the file system
    await writeFile(filePath, buffer);
  
    // Create file URL for access from the public directory
    const fileUrl = `${relativeUploadDir}/${filename}`;
  
    // Example userId; replace with actual logic to get userId
    const userId = 1; 
  
    // Creating the file record in the database
    const result = await prisma.file.create({
      data: {
        pageId: "1", // Assuming you have a valid pageId
        file: fileUrl,
        name: image.name, // Original name of the file
        path: filePath, // Full path where the file is stored
        user: {
          connect: { id: userId } // Connect to an existing user
        }
      }
    });
  
    return NextResponse.json({ file: result });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
  // ...
  
  } catch (e) {
    if (e instanceof TypeError && e.message.includes('Failed to parse body as FormData')) {
      return NextResponse.json(
        { error: "Invalid form data format." },
        { status: 400 }
      );
    } else {
      console.error("Error in POST handler\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }
}
