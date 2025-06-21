import React from 'react'
import UploadAssignment from './_component/UploadAssignment'
import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-services'
import Anouncement from './_component/annoucements'
import { Separator } from '@/components/ui/separator'

const Assignments = async () => {
  const self = await getSelf()

  let assignements;

  if(self?.role === "teacher"){
    assignements = await db.announcement.findMany({
      orderBy:{
        title: "desc"
      }
    }) 
  } else {
    assignements = await db.announcement.findMany({
      where: {
        creatorId: self?.id!,
      },
    })

  }
  return (
    <div className='h-full w-full p-2'>
      <div className="flex justify-end">
        {self?.role === "student" && (
          <div className="inline-block">
          <UploadAssignment/>
          </div>
        )}
      </div>
      <Separator className='space-y-3'/>
      <Anouncement assignement={assignements}/>
    </div>
  )
}

export default Assignments
