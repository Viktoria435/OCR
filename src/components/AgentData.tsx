import { useFileUpload } from "../context/fileContext";

const AgentData = () => {
   const { chatData } = useFileUpload();

   return (
      <div className="bg-white flex-grow text-black text-start rounded-md px-4 py-2 overflow-auto">
         {chatData && chatData.length > 0 ? (
            <div>
               {chatData.map((message) => (
                  <div
                     key={message.id}
                     className={`${
                        message.author === "user"
                           ? "font-bold"
                           : ""
                     }`}
                  >
                     {message.text}
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex items-center justify-center h-full">
               <p className="opacity-50 text-lg">No agent data</p>
            </div>
         )}
      </div>
   );
};

export default AgentData;
