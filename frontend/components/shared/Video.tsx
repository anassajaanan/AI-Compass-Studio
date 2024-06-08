"use client";

import { useState } from "react";
import { useOpenAiChatBot } from "@/hooks/useOpenAiChatBot";
import { urls } from "@/constants";

interface IProps {
  video: {
    title: string;
    src: string;
    vidName?: string;
    path?: string;
  };
}

const Video = ({ video }: IProps) => {
  if (!video) return null;
  const [summary, setSummary] = useState<string | null>(null);
  const { mutate } = useOpenAiChatBot({ url: urls.summary, setMessages: null });

  const handleMouseEnter = async () => {
    if (!video.vidName) return;
    mutate(video.vidName, {
      onSuccess: (data: { summary: string }) => {
        setSummary(data.summary);
      },
    });
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setSummary(null)}
    >
      {summary && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
          <p>{summary}</p>
        </div>
      )}
      <video className="w-full h-full" controls>
        <source src={video.src} type="video/mp4" />
        {video.path && (
          <track
            src={video.path}
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
        )}
        Your browser does not support the video tag.
      </video>
      {video.vidName && (
        <p className="text-white text-[16px] ml-2 mt-2">{video.vidName}</p>
      )}
    </div>
  );
};

export default Video;
