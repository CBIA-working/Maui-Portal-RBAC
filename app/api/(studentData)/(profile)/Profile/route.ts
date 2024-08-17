import withAuth from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;
async function handler(req: Request) {
  const jsonData = [
    {
        "Name": "Not John",
        "LastName": "Doe",
        "Email": "abc@gmail.com",
        "PhoneNumber": "123456789",
        "DateOfBirth": "2000-01-01T09:00:00Z",
        "Address": "House no. 4, 12th Street",
        "Gender": "Male",
        "BloodGroup": "O+",
        "DietaryPreference": "Vegetarian",
        "EmergencyContactName": "Jay",
        "EmergencyPhoneNumber": "123456789",
        "EmergencyContactRelationship": "Dad",
        "ImageSource": "profile_image_male.png"
      }
      
  ];


  return NextResponse.json(jsonData);
}
export const GET = withAuth(handler, 'read', 'ViewStudentProfile');
