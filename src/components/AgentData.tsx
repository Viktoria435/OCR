import { useEffect, useRef } from "react";
import { useFileUpload } from "../context/fileContext";

const AgentData = () => {
   const { chatData, isMessageLoading } = useFileUpload();
   const messagesEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [chatData, isMessageLoading]); // Вызывается при каждом изменении `chatData`

   return (
      <div className="bg-white flex flex-col justify-between flex-grow text-black text-start rounded-md px-4 py-2 overflow-auto">
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
            <div className="flex space-x-2 justify-center items-center bg-white mt-6">
               <div className="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="size-2 bg-black rounded-full animate-bounce"></div>
            </div>
         )}
      </div>
   );
};

export default AgentData;
