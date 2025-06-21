"use client"
import { ReceivedChatMessage, useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useMemo } from "react";
import {ChatMessage} from "./chat/ChatMessage";
import { ConnectionState } from "livekit-client";
// import { ChatMessage } from "./chat-message";

interface ChatListProps {
    hostIdentity: string;
}


export const ChatList = ({hostIdentity}:ChatListProps) => {
    const {chatMessages:messages} = useChat();
    // const connectionState = useConnectionState();
    // const participant = useRemoteParticipant(hostIdentity);

    // const isOnline = participant && connectionState === ConnectionState.Connected
    // const isHidden = !isOnline

      const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp )
    },[messages])

    console.log(messages, "msg")

    if(!messages || messages.length === 0){
        return (
            <div className="flex flex-1 border rounded-lg mb-8 items-center justify-center ">
                <p className="text-sm text-muted-foreground">
                Welcome to Chat
                </p>
            </div>
        )
    }
    return (
        <div className="flex flex-col rounded-lg p-3 h-full border text-white mb-8">
        <h2 className="text-lg text-muted-foreground font-semibold capitalize">Chat</h2>
        <div className="flex-1 flex-col-reverse overflow-y-auto">
        {reversedMessages.map((message) => (
            <ChatMessage
            key={message.timestamp}
            data={message}
            />
        ))}
        </div>
        </div>
    )
}