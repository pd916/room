"use client"
import { QuizQuestion } from '@prisma/client'
import { Pencil, ShieldQuestion, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CreateAnswers from './CreateAnswers'
import { db } from '@/lib/db'
import { deleteQuestion } from '../action/delete-question'

interface QuestionListProps {
  items:QuizQuestion
  classId: string
  quizId: string
}

const formSchema = z.object({
    options: z.array(z.string().min(1)).length(4),
    correct: z.string().min(1).optional()
});

const QuestionList = ({items, classId, quizId}:QuestionListProps) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const router = useRouter()
  console.log(items?.[0]?.options, "opt")

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          options:["", "", "", ""],
          correct:""
      }
  });

  useEffect(() => {
    if(selectedQuestion){
        form.setValue("options", selectedQuestion.options || ["", "", "", ""]);
        form.setValue("correct", selectedQuestion.correct || "");
    }
  },[selectedQuestion, form])
  
  const { isSubmitting, isValid } = form.formState;
  
  const onSubmit  = async (values: z.infer<typeof formSchema>) => {
      console.log(values, "work")
      try {
          await axios.patch(`/api/class/${classId}/quiz/${quizId}`, values);
          toast.success("Question Updated")
          router.refresh()
          setOpenOptions(false);
      } catch (error) {
          toast.error('Somethng went wrong')
      }
  }

  const handleDelete = async (questionId: string,) => {
    const result = await deleteQuestion({ quizId, questionId });

    if(result){
      toast.success("Question Deleted")
      router.refresh()
    }else {
      toast.error("something went wrong");
    }
  }

  console.log(items, openOptions, "work")
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      {items?.map((question:any) => (
        <div className='flex items-center gap-2 w-full' key={question.id}>
        <ShieldQuestion className='h-6 w-6 text-black'/>
        <div className='bg-green-200 p-2 rounded-lg flex items-center justify-between flex-1'>
          <h2>{question?.question}</h2>

          <div className='flex items-center gap-4'>
            <Pencil className='h-4 w-4' onClick={() => {
              setSelectedQuestion(question)
              setOpenOptions(!openOptions)}
              }/>
            <Trash className='h-4 w-4' onClick={() => handleDelete(question?.id)}/>
          </div>
        </div>
        </div>
      ))}

      {openOptions && (
        <Dialog open={openOptions} onOpenChange={setOpenOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your Answers</DialogTitle>
         <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2 mt-2'
                    >
                      {openOptions && (
                         <p className='text-sm mt-2'>
                         {selectedQuestion?.question}
                     </p>
                      )}
                   {[0, 1, 2, 3].map((index) => (
                <CreateAnswers
                  key={index}
                  control={form.control}
                  name={`options.${index}`}
                  label={`Option ${index + 1}`}
                  placeholder="Enter your option"
                  type="text"
                />
              ))}
                      <Separator className="my-5" />
                      <FormLabel>Correct Answers</FormLabel>
                       <FormField control={form.control} name='correct' render={({field}) => (
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
      )}
    </div>
  )
}

export default QuestionList
