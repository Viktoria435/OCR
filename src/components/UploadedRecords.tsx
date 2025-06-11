import { useEffect, useState } from "react";
import { useFileUpload } from "../context/fileContext";
import GenerateConsult from "./Buttons/GenerateConsult";
import PushToEMRButton from "./Buttons/PushToEMRButton";
import Modal from "./Modals/Modal";
import ReactMarkdown from "react-markdown";
import { base64ToBytes, formatDateToMDY } from "../utils/Convertation";
import { emojiByExtension, mimeTypes } from "../utils/fileDisplayConfig";

const getFileExtension = (filename: string) => {
   return filename.split(".").pop()?.toLowerCase() || "";
};

const getEmojiByFilename = (filename: string): string => {
   const ext = getFileExtension(filename);
   return emojiByExtension[ext] || "📋";
};

const UploadedRecords = () => {
   const {
      uploadedDocuments,
      documentText,
      getDocumentById,
      isFilesUploading,
      deleteFileFromReport,
      selectedFileId,
   } = useFileUpload();

   const [isDeleting, setIsDeleting] = useState<boolean>(false);
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [activeDocId, setActiveDocId] = useState<string>("");
   const [isOpening, setIsOpening] = useState(false);


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

   const handleTabClick = async (cId: string) => {
      setIsOpening(true);
      if (activeDocId === cId) {
         setActiveDocId("");  
         await new Promise(r => setTimeout(r, 0));
       }

      const doc = uploadedDocuments.find((d) => d.id === cId);
      if (!doc) {
         setIsOpening(false); 
         return;
      }

      const ext = getFileExtension(doc.filename);
      const isText = ext === "txt";

      await getDocumentById(cId);
      setActiveDocId(cId);

      if (isText) {
         setIsModalOpen(true);
      }

      setIsOpening(false); 
   };

   useEffect(() => {
      if (!activeDocId || !documentText) return;

      const currentDoc = uploadedDocuments.find(
         (doc) => doc.id === activeDocId
      );
      if (!currentDoc) return;

      const ext = getFileExtension(currentDoc.filename);
      if (ext === "txt") return;

      const mimeType = mimeTypes[ext] || "application/octet-stream";
      const byteArray = base64ToBytes(documentText);
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
   }, [activeDocId, documentText, uploadedDocuments]);

   const renderContent = () => {
      if (!documentText || !selectedFileId) return null;

      if (isFilesUploading) {
         return (
            <div className="flex items-center justify-center h-full">
               <p className="text-gray-500">Loading...</p>
            </div>
         );
      }
      const currentDoc = uploadedDocuments.find(
         (doc) => doc.id === activeDocId
      );
      if (!currentDoc) return null;

      const ext = getFileExtension(currentDoc.filename);
      if (ext !== "txt") return null;

      try {
         const decodedText = atob(documentText);
         return (
            <pre className="whitespace-pre-wrap break-words">
               <ReactMarkdown>{decodedText}</ReactMarkdown>
            </pre>
         );
      } catch {
         return <p>Error decoding text file</p>;
      }
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div className="relative flex flex-col p-5 w-full h-full bg-white border-[3px] border-gray-300 rounded">
        {hasNotes ? (
          <>
            <p className="font-semibold text-start text-[22px] px-3 mb-4">
              Uploaded Files
            </p>
            <ul
              className={`w-full overflow-y-auto pr-3 space-y-1 mb-2 ${
                isOpening ? "pointer-events-none select-none opacity-70" : ""
              }`}
            >
              {uploadedDocuments.map((document) => (
                <li
                  key={document.id}
                  onClick={() => !isOpening && handleTabClick(document.id)}
                  className="relative group p-3 text-start cursor-pointer flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${document.id}`}
                    className="form-checkbox h-4 w-4 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isOpening} 
                  />
                  <label className="font-medium cursor-pointer hover:text-blue-900">
                    {getEmojiByFilename(document.filename)} {document.filename} -{" "}
                    {formatDateToMDY(document.datetimeInserted)}
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOpening) handleDelete(document.id);
                    }}
                    disabled={isDeleting || isOpening}
                    className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 transition-opacity duration-200 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-700 hover:text-red-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <hr className="w-full border-t border-gray-300 absolute bottom-0 left-0" />
                </li>
              ))}
            </ul>
            <div className="flex items-start justify-between w-full mt-auto space-x-4">
              <div className="flex-1 hidden">
                <GenerateConsult isActive={!isOpening} />
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
        {isOpening && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-50">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-gray-500 text-center text-lg mt-2">Loading...</p>
          </div>
        )}
    
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="w-[40vw] break-words flex-grow ">
            <div className="w-full h-[70vh] mt-6 flex flex-col overflow-auto bg-white p-4 rounded text-start break-words">
              {renderContent()}
            </div>
          </div>
        </Modal>
      </div>
    );
    
};

export default UploadedRecords;
