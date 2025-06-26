import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../context/fileContext";
import MicroButton from "./Buttons/MicroButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AgentData = () => {
   const { chatData, isMessageLoading, scenario } = useFileUpload();
   const messagesEndRef = useRef<HTMLDivElement | null>(null);
   const [activeTab, setActiveTab] = useState<"summary" | "agent">("summary");
   const initialLengthRef = useRef(0);
   const [isMicroButtonActive, setIsMicroButtonActive] = useState(false);

   useEffect(() => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [chatData, isMessageLoading]);

   useEffect(() => {
      if (activeTab === "agent") {
         setIsMicroButtonActive(true);
      } else {
         setIsMicroButtonActive(false);
      }
   }, [activeTab]);

   useEffect(() => {
      if (initialLengthRef.current === 0) {
         initialLengthRef.current = chatData.length;
      }

      if (chatData.length === initialLengthRef.current + 1) {
         setActiveTab("agent");

         initialLengthRef.current = chatData.length;
      }
   }, [chatData.length]);

   return (
      <div className="bg-white flex flex-col min-h-0 space-y-6 items-start text-black text-start rounded-md px-4 py-2 ">
         <div
            className={`font-semibold text-start text-[22px] ${
               scenario ? "" : "hidden"
            }`}
         >
            Assistant
         </div>
         <div className="w-full">
            <div className="flex w-full relative">
               <button
                  onClick={() => setActiveTab("summary")}
                  className={`w-full  font-medium transition-colors duration-300 ${
                     activeTab === "summary"
                        ? "text-black"
                        : "text-gray-400 hover:text-black"
                  }`}
               >
                  Summary
               </button>

               <div className="relative w-full">
                  <button
                     onClick={() => setActiveTab("agent")}
                     className={`w-full  font-medium transition-colors duration-300  ${
                        activeTab === "agent"
                           ? "text-black"
                           : "text-gray-400 hover:text-black"
                     }`}
                  >
                     Agent
                  </button>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0">
                     <MicroButton isActive={isMicroButtonActive} />
                  </div>
               </div>
            </div>
            <div className="w-full h-1 mt-3 bg-gray-300 relative">
               <div
                  className={`absolute h-1 bg-blue-800 w-1/2 transition-all duration-300 ${
                     activeTab === "summary" ? "left-0" : "left-1/2"
                  }`}
               ></div>
            </div>
         </div>
         <div className="flex flex-col grow min-h-0 w-full">
            {scenario && activeTab === "summary" && (
               <div className="scenario w-full flex-1 min-h-0 overflow-auto text-sm">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                        table: ({ ...props }) => (
                           <div>
                              <table className="markdown-table overflow-x-auto" {...props} />
                           </div>
                        ),
                     }}
                  >
                     {scenario}
                  </ReactMarkdown>
               </div>
            )}

            {activeTab === "agent" && (
               <div className="w-full text-sm overflow-auto ">
                  {chatData && chatData.length > 0
                     ? chatData.map((message) => (
                          <div
                             key={message.id}
                             className={`whitespace-pre-line ${
                                message.author === "user"
                                   ? "font-bold mt-2"
                                   : ""
                             }`}
                          >
                             {message.text}
                          </div>
                       ))
                     : !isMessageLoading && (
                          <div className="flex items-center justify-center w-full h-full">
                             <p className="opacity-50 text-lg">
                                No questions asked yet
                             </p>
                          </div>
                       )}
                  <div ref={messagesEndRef} />
               </div>
            )}
         </div>

         {!scenario &&
            activeTab === "summary" &&
            (!chatData || chatData.length === 0) && (
               <div className="flex items-center justify-center w-full h-full">
                  <p className="opacity-50 text-lg">No assistant data</p>
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
