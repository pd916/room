"use server"

import { db } from "@/lib/db";


export async function deleteQuestion({ quizId, questionId }: { quizId: string; questionId: string }){
    try {
        const deleted = await db.quizQuestion.delete({
          where: {
            id: questionId,
            quizId: quizId
          }
        });
    
        return deleted;
      } catch (error) {
        console.error("Failed to delete question:", error);
        return { success: false, error: "Failed to delete question" };
      }
}