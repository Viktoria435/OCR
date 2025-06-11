import { useEffect, useState } from "react";
import { useFileUpload } from "../context/fileContext";
import { formatDateToMDY } from "../utils/Convertation";
import Modal from "./Modals/Modal";
import ReactMarkdown from "react-markdown";
import SaveButton from "./Buttons/SaveButton";

const GeneratedNotes = () => {
   const {
      consultNotes,
      getConsultById,
      deleteConsultFromReport,
      consultText,
      setIsEdited,
      setEditingConsultText,
      selectedFileId,
      isConsultLoading,
   } = useFileUpload();

   const [isEditing, setIsEditing] = useState(false);
   const [editText, setEditText] = useState(consultText || "");
   const [isDeleting, setIsDeleting] = useState<boolean>(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [activeConsultId, setActiveConsultId] = useState<string | null>(null);

   useEffect(() => {
      setEditText(consultText || "");
   }, [consultText]);

   const handleEditClick = () => {
      setIsEditing((prev) => !prev);
   };

   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditText(event.target.value);
      setIsEdited(true);
   };

   const handleDelete = async () => {
      if (!selectedFileId || !activeConsultId) return;

      const targetConsult = consultNotes.find(
         (cons) => cons.id === activeConsultId
      );
      if (!targetConsult) return;

      setIsDeleting(true);
      try {
         await deleteConsultFromReport(selectedFileId, activeConsultId);
      } catch (error) {
         console.error("Error", error);
      } finally {
         setIsDeleting(false);
         setIsModalOpen(false);
      }
   };

   const handleBlur = () => {
      setIsEditing(false);
      setEditingConsultText(editText);
   };

   const handleTabClick = (cId: string) => {
      getConsultById(cId);
      setActiveConsultId(cId);
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingConsultText(null);
      setIsEdited(false);
      setEditText(consultText || "");
   }

   const hasNotes = consultNotes && consultNotes.length > 0;

   const renderContent = () => (
      <div className="flex-1 h-full">
         {isConsultLoading ? (
            <div className="w-full h-full flex items-center justify-center">
               <span className="text-gray-500">Loading...</span>
            </div>
         ) : isEditing ? (
            <textarea
               value={editText}
               onChange={handleChange}
               onBlur={handleBlur}
               className="w-full h-full resize-none focus:outline-none"
            />
         ) : (
            <div className="prose break-words">
               <ReactMarkdown>{consultText}</ReactMarkdown>
            </div>
         )}
      </div>
   );

   return (
      <div className="flex flex-col p-5 w-full h-full bg-white border-[3px] border-gray-300 rounded">
         {hasNotes ? (
            <>
               <p className="font-semibold text-start text-[22px] px-3 mb-4">
                  Generated Notes
               </p>

               <ul className="w-full overflow-y-auto pr-3 space-y-1">
                  {consultNotes.map((note) => (
                     <li
                        key={note.id}
                        onClick={() => handleTabClick(note.id)}
                        className="p-7 border-2 text-start border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                     >
                        <p className="text-lg text-[#2f6eba] hover:text-blue-900 font-semibold">
                           {note.title}
                        </p>
                        <p className="text-lg">
                           {formatDateToMDY(note.datetimeInserted)}
                        </p>
                     </li>
                  ))}
               </ul>
            </>
         ) : (
            <div className="text-gray-500 text-center text-lg w-full h-full flex items-center justify-center">
               No generated data
            </div>
         )}

         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="w-[40vw] break-words flex-grow ">
               <div className="w-full h-[70vh] mt-6 flex flex-col overflow-auto bg-white p-4 rounded text-start break-words">
                  <div className="flex justify-start">
                     <button
                        onClick={handleEditClick}
                        className={`absolute cursor-pointer right-20 text-xl ${isConsultLoading ? "hidden" : ""}`}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={2}
                           stroke="currentColor"
                           className="size-6 text-blue-600 hover:text-blue-800"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                           />
                        </svg>
                     </button>
                     <button
                        onClick={handleDelete}
                        className={`absolute cursor-pointer right-10 text-xl ${isConsultLoading ? "hidden" : ""}`}
                        disabled={isDeleting}
                     >
                        {isDeleting ? (
                           <svg
                              className="animate-spin h-6 w-6 text-red-500"
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
                                 d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                           </svg>
                        ) : (
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="size-6 text-red-500 hover:text-red-700"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                           </svg>
                        )}
                     </button>
                  </div>
                  {renderContent()}
               </div>
               <div className="mt-1">
                  <SaveButton />
               </div>
            </div>
         </Modal>
      </div>
   );
};

export default GeneratedNotes;
