"use client"
import React from 'react'
import WelcomeStudent from './welcome-student'
import { useProfileStore } from '@/hooks/use-modal-store'
import PublishedClasses from './PublishedClass'
import Assignments from '../assignments/page'

const StudentDashboard = () => {
    const {profile} = useProfileStore((state) => state);
  return (
    <div className='w-full'>
  <div className='flex flex-col lg:flex-row gap-4'>
    <div className='h-full w-full'>
      <div className='h-48 w-full border'>
        <WelcomeStudent username={profile?.newUser?.name}/>
      </div>

      <div className='mt-4 h-full w-full'>
        <PublishedClasses />
      </div>
    </div>

    <div className='w-full lg:w-2xl rounded-lg flex flex-col gap-3'>
      <Assignments />
      <Assignments />
    </div>
  </div>
</div>

  )
}

export default StudentDashboard
