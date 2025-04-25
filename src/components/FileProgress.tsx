import { useEffect, useState } from "react";
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

   useEffect(() => {
      if (
         (selectedFiles.length > 0 &&
            progressList.length === selectedFiles.length &&
            progressList.every((p) => p === 100)) ||
         selectedFiles.length === 0
      ) {
         setCanGenerateConsult(true);
      } else {
         setCanGenerateConsult(false);
      }
   }, [progressList, selectedFiles]);

   useEffect(() => {
    if (selectedFiles.length > 0 && !uploadStarted) {
       startUpload();
       setUploadStarted(true);
    }
 }, [selectedFiles]);

   useEffect(() => {
      if (isFilesUpload) {
         selectedFiles.forEach((_, index) => {
            let current = progressList[index] || 0;

            const interval = setInterval(() => {
               current += Math.floor(Math.random() * 3) + 1;

               setProgressList((prev) => {
                  const updated = [...prev];
                  updated[index] = Math.min(current, 100);
                  return updated;
               });

               if (current >= 100) {
                  clearInterval(interval);
               }
            }, 200 + Math.random() * 200);
         });
      }
   }, [isFilesUpload]);

   const startUpload = () => {
      const newProgress = selectedFiles.map(() => 0);
      setProgressList(newProgress);

      selectedFiles.forEach((_, index) => {
         const maxProgress = Math.floor(Math.random() * 30) + 60;
         let current = 0;

         const interval = setInterval(() => {
            const increment = Math.floor(Math.random() * 2) + 1;
            current += increment;

            setProgressList((prev) => {
               const updated = [...prev];
               updated[index] = Math.min(current, maxProgress);
               return updated;
            });

            if (current >= maxProgress) {
               clearInterval(interval);
            }
         }, 400 + Math.random() * 300);
      });
   };

   return (
      <div>
         <div className="bg-white flex rounded-md flex-col items-center justify-between h-[90%] w-full ">
            <div className="flex flex-col w-full gap-y-5 items-end">
               {<button
                  onClick={() => setIsOpen(true)}
                  className="w-full border-2 rounded-md text-center border-gray-300 overflow-hidden text-black px-2 text-lg cursor-pointer"
               >
                  Upload Files
                  {/* <input
                     type="file"
                     className="hidden"
                     onChange={handleFileChange}
                     accept=".pdf,image/jpeg,image/png"
                     multiple
                  /> */}
               </button>}
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <div className="text-center">
                     <UploaderFileModal
                        onClose={() => setIsOpen(false)}
                        setFiles={(files) => setSelectedFiles(files)}
                     />
                  </div>
               </Modal>
               <div className="w-full text-start min-h-32 max-h-32 space-y-3 px-1 flex-1 overflow-auto">
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
                              <button className="ml-2 hover:text-red-500">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M6 18 18 6M6 6l12 12"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded">
                           <div
                              className="h-full bg-blue-500 rounded transition-all duration-200"
                              style={{
                                 width: `${progressList[index] || 0}%`,
                              }}
                           ></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <GenerateConsult isActive={canGenerateConsult} />
      </div>
   );
};

export default FileProgress;
