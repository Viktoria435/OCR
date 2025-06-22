import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../context/fileContext";

const documentStatus = [
   "Uploading records...",
   "Analyzing uploaded records...",
   "Processing records...",
   "Generating report...",
];

const FileProgress = () => {
   const { isFilesUpload, selectedFiles, selectedFileId } = useFileUpload();

   const [fileProgress, setFileProgress] = useState<number[]>([]);

   const timeoutsRef = useRef<number[]>([]);

   const uploadingProgress = fileProgress.filter((p) => p < 100);
   const totalProgress =
      uploadingProgress.length > 0
         ? Math.floor(
              uploadingProgress.reduce((a, b) => a + b, 0) /
                 uploadingProgress.length
           )
         : 100;

   const getStatusByProgress = (progress: number) => {
      if (progress === 0) return documentStatus[0];
      if (progress <= 25) return documentStatus[1];
      if (progress <= 50) return documentStatus[2];
      if (progress <= 75) return documentStatus[3];
      if (progress <= 99) return documentStatus[3];
      return "Records uploaded";
   };

   const getFileExtension = (fileName: string) => {
      return fileName.split(".").pop()?.toLowerCase() || "";
   };

   const getFileIconBackground = (ext: string) => {
      switch (ext) {
         case "pdf":
            return "bg-[#f5642b]";
         case "jpg":
         case "jpeg":
         case "png":
         case "gif":
            return "bg-[#328bff]";
         case "csv":
         case "xls":
         case "xlsx":
            return "bg-green-500";
         case "doc":
         case "docx":
         case "txt":
            return "bg-[#328bff]";
         default:
            return "bg-gray-500";
      }
   };

   const getFileIconSVG = (ext: string) => {
      switch (ext) {
         case "pdf":
         case "doc":
         case "docx":
         case "txt":
            return (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
               </svg>
            );
         case "jpg":
         case "jpeg":
         case "png":
         case "gif":
            return (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 p-[2px] border border-white rounded-sm"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
               </svg>
            );
         case "csv":
         case "xls":
         case "xlsx":
            return (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 "
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                  />
               </svg>
            );

         default:
            return (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
               </svg>
            );
      }
   };

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
      <div className="bg-white flex rounded-md flex-col items-center justify-between h-full w-full py-3 gap-y-3">
         <div className="w-full px">
            {selectedFiles.length > 0 && (
               <div className="w-full mb-4 ">
                  <div className="flex justify-between items-center mb-1 text-sm">
                     <span className="font-semibold ">File Status</span>
                     <div className="flex items-center gap-x-2">
                        <span className="text-xs text-gray-500 tracking-tighter">
                           {getStatusByProgress(totalProgress)}
                        </span>
                        <span className="text-gray-500">{totalProgress}%</span>
                     </div>
                  </div>
                  {/* <div className="w-full h-3 bg-gray-200 rounded">
                     <div
                        className="h-full bg-[#2a476c] rounded transition-all duration-700"
                        style={{ width: `${totalProgress}%` }}
                     />
                  </div> */}
               </div>
            )}

            <div className={`text-start grow space-y-2 overflow-y-auto  ${selectedFileId  ? " max-h-[20vh]":"max-h-[3 0vh]"}`}>
               {selectedFiles.map((file, index) => {
                  const ext = getFileExtension(file.name);
                  const iconBackground = getFileIconBackground(ext);
                  const iconSVG = getFileIconSVG(ext);

                  return (
                     <div
                        key={index}
                        className={`flex justify-between items-center rounded-md py-2 px-2 gap-x-2 bg-transparent  ${selectedFileId ? "border border-gray-200":"border border-neutral-200 shadow-md"}`}
                     >
                        <div className="flex items-center max-w-[60%] gap-x-2 w-full">
                           <div
                              className={`flex items-center justify-center p-1 rounded-sm text-white ${
                                 fileProgress[index] === 100
                                    ? "bg-[#26dd9a]"
                                    : iconBackground
                              }`}
                           >
                              {fileProgress[index] === 100 ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="currentColor"
                                    className="size-4"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m4.5 12.75 6 6 9-13.5"
                                    />
                                 </svg>
                              ) : (
                                 iconSVG
                              )}

                            
                           </div>
                           <span className="truncate">{file.name}</span>
                        </div>
                        <div className="w-full h-1 mx-2 bg-gray-200 rounded">
                           <div
                              className={`h-full rounded transition-all duration-700 ${
                                 fileProgress[index] === 100
                                    ? "bg-[#26dd9a]"
                                    : fileProgress[index] < 100 &&
                                      fileProgress[index] > 0
                                    ? "bg-[#fbb41a]"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${fileProgress[index]}%` }}
                           />
                        </div>
                        <span
                           className={`text-xs min-w-5 ${
                              fileProgress[index] === 100
                                 ? "text-[#26dd9a]"
                                 : fileProgress[index] < 100 &&
                                   fileProgress[index] > 0
                                 ? "text-[#fbb41a]"
                                 : "text-red-500"
                           }`}
                        >
                           {fileProgress[index] === 100 ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={3}
                                 stroke="currentColor"
                                 className="size-4"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                 />
                              </svg>
                           ) : (
                              fileProgress[index] + "%"
                           )}
                        </span>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default FileProgress;
