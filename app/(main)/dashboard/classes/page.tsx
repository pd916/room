import { db } from '@/lib/db'
import React from 'react'
import ClassItem from '../_component/ClassItems'
import { Separator } from '@/components/ui/separator'

const page = async () => {
    const classes = await db.class.findMany({
      where: {
    startTime: {
      gt: new Date(), // this filters to only future classes
    },
    isPublished: true // optional: only include published ones
    },
    include: {
      enrollments: true,
    },
    }) 

  const completedClasses = await db.class.findMany({
  where: {
    startTime: {
      lte: new Date(), // lte = less than or equal to current time
    },
    isPublished: true, // optional, only published classes
  },
  include: {
    enrollments: true,
  },
});

    

  return (
   <div className="p-6 max-w-6xl mx-auto">
  <h1 className="capitalize text-2xl font-semibold text-center mb-8">Classes</h1>

  <div className="flex flex-col md:flex-row md:space-x-10">
    {/* Upcoming Classes */}
    <section className="flex-1 mb-10 md:mb-0">
      <h2 className="text-lg font-semibold mb-4">
        Upcoming Classes ({classes.length})
      </h2>
      <div className="flex flex-col gap-6">
        {classes.map((item) => (
          <ClassItem key={item?.id} initialData={item} />
        ))}
      </div>
    </section>

    {/* Completed Classes */}
    <section className="flex-1">
      <h2 className="text-lg font-semibold mb-4">
        Completed Classes ({completedClasses?.length ?? 0})
      </h2>
      <div className="flex flex-col gap-6">
        {completedClasses?.map((item) => (
          <ClassItem key={item?.id} initialData={item} />
        ))}
      </div>
    </section>
  </div>
</div>


  )
}

export default page
