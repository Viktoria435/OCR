import { useFileUpload } from "../context/fileContext";

const FileHistory = () => {
   const {
      uploadedFiles,
      selectedFileId,
      setSelectedFileId,
      getChatDataById
   } = useFileUpload();

   const handleFileClick = (fileId: string) => {
      setSelectedFileId(fileId);
      getChatDataById(fileId)
   };

   return (
      <div className="bg-white flex-grow text-black text-lg rounded-md text-start px-4 py-2 overflow-auto ">
         {uploadedFiles.length > 0 ? (
            <ul className="list-disc pl-5 flex flex-col-reverse">
               {uploadedFiles.map((file) => (
                  <li
                     key={file.id}
                     className={`py-2 cursor-pointer ${
                        selectedFileId === file.id ? "text-blue-700" : ""
                     }`}
                     onClick={() => {
                        handleFileClick(file.id);
                      }}
                  >
                     {file.filename}
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
