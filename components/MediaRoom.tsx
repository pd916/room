"use client"
import { useProfileStore } from '@/hooks/use-modal-store';
import {LiveKitRoom, VideoConference,  GridLayout,
  ParticipantTile, } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}
const MediaRoom = ({
    chatId,
    video,
    audio
}:MediaRoomProps) => {
    console.log(chatId, video, audio, "audd")
  const {profile} = useProfileStore()
  const user = profile?.newUser
  const role = profile?.role || "student";
    const [token, setToken] = useState("");

    useEffect(() => {
        if(!user?.name) return;

        const name = `${user?.name}`;

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}&role=${role}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (error) {
                console.log(error)
            }
        })()
    },[user?.name, chatId]);

    if(token === ""){
        return (
            <div className="flex flex-col flex-1 items-center justify-center">
                <Loader2
                className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
            </div>
        )
    }

    // const enableVideo = role === "teacher" && video;
//   const enableAudio = true;

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={role === "teacher" && video}
            audio={role === "teacher" && audio}
        >
             <VideoConference />
        </LiveKitRoom>
    )
}

export default MediaRoom
