'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { Class } from '@prisma/client'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/hooks/use-modal-store'

interface AnnouncementProps {
    initialData:Class,
    classId: string
}


const Announcement = ({initialData, classId}:AnnouncementProps) => {
    const {profile} = useProfileStore()
    console.log(profile.newUser._id, "pro")
    const formSchema = z.object({
        message: z.string().min(1, {
            message: "Title is Requierd"
        }),
        creatorId:z.string()
    });

    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            creatorId:profile?.newUser?._id,
            message:""
        },
    });
    
    const { isSubmitting, isValid } = form.formState;
    
    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/class/${classId}/annoucement`, values);
            toast.success("Anouncement Updated")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error('Somethng went wrong')
        }
    }
    
  return (
    <div className='mt-6 border bg-slate-900  text-white rounded-md p-4'>
    <div className='flex items-center justify-between font-medium'>
      Announcement title
      <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
              <>Cancel</>
          ): (
              <>
      <Pencil className='h-4 w-4 mt-2'/>
       Edit title
              </>
      )}
      </Button>
    </div>
    {!isEditing && (
      <p className='text-sm mt-2'>
          {/* {initialData. } */}
      </p>
    )}
    {isEditing && (
      <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-4'
          >
              <FormField control={form.control} name='message' render={({field}) => (
                  <FormItem>
                      <FormControl>
                          <Input disabled={isSubmitting} placeholder='e.g. Advance web devevlopment' {...field}/>
                      </FormControl>
                      <FormMessage/>
                  </FormItem>
              )}/>
              <div className='flex items-center gap-x-2'>
                  <Button 
                  disabled={!isValid || isSubmitting}
                  type='submit'
                  >
                      Save
                  </Button>
              </div>
          </form>
      </Form>
    )}
  </div>
  )
}

export default Announcement
