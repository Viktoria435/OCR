import { useEffect, useRef } from "react";
import { useFileUpload } from "../context/fileContext";
import MicroButton from "./Buttons/MicroButton";

const AgentData = () => {
   const { chatData, isMessageLoading } = useFileUpload();
   const messagesEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [chatData, isMessageLoading]);

   return (
      <div className="bg-white flex flex-col items-start flex-grow text-black text-start rounded-md px-4  overflow-auto border-2 border-gray-300">
         <p className="sticky flex w-full justify-between top-0 bg-white text-gray-500 text-start text-2xl p-2 font-medium">
            Agent
            <MicroButton />
         </p>


         {chatData && chatData.length > 0 ? (
            <div>
               {chatData.map((message) => (
                  <div
                     key={message.id}
                     className={`${
                        message.author === "user" ? "font-bold" : ""
                     }`}
                  >
                     {message.text}
                  </div>
               ))}
               <div ref={messagesEndRef} />
            </div>
         ) : (
            <div className="flex items-center justify-center h-full">
               <p className="opacity-50 text-lg">No agent data</p>
            </div>
         )}

         {isMessageLoading && (
            <div className="flex space-x-2 justify-center items-center bg-white my-3">
               <div className="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="size-2 bg-black rounded-full animate-bounce"></div>
            </div>
         )}
      </div>
   );
};

export default AgentData;
