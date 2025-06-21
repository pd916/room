"use client"
import { UserAvatar } from '@/components/user-avatar';
import { ClassEnrollment } from '@prisma/client'
import Image from 'next/image';
import React from 'react'

interface StudentEnrolledProps {
    name:string;
    email:string;
    imageUrl?:string | null;
}

const StudentData = ({name, email, imageUrl}:StudentEnrolledProps) => {
    
  return (
    <div className='p-2'>
      <div className='flex items-center gap-2'>
      <div className='rounded-full border w-8 h-8'>
        <UserAvatar src={imageUrl!}/>
      </div>
      <div className='flex flex-col'>
      <h2 className='text-xs font-semibold'>{name}</h2>
      <p className='text-muted-foreground text-xs'>{email}</p>
      </div>
      </div>
    </div>
  )
}

export default StudentData
