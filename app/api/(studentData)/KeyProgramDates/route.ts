import withAuth from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";

async function handler(req: Request) {
  const res = {
    "2024-05-21T00:00:00Z": [
      {
        "Name": "Orientation Day",
        "Description": "Welcome new students to campus!"
      },
      {
        "Name": "Club Fair",
        "Description": "Explore various student clubs and organizations."
      }
    ],
    "2024-05-26T00:00:00Z": [
      {
        "Name": "Field Trip to Museum",
        "Description": "Visit the local museum for an educational tour."
      },
      {
        "Name": "Career Workshop",
        "Description": "Learn about career opportunities and resume building."
      }
    ],
    "2024-04-26T00:00:00Z": [
      {
        "Name": "Startup Pitch Competition",
        "Description": "Present your business ideas in front of a panel of judges."
      }
    ],
    "2024-04-30T00:00:00Z": [
      {
        "Name": "Leadership Seminar",
        "Description": "Enhance your leadership skills with industry experts."
      },
      {
        "Name": "Networking Mixer",
        "Description": "Connect with alumni and industry professionals."
      }
    ],
    "2024-05-12T00:00:00Z": [
      {
        "Name": "Business Ethics Workshop",
        "Description": "Discuss ethical dilemmas in business."
      }
    ],
    "2024-05-20T00:00:00Z": [
      {
        "Name": "Trip",
        "Description": "Trip details"
      }
    ]
  }

  return NextResponse.json(res);
}
export const GET= withAuth(handler, 'read', 'KeyProgramDates');