"use client";
import { ClassEnrollment,  Profile,  } from '@prisma/client';
import React from 'react'


interface ChatItemProps {
    id: string;
    content: string;
    enrollment: ClassEnrollment & {
        profile: Profile; 
    };
    timestamp: string;
    currentEnrollment: ClassEnrollment;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>; 
};


const ChatItem = ({
    id,
    content,
    enrollment,
    currentEnrollment,
}:ChatItemProps) => {
    console.log(id, content, enrollment, currentEnrollment, "messageID")


  return (
    <>
    <div className='relative group flex items-center hover:bg-black/5 p-4 transition w-full'>
      <div className='group flex gap-x-2 items-start w-full'>
        <div className='cursor-pointer flex gap-2 items-center hover:drop-shadow-md transition'>
            <h2 className='text-xs text-green-400'>{enrollment?.name}</h2>
            <p className='text-sm dark:text-zinc-300'>{content}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatItem
