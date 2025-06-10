'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { Class, Subject } from '@prisma/client'
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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormDataProps {
    initialData:Class,
    classId: string
}


const SelectSubject = ({initialData, classId}:FormDataProps) => {
    const formSchema = z.object({
        subject: z.string().optional(),
    });

    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            subject: initialData.subject || "",
          },
    });
    
    const { isSubmitting, isValid } = form.formState;
    
    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/class/${classId}`, values);
            toast.success("Class Updated")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error('Somethng went wrong')
        }
    }
    
  return (
    <div className='mt-6 border bg-slate-900  text-white rounded-md p-4'>
    <div className='flex items-center justify-between font-medium'>
      Class subject
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
          {initialData.subject}
      </p>
    )}
    {isEditing && (
      <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-4'
          >
              <FormField control={form.control} name='subject' render={({field}) => (
                  <FormItem>
                      <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger
                            className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0
                            focus:ring-offset-0 capitalize outline-none"
                             >
                                <SelectValue placeholder="Select a channel type"/>
                            </SelectTrigger>
                       </FormControl>
                        <SelectContent>
                            {Object.values(Subject).map((type) => (
                          <SelectItem
                         key={type}
                     value={type}
                     className="capitalize"
                     >
                         {type.toLocaleLowerCase()}
                         </SelectItem>
                     ))}
                  </SelectContent>
             </Select>
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

export default SelectSubject;
