"use client"
import React, { useEffect, useState } from 'react'
import ClassData from './class-data'
import { getPublishedClasses } from '@/action/get-published-classes'
import { Class } from '@prisma/client'

const PublishedClasses =  () => {
     const [classes, setClasses] = useState<Class[] | null>(null)

     console.log(classes, "clss")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedClasses()
      setClasses(data)
    }

    fetchData()
  }, [])

  return (
    <div className='p-2 rounded-lg border w-full md:w-2xl h-72'>
     <ClassData data={classes}/>
    </div>
  )
}

export default PublishedClasses
