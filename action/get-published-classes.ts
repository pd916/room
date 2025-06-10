'use server'

import { db } from '@/lib/db'

export const getPublishedClasses = async () => {
  const classes = await db.class.findMany({
    where: { isPublished: true },
    orderBy: { title: 'desc' },
  })

  return classes
}
