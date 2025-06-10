"use client"
import { Hand, Hash } from 'lucide-react';
import React from 'react'
import StudentEnrollments from './StudentEnrollments';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SocketIndicator } from '@/components/socket-indecator';
import { useProfileStore } from '@/hooks/use-modal-store';

interface ChatHeaderProps {
    classId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?:string;
    handleAttendance: ({ classId, studentId }: { classId: string; studentId: string }) => Promise<void>;
}

const ChatHeader = ({
    classId,
    name,
    type,
    imageUrl,
    handleAttendance
}:ChatHeaderProps) => {
  const {profile} = useProfileStore((state) => state);

  const isStudent = profile?.newUser?.role === "student"
  const isPresent = profile?.newUser.attendance
  console.log(isPresent, "pro")

  return (
    <div className='text-md font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2'> 
      {/* <MobileToggle serverId={serverId}/> */}
      {type === "channel" && (
        <div className='flex items-center gap-1'>
        <Hash className='w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2'/>
        <h3>{name}</h3>
        </div>
      )}
      <div className='ml-auto flex items-center gap-4'>
        {isStudent &&
        <Button onClick={() => handleAttendance({
          classId:classId,
          studentId: profile?.newUser?._id
        })}>
        <Hand className='h-7 w-7'/> 
        </Button>
        }
      <SocketIndicator/>
      
      <Separator orientation="vertical" className='space-y-5' />
        <Button size="sm">Add Question</Button>
        <StudentEnrollments classId={classId}/>
      </div>
    </div>
  )
}

export default ChatHeader
{/* {type === "conversation" && (
  <ChatVideoButton/>
  )} */}

{/* {type === "conversation" && (
  <UserAvatar
  src={imageUrl}
  className='h-8 w-8 md:h-8 md:w-8 mr-2'
  />
)} */}