import { ReactNode } from "react";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 w-auto"
         onClick={onClose}
      >
         <div
            className="bg-white p-6 rounded-2xl shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
         >
            <button onClick={onClose} className="absolute top-2 right-2 p-2">
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
            {children}
         </div>
      </div>
   );
};

export default Modal;
