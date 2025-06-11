"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import qs from "query-string"
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useProfileStore } from '@/hooks/use-modal-store';
import { ArrowLeft } from 'lucide-react';

interface ChatInputProps {
    apiUrl:string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel"
}

const formSchema = z.object({
    message: z.string().min(1)
})

const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}:ChatInputProps) => {
  
    const {profile} = useProfileStore()
    const profileId = profile?.newUser?._id
    console.log(profileId, profile, "idss")
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            message: ""
        }
    });


    const isLoadng = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            const payload = {
            ...values,
            profileId, // or userId or whatever your backend expects
        }

            await axios.post(url, payload)
            form.reset()
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='rounded-sm bg-[#336727] text-white'>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name='message'
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <div className='relative p-4 pb-6'>
                            <Input
                            disabled={isLoadng}
                            className='px-14 py-6 bg-white text-zinc-900 dark:bg-zinc-700/75 border focus-visible:ring-0 focus-visible:ring-offset-0
                            dark:text-zinc-200'
                            placeholder={`Message ${type === "conversation" ? name : "#" + name }`}
                            {...field}
                            />
                            <div className='absolute top-7 right-8 text-slate-400'>
                            </div>
                            <div className='absolute top-9 left-8 cursor-pointer text-green-900'>
                                <button type='submit'>
                                <ArrowLeft className='h-4 w-4 hover:text-green-500 transition'/>
                                </button>
                            </div>
                        </div>
                    </FormControl>
                </FormItem>
            )}
            />
        </form>
    </Form>
            </div>
  )
}

export default ChatInput
