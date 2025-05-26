import { useEffect, useState } from "react";
import AgentData from "../components/AgentData";
import Loading from "../components/Loading";
import { useFileUpload } from "../context/fileContext";
import AgentUploader from "../components/AgentUploader";
// import ConsultButton from "../components/Buttons/ConsultButton";
import Modal from "../components/Modals/Modal";
// import UploaderFileModal from "../components/Modals/UploaderFileModal";
// import SearchPatient from "../components/SearchPatient";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Scenario from "../components/Scenario";
// import UserProfile from "../components/UserProfile";
// import FileProgress from "../components/FileProgress";
import UploadedRecords from "../components/UploadedRecords";
import GeneratedNotes from "../components/GeneratedNotes";
import PushToEMRButton from "../components/Buttons/PushToEMRButton";
import NavBar from "../components/NavBar";
import PatientProfile from "../components/PatientProfile";
import FileUploader from "../components/FileUploader";
import FileDropZone from "../components/FileDropZone";
import ViewFullSumButton from "../components/Buttons/ViewFullSumButton";

const MainPage = () => {
   const navigate = useNavigate();
   const { isLoading, getReports, selectedFileId } = useFileUpload();
   //const [isOpenUploader, setIsOpenUploader] = useState(false);
   // const [isOpenScenario, setIsOpenScenario] = useState(false);

   useEffect(() => {
      const token = Cookies.get("accessToken");
      if (!token) {
         navigate("auth/login");
         return;
      }
   }, [navigate, getReports]);

   return (
      <div className="h-screen flex flex-col">
         <NavBar />

         {isLoading && (
            <div className="absolute inset-0 flex z-100 items-center justify-center bg-black/20 ">
               <Loading />
            </div>
         )}
         {selectedFileId ? (
            <main className="grid grid-cols-[1fr_2fr_1fr] w-full grow overflow-hidden divide-x-2 divide-gray-500">
               <div className="flex flex-col p-8 overflow-hidden flex-grow justify-between bg-white">
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
               <div className="flex flex-col gap-y-5 bg-white border-[3px] p-2 border-gray-300 rounded overflow-hidden grow">
                  <AgentData />
                  <ViewFullSumButton />
                  <AgentUploader />
               </div>
            </main>
         ) : (
            <main className="flex items-center justify-center w-full h-full">
               <FileDropZone />
            </main>
         )}
         
      </div>
   );
};

export default MainPage;
