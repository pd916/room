import { metadata } from "@/app/layout";
import { getSelf } from "@/lib/auth-services"; 
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const OurFileRouter = {
    thumbnailUploader: f({
        pdf: {
        maxFileSize: "4MB", 
        maxFileCount: 1
    }})
    .middleware(async () => {
        const self = await getSelf();

        return {user: self}
    })
    .onUploadComplete(async({metadata, file}) => {
        await db.announcement.update({
            where: {
                creatorId: metadata.user?.id,
            },
            data: {
                imageUrl: file.url,
            },
        });

        return {fileUrl: file.url};
    })
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;
