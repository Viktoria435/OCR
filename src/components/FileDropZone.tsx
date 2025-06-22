import React, { useState, useRef } from "react";
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
            ${
               isDragging
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 text-gray-600"
            } `}
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         onDragEnter={handleDragEnter}
         onDragLeave={handleDragLeave}
      >
         <label
            htmlFor="fileInput"
            className= {`cursor-pointer flex flex-col justify-center gap-y-5 items-center select-none ${reportId ? "p-6" : "text-xl px-60 py-40"}`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`${reportId ? "size-10" : "size-13"}`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
               />
            </svg>
            <div>
               {isDragging
                  ? "Release to upload files"
                  : "Drag and drop files here"}
               <br />
               {/* <span>or Browse Files</span> */}
            </div>
         </label>
         <p className={`p-2 ${reportId ? "text-[11px]" : "text-[13px]"}`}>You can upload CT scans, lab reports, pathology PDFs, or imaging screenshots here</p>
         <input
            ref={inputRef}
            id="fileInput"
            type="file"
            accept=".pdf,.docx,.txt,.xml,.jpg,.png,.jpeg,.gif,.xlsx"
            multiple
            onChange={handleFileChange}
            className="hidden"
         />
      </div>
   );
};

export default FileDropZone;
