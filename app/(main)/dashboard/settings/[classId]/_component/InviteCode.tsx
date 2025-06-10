'use client'
import React, { useState } from 'react'
import { Class } from '@prisma/client'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'

interface FormDataProps {
    initialData:Class,
    classId: string
}


const InviteCode = ({initialData, classId}:FormDataProps) => {
    const origin = useOrigin()
    const router = useRouter()
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${initialData?.inviteCode}`;
    

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }
    
    
    const onNew = async () => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/class/${classId}/invitecode`);
            toast.success("Invite Code Generated")
            router.refresh()
        } catch (error) {
            toast.error('Somethng went wrong')
        }
    }
    
  return (
    <div className='mt-6 border bg-slate-900  text-white rounded-md p-4'>
    <div className='flex items-center justify-between font-medium'>
      invite link
      <Button onClick={onCopy} variant="ghost">
      {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}  
      </Button>
    </div>
      <p className='text-sm mt-2'>
          {initialData?.inviteCode}
      </p>
   
          <div
          className='space-y-4 mt-4'>
            <Input
             disabled={isLoading}
             readOnly
             className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
             focus-visible:ring-offset-0"
            value={inviteUrl}
            />
                    
         <div className='flex items-center gap-x-2'>
         <Button
                onClick={onNew}
                disabled={isLoading}
                variant="link"
                size="sm"
                className="text-xs text-zinc-500 mt-4"
                >
                    Genenrate a new link
                    <RefreshCw className="h-4 w-4 ml-2"/>
                </Button>
              </div>
          </div>
  </div>
  )
}

export default InviteCode
