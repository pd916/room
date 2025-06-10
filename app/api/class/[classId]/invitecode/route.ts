import {v4 as uuidv4} from "uuid"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"


export async function PATCH(req:Request, {params}:{params:{classId: string}}){
    try {

        if(!params.classId) {
            return NextResponse.json("classId is required", {status: 400})
        }

        const classData = await db.class.update({
            where :{
                id: params.classId
            }, 
            data: {
                inviteCode:uuidv4()
            }
        })

        return NextResponse.json(classData);
    } catch (error) {
        console.log(error)
        return NextResponse.json("Something wnet wrong", {status: 500})
    }
}