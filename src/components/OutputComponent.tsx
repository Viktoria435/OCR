import ReactMarkdown from "react-markdown";
import { useFileUpload } from "../context/fileContext";

const OutputComponent = () => {
   const { fileReport } = useFileUpload();

   return (
      <div className="bg-white relative text-black rounded-md text-start px-4 text-lg flex-grow overflow-auto h-full">
         <div className="py-2">
            {fileReport ? (
               <ReactMarkdown>{fileReport}</ReactMarkdown>
            ) : (
               <div className="flex items-center justify-center">
                  <p className="absolute top-1/2 -translate-y-1/2 text-black opacity-50">No output data</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default OutputComponent;
