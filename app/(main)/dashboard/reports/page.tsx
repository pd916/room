import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Report = () => {
  return (
    <div className="w-full border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all">
  {/* Assignment Title & Class */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <h2 className="text-lg font-semibold text-gray-900 truncate">
      Understanding Ecosystems
    </h2>
    <Badge variant="outline" className="text-sm">
      Biology - Grade 10
    </Badge>
  </div>

  {/* Due Date & Grade */}
  <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
    <span>
      Due: <span className="font-medium text-gray-800">July 5, 2025</span>
    </span>
    <span>
      Grade: <span className="font-bold text-green-600 text-base">92%</span>
    </span>
  </div>

  {/* Optional Feedback or View Assignment Button */}
  <div className="mt-4 flex flex-wrap gap-2">
    <Link href="/assignments/123">
      <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:underline">
        View Assignment
      </Button>
    </Link>
    <Button
      variant="outline"
      className="text-sm px-3 py-1 h-auto"
      disabled
    >
      Feedback: Well explained!
    </Button>
  </div>
</div>

  )
}

export default Report
