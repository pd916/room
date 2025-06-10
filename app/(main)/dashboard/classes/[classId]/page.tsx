import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatHeader from '../_component/ChatHeader'
import MediaRoom from '@/components/MediaRoom'
import ChatInput from '@/components/chat/ChatInput'
import ChatMessage from '@/components/chat/ChatMessage'
import QuizSection from '../_component/QuizSection'
import { isQuizComplete } from '@/action/isquiz-completed'
import { AttendanceUpdation } from '@/lib/attendance-updation'

const page = async ({params}:{params:{classId:string}}) => {
    const classes = await db.class.findUnique({
        where:{
            id:params.classId
        },
        include:{
          quizzes:{
         include: {
        questions: {
          orderBy: {
            question: "desc"
          }
        }
      }
          },
        }
        
    })

    const classEnrollment = await db.classEnrollment.findFirst({
        where:{
            classId:params?.classId
        },
        include:{
          profile:true
        }
    })

     const quizId = classes?.quizzes?.[0]?.id;
  const studentId = classEnrollment?.profile?.id;

    // const quizCompleted = await isQuizComplete(quizId, studentId) 
    const result = await db.quizResponse.findFirst({
      where:{
        quizId,
        studentId
      }
    })

  const handleAttendance = async ({ studentId, classId }: { studentId: string; classId: string }) => {
  "use server"; 

  await db.attendance.create({
    data:{
      classId:classId,
      studentId: studentId,
      status: true,
      date: new Date()
    }
  });
};

    console.log(result, "result")

     if(!classes || !classEnrollment) {
        redirect("/")
    }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-screen overflow-hidden'>
       <ChatHeader
      name={classes.title}
      classId={classEnrollment.classId}
      type="channel"
      handleAttendance={handleAttendance}
      />
      <div className='grid grid-cols-3 p-2 gap-2 flex-1 overflow-hidden'>
      <div className='col-span-2 flex flex-col gap-4 rounded-lg overflow-hidden'>
      <MediaRoom
      chatId={classes.id}
      video={true}
      audio={true}
      />
      <ChatInput
      name={classes?.title }
      type="channel"
      apiUrl="/api/socket/messages"
      query={{
        classId: classes?.id,
        classEnrollmentId: classEnrollment?.id
      }}
      />
      </div>

      <div className="flex flex-col gap-4 rounded-sm overflow-hidden">
      <QuizSection
      data={classes}
      enrollments={classEnrollment}
      quizCompleted={result}
      />
      <ChatMessage
      enrollment={classEnrollment}
      chatId={classes.id}
      apiUrl="/api/message"
      socketUrl="/api/socket/messages"
      socketQuery={{
        classId: classes.id,
      }}
      paramKey='classId'
      paramValue={classes.id}
      />
      </div>
      </div>
    </div>
  )
}

export default page
