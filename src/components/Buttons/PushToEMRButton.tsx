const PushToEMRButton = () => {

   return (
      <div>
         <button
            className="bg-[#595959] gap-x-5 flex justify-between items-center w-full text-white py-2 px-3 text-lg rounded-md cursor-not-allowed"
         >
            <div className="bg-white rounded-md py-1 px-3">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6 text-gray-500"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
               </svg>
            </div>
            Push To EMR
         </button>
      </div>
   );
};

export default PushToEMRButton;
