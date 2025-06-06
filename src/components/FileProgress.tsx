import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../context/fileContext";

const FileProgress = () => {
   const { isFilesUpload, selectedFiles } = useFileUpload();

   const [fileProgress, setFileProgress] = useState<number[]>([]);

   const [, setUploadStarted] = useState(false);


   const timeoutsRef = useRef<number[]>([]);

   const uploadingProgress = fileProgress.filter((p) => p < 100);
   const totalProgress =
      uploadingProgress.length > 0
         ? Math.floor(uploadingProgress.reduce((a, b) => a + b, 0) / uploadingProgress.length)
         : 100;

   useEffect(() => {
      if (
         (selectedFiles.length > 0 &&
            fileProgress.length === selectedFiles.length &&
            fileProgress.every((p) => p === 100)) ||
         selectedFiles.length === 0
      ) {
         setUploadStarted(false);
      }
   }, [fileProgress, selectedFiles]);

   useEffect(() => {
      if (selectedFiles.length > fileProgress.length) {
         const newFilesCount = selectedFiles.length - fileProgress.length;
         setFileProgress((prev) => {
            const updated = [...prev];
            for (let i = 0; i < newFilesCount; i++) {
               updated.push(0);
            }
            return updated;
         });
         

      
         setUploadStarted(true);
         startUpload(fileProgress.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedFiles]);

   useEffect(() => {
      if (isFilesUpload) {
         timeoutsRef.current.forEach(clearTimeout);
         timeoutsRef.current = [];
         setFileProgress(selectedFiles.map(() => 100));
      }
   }, [isFilesUpload, selectedFiles]);

   const startUpload = (startIndex: number) => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      selectedFiles.forEach((_, index) => {
         if (index < startIndex) return;

         let current = 0;

         const tick = () => {
            const delay = 800 + Math.random() * 1200;
            const timeoutId = window.setTimeout(() => {
               setFileProgress((prev) => {
                  const updated = [...prev];

                  if (isFilesUpload) {
                     updated[index] = 100;
                     return updated;
                  }

                  if (updated[index] >= 90 && updated[index] < 95) {
                     tick();
                     return updated;
                  }

                  const step = 1 + Math.random() * 5;
                  current += step;
                  updated[index] = Math.min(Math.round(current), 100);

                  if (updated[index] < 100) {
                     tick();
                  }

                  return updated;
               });
            }, delay);

            timeoutsRef.current.push(timeoutId);
         };

         tick();
      });
   };

   return (
      <div className="bg-transparentflex rounded-md flex-col items-center justify-between h-[90%] w-full py-3 gap-y-3">
         <div className="w-full px-2">
            {selectedFiles.length > 0 && (
               <div className="w-full mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                     <span>File Status</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded">
                     <div
                        className="h-full bg-[#2a476c] rounded transition-all duration-700"
                        style={{ width: `${totalProgress}%` }}
                     />
                  </div>
               </div>
            )}

            <div className="text-start grow space-y-2 overflow-auto">
               {selectedFiles.map((file, index) => (
                  <div key={index} className="flex justify-between items-center border border-gray-300 rounded-md py-2 px-4 bg-white">
                     <span className="truncate max-w-[70%]">{file.name}</span>
                     <span className={`text-xs min-w-5 ${fileProgress[index] === 100 ? 'text-green-500' : fileProgress[index] < 100 && fileProgress[index] > 0  ? 'text-yellow-500' : 'text-red-500'}`}>{fileProgress[index] ?? 0}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default FileProgress;
