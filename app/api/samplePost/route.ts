import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
    
    return Response.json({
      message: "Post request successful",
      status: 200,
      data: body
    });
}
