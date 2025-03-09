import { replaceReport } from "../../api/fileApi";
import { useFileUpload } from "../../context/fileContext";

const SaveButton = () => {
   const {
      selectedFileId,
      isEdited,
      editingReport,
      setFileReport,
      setIsEdited
   } = useFileUpload();

   const handleSave = async () => {
      if (editingReport && selectedFileId && editingReport !== "") {
         try {
            const response = await replaceReport(selectedFileId, editingReport);
            setFileReport(response.data.report);
            setIsEdited(false);
         } catch (error) {
            console.error("Error saving report:", error);
         }
      }

      // if (editingChanges && selectedFileId && editingChanges !== "") {
      //    try {
      //       const response = await replaceReportChanges(
      //          selectedFileId,
      //          editingChanges
      //       );
      //       setFileChanges(response.data.changes);
      //       setIsEdited(false);
      //    } catch (error) {
      //       console.error("Error saving changes:", error);
      //    }
      // }
   };

   return (
      <button
         hidden={!isEdited}
         onClick={handleSave}
         className="bg-blue-500 w-full py-2 px-8 text-sm text-white font-medium hover:bg-blue-600 transition duration-500 disabled:bg-blue-500"
      >
         Save
      </button>
   );
};

export default SaveButton;
