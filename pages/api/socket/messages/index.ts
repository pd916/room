
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";


export default async function handler(req: NextApiRequest, res:NextApiResponseServerIo) {
    if(req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // const profile = await currentProfile(req);
        const {message, profileId} = req.body;
        const {classId, classEnrollmentId} = req.query;

        console.log(classId, profileId, message, "work")


        if(!classId) {
            return res.status(400).json({error: "Channel ID missing"});
        }

        if(!message) {
            return res.status(400).json({error: "Content missing"});
        }

        const classes = await db.class.findFirst({
            where:{
                id: classId as string,
                enrollments: {
                    some: {
                        profileId
                    }
                }
            },
            include: {
                enrollments: true,
            }
        })

        if(!classes) {
            return res.status(404).json({message: "server not found"});
        }

        const enrollments = await db.classEnrollment.findFirst({
            where:{
                id: classEnrollmentId as string,
                classId: classId as string
            }
        })

        if(!enrollments) {
            return res.status(404).json({message: "enrollments not found"});
        }

        const sender = classes.enrollments.find((item) => item.profileId === profileId)

        console.log(sender?.profileId, "snd")

        if(!sender) {
            return res.status(404).json({message:"Sender not found"})
        }

        const messages = await db.message.create({
            data: {
                message,
                classId: classId as string,
                senderId: sender?.profileId,
            },
            include: {
                sender: true
            }
        });

        const classKey = `chat:${classId}:messages`;
        res?.socket?.server?.io?.emit(classKey, messages);

        return res.status(200).json(message)

    } catch (error) {
        console.log(error.stack, "err")
        return res.status(500).json({message: "Internal Error"});
    }
}