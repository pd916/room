import { db } from "@/lib/db";
import { NextResponse } from "next/server"


export async function POST(req:Request, {params}:{params:{classId:string}}){
    const {title, userId} = await req.json();

    console.log(title, userId, params.classId, "val")

    if(!title || !userId) {
        return NextResponse.json("Unauthorized", {status: 402})
    }
    
    const classOwner = await db.class.findFirst({
        where: {
            id:params.classId,
            teacherId: userId
        }
    })

    console.log(classOwner, "ownere")
    
    if(!classOwner){
        return NextResponse.json("Unauthorized", {status: 401})
    }

    try {
        const quiz = await db.quiz.create({
            data:{
                title,
                creatorId:userId,
                classId:params.classId
            }
        })

        return NextResponse.json(quiz)
    } catch (error) {
        console.log(error.stack)
        return NextResponse.json("Something went wrong", {status: 500})
    }
}