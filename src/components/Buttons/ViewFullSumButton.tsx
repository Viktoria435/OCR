import { useState } from "react";
import { useFileUpload } from "../../context/fileContext";
import Modal from "../Modals/Modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const ViewFullSumButton = () => {
   const { scenario } = useFileUpload();
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div>
         <button
            onClick={() => {
               setIsOpen(true);
            }}
            className={`custom-btn cursor-pointer ${
               scenario ? "" : "hidden"
            } `}
         >
            View <strong>Full Summary</strong>
         </button>
         {isOpen && (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
               <div className="h-[70vh] w-[80vw] p-4">
                  <div className="scenario overflow-y-auto h-full w-full text-justify pr-3">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                        table: ({ ...props }) => (
                           <div className="overflow-x-auto w-full">
                           <table className="markdown-table w-full" {...props} />
                         </div>
                        ),
                     }}
                  >
                     {scenario}
                  </ReactMarkdown>
                  </div>
               </div>
            </Modal>
         )}
      </div>
   );
};

export default ViewFullSumButton;
