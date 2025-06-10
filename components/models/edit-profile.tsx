"use client"
import { useModelStore } from '@/hooks/use-modal-data'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import axios from "axios"
import {
    Input
} from "@/components/ui/input";
import React from 'react'
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from '../FileUpload';
import { useProfileStore } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name:z.string().min(1, {
        message: "Profile name is required"
    }),
    profileImage: z.string().min(1,{
        message: "imaegUrl is required"
    }),
    profileId:z.string().optional()
})

const EditProfile = () => {
    const {profile} = useProfileStore((state) => state);
    const router = useRouter()
    const {isOpen, type, onClose} = useModelStore((state) => state)

    const isModalOpen = isOpen && type === "editProfile"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            profileImage:"",
            profileId: profile?.newUser?.id
        }
    })


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values, "vall")
        try {
            await axios.post("/api/profile/update-profile", values)
            form.reset()
            router.refresh()
            onClose();
        } catch (error) {
            console.log(error)
        }

    } 

    const handleClose  =  () => {
        form.reset();
        onClose()
    }
  return (
     <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your Profile
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your Profile a name or image you can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                control={form.control}
                                name="profileImage"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            endpoint = "profileImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>

                            <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                    className="uppercase text-xs font-bold text-zinc-500
                                    dark:text-secondary/70"
                                    >
                                        Server name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 
                                        text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button type="submit" variant="outline" disabled={isLoading}>
                                create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
  )
}

export default EditProfile
