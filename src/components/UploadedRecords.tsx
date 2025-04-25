import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useFileUpload } from "../context/fileContext";
import { formatDateToMDY } from "../utils/Convertation";

const UploadedRecords = () => {
   const {
      uploadedDocuments,
      getDocumentById,
      documentText,
      deleteFileFromReport,
      setIsEdited,
      setEditingUploadedText,
      setSelectedDocumentId,
      selectedFileId,
   } = useFileUpload();
   const [isEditing, setIsEditing] = useState(false);
   const [editText, setEditText] = useState(documentText || "");
   const [activeTab, setActiveTab] = useState<string | null>(null);

   const handleTabClick = async (docId: string) => {
      getDocumentById(docId);
      setActiveTab(docId);
      setSelectedDocumentId(docId);
   };
   

   useEffect(() => {
      if (uploadedDocuments.length > 0) {
         setActiveTab(uploadedDocuments[0].id);
      }
   }, [uploadedDocuments]);

   useEffect(() => {
      setEditText(documentText || "");
   }, [documentText]);

   const handleEditClick = () => {
      setIsEditing((prev) => !prev);
   };

   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditText(event.target.value);
      setIsEdited(true);
   };

   const handleDelete = (documentId: string) => {
      if (!selectedFileId) return;

      const targetDoc = uploadedDocuments.find((doc) => doc.id === documentId);
      if (!targetDoc) return;

      deleteFileFromReport(selectedFileId, documentId, targetDoc.vsId);
      setActiveTab(null);
   };

   const handleBlur = () => {
      setIsEditing(false);
      setEditingUploadedText(editText);
   };

   const renderContent = () => {
      const doc = uploadedDocuments.find((d) => d.id === activeTab);
      if (!doc) {
         return (
            <div className="flex justify-center items-center h-full text-gray-400">
               <p className="text-black opacity-50">No uploaded records</p>
            </div>
         );
      }
      return (
         <div className="flex-1 h-full">
            {isEditing ? (
               <textarea
                  value={editText}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full h-full resize-none focus:outline-none"
               />
            ) : (
               <div className="space-y-2 p-1">
                  <ReactMarkdown>{documentText}</ReactMarkdown>
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="flex flex-col w-full h-full">
         <ul className="flex flex-wrap w-full ">
            {uploadedDocuments?.map((doc, index) => {
               const isFirst = index === 0;
               const isLast = index === uploadedDocuments.length;

               return (
                  <li key={doc.id} className="flex-1 min-w-[150px]">
                     <button
                        onClick={() => handleTabClick(doc.id)}
                        className={`w-full flex py-4 px-2 text-gray-700 bg-white border-t-2 border-b-2
              ${isFirst ? "border-l-2" : ""}
              ${!isLast ? "border-r-2" : ""}
              ${
                 activeTab === doc.id
                    ? "border-gray-300 border-b-transparent z-10"
                    : "hover:bg-gray-50 border-gray-300"
              }`}
                     >
                        <input type="checkbox" className="mr-2" />
                        <div className="flex flex-col overflow-hidden">
                           <p className="text-sm text-gray-700 break-all text-start line-clamp-2">
                              {formatDateToMDY(doc.datetimeInserted) +
                                 " - " +
                                 doc.filename}
                           </p>
                        </div>
                     </button>
                  </li>
               );
            })}
         </ul>

         <div
            className={`bg-white flex-grow text-black rounded-b-md ${
               uploadedDocuments.length === 0 ? "border-t-2" : ""
            } border-x-2 border-b-2 border-gray-300 text-start px-4 text-lg h-full flex flex-col overflow-auto ${
               isEditing ? "overflow-hidden" : ""
            }`}
         >
            <div className="relative">
               {activeTab && (
                  <div>
                     <button
                        className="absolute cursor-pointer top-2 right-10 text-xl"
                        onClick={handleEditClick}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={2}
                           stroke="currentColor"
                           className="size-6 text-blue-600"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                           />
                        </svg>
                     </button>
                     <button
                        className="absolute cursor-pointer top-2 right-0 text-xl"
                        onClick={() => handleDelete(activeTab)}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={2}
                           stroke="currentColor"
                           className="size-6 text-red-500"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                           />
                        </svg>
                     </button>
                  </div>
               )}
            </div>
            <div className={`flex-grow`}>{renderContent()}</div>
         </div>
      </div>
   );
};

export default UploadedRecords;
