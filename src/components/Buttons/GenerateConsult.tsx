import { FC } from "react";
import { useFileUpload } from "../../context/fileContext";

interface GenerateConsultProps {
   isActive: boolean;
}

const GenerateConsult: FC<GenerateConsultProps> = ({ isActive }) => {
   const { selectedFileId, generateConsult } = useFileUpload();

   const handleGenerate = async () => {
      console.log(isActive);
      if (isActive && selectedFileId) {
         generateConsult(selectedFileId);
      }
   };

   return (
      <div className="w-full">
         <button
            className={`${
               isActive
                  ? "bg-[#2a476c] cursor-pointer"
                  : "bg-[#a2a2a2] cursor-not-allowed"
            } custom-btn`}
            onClick={handleGenerate}
         >
            {/* <div className="bg-white rounded-md py-1 px-5">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6 text-gray-500"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
               </svg>
            </div> */}
            <strong>Generate</strong> Note
         </button>
      </div>
   );
};

export default GenerateConsult;
