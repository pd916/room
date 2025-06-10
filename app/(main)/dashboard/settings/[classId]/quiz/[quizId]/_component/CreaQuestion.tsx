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
import { cn } from '@/lib/utils'
import { Quiz } from '@prisma/client'
import QuestionList from './QuestionList'


interface CreateQuestionProps {
    initialData: Quiz,
    classId: string,
    quizId:string;
}

const formSchema = z.object({
    question: z.string().min(1),
    correct: z.string().min(1).optional()
});
export const CreateQuestion = ({
    initialData,
    classId,
    quizId
}: CreateQuestionProps) => {
    console.log(initialData, classId, quizId, "daat")
    const router = useRouter()
const [isEditing, setIsEditing] = useState(false)

const toggleEdit = () => setIsEditing((current) => !current)


const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        question: ""
    }
});

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "work")
    try {
        await axios.post(`/api/class/${classId}/quiz/${quizId}/question`, values);
        toast.success("Question Updated")
        toggleEdit();
        router.refresh()
    } catch (error) {
        toast.error('Somethng went wrong')
    }
}


  return (
    <div className='mt-10 w-full bg-slate-100 rounded-md p-4'>
      <div className='flex items-center justify-between font-medium'>
         Question Title
        <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancel</>
            ): (
                <>
        <Pencil className='h-4 w-4 mt-2'/>
         Create Question
                </>
        )}
        </Button>
      </div>
      {!isEditing && (
        <p className='text-sm mt-2'>
            {/* {initialData.title} */}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
            >
                <FormField control={form.control} name='question' render={({field}) => (
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

      {!isEditing && (
        <div className={cn(
            "text-sm mt-2",
            !initialData?.questions?.length && "text-slate-500 italic"
        )}>
            {!initialData?.questions?.length && "No Question Found"}
            {/* TODO: ADD LIST OF CHAP+TERS */}
            <QuestionList
            classId={classId}
            quizId={quizId}
            items={initialData?.questions || []}
            />
        </div>
      )}
    </div>
  )
}