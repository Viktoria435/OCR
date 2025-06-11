import { useState } from "react";
import FileDropZone from "./FileDropZone";
import { useFileUpload } from "../context/fileContext";
import FileProgress from "./FileProgress";
import GenerateRadioButton from "./Buttons/GenerateRadioButton";

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
            <div>
               <GenerateRadioButton />
               <FileDropZone
                  currentFiles={selectedFiles}
                  setFiles={(files) => {
                     setSelectedFiles(files);
                     setIsProcessing(true);
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default NewPatientUploader;
