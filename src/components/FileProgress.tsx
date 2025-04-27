import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../context/fileContext";
import GenerateConsult from "./Buttons/GenerateConsult";
import UploaderFileModal from "./Modals/UploaderFileModal";
import Modal from "./Modals/Modal";

const FileProgress = () => {
   const { isFilesUpload, selectedFiles, setSelectedFiles } = useFileUpload();

   const [progressList, setProgressList] = useState<number[]>([]);
   const [uploadStarted, setUploadStarted] = useState(false);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [canGenerateConsult, setCanGenerateConsult] = useState<boolean>(true);

   // Ref to store active timeout IDs for clearing (browser returns number)
   const timeoutsRef = useRef<number[]>([]);

   useEffect(() => {
      // Enable generate button when all done or no files
      if (
         (selectedFiles.length > 0 &&
            progressList.length === selectedFiles.length &&
            progressList.every((p) => p === 100)) ||
         selectedFiles.length === 0
      ) {
         setCanGenerateConsult(true);
         setUploadStarted(false);
      } else {
         setCanGenerateConsult(false);
      }
   }, [progressList, selectedFiles]);

   useEffect(() => {
      // Start upload when files selected
      if (selectedFiles.length > 0 && !uploadStarted) {
         startUpload();
         setUploadStarted(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedFiles]);

   useEffect(() => {
      if (isFilesUpload) {
         // Clear all pending timeouts
         timeoutsRef.current.forEach((id) => clearTimeout(id));
         timeoutsRef.current = [];

         // Immediately set all progress to 100%
         setProgressList(selectedFiles.map(() => 100));
      }
   }, [isFilesUpload, selectedFiles]);

   const startUpload = () => {
      // Clear any existing timeouts
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];

      // Init progress
      setProgressList(selectedFiles.map(() => 0));

      selectedFiles.forEach((_, index) => {
         let current = 0;

         const tick = () => {
            // Random tick interval: 800ms to 2000ms
            const delay = 800 + Math.random() * 1200;
            const timeoutId = window.setTimeout(() => {
               setProgressList((prev) => {
                  const updated = [...prev];

                  if (isFilesUpload) {
                     // If upload confirmed, jump to 100%
                     updated[index] = 100;
                     return updated;
                  }

                  // Pause at 90-95%
                  if (updated[index] >= 90 && updated[index] < 95) {
                     // still schedule next tick to check flag
                     tick();
                     return updated;
                  }

                  // Lively random step: 1% to 6% per tick
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
    
         <div className="bg-white flex rounded-md flex-col items-center justify-between h-[90%] w-full py-3 gap-y-3">
            <div className="flex flex-col w-full gap-y-5 items-end">
               {/* <button
                  onClick={() => setIsOpen(true)}
                  className="w-full border-2 rounded-md text-center border-gray-300 overflow-hidden text-black px-2 text-lg cursor-pointer"
                  disabled={!isFilesUpload}
               >
                  Add New Patient
               </button> */}
               <button
                  className={`${
                     isFilesUpload
                        ? "bg-[#595959] cursor-pointer"
                        : "bg-[#a2a2a2] cursor-not-allowed"
                  } flex justify-between items-center w-full text-white font-semibold py-4 px-3 text-lg rounded-md  `}
                  onClick={() => setIsOpen(true)}
                  disabled={!isFilesUpload}
               >
                  <div className="bg-white rounded-md py-1 px-5">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 text-gray-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                     </svg>
                  </div>
                  Add New Patient
               </button>
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <div className="text-center">
                     <UploaderFileModal
                        onClose={() => setIsOpen(false)}
                        setFiles={(files) => setSelectedFiles(files)}
                     />
                  </div>
               </Modal>
               <div className="w-full text-start min-h-28 max-h-28 space-y-3 px-1 flex-1 overflow-auto">
                  {selectedFiles.map((file, index) => (
                     <div key={index} className="w-full space-y-1">
                        <div className="flex justify-between items-center">
                           <span className="truncate max-w-[70%]">
                              {file.name}
                           </span>
                           <div className="flex justify-end items-center">
                              <span className="text-xs">
                                 {progressList[index] ?? 0}%
                              </span>
                           </div>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded">
                           <div
                              className="h-full bg-blue-500 rounded transition-all duration-700"
                              style={{
                                 width: `${progressList[index] || 0}%`,
                              }}
                           ></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         <GenerateConsult isActive={canGenerateConsult} />
         </div>
    
   );
};

export default FileProgress;
