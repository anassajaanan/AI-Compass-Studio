"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOpenAiChatBot } from "@/hooks/useOpenAiChatBot";
import { urls } from "@/constants";
import Error from "./Error";

const AISearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const { responseData, mutate, err, setErr } = useOpenAiChatBot({
    url: urls.search,
    setMessages: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (responseData) router.push(`/videos/${responseData.videos}`);
  }, [responseData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (err) setErr(null);
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) mutate(query);
    setQuery("");
  };

  return (
    <section className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      <form
        className="flex justify-center items-center gap-2 p-4 rounded-md w-[50%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          className="border-green-400 w-[700px]"
          type="text"
          placeholder="Search with MyCo AI..."
          value={query}
          onChange={(e) => handleChange(e)}
          autoCorrect="true"
        />
        <Button
          type="submit"
          className="bg-green-800 text-white hover:bg-white hover:border-green-800 hover:text-green-800"
        >
          Search
        </Button>
        <Error err={err} />
      </form>
    </section>
  );
};

export default AISearch;
