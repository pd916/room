import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req:Request, {params}: {params: {classId:string}}) {
    try {

        const classData = await db.class.findUnique({
            where:{
                id: params.classId
            },
            include: {
                announcements:true,
                quizzes: true
            }
        });

        if(!classData){
            return NextResponse.json("Not found", {status: 404})
        }

        const hasQuiz = classData.quizzes.some((quiz) => quiz);

        if(!classData.title || !classData.subject || !classData.startTime || !hasQuiz){
            return NextResponse.json("Missing require fields", {status: 401})
        };

        const publishClass = await db.class.update({
            where:{
                id: params.classId,
            }, 
            data:{
                isPublished: true
            }
        });

        return NextResponse.json(publishClass)
    } catch (error) {
        return NextResponse.json("Something went wrong", {status: 500})
    }
}