"use client"
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatScroll } from '@/hooks/use-chat-scroll';
import { useChatSocket } from '@/hooks/use-chat-socket';
import { ClassEnrollment, Message, Profile } from '@prisma/client';
import {format} from "date-fns"
import { Loader2, ServerCrash } from 'lucide-react';
import React, { ElementRef, Fragment, useRef } from 'react'
import ChatItem from './ChatItem';

const DATE_FORMAT = "d MMM yyyy,  HH:mm"

type MessageWithMemberWithProfile = Message & {
  enrollment: ClassEnrollment & {
    profile: Profile
  }
}

interface ChatMessagesProps {
    enrollment: ClassEnrollment;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "classId";
    paramValue: string;
}
const ChatMessage = ({
  enrollment,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramValue,
  paramKey
}:ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}`;
  const updateKey = `chat:${chatId}:messages:update`

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

   const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status 
  } = useChatQuery({
     queryKey,
    apiUrl,
    paramKey,
    paramValue
  })

  console.log(data, "dattsss")

  useChatSocket({queryKey, addKey, updateKey})
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage &&  !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })
  
  if(status === "pending") {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4'/>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Loading messages...
        </p>
      </div>
    )
  }

  if(status === "error") {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <ServerCrash className='h-7 w-7 text-zinc-500 my-4'/>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
   <div 
    ref={chatRef}
    className='flex-1 flex flex-col py-4 overflow-y-auto rounded-sm bg-[#336727] text-white'>
      {!hasNextPage && 
      <div className='flex-1'/>
      }
      
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4'/>
          ) : (
            <button
            onClick={() => fetchNextPage()}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 
            text-xs my-4 dark:hover:text-zinc-300 transition'
            >More</button>
          )}
        </div>
      )}
      <div 
      className='flex flex-col-reverse mt-auto'>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
              key={message.id}
              id={message.id}
              content={message?.message}
              enrollment={message.sender}
              timestamp={format(new Date(message.sentAt), DATE_FORMAT)}
              currentEnrollment={enrollment}
              isUpdated={message.updatedAt !== message.sentAt}
              socketUrl={socketUrl}
              socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef}/>
    </div>
  )
}

export default ChatMessage
