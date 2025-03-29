import { useEffect, useState } from "react";
import { useFileUpload } from "../context/fileContext";

const SearchPatient = () => {
   const { getReports } = useFileUpload();

   const [searchValue, setSearchValue] = useState<string>("");

   useEffect(() => {
      getReports(100, 0);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="flex justify-between items-center bg-white p-2 rounded-md text-start">
         <div className="w-full border-b-2 border-gray-500 flex">
            <input
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     getReports(100, 0, searchValue);
                  }
               }}
               className="w-full outline-0  pb-1 px-1"
            />
            {searchValue && (
               <button onClick={() => {
                  setSearchValue("");
                  getReports(100, 0);
               }}>
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
         <button onClick={() => getReports(100, 0, searchValue)}>
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
   );
};

export default SearchPatient;
