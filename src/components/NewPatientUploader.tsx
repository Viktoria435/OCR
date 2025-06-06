import { useState } from "react";
import FileDropZone from "./FileDropZone";
import { useFileUpload } from "../context/fileContext";
import FileProgress from "./FileProgress";

const NewPatientUploader = () => {
   const { setSelectedFiles, selectedFiles } = useFileUpload();
   const [isProcessing, setIsProcessing] = useState(false);
   return (
      <div>
         {isProcessing ? (
            <div className="p-5 bg-white w-96 border-[3px] border-gray-300 rounded">
               <FileProgress />
            </div>
         ) : (
            <FileDropZone
               currentFiles={selectedFiles}
               setFiles={(files) => {
                  setSelectedFiles(files);
                  setIsProcessing(true);
               }}
            />
         )}
      </div>
   );
};

export default NewPatientUploader;
