'use client'
import { useEffect, useState } from "react"; 
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Quiz } from "@prisma/client";

interface ChapterListProps {
    items: Quiz[]
    onEdit: (id: string) => void
}

export const QuizesList = ({
    items,
    onEdit
}: ChapterListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [quizes, setQuizes] = useState(items);

    useEffect(() => {
        setIsMounted(true)
    },[])

    useEffect(() => {
        setQuizes(items)
    },[items])


    if(!isMounted) {
        return null;
    }

    return (
         <div>
         {quizes.map((quiz) => (
             <div
            key={quiz.id}>
                    <div className="flex p-2 items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
                        
                        {quiz.title}
                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                <Pencil
                                            onClick={() => onEdit(quiz.id)}
                                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />
                                        </div>
                                    </div>
                              
                            </div>
                        ))}
                    </div>
    )
}