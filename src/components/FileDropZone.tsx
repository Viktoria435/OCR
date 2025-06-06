import React, { useState, useRef } from "react";
import { useFileUpload } from "../context/fileContext";

interface FileDropZoneProps {
   setFiles?: (files: File[]) => void;
   currentFiles?: File[];
   reportId?: string | null;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ setFiles, reportId, currentFiles }) => {
   const { uploadFiles } = useFileUpload();
   const inputRef = useRef<HTMLInputElement>(null);
   const [, setDragCounter] = useState(0);
   const [isDragging, setIsDragging] = useState(false);

   const handleFileSelect = (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const filesArray = Array.from(files);
      setFiles?.(currentFiles ? [...currentFiles, ...filesArray] : filesArray);
      uploadFiles(filesArray, reportId || undefined);
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
   };

   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter(0);
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
   };

   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
   };

   const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragCounter((prev) => prev + 1);
      setIsDragging(true);
   };

   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragCounter((prev) => {
         const next = prev - 1;
         if (next <= 0) setIsDragging(false);
         return next;
      });
   };

   return (
      <div
         className={`border-2 border-dashed rounded-md text-center transition 
            ${isDragging ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-600"} 
            ${reportId ? "p-6" : "p-20"}`}
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         onDragEnter={handleDragEnter}
         onDragLeave={handleDragLeave}
      >
         <label htmlFor="fileInput" className="cursor-pointer select-none block">
            {isDragging ? "Release to upload files" : "Drag and drop files here"}
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
