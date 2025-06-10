import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { classId: string; quizId: string; questionId:string } }
) {
  try {
    const values = await req.json(); // values = { question, options, correct }
    console.log(values, "val")

    const ownClass = await db.class.findUnique({
      where: {
        id: params.classId,
      },
    });

    if (!ownClass) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    
    // Update the quiz title
    const quiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        classId:params.classId 
      }
    });

    console.log(quiz, "quiz")
    
    if(!quiz){
      return NextResponse.json("Can't find Quiz", { status: 402 });
    }

    const existingQuestion = await db.quizQuestion.findFirst({
      where: { 
        id: params.questionId,
        quizId: quiz.id 
    },
    });

let question;
if (existingQuestion) {
  question = await db.quizQuestion.update({
    where: { id: existingQuestion.id },
    data: {
      question: values.question,
      ...(values.options && { options: values.options }),
      ...(values.correct && { correct: values.correct })
    }
  });
} else {
  question = await db.quizQuestion.create({
    data: {
      quizId: quiz.id,
      question: values.question,
      options: values.options || [],
      correct: values.correct || null,
    },
  });
}

return NextResponse.json(question);
  } catch (error) {
    console.error("PATCH error:", error.stack);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}