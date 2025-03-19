import { useEffect, useState } from "react";
import { useFileUpload } from "../../context/fileContext";

interface UploaderFileModalProps {
   onClose: () => void;
   reportId?: string
}

const UploaderFileModal = ({ onClose,  reportId }: UploaderFileModalProps) => {
   const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
   const [fileName, setFileName] = useState<string[]>([]);
   const { uploadFiles } = useFileUpload();

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const filesArray = Array.from(event.target.files);
         setSelectedFiles((prevFiles) =>
            prevFiles ? [...prevFiles, ...filesArray] : filesArray
         );
         setFileName((prevFileName) => [
            ...prevFileName,
            ...filesArray.map((file) => file.name),
         ]);
      }
   };

   useEffect(() => {
      console.log(selectedFiles);
   }, [selectedFiles]);

   const handleSubmit = () => {
      if (selectedFiles) {
         uploadFiles(selectedFiles, reportId);
         setSelectedFiles(null);
         setFileName(["Sended"]);
         onClose();
      };
   };

   return (
      <div className="flex flex-col h-72 w-lg">
         <div className="bg-white flex rounded-md flex-col items-center p-4 justify-between h-full">
            <label className="border w-full border-gray-200 overflow-hidden text-black text-start px-2 text-lg cursor-pointer mb-3">
               Choose Files:
               <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,image/jpeg,image/png"
                  multiple
               />
            </label>
            <div className="w-full text-start space-y-3 px-1 flex-1 overflow-auto">
               {fileName.map((file, index) => (
                  <div key={index}>{file}</div>
               ))}
            </div>

            <button
               onClick={handleSubmit}
               className="bg-blue-500 w-full p-2 mt-3 text-lg text-white font-semibold hover:bg-blue-600 transition duration-500  disabled:bg-gray-500 disabled:cursor-not-allowed"
               disabled={!selectedFiles}
            >
               Submit
            </button>
         </div>
      </div>
   );
};

export default UploaderFileModal;
