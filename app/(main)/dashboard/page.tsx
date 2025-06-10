"use client"
import React from 'react'
import { useProfileStore } from '@/hooks/use-modal-store'
import TeacherDashboard from './_component/teacher-dashboard'
import StudentDashboard from './_component/student-dashboard'

const Dashboard = () => {
  const {profile} = useProfileStore((state) => state)

  const isTeacher = profile?.newUser?.role === "teacher"
  return (
    <div className='h-full p-4'>
      {isTeacher ? 
    <TeacherDashboard/> 
    : <StudentDashboard/>
  }
    </div>
  )
}

export default Dashboard
