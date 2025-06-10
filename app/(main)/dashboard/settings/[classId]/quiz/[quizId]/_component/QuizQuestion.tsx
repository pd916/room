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
import { Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface QuizQuestionProps {
    initialData: {
        title: string
    };
    classId: string,
    quizId:string;
}

const formSchema = z.object({
    title: z.string().min(1),
});
export const QuizQuestion = ({
    initialData,
    classId,
    quizId
}: QuizQuestionProps) => {
    const router = useRouter()
const [isEditing, setIsEditing] = useState(false)

const toggleEdit = () => setIsEditing((current) => !current)


const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: initialData.title
    },
});

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/class/${classId}/quiz`, values);
        toast.success("Chapter Updated")
        toggleEdit();
        router.refresh()
    } catch (error) {
        toast.error('Somethng went wrong')
    }
}


  return (
    <div className='mt-6 w-full border bg-slate-100 rounded-md p-4'>
      <div className='flex items-center justify-between font-medium'>
         Quiz Title
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
            {initialData.title}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
            >
                <FormField control={form.control} name='title' render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input disabled={isSubmitting} placeholder='e.g. Introduction to the course' {...field}/>
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