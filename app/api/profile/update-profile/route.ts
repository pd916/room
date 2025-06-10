import { db } from "@/lib/db";


export async function PATCH(req:Request){
    const {profileImage, name, profileId} = await req.json();
    console.log(profileId, name, profileImage, "pro")

    if(!profileId){
        throw new Error("Unauthorized")
    }
    try {
        const profile = await db.profile.update({
            where: {
                id:profileId
            },
            data:{
                name: name,
                profileImage,
            }
        })

        return (profile)
    } catch (error) {
        throw new Error("Something went wrong")
    }
}