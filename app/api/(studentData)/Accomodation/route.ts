import withAuth from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";

// export async function GET() {
async function handler(req: Request) {
  const jsonData = [{
    RoomNumber: "101",
    BuildingName: "Main Building",
    Floor: "1st Floor",
    IsSingleOccupancy: false,
    NumberOfRoommates: 2,
    RoommateNames: "Jack Kline, Jane Smith",
  },{
    RoomNumber: "102",
    BuildingName: "Not Main Building",
    Floor: "Not 1st Floor",
    IsSingleOccupancy: false,
    NumberOfRoommates: 1,
    RoommateNames: "Jack Kline",
  }];

  return NextResponse.json(jsonData);
}
export const GET = withAuth(handler, 'read', 'ViewAccomodation');