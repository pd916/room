import { NextResponse } from "next/server"
import { db } from "@/lib/db"; 
import { Message } from "@prisma/client"; 

const MESSAGES_BATCH = 10; 

export async function GET(req:Request){
    try {
        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const classId = searchParams.get("classId");
        console.log(cursor, classId, "clll")
    

        if(!classId) {
            return NextResponse.json("Class ID missing", {status: 400})
        }

        let messages: Message[] = [];

        if(cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where:{ 
                    classId,
                },
                include: {
                    sender:true
                },
                orderBy: {
                    sentAt:"desc"
                }
            })
        } else {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    classId,
                },
                include: {
                    sender:true
                },
                orderBy: {
                    sentAt: "desc"
                }
            });
        }

        let nextCursor = null;

        if(messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json("Something went wrong", {status: 500})
    }
}