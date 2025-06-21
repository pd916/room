import React, { useEffect, useState, useTransition } from 'react'
import DataCard from './data-card';
import { TotalStudent } from '@/action/enrolled-studnet';
import { Class, ClassEnrollment } from '@prisma/client';
import { Chart } from './Chart';
import WelcomeStudent from './welcome-student';
import { useProfileStore } from '@/hooks/use-modal-store';
import StudentCard from './student-card';
import { getPublishedClasses } from '@/action/get-published-classes';
import ClassAnnouncements from './class-announcements';

interface DashboardProps {
    type: "teacher" | "student";
}

type TotalStudentResult = {
  studentsThisMonth: ClassEnrollment[];
  studentsLastMonth: ClassEnrollment[];
};


const Dashboard = ({type}:DashboardProps) => {
  const [students, setStudents] = useState<TotalStudentResult | null>(null);
   const [classes, setClasses] = useState<Class[] | null>(null)
  const {profile} = useProfileStore((state) => state);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      TotalStudent().then((data) => {
        setStudents(data);
      });
    });
  }, []);

  useEffect(() => {
    startTransition(() => {
      getPublishedClasses().then((data:any) => {
        setClasses(data);
      });
    });
  }, []);

    if(type === "student"){
        return (
        <div className='h-[calc(100vh-64px)] w-full p-2 flex gap-4 mb-4 overflow-hidden'>
        <div className='flex-1 space-y-3 h-56'>
        <WelcomeStudent username={profile?.newUser?.name}/>
        <ClassAnnouncements/>
        </div>
        <div className='h-full'>
        <StudentCard data={classes}/>
    </div>
</div>
      )
    }

  return (
    <div className='h-full p-2 overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
      <DataCard
      label='Total Revenue'
      />
      <DataCard
      label='Total Sales'
      />
    </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
      <DataCard
      label='Last MonthStudent'
      data={students?.studentsLastMonth}
      />
        <Chart />
    </div>
    </div>
  )
}

export default Dashboard
