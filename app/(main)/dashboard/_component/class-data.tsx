"use client"

import { Badge } from '@/components/ui/badge';
import { useProfileStore } from '@/hooks/use-modal-store';
import { Class } from '@prisma/client'
import React from 'react'

interface ClassDataProps {
    data: Class[] | null;
}

const ClassData = ({data}:ClassDataProps) => {
  const {profile} = useProfileStore((state) => state);
  console.log(data, "dat")

  const isTeacher = profile?.newUser?.role === "teacher"
  
  return (
    <div className='w-full p-6 rounded-xl space-y-4'>
      <h1 className='text-xl text-center font-bold px-8'>Total Classes</h1>
  
      {data?.map((item: any) => {
  const isUpcoming = new Date(item.publishedAt) > new Date();

  return (
    <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b">
      <h2 className="text-sm font-semibold">{item.title}</h2>

      {isTeacher ? (
        <Badge variant={item.isPublished ? "destructive" : "outline"}>
          {item.isPublished ? "Published" : "Draft"}
        </Badge>
      ) : (
        <Badge variant="default">
          {isUpcoming ? "Upcoming Class" : "Completed Quiz"}
        </Badge>
      )}
    </div>
  );
})}

    </div>
  )
}

export default ClassData
