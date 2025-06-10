"use client"
import React from 'react'
import { Separator } from '../ui/separator'
import ProfileHeader from '../profile/profile-header'
import Toggle from './Toggle'


const Header = () => {

  return (
    <div className='text-md font-semibold bg-[#336727] px-3 flex items-center justify-between
     h-16 dark:border-neutral-800'>
      <Toggle/>
      <div className='flex items-center gap-4 px-5'>
        <Separator orientation="vertical" className="h-6 w-[2px] bg-slate-800 mx-2"/>
        <h2>Connected</h2>
        <ProfileHeader/>
      </div>
    </div>
  )
}

export default Header
