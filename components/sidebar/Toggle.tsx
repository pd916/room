import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { useProfileStore } from '@/hooks/use-modal-store'
import { StudentRoutes, TeahcerRoutes } from '@/constant'
import SidebarNavigation from './SidebarNavigation'


const Toggle = () => {
     const {profile} = useProfileStore((state) => state)
      const isTeacher = profile?.newUser?.role === "teacher"
    
      const sidebarRoutes = isTeacher ? TeahcerRoutes : StudentRoutes
  return (
   <Sheet>
  <SheetTrigger asChild>
    <Menu className='w-6 h-6 text-emerald-600'/>
  </SheetTrigger>
  <SheetContent className='bg-[#336727] '>
    <SheetHeader>
        <div className='flex-1 items-center w-full mt-12'>
      {sidebarRoutes ?.map((item:any)=> (
          <div key={item.id}>
          <SidebarNavigation
          name={item.label}
          icon={item.icon}
          link={item.link}
          />
        </div>
      ))}
      </div>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default Toggle
