import { useFileUpload } from "../context/fileContext";
import { IPatient } from "../types/Interface";
import DeleteReportButton from "./Buttons/DeleteReportButton";

const FileHistory = ({ onClose }: { onClose: () => void }) => {
   const { uploadedFiles, selectedFileId, setSelectedFileId, getChatDataById, setPatientData } =
      useFileUpload();

   const handleFileClick = (fileId: string, patientData: IPatient) => {

         setSelectedFileId(fileId);
         getChatDataById(fileId);
         setPatientData(patientData);
         onClose();
   };

   // const [expandedFileId, setExpandedFileId] = useState<string | null>(null);

   // const toggleFileExpansion = (fileId: string) => {
   //    setExpandedFileId(expandedFileId === fileId ? null : fileId);
   // };

   return (
      <div className="bg-[#eeeeee] border-b-2 border-r-2 border-l-2  border-gray-300 max-h-52 text-black text-lg rounded-b-md text-start px-4 py-2 overflow-auto">
         {uploadedFiles.length > 0 ? (
            <ul className="pl-1 flex flex-col-reverse">
               {uploadedFiles.map((file) => (
                  <li key={file.id} className="py-2">
                     <div
                        className={`cursor-pointer ${
                           selectedFileId === file.id ? "text-blue-700" : ""
                        } flex items-center justify-between`}
                     >
                        <div
                           onClick={() => {
                              handleFileClick(file.id, file.patient);
                           }}
                           className="text-sm flex flex-col hover:text-blue-700 py-1 grow mr-3"
                        >
                           <span className="">{file.patient.name}</span>
                           {/* <div className="flex justify-between text-xs">
                              <span>
                                 DOB:
                                 {(() => {
                                    const date = new Date(
                                       file.patient.date_of_birth
                                    );
                                    const day = String(date.getDate()).padStart(
                                       2,
                                       "0"
                                    );
                                    const month = String(
                                       date.getMonth() + 1
                                    ).padStart(2, "0");
                                    const year = date.getFullYear();
                                    return `${day}/${month}/${year}`;
                                 })()}
                              </span>
                              <span>MRN: {file.patient.medical_card}</span>
                           </div> */}
                        </div>
                        <div className="flex space-x-2">
                           {/* <AddFileToReportButton reportId={file.id} /> */}
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
                                          documentId={doc.id}
                                          vsFileId={doc.vsId}
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
