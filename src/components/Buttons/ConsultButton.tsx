import { generateConsultReport } from "../../api/fileApi";
import { useFileUpload } from "../../context/fileContext";
import { base64ToBytes } from "../../utils/Convertation";

const ConsultButton = () => {
   const { selectedFileId, setIsLoading } = useFileUpload();

   const downloadPdf = (base64: string, fileName: string = "report.pdf") => {
      const byteArray = base64ToBytes(base64);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   const uploadFileHandler = async () => {
      try {
         setIsLoading(true);
         if (selectedFileId) {
            const response = await generateConsultReport(selectedFileId);
            console.log(response);
            if (response.successful && response.data) {
               downloadPdf(response.data, `Consult_Report.pdf`);
            } else {
               console.error(
                  response.error?.message || "Error generating report"
               );
            }
         } else {
            console.error("selectedFileId is undefined");
         }
      } catch (error) {
         console.error("Error downloading PDF:", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <button
         onClick={uploadFileHandler}
         hidden={!selectedFileId}
         className="bg-blue-500 w-full p-2 text-sm text-white font-medium hover:bg-blue-600 transition duration-500 disabled:bg-blue-500"
      >
         Consult Note
      </button>
   );
};

export default ConsultButton;
