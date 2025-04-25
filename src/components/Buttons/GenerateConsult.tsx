import { FC } from "react";
import { useFileUpload } from "../../context/fileContext";
import { generateConsultReport } from "../../api/fileApi";

interface GenerateConsultProps {
   isActive: boolean;
 };

const GenerateConsult:FC <GenerateConsultProps> = ({isActive}) => {
   const { selectedFileId, setIsLoading } = useFileUpload();

   const handleGenerate = async () => {
      console.log(isActive)
      if (isActive) {
         try {
            setIsLoading(true);
            if (selectedFileId) {
               const response = await generateConsultReport(selectedFileId);
               console.log(response);
              
            } else {
               console.error("selectedFileId is undefined");
            }
         } catch (error) {
            console.error("Error downloading PDF:", error);
         } finally {
            setIsLoading(false);
         }
      }
   }

    

   return (
      <div>
         <button
            className="bg-gray-500 flex justify-between items-center w-full text-white font-semibold py-4 px-3 text-lg rounded-md cursor-pointer"
            onClick={handleGenerate}
         >
            <div className="bg-white rounded-md py-1 px-5">
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
            </div>
            Generate Consult
         </button>
      </div>
   );
};

export default GenerateConsult;
