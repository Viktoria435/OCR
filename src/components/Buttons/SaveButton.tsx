import { updateConsult, updateDocument } from "../../api/fileApi";
import { useFileUpload } from "../../context/fileContext";

const SaveButton = () => {
   const {
      selectedFileId,
      selectedDocumentId,
      selectedConsultId,
      setDocumentText,
      setConsultText,
      isEdited,
      editingUploadedText,
      editingConsultText,
      setIsEdited,
   } = useFileUpload();

   const handleSave = async () => {
      if (
         editingUploadedText &&
         selectedFileId &&
         selectedDocumentId &&
         editingUploadedText !== ""
      ) {
         try {
            const response = await updateDocument({
               documentId: selectedDocumentId,
               reportId: selectedFileId,
               text: editingUploadedText,
            });
            setDocumentText(response.data.content);
            setIsEdited(false);
         } catch (error) {
            console.error("Error saving:", error);
         }
      }

      if (
         editingConsultText &&
         selectedFileId &&
         selectedConsultId &&
         editingConsultText !== ""
      ) {
         try {
            const response = await updateConsult(
               selectedConsultId,
               editingConsultText
            );
            setConsultText(response.data.content);
            setIsEdited(false);
         } catch (error) {
            console.error("Error saving:", error);
         }
      }
   };

   return (
      <button
         onClick={handleSave}
         className={`bg-blue-500 w-1/4 rounded-xl cursor-pointer py-2 px-8 text-sm text-white font-medium hover:bg-blue-600 transition duration-500 disabled:bg-blue-500 ${
            isEdited ? "" : "opacity-40 pointer-events-none"
         }`}
      >
         Save
      </button>
   );
};

export default SaveButton;
