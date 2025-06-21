import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatHeader from '../_component/ChatHeader'
import MediaRoom from '@/components/MediaRoom'
import Lobby from '../_component/Lobby'

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
        <MediaRoom
        chatId={classes.id}
        classes={classes}
        enrollments={classEnrollment}
        quizCompleted={result}
        />
     
        </div>
      )
}

export default page