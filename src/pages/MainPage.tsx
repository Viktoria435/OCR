import { useEffect, useState } from "react";
import AgentData from "../components/AgentData";
import FileHistory from "../components/FileHistory";
import Loading from "../components/Loading";
import OutputComponent from "../components/OutputComponent";
import { useFileUpload } from "../context/fileContext";
import AgentUploader from "../components/AgentUploader";
import ConsultButton from "../components/Buttons/ConsultButton";
import SaveButton from "../components/Buttons/SaveButton";
import UploadFileButton from "../components/Buttons/UploadFileButton";
import Modal from "../components/Modals/Modal";
import UploaderFileModal from "../components/Modals/UploaderFileModal";
import SearchPatient from "../components/SearchPatient";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const MainPage = () => {
   const navigate = useNavigate();
   const { isLoading, getReports } = useFileUpload();
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const token = Cookies.get("accessToken");
      if (!token) {
         navigate("auth/login");
         return;
      }
   }, [navigate, getReports]);

   useEffect(() => {
      getReports(100, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="grid grid-cols-[1fr_2fr_1fr] w-full h-screen overflow-hidden divide-x-2 divide-gray-500">
         {isLoading && (
            <div className="absolute inset-0 flex z-100 items-center justify-center bg-black/20 ">
               <Loading />
            </div>
         )}
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            {/* <p className="text-[#434343] font-bold text-xl underline">
               Query & Upload
            </p>
            <FileUploader /> */}
            <p className="text-[#434343] font-bold text-xl underline">
               Patients
            </p>
            <SearchPatient />
            <FileHistory />
            <UploadFileButton onClick={() => setIsOpen(true)} />
            {/* <DeleteHistory /> */}
         </div>
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden">
            <div className="flex relative justify-center w-full">
               <p className="text-[#434343] font-bold text-xl underline">
                  Output
               </p>
               <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>
               <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <ConsultButton />
               </div>
               <div className="absolute right-36 top-1/2 transform -translate-y-1/2">
                  <SaveButton />
               </div>
            </div>
            <div className="flex-grow overflow-auto h-full">
               <OutputComponent />
            </div>
            {/* <p className="text-[#434343] font-bold text-xl underline">
               Patient's changes
            </p>
            <div className="flex-grow overflow-auto h-full">
               <PatientChanges />
            </div> */}
         </div>

         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            <p className="text-[#434343] font-bold text-xl underline">Agent</p>
            <AgentData />
            <AgentUploader />
         </div>

         <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="text-center">
               <UploaderFileModal onClose={() => setIsOpen(false)} />
            </div>
         </Modal>
      </div>
   );
};

export default MainPage;
