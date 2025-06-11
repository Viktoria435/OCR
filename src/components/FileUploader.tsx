import FileDropZone from "./FileDropZone";
import FileProgress from "./FileProgress";
import { useFileUpload } from "../context/fileContext";
import GenerateRadioButton from "./Buttons/GenerateRadioButton";

const FileUploader = () => {
   const { setSelectedFiles, selectedFileId, selectedFiles } = useFileUpload();

   return (
      <div className="h-full space-y-3">
         <GenerateRadioButton 
         reportId={selectedFileId}
         />
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
