"use client"
import React, { useEffect, useState } from 'react'
import PublishedClasses from './PublishedClass'
import CreateClass from './CreateClass'
import { TotalStudent } from '@/action/enrolled-studnet'
import { ClassEnrollment, Profile } from '@prisma/client'
import { Chart } from './Chart'
import StudentEnrolled from './StudentEnrolled'

interface Enrollment {
  id: string;
  classId: string;
  profileId: string;
  isAdmin: boolean;
  enrolledAt: Date;
  profile: Profile;
}

const TeacherDashboard = () => {
  const [students, setStudents] = useState<Enrollment[] | null>(null)
  console.log(students, "stdu")

 useEffect(() => {
  const getEnrolledStudent = async () => {
    const {
      studentsLastMonth
    } = await TotalStudent();

    console.log(studentsLastMonth, "lastmmonth")

    setStudents(studentsLastMonth);
  };

  getEnrolledStudent();
}, []);
  return (
    <div className='h-full p-2 overflow-hidden'>
      <div className='flex flex-col sm:flex sm:flex-row gap-4 '>
        <PublishedClasses/>
        <CreateClass/>
      </div>

      <div className='sm:flex gap-2'>
      <div className='sm:w-64 h-72'>
        <StudentEnrolled
        data={students} 
        label="New Students List"
        />
        </div>
        <div className='w-full h-72 '>
        <Chart data={students}/>
        </div>
        </div>
    </div>
  )
}

export default TeacherDashboard
