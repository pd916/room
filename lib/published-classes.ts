import { db } from "./db"


export const publishedClasses = async () => {
    const classes = await db.class.findMany({
          where: {
        startTime: {
          gt: new Date(), // this filters to only future classes
        },
        isPublished: true // optional: only include published ones
        },
        include: {
          enrollments: true,
        },
        }) 
        
        return classes
}