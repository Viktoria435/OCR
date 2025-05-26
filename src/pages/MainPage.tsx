import { useEffect, useState } from "react";
import AgentData from "../components/AgentData";
import FileHistory from "../components/FileHistory";
import Loading from "../components/Loading";
import { useFileUpload } from "../context/fileContext";
import AgentUploader from "../components/AgentUploader";
// import ConsultButton from "../components/Buttons/ConsultButton";
import Modal from "../components/Modals/Modal";
// import UploaderFileModal from "../components/Modals/UploaderFileModal";
import SearchPatient from "../components/SearchPatient";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Scenario from "../components/Scenario";
import UserProfile from "../components/UserProfile";
import FileProgress from "../components/FileProgress";
import UploadedRecords from "../components/UploadedRecords";
import GeneratedNotes from "../components/GeneratedNotes";
import ViewFullSumButton from "../components/Buttons/ViewFullSumButton";

const MainPage = () => {
   const navigate = useNavigate();
   const { isLoading, getReports, scenario } = useFileUpload();
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
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-3 p-6 w-full bg-[#f6f8fb] h-screen overflow-hidden">
         {isLoading && (
            <div className="absolute inset-0 flex z-100 items-center justify-center bg-black/20 ">
               <Loading />
            </div>
         )}
         <div className="flex flex-col overflow-hidden flex-grow justify-between">
            {/* <p className="text-[#434343] font-bold text-xl underline">
               Query & Upload
            </p>
            <FileUploader /> */}
            <div>
               <SearchPatient />
               <FileHistory />
            </div>
            <FileProgress />

            <UserProfile />
            {/* <UploadFileButton onClick={() => setIsOpenUploader(true)} /> */}
            {/* <DeleteHistory /> */}
         </div>
         <div className="flex flex-col overflow-hidden">
            <div className="flex relative w-full">
               <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>
               {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <ConsultButton />
               </div>
               <div className="absolute right-32 top-1/2 transform -translate-y-1/2">
                  <ScenarioButton handleOpen={() => setIsOpenScenario(true)} />
               </div> */}
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
               <ViewFullSumButton/>
               <AgentUploader />
         </div>

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
