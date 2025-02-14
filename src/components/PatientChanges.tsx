import ReactMarkdown from "react-markdown";
import { useFileUpload } from "../context/fileContext";

const PatientChanges = () => {
   const { fileChanges } = useFileUpload();

   return (
      <div className="bg-white relative text-black rounded-md text-start px-4 text-lg flex-grow overflow-auto h-full">
         <div className="py-2">
            {fileChanges ? (
               <ReactMarkdown>{fileChanges}</ReactMarkdown>
            ) : (
               <div className="flex justify-center">
                  <p className="absolute top-1/2 -translate-y-1/2 text-black opacity-50">No changes data</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default PatientChanges;
