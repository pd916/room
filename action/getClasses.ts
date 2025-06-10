"use server"

import { db } from "@/lib/db";

export async function getClasses({profileId}:{profileId:string}){
    console.log(profileId, "id")
    try {
        const classes = await db.class.findMany({
            where:{
                teacherId:profileId
            },
            include:{
                enrollments: true,
                messages:true,
                quizzes:true,
                attendance:true,
                announcements:true
            }
        })

        console.log(classes, "cls")

        return classes
    } catch (error) {
        console.log(error)
        return [];
    }
}