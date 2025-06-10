'use client'
import { ConfirmModel } from '@/components/models/ConfirmModel'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
    disabled: boolean
    classId: string
    isPublished: boolean
}

export const Actions = ({
    disabled,
    classId,
    isPublished
}:ActionsProps) => {
    const router = useRouter()
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false)

    const onClick =async () => {
        try {
            setIsLoading(true)

            if(isPublished) {
                await axios.patch(`/api/class/${classId}/unpublish`);
                toast.success("Class unPublished")
            }else {
                await axios.patch(`/api/class/${classId}/publish`);
                toast.success("Class published")
                confetti.onOpen();
            }

            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/class/${classId}`)
            toast.success('class Deleted')
            router.refresh()
            router.push('/dashboard/settings')
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center gap-x-2'>
            <Button 
            onClick={onClick}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModel onConfirm={onDelete}>
            <Button size='sm' disabled={isLoading}>
                <Trash className='h-4 w-4'/>
            </Button>
            </ConfirmModel>
        </div>
    )
}
