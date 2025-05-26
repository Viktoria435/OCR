import React from "react";
import { useFileUpload } from "../context/fileContext";

interface FileDropZoneProps {
   setFiles?: (files: File[]) => void;
   currentFiles?: File[];
   reportId?: string | null;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
   setFiles,
   reportId,
   currentFiles,
}) => {
   const { uploadFiles, setIsLoading } = useFileUpload();
   const inputRef = React.useRef<HTMLInputElement>(null);
   //   const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
   //     event.preventDefault();
   //     event.stopPropagation();
   //   };

   //   const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
   //     event.preventDefault();
   //     event.stopPropagation();

   //     console.log("Drop event fired");

   //     const { files } = event.dataTransfer;
   //     if (files && files.length > 0) {
   //       onFilesSelected(files);
   //       event.dataTransfer.clearData();
   //     }
   //   }, [onFilesSelected]);

   // const handleSubmit = () => {
   //     if (selectedFiles.length > 0) {

   //     }
   //  };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const filesArray = Array.from(event.target.files);

         setFiles?.(
            currentFiles ? [...currentFiles, ...filesArray] : filesArray
         );
         if (reportId) {
            uploadFiles(filesArray, reportId);
         } else {
            uploadFiles(filesArray);
            setIsLoading(true);
         }
      }
      // Сброс значения input
      if (inputRef.current) {
         inputRef.current.value = "";
      }
   };

   return (
      <div className={`border-2 border-dashed border-gray-300 rounded-md text-center text-gray-600 cursor-pointer hover:border-blue-400 transition ${reportId ? "p-6" : "p-20"}`}>
         <label htmlFor="fileInput" className="cursor-pointer">
            Drag and drop files
            <br />
            <span className="text-blue-500 underline">or Browse Files</span>
         </label>
         <input
            ref={inputRef}
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
         />
      </div>
   );
};

export default FileDropZone;
