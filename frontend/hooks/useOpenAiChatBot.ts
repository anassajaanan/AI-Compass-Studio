import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRachel } from "./useRachel";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
}

interface IProps {
  url: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>> | null;
}

export const useOpenAiChatBot = ({ url, setMessages = null }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const {
    speak,
    pause,
    stop,
    audioUrl,
    loading,
    error: rachelErr,
    isSpeaking,
  } = useRachel();

  const mutation = useMutation({
    mutationFn: async (newMessages: string) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: newMessages,
        }),
      });

      if (!response.ok) {
        const errorResponse: { error: string } = await response.json();
        throw new Error(errorResponse.error || "An unknown error occurred");
      }

      const responseData = await response.json();

      return responseData;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error: any) => {
      setErr(error.message);
    },
    onSuccess: (data) => {
      if (data.content) speak(data.content);
      if (setMessages) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), content: data.content, role: "ai" },
        ]);
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return {
    err,
    setErr,
    isLoading,
    mutate: mutation.mutate,
    responseData: mutation.data,
  };
};
