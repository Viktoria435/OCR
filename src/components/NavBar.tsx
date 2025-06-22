import SearchPatient from "./SearchPatient";
import { useFileUpload } from "../context/fileContext";
import User from "../assets/User.png";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import UserModal from "./Modals/UserModal";

const NavBar = () => {
   const { setSelectedFileId, userInfo, setSelectedFiles } = useFileUpload();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const userBlockRef = useRef<HTMLDivElement | null>(null);
   const modalRef = useRef<HTMLDivElement | null>(null);
   const [modalStyles, setModalStyles] = useState({ top: 0, left: 0 });

   const handleUserClick = () => {
      if (!userInfo || !userBlockRef.current) return;
      setIsModalOpen(true);
   };

   useLayoutEffect(() => {
      if (isModalOpen && userBlockRef.current && modalRef.current) {
         const userRect = userBlockRef.current.getBoundingClientRect();
         const modalRect = modalRef.current.getBoundingClientRect();

         setModalStyles({
            top: userRect.bottom + window.scrollY + 8,
            left: userRect.right - modalRect.width,
         });
      }
   }, [isModalOpen]);

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (
            !userBlockRef.current?.contains(e.target as Node) &&
            !modalRef.current?.contains(e.target as Node)
         ) {
            setIsModalOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <nav className="flex w-full items-center justify-between min-h-18 py-3 px-10 font-geist bg-[#2a476c] relative">
         <h1
            onClick={() => {
               setSelectedFileId(null);
               setSelectedFiles([]);
            }}
            className="text-3xl text-white cursor-pointer"
         >
            CANassist
         </h1>

         <div className="w-2/3">
            <SearchPatient />
         </div>

         <div
            className="flex justify-center items-center gap-x-2 cursor-pointer relative"
            onClick={handleUserClick}
            ref={userBlockRef}
         >
            <p className="text-white">{userInfo?.name}</p>
            <div className="rounded-full w-12 h-12 bg-[#525d7d] overflow-hidden">
               <img src={User} className="w-full h-full object-cover" />
            </div>
         </div>

         {isModalOpen && userInfo && (
            <div
               className="absolute z-50 w-1/3"
               ref={modalRef}
               style={{
                  top: modalStyles.top,
                  left: modalStyles.left,
               }}
            >
               <UserModal userInfo={userInfo} onClose={() => setIsModalOpen(false)} />
            </div>
         )}
      </nav>
   );
};

export default NavBar;
