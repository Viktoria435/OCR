import { useEffect, useState } from "react";
import AgentData from "../components/AgentData";
import Loading from "../components/Loading";
import { useFileUpload } from "../context/fileContext";
import AgentUploader from "../components/AgentUploader";
// import ConsultButton from "../components/Buttons/ConsultButton";
import SaveButton from "../components/Buttons/SaveButton";
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
const MainPage = () => {
   const navigate = useNavigate();
   const { isLoading, getReports, scenario, selectedFileId } = useFileUpload();
   //const [isOpenUploader, setIsOpenUploader] = useState(false);
   const [isOpenScenario, setIsOpenScenario] = useState(false);

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
                  <div className="flex flex-col p-8 gap-y-5 overflow-hidden bg-gray-100">
                     <div className="flex relative w-full">
                        <div className="flex items-center justify-between w-full">
                           <p className="text-gray-500 text-2xl font-medium">
                              Generated Notes
                           </p>
                           <PushToEMRButton />
                        </div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>
                        {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <ConsultButton />
               </div>
               <div className="absolute right-32 top-1/2 transform -translate-y-1/2">
                  <ScenarioButton handleOpen={() => setIsOpenScenario(true)} />
               </div> */}
                        <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                           <SaveButton />
                        </div>
                     </div>
                     <div className="flex-grow overflow-auto h-full">
                        <GeneratedNotes />
                     </div>
                     <div className="flex items-center justify-between w-full">
                        <p className="text-gray-500 text-start text-2xl  font-medium">
                           Uploaded Records
                        </p>
                        <PushToEMRButton />
                     </div>
                     <div className="flex-grow overflow-auto h-full">
                        <UploadedRecords />
                     </div>
                  </div>

                  <div className="flex flex-col p-4 gap-y-5 overflow-hidden grow bg-white ">
                     <AgentData />
                     <AgentUploader />
                  </div>
               </main>
            ) : (
              <main className="flex items-center justify-center w-full h-full">
               <FileDropZone />
              </main>
            )}
            {/* <Modal
            isOpen={isOpenUploader}
            onClose={() => setIsOpenUploader(false)}
         >
            <div className="text-center">
               <UploaderFileModal onClose={() => setIsOpenUploader(false)} />
            </div>
         </Modal> */}
            <Modal
               isOpen={isOpenScenario}
               onClose={() => setIsOpenScenario(false)}
            >
               <Scenario scenario={scenario} />
            </Modal>
       
      </div>
   );
};

export default MainPage;
