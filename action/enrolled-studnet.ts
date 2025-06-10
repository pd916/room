"use server"

import { db } from "@/lib/db"


export const TotalStudent = async () => {
   const now = new Date();

  // Start of this month
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Start of last month
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const studentsThisMonth = await db.classEnrollment.findMany({
    where: {
      enrolledAt: {
        gte: startOfThisMonth,
      },
    },
    include: {
      profile:{
       select:{
        name:true,
        email:true,
        profileImage:true
       }
      }
    }
  });

  const studentsLastMonth = await db.classEnrollment.findMany({
    where: {
      enrolledAt: {
        gte: startOfLastMonth,
        lt: startOfThisMonth,
      },
    },
     include: {
      profile:true
    }
  });

    return {
        studentsThisMonth,
        studentsLastMonth
    }
}


