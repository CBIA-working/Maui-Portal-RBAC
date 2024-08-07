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

    const files = formData.get("files") as File | undefined;

    if (!files) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    console.log('files File:', files); // Log the files file details

    const buffer = Buffer.from(await files.arrayBuffer());
    const relativeUploadDir = `/orientation`;

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
    const filename = files.name;

  
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
        name: files.name, // Original name of the file
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
