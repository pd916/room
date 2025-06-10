import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function PATCH(req:Request, {params}:{params:{classId:string}}){
    const classId = params.classId;
    const values = await req.json();

    if(!classId || !values){
        return NextResponse.json("Unauthorized", {status:402})
    }
    try {
        const classData = await db.class.update({
            where: {
                id:classId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(classData)
    } catch (error) {
        console.log(error.stack)
        return NextResponse.json("Something went wrong", {status: 500})
    }
}