import { useEffect } from "react";
import AgentData from "../components/AgentData";
import Loading from "../components/Loading";
import { useFileUpload } from "../context/fileContext";
import AgentUploader from "../components/AgentUploader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UploadedRecords from "../components/UploadedRecords";
import GeneratedNotes from "../components/GeneratedNotes";
import NavBar from "../components/NavBar";
import PatientProfile from "../components/PatientProfile";
import FileUploader from "../components/FileUploader";
import ViewFullSumButton from "../components/Buttons/ViewFullSumButton";
import NewPatientUploader from "../components/NewPatientUploader";

const MainPage = () => {
   const navigate = useNavigate();
   const { isLoading, getReports, selectedFileId, getInfo } = useFileUpload();

   useEffect(() => {
      const token = Cookies.get("accessToken");
      if (!token) {
         navigate("auth/login");
         return;
      }
   }, [navigate, getReports]);

   useEffect(() => {
      getInfo();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="h-screen flex flex-col">
         <NavBar />

         {isLoading && (
            <div className="absolute inset-0 flex z-100 items-center justify-center bg-black/20 ">
               <Loading />
            </div>
         )}
         {selectedFileId ? (
            <main className="grid grid-cols-[1fr_2fr_1fr] w-full grow overflow-hidden space-x-4 p-4">
               <div className="flex flex-col p-8 overflow-hidden border-[3px] border-gray-300 flex-grow justify-between bg-white">
                  <PatientProfile />
                  <FileUploader />
               </div>
               <div className="flex flex-col overflow-hidden">
                  <div className="flex relative w-full">
                     <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                  <div className="flex-grow overflow-auto mb-3 h-full">
                     <UploadedRecords />
                  </div>
                  <div className="flex-grow overflow-auto h-full">
                     <GeneratedNotes />
                  </div>
               </div>
               <div className="flex flex-col h-full bg-white border-[3px] p-2 border-gray-300 rounded overflow-hidden">
                  <div className="flex flex-col flex-1 min-h-0">
                     <AgentData />
                  </div>

                  <div className="flex flex-col gap-y-3 shrink-0">
                     <ViewFullSumButton />
                     <AgentUploader />
                  </div>
               </div>
            </main>
         ) : (
            <main className="flex items-center justify-center w-full h-full">
               <NewPatientUploader />
            </main>
         )}
      </div>
   );
};

export default MainPage;
