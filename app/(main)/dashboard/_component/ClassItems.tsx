"use client"
import { Attendance, Class, ClassEnrollment } from "@prisma/client";
import { ClipboardSignatureIcon, Timer, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProfileStore } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";


interface ClassWithAttendance extends Class {
  attendance?: Attendance[];  // define AttendanceType accordingly
  enrollments: ClassEnrollment[]; 
}


interface ClassItemProps {
    initialData: ClassWithAttendance 
}

const ClassItem = ({initialData}: ClassItemProps) => {
    const router = useRouter();
    const { profile } = useProfileStore((state) => state);
  const isTeacher = profile?.newUser?.role === "teacher";
  // const isCompleted = true;
    console.log(initialData, "class")

    const handleEditClass = () => {
        router.push(`/dashboard/settings/${initialData?.id}`)
    }
    const handleStartClass = () => {
        router.push(`/dashboard/classes/${initialData?.id}`)
    }

    return (
       <div className="w-full max-w-xl mx-auto border rounded-md p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <ClipboardSignatureIcon className="h-5 w-5 text-slate-800" />
          <h1 className="text-lg sm:text-xl font-semibold truncate max-w-[250px]">
            {initialData?.title}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            Subject: {initialData?.subject}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
          <Timer className="h-5 w-5" />
          <span>{dayjs(initialData?.startTime).format("dddd, MMM D • h:mm A")}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>
            Enrolled Students: <strong>{initialData?.enrollments?.length || 0}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          <span>
            Attendance Records: <strong>{initialData?.attendance?.length || 0}</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        {isTeacher ? (
          <>
              <Button onClick={handleEditClass} variant="destructive" className="flex-1">
                Edit Class
              </Button>
            
              <Button
                variant="link"
                onClick={handleStartClass}
                disabled={!initialData.isPublished}
                className="flex-1 text-center"
              >
                {!initialData.isPublished ? "Draft" : "Start Class"}
              </Button>
          </>
        ) : (
            <Button
              variant="destructive"
              onClick={handleStartClass}
              disabled={!initialData.isPublished}
              className="w-full"
            >
              Start Class
            </Button>
        )}
      </div>
    </div>
    )
}

export default ClassItem;