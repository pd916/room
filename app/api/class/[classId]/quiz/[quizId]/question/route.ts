import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req:Request, {params}:{params:{classId:string, quizId:string}}){
    const {question} = await req.json();
    console.log(question, params.classId, params.quizId, "vl")

    if(!question){
        return NextResponse.json("title is required", {status: 402})
    }
    try {
        const quiz = await db.quiz.findUnique({
            where:{
                id:params.quizId,
                classId:params.classId
            }
        })
        
        if(!quiz){
            return NextResponse.json("Can't find Quiz", {status: 401})
        }
        
         await db.quizQuestion.create({
            data: {
                quizId: params.quizId,
                question,
              }
        })

        return NextResponse.json("Question created", {status :200})
    } catch (error) {
        console.log(error.stack, "err")
        return NextResponse.json("Something went wrong", {status: 500})
    }
} 