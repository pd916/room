import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'

interface AssignementItemProps {
    title: string;
    fileUrl: string;
    submitTime: Date;
}

const AssignementItem = ({title, fileUrl, submitTime}:AssignementItemProps) => {
  return (
   <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>Your submitted assignment</CardDescription>
  </CardHeader>

  <CardContent>
   <a 
     href={fileUrl}
    target="_blank"
     rel="noopener noreferrer"
     className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
     >
      submited assignement
    </a>
  </CardContent>

  <CardFooter>
    <p>Submitted on: {new Date(submitTime).toLocaleString()}</p>
  </CardFooter>
</Card>

  )
}

export default AssignementItem
