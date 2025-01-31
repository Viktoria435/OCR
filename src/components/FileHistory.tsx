import { useFileUpload } from "../context/fileContext";

const FileHistory = () => {
   const { uploadedFiles } = useFileUpload();
   return (
      <div className="bg-white flex-grow text-black text-lg rounded-md text-start px-4 py-2 overflow-auto">
         {uploadedFiles.length > 0 ? (
            <ul className="list-disc pl-5">
               {uploadedFiles.map((file, index) => (
                  <li key={index} className="py-2">
                     {file}
                  </li>
               ))}
            </ul>
         ) : (
            <div className="flex items-center justify-center h-full">
               <p className="opacity-50">No files uploaded yet.</p>
            </div>
         )}
      </div>
   );
};

export default FileHistory;
