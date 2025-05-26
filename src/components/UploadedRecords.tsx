import { useState } from "react";
import { useFileUpload } from "../context/fileContext";
import GenerateConsult from "./Buttons/GenerateConsult";
import PushToEMRButton from "./Buttons/PushToEMRButton";

const UploadedRecords = () => {
   const { uploadedDocuments, deleteFileFromReport, selectedFileId } =
      useFileUpload();

   const [isDeleting, setIsDeleting] = useState<boolean>(false);

   const hasNotes = uploadedDocuments && uploadedDocuments.length > 0;

   const handleDelete = async (documentId: string) => {
      if (!selectedFileId) return;

      const targetDoc = uploadedDocuments.find((doc) => doc.id === documentId);
      if (!targetDoc) return;

      setIsDeleting(true);
      try {
         await deleteFileFromReport(selectedFileId, documentId, targetDoc.vsId);
      } catch (error) {
         console.error("Error", error);
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <div className="flex flex-col p-5 w-full h-full bg-white border-[3px] border-gray-300 rounded">
         {hasNotes ? (
            <>
               <p className="font-semibold text-start text-[22px] px-3 mb-4">
                  Uploaded Files
               </p>

               <ul className="w-full overflow-y-auto pr-3 space-y-1 mb-2">
                  {uploadedDocuments.map((document) => (
                     <div key={document.id} className="relative group">
                        <li className="p-3 text-start flex items-center space-x-2">
                           <input
                              type="checkbox"
                              id={`checkbox-${document.id}`}
                              className="form-checkbox h-4 w-4"
                           />
                           <label
                              htmlFor={`checkbox-${document.id}`}
                              className="font-medium"
                           >
                              {document.filename}
                           </label>
                           <button
                              onClick={() => handleDelete(document.id)}
                              disabled={isDeleting}
                              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700"
                           >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-5 text-red-500 hover:text-red-700"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                 </svg>
                           </button>
                        </li>
                        <hr className="w-full border-t border-gray-300 " />
                     </div>
                  ))}
               </ul>
               <div className="flex items-start justify-between w-full mt-auto space-x-4">
                  <div className="flex-1">
                     <GenerateConsult isActive={true} />
                  </div>
                  <div className="flex-1">
                     <PushToEMRButton />
                  </div>
               </div>
            </>
         ) : (
            <div className="text-gray-500 text-center text-lg w-full h-full flex items-center justify-center">
               No uploaded records
            </div>
         )}
      </div>
   );
};

export default UploadedRecords;
