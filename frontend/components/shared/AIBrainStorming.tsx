"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMicrophone } from "react-icons/fa";
import { useOpenAiChatBot } from "@/hooks/useOpenAiChatBot";
import { urls } from "@/constants";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { Message } from "@/types";
import Chat from "./Chat";

const AIBrainStorming: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatParent = useRef<HTMLUListElement>(null);
  const { mutate, err, setErr } = useOpenAiChatBot({
    url: urls.brainStorm,
    setMessages,
  });
  const {
    transcript,
    listening,
    resetTranscript,
    startRecognition,
    stopRecognition,
  } = useVoiceRecognition();

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) domNode.scrollTop = domNode.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (err) setErr(null);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content: input, role: "user" },
    ]);
    mutate(input);

    setInput("");
    resetTranscript();
  };

  const handleMicRecordSubmission = () => {
    stopRecognition();
    if (!transcript.trim()) return;
    if (err) setErr(null);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content: input, role: "user" },
    ]);

    mutate(transcript);
    setInput("");
    resetTranscript();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Brain Storming</CardTitle>
        <CardDescription>
          Chat with our AI bot on{" "}
          <span className="text-green-700 font-bold">Myco</span> to get
          creative, cutting-edge video ideas tailored to your goals and
          audience!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-2">
        <Chat messages={messages} chatParent={chatParent} />
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mt-auto">
            <Button
              type="button"
              className={`mr-2 ${
                listening ? "bg-transparent animate-pulse text-green-600" : ""
              }`}
              onMouseDown={() => startRecognition()}
              onMouseUp={() => handleMicRecordSubmission()}
            >
              <FaMicrophone size={30} />
            </Button>
            <Input
              id="message"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Brain storm your ideas with MyCo AI..."
              className="flex-1"
              autoCorrect="true"
            />
            <Button
              type="submit"
              className="ml-2 bg-green-800 text-white hover:bg-white hover:border-green-800 hover:text-green-800"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIBrainStorming;
