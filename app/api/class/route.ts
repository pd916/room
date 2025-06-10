import { db } from "@/lib/db"
import { NextResponse } from "next/server"



export async function POST(req:Request){
    const {title, teacherId} = await req.json()
    console.log(title, teacherId, "teach")
    try {
        const teacher = await db.profile.findFirst({
            where:{
                id:teacherId
            }
        })

        if(teacher?.role === "teacher" && title){  
            
            const Class = await db.class.create({
                data:{
                    title,
                    teacherId,
                    enrollments:{
                    create: [
                        {profileId:teacherId, isAdmin:true}
                    ]
                }
                }
            })
            
            return NextResponse.json(Class);
        }
    } catch (error) {
        console.log(error.stack)
        return NextResponse.json("Something went wrong", {status:500})
    }
}