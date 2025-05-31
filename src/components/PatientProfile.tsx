import { FC} from "react";
import { useFileUpload } from "../context/fileContext";
const PatientProfile: FC = () => {
   const { patientData } = useFileUpload();


   return (
      <div className="bg-white rounded-md p-3 flex flex-col w-full items-center">
         <div className="text-2xl font-medium mb-3    ">
            {patientData?.name}
         </div>
         <div className="flex flex-col items-center text-sm  text-gray-500">
            <div className="flex gap-x-2">
               <span>DOB:</span>{" "}
               <span>
                  {(() => {
                     const date = new Date(patientData?.date_of_birth || "");
                     const day = String(date.getDate()).padStart(2, "0");
                     const month = String(date.getMonth() + 1).padStart(2, "0");
                     const year = date.getFullYear();
                     return `${day}/${month}/${year}`;
                  })()}
               </span>
            </div>
            <div className="flex  gap-x-2">
               <span>MRN:</span> <span> {patientData?.medical_card}</span>
            </div>
         </div>
      </div>
   );
};

export default PatientProfile;
