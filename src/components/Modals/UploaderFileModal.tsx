import { useEffect, useState } from "react";
import { useFileUpload } from "../../context/fileContext";

interface UploaderFileModalProps {
   onClose: () => void;
   reportId?: string;
}

const UploaderFileModal = ({ onClose, reportId }: UploaderFileModalProps) => {
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const { uploadFiles } = useFileUpload();

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const filesArray = Array.from(event.target.files);
         setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      }
   };

   const handleRemoveFile = (index: number) => {
      setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
   };

   useEffect(() => {
      console.log(selectedFiles);
   }, [selectedFiles]);

   const handleSubmit = () => {
      if (selectedFiles.length > 0) {
         uploadFiles(selectedFiles, reportId);
         setSelectedFiles([]);
         onClose();
      }
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
               {selectedFiles.map((file, index) => (
                  <div
                     key={index}
                     className="flex justify-between items-center"
                  >
                     <span>{file.name}</span>
                     <button
                        onClick={() => handleRemoveFile(index)}
                        className="ml-2 hover:text-red-500"
                     >
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
                  </div>
               ))}
            </div>

            <button
               onClick={handleSubmit}
               className="bg-blue-500 w-full p-2 mt-3 text-lg text-white font-semibold hover:bg-blue-600 transition duration-500 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md"
               disabled={selectedFiles.length === 0}
            >
               Submit
            </button>
         </div>
      </div>
   );
};

export default UploaderFileModal;
