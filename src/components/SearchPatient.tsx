import { useEffect, useState, useRef } from "react";
import { useFileUpload } from "../context/fileContext";
import FileHistory from "./FileHistory";

const SearchPatient = () => {
   const { getReports  } = useFileUpload();

   const [searchValue, setSearchValue] = useState<string>("");
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLDivElement>(null);

   const handlePatientChoose = () => {
      setIsOpen(false);
      setSearchValue("");
      getReports(100, 0);
   };

   useEffect(() => {
         getReports(100, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as Node;
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(target) &&
            inputRef.current &&
            !inputRef.current.contains(target)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   return (
      <div className="flex flex-col relative">
         <div className="flex justify-between border-2  border-gray-300  items-center bg-white p-2 rounded-t-sm text-start ">
            <div
               ref={inputRef}
               className="w-full flex"
            >
               <input
                  value={searchValue}
                  onChange={(e) => {
                     setIsOpen(true);
                     setSearchValue(e.target.value);
                     getReports(100, 0, e.target.value);
                  }}
                  className="w-full outline-0 px-1"
                  onFocus={() => setIsOpen(true)}
                  placeholder="Search Patient"
               />
               {searchValue && (
                  <button
                     onClick={() => {
                        setSearchValue("");
                     }}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 hover:text-blue-500 outline-0"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M6 18 18 6M6 6l12 12"
                        />
                     </svg>
                  </button>
               )}
            </div>
            <button>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 ml-3 hover:text-blue-500 outline-0"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
               </svg>
            </button>
         </div>
         {isOpen && (
            <div ref={dropdownRef} className="absolute top-full w-full z-[90]">
               <FileHistory onClose={handlePatientChoose} />
            </div>
         )}
      </div>
   );
};

export default SearchPatient;
