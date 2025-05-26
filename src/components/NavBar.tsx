import SearchPatient from "./SearchPatient";
import { useFileUpload } from "../context/fileContext";
const NavBar = () => {
   const { setSelectedFileId } = useFileUpload();
   return (
      <nav className="flex w-full items-center gap-x-20 h-18 py-3 pl-20 pr-3 font-geist bg-[#2a476c]">
         <h1
            onClick={() => {
               setSelectedFileId(null);
            }}
            className="text-2xl font-bold text-white cursor-pointer"
         >
            CANassist
         </h1>
         <div className="w-2/3">
            <SearchPatient />
         </div>
      </nav>
   );
};

export default NavBar;
