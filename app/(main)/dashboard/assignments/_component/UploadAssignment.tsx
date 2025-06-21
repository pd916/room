"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UploadDropzone } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { updateAssignment } from '@/action/update-class'
import { toast } from 'sonner'

const UploadAssignment = () => {
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState({
        title: "",
        imageUrl:""
    })
    // const [imageUrl, setImageUrl] = useState('')

    const router = useRouter();

     const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateAssignment(value)
            .then(() => {
                toast.success("Assignment uploaded Successfully");
                setIsOpen(false)
            })
            .catch(() => toast.error("Something went wrong"))
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value: inputValue } = e.target;
            setValue(prev => ({
            ...prev,
            [name]: inputValue
            }));
    }
  return (
    <div className='w-full'>
      <Button onClick={() => setIsOpen(true)}>Upload Assignment</Button>
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-white text-black p-3 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Upload You Assignment
                    </DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                    <Label>
                        Name
                    </Label>
                    <Input 
                    name='title'
                    placeholder='Class title'
                    onChange={onChange}
                    value={value.title}
                    // disabled={isPending}
                    />
                </div>
                <div className='space-y-2'>
                    <Label>Thumbnail</Label>
                    {value.imageUrl ? (
                        <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                            <div className='absolute top-2 right-2 z-[10px]'>
                              
                                    <Button 
                                    type='button'
                                    // disabled={isPending}
                                    // onClick={onRemove}
                                    className='h-auto w-auto p-1.5'
                                    >
                                        <Trash className='h-4 w-4 '/>
                                    </Button>
                            </div>
                            <Image
                            alt='Thumbnail'
                            src={value.imageUrl}
                            fill 
                            className='object-cover'
                            />
                        </div>
                    ) : (

                <div className='rounded-xl border outline-dashed outline-muted'>
                    <UploadDropzone
                    endpoint="thumbnailUploader"
                    appearance={{
                        label: {
                            color: "#FFFFF"
                        },
                        allowedContent: {
                            color: "#FFFFF"
                        }
                    }}
                    onClientUploadComplete={(res:any) => {
                        if (res?.[0]?.url) {
                        setValue(prev => ({
                            ...prev,
                            imageUrl: res[0].url
                        }));
                        router.refresh();
                        }
                    }}
                    />
                </div>
                 )}
                <Button 
                type='submit'
                disabled={isPending}
                >Upload</Button>
                </div>
                </form>
            </DialogContent>
     </Dialog>
    </div>
  )
}

export default UploadAssignment
