import { useState } from "react";
import Modal from "../Modals/Modal";
import UploaderFileModal from "../Modals/UploaderFileModal";
import { useFileUpload } from "../../context/fileContext";

const AddFileToReportButton = ({ reportId }: { reportId: string }) => {
   const { setSelectedFiles, isFilesUpload } = useFileUpload();

   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="flex items-center justify-center">
         <button
            onClick={() => setIsOpen(true)}
            disabled={!isFilesUpload}
            className="cursor-pointer"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="size-5 hover:text-blue-500"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
         <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="text-center">
               <UploaderFileModal
                  setFiles={(files) => setSelectedFiles(files)}
                  onClose={() => setIsOpen(false)}
                  reportId={reportId}
               />
            </div>
         </Modal>
      </div>
   );
};

export default AddFileToReportButton;
