"use client"
import React from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/hooks/use-modal-store'
 
const formSchema = z.object({
  title: z.string().min(2).max(50),
  teacherId: z.string()
})

const CreateClass = () => {
    const router = useRouter()
     const {profile} = useProfileStore()
    //  console.log(profile.newUser._id, "profile")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          teacherId: profile?.newUser?._id 
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/class', values)
            console.log(res, "clas")
            toast("class created")
            router.push(`/dashboard/settings/${res.data.id}`)
            form.reset()
            router.refresh()
        } catch (error) {
            console.log(error)
        }
      }
  return (
    <div className='sm:h-3xl sm:w-2xl border p-5 rounded-xl'>
        <h1 className='text-center font-semibold uppercase py-2'>Create Classes</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                What's your class Title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
    </div>
  )
}

export default CreateClass
