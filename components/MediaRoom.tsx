"use client"
import { useProfileStore } from '@/hooks/use-modal-store';
import {LiveKitRoom, VideoConference,  GridLayout,
  ParticipantTile, } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Chat } from './chat-message';
import QuizSection from '@/app/(main)/dashboard/classes/_component/QuizSection';
import { Class, ClassEnrollment, Profile, Quiz, QuizQuestion, QuizResponse } from '@prisma/client';
import { ChatList } from './ChatList';
import { Video } from './Video';
import { useRouter } from 'next/navigation';
import { useSocket } from './providers/socket-provider';

interface ExtendedQuiz extends Quiz {
  questions: QuizQuestion[];
}

interface MediaRoomProps {
  chatId: string;
  classes: Class & {
    quizzes: ExtendedQuiz[];
  };
  enrollments: ClassEnrollment & {
    profile: Profile;
  };
  quizCompleted: QuizResponse;
  // video?: boolean;
  // audio?: boolean;
}

const MediaRoom = ({
    chatId,
    classes,
    enrollments,
    quizCompleted
    // video,
    // audio
}:MediaRoomProps) => {
    console.log(chatId, "audd")
    const router = useRouter();
  const {profile} = useProfileStore()
  const {socket} = useSocket()
  const user = profile?.newUser
  const role = profile?.role || "student";
    const [token, setToken] = useState("");

    useEffect(() => {
        if(!user?.name) return;

        const name = `${user?.name}`;

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}&role=${role}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (error) {
                console.log(error)
            }
        })()
    },[user?.name, chatId]);

    
    
    if(token === ""){
        return (
            <div className="flex flex-col flex-1 items-center justify-center">
                <Loader2
                className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
            </div>
        )
    }


    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            >
    <div  className='grid grid-cols-3 p-2 bg-white gap-2 h-screen flex-1 overflow-hidden'>

    <div className='col-span-2 flex flex-col gap-1 rounded-lg overflow-hidden'>
        <div className="flex-1 p-1 overflow-hidden">
      {/* <VideoConference /> */}
      <Video
      // hostIdentity={chatId}
      />
        </div>

    <div className="p-2 overflow-hidden pb-8">
      <Chat hostIdentity={chatId} />
    </div>
    </div>

    <div className="flex flex-col gap-4 overflow-hidden mt-2">
      <QuizSection 
      data={classes}
      enrollments={enrollments}
      quizCompleted={quizCompleted}
      />
      <ChatList hostIdentity={chatId}/>
    </div>

  </div>
        </LiveKitRoom>
    )
}

export default MediaRoom

//     useEffect(() => {
//   if (!socket) return;
          
          //   socket.emit("join-class", classes.id); // Join the class room
          
          //   const handleClassStart = (classId: string) => {
            //      console.log("Received class:start for", classId);
          //     if (classId === classes.id) {
          //       router.refresh();
          //     }
          //   };
          
          //   socket.on("class:start", handleClassStart);
          
          //   return () => {
          //     socket.off("class:start", handleClassStart);
          //   };
          // }, [socket, classes.id, router]);