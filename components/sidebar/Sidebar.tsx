"use client"
import { TeahcerRoutes, StudentRoutes } from '@/constant'
import React from 'react'
import SidebarNavigation from './SidebarNavigation'
import { Button } from '../ui/button'
import { useProfileStore } from '@/hooks/use-modal-store'

const Sidebar = () => {
  const {profile} = useProfileStore((state) => state)
  const isTeacher = profile?.newUser?.role === "teacher"

  const sidebarRoutes = isTeacher ? TeahcerRoutes : StudentRoutes
  console.log(profile, sidebarRoutes, "route")
  return (
    <div className='space-y-2 px-2 pt-4 lg:pt-0 h-full bg-[#336727] py-3'>
      <h2 className='text-3xl uppercase text-[#ffff] font-semibold my-5 text-center'>QuizFlick</h2>
        <div className='flex-1 items-center w-full mt-12'>
      {sidebarRoutes?.map((item:any)=> (
          <div key={item.id}>
          <SidebarNavigation
          name={item.label}
          icon={item.icon}
          link={item.link}
          />
        </div>
      ))}
      </div>

      <div className="w-full px-5 py-20">
        <Button variant="secondary" className='w-full rounded-xl text-[#336727]'>Create Enrollment</Button>
      </div>


    </div>
  )
}

export default Sidebar
