import React from "react";
import { UInfo } from "../../types/Interface";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface UserModalProps {
   userInfo: UInfo;
   onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userInfo, onClose }) => {
   const navigate = useNavigate();

   const handleLogout = () => {
      Cookies.remove("accessToken", {
         path: "/",
      });
      navigate("/auth/login");
   };

   return (
      <div className="bg-[#e0dcdc] space-y-5 text-start rounded-lg p-8 shadow-lg border border-gray-300 relative">
         <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
               />
            </svg>
         </button>
         <p className="font-bold text-2xl">{userInfo.name}</p>
         <div className="flex flex-col w-full">
            <p className="font-bold mb-2">My Account/Profile</p>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               Name: {userInfo.name}
            </button>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               Specialty: {userInfo.specialty}
            </button>
         </div>
         <div className="flex flex-col w-full">
            <p className="font-bold mb-2">Compliance/Security</p>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               HIPPA/Data Privacy Security Notice
            </button>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               Two Factor Authentication
            </button>
         </div>
         <div className="flex flex-col w-full">
            <p className="font-bold mb-2">Help & Support</p>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               User Guide/Knowledge Base
            </button>
            <button className="p-2 border-gray-400 border rounded-sm text-start">
               Report a Bug/Feedback Form
            </button>
         </div>
         <div className="flex justify-end">
            <button onClick={handleLogout} className="cursor-pointer bg-[#2a476c] text-white py-3 w-1/3 hover:bg-blue-950 duration-500">
               Log Out
            </button>
         </div>
      </div>
   );
};

export default UserModal;
