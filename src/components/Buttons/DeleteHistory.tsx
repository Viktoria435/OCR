import { useFileUpload } from "../../context/fileContext";

const DeleteHistory = () => {
   const { deleteFilesHistory } = useFileUpload();
   const handleDelete = async () => {
      deleteFilesHistory();
   };

   return (
      <div>
         <button
            className="bg-white w-full text-[#434343] font-bold  p-2 rounded-md cursor-pointer hover:text-white hover:bg-red-500 transition duration-500"
            onClick={handleDelete}
         >
            Clear History
         </button>
      </div>
   );
};

export default DeleteHistory;
