import { useFileUpload } from "../context/fileContext";
import AddFileToReportButton from "./Buttons/AddFileToReportButton";
import DeleteReportButton from "./Buttons/DeleteReportButton";

const FileHistory = () => {
   const { uploadedFiles, selectedFileId, setSelectedFileId, getChatDataById } =
      useFileUpload();

   const handleFileClick = (fileId: string) => {
      if (selectedFileId === fileId) {
         setSelectedFileId(null);
      } else {
         setSelectedFileId(fileId);
         getChatDataById(fileId);
      }
   };

   // const [expandedFileId, setExpandedFileId] = useState<string | null>(null);

   // const toggleFileExpansion = (fileId: string) => {
   //    setExpandedFileId(expandedFileId === fileId ? null : fileId);
   // };

   return (
      <div className="bg-[#eeeeee] border-b-2 border-r-2 border-l-2  border-gray-300 h-52 text-black text-lg rounded-b-md text-start px-4 py-2 overflow-auto">
         {uploadedFiles.length > 0 ? (
            <ul className="pl-1 flex flex-col-reverse">
               {uploadedFiles.map((file) => (
                  <li key={file.id} className="py-2">
                     <div
                        className={`cursor-pointer ${
                           selectedFileId === file.id ? "text-blue-700" : ""
                        } flex items-center justify-between`}
                     >
                        <div className="text-sm flex flex-col">
                           <span
                              className="hover:text-blue-700 "
                              onClick={() => {
                                 handleFileClick(file.id);
                              }}
                           >
                              {file.patient.name}
                           </span>
                           {/* <span>{file.patient.date_of_birth}</span> */}
                        </div>
                        <div className="flex space-x-2">
                           <AddFileToReportButton reportId={file.id} />
                           <DeleteReportButton reportId={file.id} />
                        </div>
                     </div>
                     {/* {expandedFileId === file.id &&
                        file.documents.length > 0 && (
                           <ul className="list-disc ml-2 px-2 mt-2">
                              {file.documents.map((doc) => (
                                 <li
                                    key={doc.id}
                                    className="py-1 cursor-pointer"
                                 >
                                    <div className="flex items-center justify-between">
                                       <span className="flex text-md mr-2">
                                          {doc.filename}
                                       </span>
                                       <DeleteFileFromReportButton
                                          reportId={file.id}
                                          documentId={doc.vsId}
                                       />
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        )} */}
                  </li>
               ))}
            </ul>
         ) : (
            <div className="flex items-center justify-center h-full">
               <p className="opacity-50">No patients data</p>
            </div>
         )}
      </div>
   );
};

export default FileHistory;
