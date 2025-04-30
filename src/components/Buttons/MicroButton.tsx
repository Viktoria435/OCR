import { useState, useRef } from "react";
import { useFileUpload } from "../../context/fileContext";

const MicroButton = () => {
   const { selectedFileId, sendAudioChatMessage } = useFileUpload();
   const [recording, setRecording] = useState(false);
   const [hasPermission, setHasPermission] = useState(false);
   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
   const audioChunksRef = useRef<Blob[]>([]);
   const streamRef = useRef<MediaStream | null>(null);

   const requestMicrophonePermission = async () => {
      console.log("[getUserMedia] Requesting microphone permission...");
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         });
         console.log("[getUserMedia] Microphone access granted.");
         streamRef.current = stream;
         setHasPermission(true);
         return true;
      } catch (error) {
         console.error("[getUserMedia] Microphone access denied or error:");
         console.log(error);
         setHasPermission(false);
         return false;
      }
   };

   const startRecording = async () => {
      console.log("[startRecording] Attempting to start recording...");
      if (!hasPermission) {
         const permissionGranted = await requestMicrophonePermission();
         if (!permissionGranted) return;
      }

      if (!streamRef.current) {
         console.error("[recording] Stream is null, cannot start recording.");
         return;
      }

      try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
         mimeType: "audio/mp4",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      console.log("[recording] MediaRecorder created and started.");
      mediaRecorder.ondataavailable = (event) => {
         console.log("[MicroButton] ondataavailable event:", event);
         if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
         }
      };

      mediaRecorder.onstop = async () => {
         const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/mp4",
         });

         if (selectedFileId) {
            try {
            await sendAudioChatMessage(selectedFileId, audioBlob);
            console.log("[send] Audio message sent successfully.");
            } catch(error) {
               console.error("[send] Failed to send audio message:", error);
            }
         }
      };

      mediaRecorder.start();
      setRecording(true);
   } catch (err) {
      console.error("[recording] Error while starting MediaRecorder:", err);
   }
   };

   const stopRecording = () => {
      if (mediaRecorderRef.current) {
         console.log("[recording] Stopping recording...");
         mediaRecorderRef.current.stop();
         setRecording(false);
      }
   };

   const toggleRecording = async () => {
      if (recording) {
         stopRecording();
      } else {
         await startRecording();
      }
   };

   return (
      <div>
         <button
            disabled={!selectedFileId}
            onClick={toggleRecording}
            className={`bg-blue-500 h-full p-2 text-lg text-white font-semibold 
               transition duration-500 rounded-full 
               ${recording ? "bg-red-500 animate-pulse" : "hover:bg-blue-600"} 
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
