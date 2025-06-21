"use client"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useState } from "react";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";

interface ChatProps {
    hostIdentity: string;
}

export const Chat = ({hostIdentity}:ChatProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !!isOnline;
    const isDisabled = isHidden;

    const [value, setValue] = useState("");
    const {send} = useChat();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if(!send) return;
         e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);
    }

    return (
        <div className='rounded-sm border text-white overflow-hidden'>
        <form 
        onSubmit={handleSubmit} 
        className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full relative">
           <Input
           onChange={(e) => onChange(e.target.value)}
           value={value}
           disabled={isDisabled}
           placeholder="Send a message"
            className='px-14 py-6 bg-white text-zinc-900 dark:bg-zinc-700/75 border focus-visible:ring-0 focus-visible:ring-offset-0
                 dark:text-zinc-200'
        />
        <div className='absolute top-4 left-5 cursor-pointer text-green-900'>
            <button
            type="submit"
            disabled={isDisabled}
            >
             <ArrowLeft className='h-4 w-4 hover:text-green-500 transition'/>
            </button>
        </div>
        </div>
        </form>
        </div>
    )
}