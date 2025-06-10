import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req:Request, {params}: {params: {classId:string}}) {
    try {

        const classData = await db.class.findUnique({
            where:{
                id: params.classId,
            }
        });

        if(!classData){
            return NextResponse.json("Not found", {status: 404})
        }

        const unpublishClass = await db.class.update({
            where:{
                id: params.classId,
            }, 
            data:{
                isPublished: false
            }
        });

        return NextResponse.json(unpublishClass)
    } catch (error) {
        return NextResponse.json("Something went wrong", {status: 500})
    }
}