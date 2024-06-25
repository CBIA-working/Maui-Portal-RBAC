import { NextResponse, NextRequest } from "next/server";
import withAuth  from '@/lib/withAuth'


async function handler(req: Request) {
  const jsonData = [
    {
      "Title": "Introduction to Web Developement",
      "Description": "Learn the basics of programming.",
      "StartDate": "2024-09-19T00:00:00",
      "EndDate": "2025-03-18T00:00:00",
      "KeyDates": "Jan 10, Mar 15",
      "Events": "Midterm Exam, Final Exam",
      "Agreements": "Student Handbook,Code of Conduct"
    },
    {
      "Title": "Data Structure and Algorithms",
      "Description": "Explore complex algorithms and data structures.",
      "StartDate": "2024-09-03T00:00:00",
      "EndDate": "2025-03-25T00:00:00",
      "KeyDates": "Feb 28, May 10",
      "Events": "Project Due, Final Presentation",
      "Agreements": "Course Syllabus, Academic Integrity Policy"
    }
  ]
  


  return NextResponse.json(jsonData);
}
export const GET = withAuth(handler, 'read', 'Courses');
