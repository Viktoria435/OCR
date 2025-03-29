import { FC } from "react";
interface MicroModalProps {
   isOpen: boolean;
   onClose: () => void;
}

const MicroModal: FC<MicroModalProps> = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 w-auto"
         onClick={onClose}
      >
         <div
            className="p-6 rounded-2xl relative"
            onClick={(e) => e.stopPropagation()}
         >
         
            <div className="bg-blue-500 p-10 text-white font-semibold rounded-full">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-36 text-white"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
               </svg>
            </div>
         </div>
      </div>
   );
};

export default MicroModal;
