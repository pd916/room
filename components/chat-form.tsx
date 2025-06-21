"use client"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import ChatInfo from "./chat-info"


interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden:boolean;
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
}:ChatFormProps) => {
    
    const isDisabled = isHidden;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;
            onSubmit();
    }

    if(isHidden) {
        return null;
    }


    return (
        <form 
        onSubmit={handleSubmit} 
        className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full">
           <Input 
           onChange={(e) => onChange(e.target.value)}
           value={value}
           disabled={isDisabled}
           placeholder="Send a message"
           className={cn(
            "border-white/10",
        )}
        />
        </div>
        <div className="ml-auto ">
            <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={isDisabled}
            >Chat</Button>
        </div>
        </form>
    );
};