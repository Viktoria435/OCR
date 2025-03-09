const UploadFileButton = ({ onClick }: { onClick: () => void }) => {
    return (
       <button
          onClick={onClick}
          className="bg-blue-500 w-full font-bold p-2 rounded-md cursor-pointer text-white hover:bg-blue-600 transition duration-500 disabled:bg-blue-500"
       >
         Add Patient
       </button>
    );
 };
 
 export default UploadFileButton;
 