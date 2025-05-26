import FileDropZone from "./FileDropZone";
import FileProgress from "./FileProgress";
import { useFileUpload } from "../context/fileContext";

const FileUploader = () => {
   const { setSelectedFiles, selectedFileId, selectedFiles } = useFileUpload();

   return (
      <div className="h-full">
         <FileDropZone
            reportId={selectedFileId}
            currentFiles={selectedFiles}
            setFiles={(files) => setSelectedFiles(files)}
         />
         <FileProgress />
      </div>
   );
};

export default FileUploader;
