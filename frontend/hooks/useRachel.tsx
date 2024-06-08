import { useState, useCallback } from "react";
import { urls } from "@/constants";

const errMsgs = "An unknown error occurred.";

export function useRachel() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [audio, setAudio] = useState<InstanceType<typeof Audio> | null>(null);

  const speak = useCallback(
    async (text: string) => {
      setLoading(true);
      setError(null);
      setIsSpeaking(false);
      const method = "POST";
      const headers = {
        "xi-api-key": "sk_616d1feb68c5659a0cd6f91a14a137c0399491ab4b98ae01",
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.76,
        },
        text: text,
      });
      const options = { method, headers, body };

      try {
        const response = await fetch(urls.rachel, options);
        if (!response.ok) {
          throw new Error("Something went wrong with elevenlabs.io");
        }
        const audioBlob = await response.blob();
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
        if (audio) {
          audio.pause();
          audio.src = newAudioUrl;
          audio.load();
          audio.play();
          setIsSpeaking(true);
          audio.onended = () => setIsSpeaking(false);
        } else {
          const newAudio = new Audio(newAudioUrl);
          setAudio(newAudio);
          newAudio.play();
          setIsSpeaking(true);
          newAudio.onended = () => setIsSpeaking(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message || errMsgs);
        else setError("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    },
    [audio, errMsgs]
  );

  const pause = useCallback(() => {
    if (audio) {
      audio.pause();
      setIsSpeaking(false);
    }
  }, [audio]);

  const stop = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
    }
  }, [audio]);

  return { speak, pause, stop, audioUrl, loading, error, isSpeaking };
}
