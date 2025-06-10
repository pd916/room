"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassEnrollment, Profile} from '@prisma/client'
import React from 'react'
import StudentData from "./student-data";

interface ClassEnrollmentWithProfile extends ClassEnrollment {
  profile: Profile
}

interface StudentEnrolledProps {
    data: ClassEnrollmentWithProfile[] | null;
    label: string
}

const StudentEnrolled = ({data, label}:StudentEnrolledProps) => {
  return (
    <Card className="mt-2 h-full w-full z-10">
            <CardHeader className="flex flex-row items-center justify-between sapce-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                     {data?.map((item) => (
                        <StudentData
                        key={item.id}
                        name={item?.profile?.name}
                        email={item?.profile?.email}
                        imageUrl={item.profile?.profileImage}
                        />
                     ))}
                </div>
            </CardContent>
        </Card>
  )
}

export default StudentEnrolled
