import { useState, useRef, useEffect } from "react";
import { useFileUpload } from "../../context/fileContext";

const getSupportedMimeType = () => {
   const possibleTypes = ["audio/mp4", "audio/webm", "audio/ogg", "audio/aac"];

   return (
      possibleTypes.find((type) => MediaRecorder.isTypeSupported(type)) || ""
   );
};

const MicroButton = () => {
   const { selectedFileId, sendAudioChatMessage } = useFileUpload();
   const [recording, setRecording] = useState(false);
   const [hasPermission, setHasPermission] = useState(false);
   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
   const audioChunksRef = useRef<Blob[]>([]);
   const streamRef = useRef<MediaStream | null>(null);
   const audioContextRef = useRef<AudioContext | null>(null);
   const analyserRef = useRef<AnalyserNode | null>(null);
   const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   const intervalIdRef = useRef<number | null>(null);
   const isManualStopRef = useRef(false);
   const isRecordingInProgressRef = useRef(false);
   const hasSpeechRef = useRef(false);

   const SILENCE_THRESHOLD = 0.01;
   const SILENCE_DURATION = 1000;
   const VOICE_THRESHOLD = 0.03;

   const requestMicrophonePermission = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         });
         streamRef.current = stream;
         setHasPermission(true);
         return true;
      } catch (error) {
         console.log(error);
         alert(
            "Microphone access denied.\n\nPlease check your browser settings and allow microphone access.\n\n" +
            "For Chrome: Go to Settings > Privacy and security > Site Settings > Microphone."
         );
         setHasPermission(false);
         return false;
      }
   };

   const startSilenceDetection = () => {
      const AudioContextClass =
         window.AudioContext ||
         (window as typeof window & { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
      const audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(streamRef.current!);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);  

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.fftSize);
      intervalIdRef.current = window.setInterval(() => {
         analyser.getByteTimeDomainData(data);
         let sumSquares = 0;
         for (let i = 0; i < data.length; i++) {
            const normalized = (data[i] - 128) / 128;
            sumSquares += normalized * normalized;
         }
         const volume = Math.sqrt(sumSquares / data.length);

         if (volume < SILENCE_THRESHOLD) {
            if (!silenceTimerRef.current) {
               silenceTimerRef.current = window.setTimeout(() => {
                  console.log(
                     "[Silence] Detected silence, stopping recording..."
                  );
                  stopRecording();
               }, SILENCE_DURATION);
            }
         } else {
            if (volume > VOICE_THRESHOLD) {
               hasSpeechRef.current = true;
            }
            if (silenceTimerRef.current) {
               clearTimeout(silenceTimerRef.current);
               silenceTimerRef.current = null;
            }
         }
      }, 200);
   };

   const stopSilenceDetection = () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;

      if (intervalIdRef.current) {
         clearInterval(intervalIdRef.current);
         intervalIdRef.current = null;
      }
      analyserRef.current?.disconnect();
      audioContextRef.current?.close();
   };

   const startRecording = async () => {
      if (isRecordingInProgressRef.current) return;
      isRecordingInProgressRef.current = true;

      if (!hasPermission) {
         const granted = await requestMicrophonePermission();
         if (!granted) return;
      }

      isManualStopRef.current = false;
      hasSpeechRef.current = false;

      const mimeType = getSupportedMimeType();
      if (!mimeType) {
         alert("Your browser doesn't support required audio format.");
         return;
      }

      const mediaRecorder = new MediaRecorder(streamRef.current!, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
         if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
         stopSilenceDetection();
         const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

         if (
            !isManualStopRef.current &&
            hasSpeechRef.current &&
            selectedFileId
         ) {
            try {
               console.log("[Auto] Sending audio...");
               sendAudioChatMessage(selectedFileId, audioBlob);
            } catch (err) {
               console.error("Failed to send audio message:", err);
            }
         } else {
            console.log("[Skip] No speech or manually stopped — not sending.");
         }

         if (!isManualStopRef.current) {
            console.log("[Auto] Restarting recording...");
            startRecording();
         }
      };

      mediaRecorder.start();
      setRecording(true);
      startSilenceDetection();
   };

   const stopRecording = () => {
      isRecordingInProgressRef.current = false;

      if (
         mediaRecorderRef.current &&
         mediaRecorderRef.current.state !== "inactive"
      ) {
         mediaRecorderRef.current.stop();
      }
      setRecording(false);
   };

   useEffect(() => {
      return () => {
         stopSilenceDetection();
         streamRef.current?.getTracks().forEach((track) => track.stop());
      };
   }, []);

   return (
      <div>
         <button
            disabled={!selectedFileId}
            onClick={async () => {
               if (recording) {
                  isManualStopRef.current = true;
                  stopRecording();
               } else {
                  await startRecording();
               }
            }}
            className={`bg-blue-500 h-full p-2 text-lg text-white font-semibold 
                  transition duration-500 rounded-full 
                  ${
                     recording
                        ? "bg-red-500 animate-pulse"
                        : "hover:bg-blue-600"
                  } 
                  disabled:bg-gray-400 disabled:cursor-not-allowed`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6 text-white"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
               />
            </svg>
         </button>
      </div>
   );
};

export default MicroButton;
