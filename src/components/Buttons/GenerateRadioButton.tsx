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
      <div className="w-full flex items-center space-x-2 mb-2">
         <input
            type="checkbox"
            id="generate-note"
            checked={shouldGenerateConsultation}
            onChange={handleChange}
            className="cursor-pointer w-5 h-5"
            disabled={!isFilesUpload}
         />
         <label
            htmlFor="generate-note"
            className={`cursor-pointer text-blue-950 font-semibold  ${reportId ? "text-[15px]" : ""}`}
         >
            Auto Consult Note Generation
         </label>
      </div>
   );
};

export default GenerateCheckbox;
