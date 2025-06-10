"use client"
import React from 'react'
import ProfilePhoto from "./Avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit } from 'lucide-react';
import { useModelStore } from '@/hooks/use-modal-data';

const ProfileHeader = () => {
  const {onOpen} = useModelStore((state) => state)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
        <ProfilePhoto />
        </button>
      </DropdownMenuTrigger>
       <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        <DropdownMenuItem
          onClick={() => onOpen("editProfile")}
          className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'
          >
            Edit Profile
            <Edit className='h-full w-4 ml-auto'/>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileHeader
