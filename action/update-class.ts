"use server"
import { getSelf } from "@/lib/auth-services";
import { db } from "@/lib/db"
import { Announcement } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const updateClass = async (classId:string, isTeacher:boolean) => {
    console.log(classId, isTeacher, "teach")

    if(!isTeacher){
        throw new Error("Only Teahcer can update class")
    }

    const updatedClass = await db.class.update({
        where:{
            id:classId
        },
        data: {
            isLive: true
        }
    });

    revalidatePath(`/dashboard/classes/${updatedClass?.id}`)

    return updatedClass;
}

export const updateAssignment = async (values: Partial<Announcement>) => {
  try {
    const self = await getSelf();
    console.log(self, "self");
    if (!self) throw new Error("Not authenticated");

    const selfAssignment = await db.announcement.findFirst({
      where: { creatorId: self.id },
    });

    // Prepare data for assignment
    const assignmentData = {
      imageUrl: values.imageUrl || "",
      title: values.title || "",
      creatorId: self.id,
    };

    let assignment;

    if (selfAssignment) {
      // If exists → update
      assignment = await db.announcement.update({
        where: { id: selfAssignment.id },
        data: {
          imageUrl: values.imageUrl || selfAssignment.imageUrl,
          title: values.title || selfAssignment.title,
        },
      });
    } else {
      // If not exists → create
      assignment = await db.announcement.create({
        data: assignmentData,
      });
    }

    return assignment;
  } catch (error) {
    console.error("Update assignment failed:", error);
    throw new Error("Internal error");
  }
};

