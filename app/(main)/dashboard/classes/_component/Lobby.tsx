"use client"
import React, { useTransition } from 'react'
import { Class } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useProfileStore } from '@/hooks/use-modal-store'
import { updateClass } from '@/action/update-class'
import { toast } from 'sonner'
import { useSocket } from '@/components/providers/socket-provider'


interface LobbyProps {
    classes: Class
}

const Lobby = ({classes}:LobbyProps) => {
    const [isPending, startTransition] = useTransition()
    const isModalOpen = !classes.isLive;
    const {profile} = useProfileStore((state) => state)
    const isTeacher = profile?.newUser?.role === "teacher";
    const {socket} = useSocket();

    const handleStartClass = () => {
  startTransition(() => {
    updateClass(classes.id, isTeacher) // make sure it's boolean
      .then(() => {
        toast.success("Class started")
      }
    )
    .catch(() => toast.error("Something went wrong"));
  });
};
// socket.emit("class:start", classes.id);

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="text-center space-y-4 max-w-md mx-auto">
            <DialogTitle>
        {/* Animated Image or Emoji */}
        <div className="flex justify-center">
          {/* <Image
            src="/quiz-loading.gif" // Add your animated image to public folder
            alt="Waiting Animation"
            width={120}
            height={120}
            /> */}
        </div>

        {/* Welcome Title */}
        <h2 className="text-2xl font-bold">Get Ready for {classes.title}!</h2>
            </DialogTitle>

        {/* Countdown (placeholder static for now) */}
        <p className="text-sm text-muted-foreground">
          Starting in: <span className="font-semibold">00:30</span>
        </p>

        {/* Host Info */}
        {/* {classes.hostName && (
          <p className="text-sm text-muted-foreground">
            Hosted by <span className="font-medium">{classes.hostName}</span>
          </p>
        )} */}

        {/* Quiz Instructions */}
        <div className="bg-muted p-4 rounded-xl text-left text-sm space-y-1">
          <p>🧠 10 questions</p>
          <p>⏱ 30 seconds per question</p>
          <p>⚡ Faster answers = more points</p>
        </div>

        {/* Optional: Ready button (non-functional placeholder) */}
        {isTeacher ? (
            <Button 
            disabled={isPending} 
            onClick={handleStartClass}>Start Class</Button>
        ): (
            <Button disabled >Waiting for host to start...</Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Lobby
