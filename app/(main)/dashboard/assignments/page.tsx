import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Assignments = () => {
  return (
    <div className="w-full border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all">
  {/* Top: Assignment Title & Status */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <h2 className="text-lg font-semibold text-gray-900 truncate">
      Assignment: Understanding Ecosystems
    </h2>
    <Badge variant="secondary" className="w-fit">
      Pending
    </Badge>
  </div>

  {/* Class Info + Due Date */}
  <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
    <span>
      Class: <span className="font-medium text-gray-800">Biology - Grade 10</span>
    </span>
    <span>
      Due: <span className="font-medium text-gray-800">July 5, 2025 • 11:59 PM</span>
    </span>
  </div>

  {/* Description Preview (optional) */}
  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
    This assignment focuses on the food chain, ecological relationships, and environmental balance.
    Please include a diagram in your submission.
  </p>

  {/* Action Button */}
  <div className="mt-4 flex flex-wrap gap-2">
    <Link href="/assignments/123">
      <Button size="sm" className="w-full sm:w-auto">View / Submit</Button>
    </Link>

    {/* If already graded, show grade */}
    {/* <Button size="sm" variant="outline" disabled className="w-full sm:w-auto">
      Grade: 92%
    </Button> */}
  </div>
</div>

  )
}

export default Assignments
