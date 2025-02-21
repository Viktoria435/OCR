import { useFileUpload } from "../context/fileContext";
import ReactMarkdown from "react-markdown";

const OriginalDataComponent = () => {
   const { originalData } = useFileUpload();
console.log(originalData)
   return (
      <div className="bg-white relative prose text-black text-start px-4 text-lg flex-grow overflow-auto h-full">
         <div className="py-2">
            {originalData ? (
               <ReactMarkdown>{originalData}</ReactMarkdown>
            ) : (
               <div className="flex items-center justify-center">
                  <p className="absolute top-1/2 -translate-y-1/2 text-black opacity-50">
                     No original data
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default OriginalDataComponent;
