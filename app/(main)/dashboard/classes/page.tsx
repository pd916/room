import { db } from '@/lib/db'
import React from 'react'
import ClassItem from '../_component/ClassItems'
import { Separator } from '@/components/ui/separator'
import { publishedClasses } from '@/lib/published-classes'
import { upcomingClasses } from '@/constant'

const page = async () => {
    const classes = await publishedClasses();

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

  <div className="flex flex-col md:flex-row md:space-x-10">
    {/* Upcoming Classes */}
    <section className="flex-1 mb-10 md:mb-0">
      <h2 className="text-lg font-semibold mb-4">
        Upcoming Classes ({classes.length})
      </h2>
      <div className="flex flex-col gap-6">
        {upcomingClasses.map((item) => (
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
