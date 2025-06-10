"use client"
import { Class, ClassEnrollment, Profile, Quiz, QuizQuestion, QuizResponse } from '@prisma/client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createQuizResponse } from '@/action/create-quiz';
import { toast } from 'sonner';
import { isQuizComplete } from '@/action/isquiz-completed';
import TeacherBtn from './TeacherBtn';
import { useProfileStore } from '@/hooks/use-modal-store';
import { useQuizSocket } from '@/hooks/use-question-socket';
import { useSocket } from '@/components/providers/socket-provider';
import Image from 'next/image';


interface ExtendedQuiz extends Quiz {
  questions: QuizQuestion[]
}

interface QuizSectionProps {
  data: Class & {
  quizzes: ExtendedQuiz[]
  }
  quizCompleted:QuizResponse
  enrollments:ClassEnrollment & {
    profile:Profile
  }
}

const QuizSection = ({data, enrollments, quizCompleted}:QuizSectionProps) => {
  const {profile} = useProfileStore((state) => state);
  const { socket } = useSocket();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const questions = data?.quizzes?.[0]?.questions || [];
  const quizId = data?.quizzes?.[0]?.id;
  const studentId = enrollments?.profile?.id;
  const isTeacher = profile?.newUser?.role === "teacher";
  const selectedOption = answers[currentQuestionIndex] || "";

  console.log(quizCompleted, "complet")

  console.log(currentQuestionIndex, answers, enrollments, isTeacher, "quizz")
 
const handleOptionChange = (option: string) => {
  console.log(option,"opt")
    if (!isTeacher) {
      setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
    }
  };

   const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const formattedResponses: { [questionId: string]: string } = {};

      questions.forEach((q:any, index:number) => {
        if (answers[index]) {
          formattedResponses[q.id] = answers[index];
        }
      });

      const responsePayload = {
        quizId,
        studentId,
         responses: formattedResponses,
      }

      await createQuizResponse({responsePayload})
      toast.success("Quiz Completed")
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong")
    } finally {
      setSubmitting(false);
    }
  };



  const handleNext = () => {
  const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
  setCurrentQuestionIndex(nextIndex);
  socket?.emit("quiz:question-update", { quizId, index:nextIndex });

};

const handlePrev = () => {
  const prevIndex = Math.max(currentQuestionIndex - 1, 0);
  setCurrentQuestionIndex(prevIndex);
  socket?.emit("quiz:question-update", { quizId, index:prevIndex });

};

useQuizSocket({
  quizId,
  onQuestionChange: (index) => {
    if (!isTeacher) {
      setCurrentQuestionIndex(index);
    }
  }
});



  // ✅ Safely get current question
  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
  console.log(currentQuestion?.options, questions, "quest")
  return (
    <div className='rounded-sm bg-[#336727] text-white min-h-[220px] p-3'>
      <h1 className='text-lg font-bold uppercase'>Quiz</h1>
      {quizCompleted ? (
        <div className='overflow-hidden flex flex-col items-center justify-center'>
        <Image src="/quiz-completed.png" alt='quiz' width={250} height={240} 
        className='object-conver animate-bounce transition duration-700 '/>
        <p className='text-xs font-semibold'>Quiz Completed</p>
        </div>
      ) : (  
         <div className="flex flex-col gap-2">
           <h2 className="font-semibold">{currentQuestion?.question}?</h2>
           {currentQuestion?.options?.map((item: string, index: number) => (
             <label key={index} className="flex items-center gap-2 cursor-pointer pl-4">
               <input
                 type="radio"
                 name={`quiz-option-${currentQuestion.id}`}
                 value={item}
                 disabled={profile?.newUser?.role === "teacher"}
                 checked={selectedOption === item}
                 onChange={() => handleOptionChange(item)}
               />
               <span className="font-medium">{item}</span>
             </label>
           ))}
 
 {!isTeacher && (
   <Button 
   onClick={handleSubmit} 
   disabled={submitting || currentQuestionIndex !== questions.length - 1}
   className="mt-4 bg-green-600 text-white">
    {submitting ? "Submitting..." : "Submit Quiz"}
   </Button>
  )}
         {isTeacher && (
          <div className='flex gap-2'>
            <TeacherBtn
            disabled={currentQuestionIndex === 0}
            variant="secondary"
            onClick={handlePrev}
            label="Prev"
            />
            <TeacherBtn
            disabled={currentQuestionIndex === questions.length - 1}
            variant="ghost"
            onClick={handleNext}
            label="Next"
            />
          </div>
         )}
         </div>)}

    </div>
  )
}

export default QuizSection
