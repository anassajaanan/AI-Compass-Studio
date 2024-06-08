import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function useVoiceRecognition() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const startRecognition = () => {
    SpeechRecognition.startListening({
      continuous: true,
      // language: "ar-SA",
      language: "en-US",
    });
    resetTranscript();
  };

  const stopRecognition = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    resetTranscript,
    startRecognition,
    stopRecognition,
  };
}
