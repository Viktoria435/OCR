import { useFileUpload } from "../../context/fileContext";

interface GenerateCheckboxProps {
   reportId?: string | null;
}

const GenerateCheckbox: React.FC<GenerateCheckboxProps> = ({ reportId }) => {
   const { shouldGenerateConsultation, setShouldGenerateConsultation, isFilesUpload } = useFileUpload();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShouldGenerateConsultation(e.target.checked);
   };

   return (
      <div className="w-full flex items-center space-x-4 mb-5">
         <label htmlFor="generate-note" className="flex items-center cursor-pointer">
            <div className="relative">
               <input
                  type="checkbox"
                  id="generate-note"
                  className="sr-only"
                  checked={shouldGenerateConsultation}
                  onChange={handleChange}
                  disabled={!isFilesUpload}
               />
               <div
                  className={`block w-12 h-7 rounded-full transition-colors ${
                     isFilesUpload
                        ? shouldGenerateConsultation
                           ? "bg-[#32bc8a]"
                           : "bg-gray-400"
                        : "bg-gray-200"
                  }`}
               ></div>
               <div
                  className={`dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                     shouldGenerateConsultation ? "translate-x-5" : ""
                  }`}
               ></div>
            </div>
            <span
               className={`ml-3 font-medium ${
                  reportId ? "text-[14px] text-blue-950" : "text-black text-[18px]"
               } ${!isFilesUpload ? "opacity-50" : ""}`}
            >
               Generate Note Automatically After Upload
            </span>
         </label>
      </div>
   );
};

export default GenerateCheckbox;
