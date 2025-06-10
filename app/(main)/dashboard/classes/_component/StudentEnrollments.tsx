"use client"
import React, { useEffect, useState } from 'react'
import qs from "query-string"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { ShieldCheck, User, UserSearchIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Profile } from '@prisma/client'

interface StudentEnrollmentsProps {
  classId:string
}

const StudentEnrollments = ({classId}:StudentEnrollmentsProps) => {
  const [users, setUsers] = useState<Profile[] | null>(null);
  console.log(users, "users")

  useEffect(() => {
    const fetchUsers = async () => {
       const url = qs.stringifyUrl({
                url: '/api/getusers',
                query: {
                    classId: classId,
                }
            });
      const res = await fetch(url)
      const data = await res.json()
      console.log(data, "users")
      setUsers(data)
    };
    fetchUsers();
  }, [classId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserSearchIcon className='h-7 w-7'/>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader className="pt-8 px-6">
         <DialogTitle className="text-2xl text-center font-bold">
            Student Enrolled
         </DialogTitle>
         <DialogDescription className="text-center text-zinc-500">
             All the user which enrolled in you class
         </DialogDescription>
      </DialogHeader>
        <ScrollArea>
        {users?.map((item:any, index:number) => (
          <div key={index} className="flex items-center gap-x-2 mb-6">
                        <User className='h-6 w-6'/>
                        <div className="flex flex-col gap-y-1">
                            <div className="text-xs font-semibold flex items-center gap-x-1">
                                {item?.profile?.name}
                                {item?.profile?.role === "teacher" && <ShieldCheck className="h-4 w-4 text-rose-500"/>}
                            </div>
                            <p className="text-xs text-zinc-500">
                                {item?.profile?.email}
                            </p>
                        </div>
                    </div>
        ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default StudentEnrollments
