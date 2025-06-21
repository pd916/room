"use client"
import React from 'react'
import { useProfileStore } from '@/hooks/use-modal-store'
import Dashboard from './_componet/Dashboard'


const Page = () => {
  const {profile} = useProfileStore((state) => state)
  
  const isTeacher = profile?.newUser?.role === "teacher"
  return (
    <div className='h-full p-4 mle-8'>
      {isTeacher ? 
      <Dashboard type="teacher"/>
    : <Dashboard type="student"/>
  }
    </div>
  )
}

export default Page;
