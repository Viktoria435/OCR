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
            <div className="p-5 bg-white w-[400px] h-fit border-2 border-neutral-200 shadow-[0_0_35px_10px_rgba(96,165,250,0.2)] rounded-3xl ">
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
