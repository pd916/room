import { db } from "@/lib/db"
import { NextResponse } from "next/server";


export async function GET(req:Request){
   const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");

  console.log(classId, "clss")

  if (!classId) {
    return NextResponse.json({ error: "Missing classId" }, { status: 400 });
  }

 const enrolled = await db.classEnrollment.findMany({
    where: { classId },
    include: { profile: true },
  });

  console.log(enrolled, "enroll")

  return NextResponse.json(enrolled);
}