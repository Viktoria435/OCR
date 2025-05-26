const PushToEMRButton = () => {

   return (
      <div>
         <button
            className="custom-btn cursor-not-allowed"
         >
            {/* <div className="bg-white rounded-md py-1 px-3">
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
            </div> */}
            Push To <strong>EMR</strong>
         </button>
      </div>
   );
};

export default PushToEMRButton;
