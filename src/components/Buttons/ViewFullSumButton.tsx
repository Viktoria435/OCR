import { useFileUpload } from "../../context/fileContext";

const ViewFullSumButton = () => {
   const {scenario } = useFileUpload();
    return (
        <div>
           <button
              className={`custom-btn cursor-not-allowed ${scenario ? "" : "hidden"} `}
           >
              View <strong>Full Summary</strong>
           </button>
        </div>
     );
};

export default ViewFullSumButton;