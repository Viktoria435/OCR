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
      <div className="flex flex-col border-2 border-gray-300 rounded-md">
         <div className="bg-white w-full flex rounded-md justify-between items-center p-2 gap-y-5">
            <input
               value={textInput}
               onChange={(e) => setTextInput(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     handleSubmit();
                  }
               }}
               placeholder="Ask A Question"
               className="w-full outline-0 overflow-hidden text-black text-start p-1 placeholder:text-center"
            />
            <button
               onClick={handleSubmit}
               disabled={!textInput || !selectedFileId}
               className=" text-[#595959] disabled:cursor-not-allowed "
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
               </svg>
            </button>
            {/* <div className="flex gap-x-2 w-full">
               <button
                  onClick={handleSubmit}
                  
                  disabled={!textInput || !selectedFileId}
                  className="bg-blue-500 w-full p-2 text-lg text-white font-semibold hover:bg-blue-600 transition duration-500 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed "
               >
                  Send
               </button>
            </div> */}
         </div>
      </div>
   );
};

export default AgentUploader;
