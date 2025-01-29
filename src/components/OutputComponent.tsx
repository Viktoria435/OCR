import ReactMarkdown from "react-markdown";
import { useFileUpload } from "../context/fileContext";

const OutputComponent = () => {
   const { uploadedData } = useFileUpload();

   return (
      <div className="bg-white text-black text-start px-4 text-lg flex-grow overflow-auto">
         <div className="py-2 h-full">
            {uploadedData ? (
               <ReactMarkdown>{uploadedData}</ReactMarkdown>
            ) : (
               <div className="flex items-center justify-center h-full">
                  <p className="text-black opacity-50">No output data</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default OutputComponent;
