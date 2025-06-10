'use client'
import React, { useState } from 'react'
import * as z from 'zod'
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
import { Loader2, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Class, Quiz } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { useProfileStore } from '@/hooks/use-modal-store'
import { QuizesList } from './QuizesList'


interface ChaptersFormProps {
    initialData: Class & { quizzes: Quiz[]};
    classId: string
}

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});
export const QuizSection= ({
    initialData,
    classId
}: ChaptersFormProps) => {
const {profile} = useProfileStore() 
 const router = useRouter()
 const [isEditing, setIsEditing] = useState(false)
    
const toggleEdit = () => setIsEditing((current) => !current)


const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
    },
});


const { isSubmitting, isValid } = form.formState

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "vall")
    try {
        await axios.post(`/api/class/${classId}/quiz`,{ 
            ...values,
            userId: profile?.newUser?._id
        });
        toast.success("Quiz Created")
        toggleEdit();
        router.refresh()
    } catch (error) {
        toast.error('Somethng went wrong')
    }
}


const onEdit = (id: string) => {
    router.push(`/dashboard/settings/${classId}/quiz/${id}`);
}

  return (
    <div className='relative mt-6 border bg-slate-900 text-white rounded-md p-4'>
        {/* {isEditing && (
            <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center'>
            <Loader2 className='animate-spin h-6 w-6 text-sky-700 '/>
            </div>
        )} */}
      <div className='flex items-center justify-between font-medium'>
        Class Quiz
        <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ): (
                <>
        <PlusCircle className='h-4 w-4 mt-2'/>
         Add a Chapter
                </>
        )}
        </Button>
      </div>
      {isEditing && (
           <Form {...form}>
               <form 
               onSubmit={form.handleSubmit(onSubmit)}
               className='space-y-4 mt-4'
               >
                   <FormField control={form.control} name='title' render={({field}) => (
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
      {!isEditing && (
        <div className={cn(
            "text-sm mt-2 cursor-pointer",
            !initialData?.quizzes.length && "text-slate-500 italic"
        )}>
            {!initialData.quizzes.length && "No quizzes"}
            {/* TODO: ADD LIST OF CHAP+TERS */}
            <QuizesList
            onEdit={onEdit}
            items={initialData.quizzes|| []}
            />
        </div>
      )}
    </div>
  )
}
