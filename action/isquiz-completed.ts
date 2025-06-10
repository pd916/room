"use server"

import { db } from "@/lib/db"

export async function isQuizComplete(studentId: string, quizId: string){
  
   const result = await db.quizResponse.findFirst({
  where: { quizId, studentId },
});

  console.log(result , studentId, quizId, "ress")

  return !!result ;
}