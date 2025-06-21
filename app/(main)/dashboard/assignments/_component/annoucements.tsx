import { Announcement } from '@prisma/client'
import React from 'react'
import AssignementItem from './assignement-item'


interface AnouncementProps {
    assignement: Announcement
}

const Anouncement = ({assignement}:AnouncementProps) => {
  return (
    <div className='h-full grid grid-cols-1 md:grid-cols-3 p-2 gap-2'>
      {assignement?.map((item:any) => (
        <AssignementItem
        key={item?.id}
        title={item.title}
        fileUrl={item.imageUrl}
        submitTime={item.createdAt}
        />
      ))}
    </div>
  )
}

export default Anouncement
