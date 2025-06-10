import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req:Request, {params}:{params:{classId:string}}){
    const classId = params.classId;
    const values = await req.json();
    console.log(classId, values, "vall")
    try {
        if(!classId || !values){
            return NextResponse.json("Unauthorized", {status:402})
        }

        const annoucement = await db.announcement.create({
            data:{
                classId:params.classId,
                title:"Annoucement",
                message:values.message,
                creatorId:values.creatorId
            }
        })

        return NextResponse.json(annoucement)
    } catch (error) {
        console.log(error.stack)
        return NextResponse.json("Something went wrong", {status:500})
    }
}