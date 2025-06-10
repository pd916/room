"use server"
import { db } from "@/lib/db";


interface createQuizResponseProps {
responsePayload: {
  quizId: string;
  studentId: string;
  responses: { [questionId: string]: string };
}
}

export async function createQuizResponse({responsePayload}:createQuizResponseProps) {
    console.log(responsePayload, "payload")
    try {
        if(!responsePayload){
            throw new Error("all felds are required")
        }

     const quiz = await db.quiz.findUnique({
      where: { id: responsePayload.quizId },
      include: { questions: true },
    });

    if (!quiz) throw new Error("Quiz not found");

    let score = 0;
    quiz.questions.forEach((question) => {
        const userAnswers = responsePayload.responses[question.id];
        if(userAnswers && userAnswers === question.correct){
            score += 1
        }
    })

        const response = await db.quizResponse.create({
            data:{
                quizId:responsePayload.quizId,
                studentId:responsePayload.studentId,
                responses:responsePayload?.responses,
                score
            }
        })

        return (response)
    } catch (error) {
        throw new Error("Internal Errro")
    }
}