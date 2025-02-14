import { useState } from "react";
import { useFileUpload } from "../context/fileContext";

const AgentUploader = () => {
   const { selectedFileId, sendChatMessage } = useFileUpload();
   const [textInput, setTextInput] = useState<string>("");

   const handleSubmit = async () => {
      if (textInput && selectedFileId) {
         try {
            sendChatMessage(selectedFileId, textInput);
            setTextInput("");
         } catch (error) {
            console.error("Failed to send message:", error);
         }
      }
   };

   return (
      <div className="flex flex-col">
         <div className="bg-white flex rounded-md flex-col items-center p-4 gap-y-5">
            <input
               value={textInput}
               onChange={(e) => setTextInput(e.target.value)}
               className="border w-full border-gray-200 overflow-hidden focus:outline-none text-black text-start p-1"
            />
            <button
               onClick={handleSubmit}
               disabled={!textInput}
               className="bg-blue-500 w-full p-2 text-lg text-white font-semibold hover:bg-blue-600 transition duration-500  disabled:bg-blue-500 disabled:cursor-not-allowed"
            >
               Send
            </button>
         </div>
      </div>
   );
};

export default AgentUploader;
