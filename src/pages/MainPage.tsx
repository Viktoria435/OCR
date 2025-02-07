import { useEffect } from "react";
import AgentData from "../components/AgentData";
import FileHistory from "../components/FileHistory";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import OutputComponent from "../components/OutputComponent";
import { useFileUpload } from "../context/fileContext";

const MainPage = () => {
   const { isLoading, fetchMessages } = useFileUpload();

   useEffect(() => {
      fetchMessages(100, 0); 
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="grid grid-cols-[1fr_2fr_1fr] w-full h-screen overflow-hidden divide-x-2 divide-gray-500">
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 ">
               <Loading />
            </div>
         )}
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            <p className="text-[#434343] font-bold text-xl underline">
               Query & Upload
            </p>
            <FileUploader />
            <p className="text-[#434343] font-bold text-xl underline">
               History
            </p>
            <FileHistory />
         </div>
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            <p className="text-[#434343] font-bold text-xl underline">Output</p>
            <OutputComponent />
         </div>
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            <p className="text-[#434343] font-bold text-xl underline">Agent</p>
            <AgentData />
         </div>
      </div>
   );
};

export default MainPage;
