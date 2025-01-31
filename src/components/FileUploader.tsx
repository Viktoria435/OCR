import { useState } from "react";
import { useFileUpload } from "../context/fileContext";

const FileUploader = () => {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [fileName, setFileName] = useState("File:");
   const { uploadFile } = useFileUpload();

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         setSelectedFile(file);
         setFileName(`File: ${file.name}`);
      }
   };

   const handleSubmit = () => {
      if (selectedFile) {
         uploadFile(selectedFile);
      }
      setSelectedFile(null);
      setFileName("File:");
   };

   return (
      <div className="flex flex-col">
         <div className="bg-white flex rounded-md flex-col items-center p-4 gap-y-10">
            <label className="border w-full border-gray-200 overflow-hidden text-black text-start px-2 text-lg cursor-pointer">
               {fileName}
               <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,image/jpeg,image/png"
               />
            </label>
            <button
               className="bg-blue-500 w-full p-2 text-lg text-white font-semibold hover:bg-blue-600 transition duration-500  disabled:bg-blue-500 disabled:cursor-not-allowed"
               disabled={!selectedFile}
               onClick={handleSubmit}
            >
               Submit
            </button>
         </div>
         <div></div>
      </div>
   );
};

export default FileUploader;
