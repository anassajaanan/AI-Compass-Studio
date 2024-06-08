import { create } from "zustand";
import { Message } from "@/types";

type ChatStore = {
  messages: Message[];
  brainStorming: string;
  contentGeneration: string;
  editing: string;
  reviews: string;
  stage: string;
  addMessage: (content: string, role: "user" | "ai") => void;
  updateSection: (
    section: keyof Omit<
      ChatStore,
      "messages" | "addMessage" | "updateSection" | "stage" | "setStage"
    >,
    content: string
  ) => void;
  setStage: (stage: string) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  brainStorming: "",
  contentGeneration: "",
  editing: "",
  reviews: "",
  stage: "brainstorming",
  addMessage: (content, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: Date.now().toString(), content, role },
      ],
    })),
  updateSection: (section, content) =>
    set((state) => ({
      [section]: content,
    })),
  setStage: (stage) => set({ stage }),
}));

export default useChatStore;
