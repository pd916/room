import Image from 'next/image'
import React from 'react'

interface WelcomeStudentProps {
    username: string
}

const WelcomeStudent = ({username}:WelcomeStudentProps) => {

  return (
    <div className="bg-green-500 rounded-lg h-full w-full p-3 text-white flex items-center justify-between">
  <div className='p-3'>
    <h1 className="text-xl font-semibold">
      Welcome Back <span className="capitalize text-lg font-semibold">{username}</span>!
    </h1>
    <p className='text-sm font-semibold'>Always stay updated in your student portal</p>
  </div>

  <div className="relative w-48 h-48">
    <Image src="/student.png" alt="student" fill className="object-contain" />
  </div>
</div>
  )
}

export default WelcomeStudent
