import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";

interface UseQuizSocketProps {
  quizId: string;
  onQuestionChange: (index: number) => void;
}

export const useQuizSocket = ({ quizId, onQuestionChange }: UseQuizSocketProps) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const questionUpdateEvent = `quiz:${quizId}:question-update`;

    // Listen for question index updates
    socket.on(questionUpdateEvent, (newIndex: number) => {
      onQuestionChange(newIndex);
    });

    return () => {
      socket.off(questionUpdateEvent);
    };
  }, [socket, quizId, onQuestionChange]);
};
