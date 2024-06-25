import withAuth from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";


// export async function GET(req: Request) {
  async function handler(req: Request) {
  const res = [
    {
      "Question": "What is .NET MAUI?",
      "Answer": ".NET MAUI (Multi-platform App UI) is a modern framework for building cross-platform applications, enabling developers to create native user interfaces for mobile, tablet, and desktop platforms using a single codebase."
    },
    {
      "Question": "What are the advantages of .NET MAUI?",
      "Answer": "Some advantages of .NET MAUI include a single codebase for multiple platforms, native performance, access to platform-specific APIs, and a rich ecosystem of libraries and tools."
    },
    {
      "Question": "How do I set up .NET MAUI development environment?",
      "Answer": "To set up .NET MAUI development environment, install Visual Studio 2022 with the .NET MAUI workload, along with the .NET 6 SDK. You can also use Visual Studio Code with appropriate extensions for .NET MAUI development."
    },
    {
      "Question": "Can I use Xamarin.Forms components in .NET MAUI?",
      "Answer": "Yes, .NET MAUI includes backward compatibility..."
    }
  ]
  return NextResponse.json(res);
}

export const GET = withAuth(handler, 'read', 'GetFAQ');