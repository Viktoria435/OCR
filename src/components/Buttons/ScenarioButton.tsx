import React from 'react'
import { useFileUpload } from '../../context/fileContext';

interface ScenarioButtonProps {
    handleOpen: ()=> void;
}

const ScenarioButton: React.FC<ScenarioButtonProps> = ({ handleOpen }) => {

       const { selectedFileId } = useFileUpload();
    
    return (
        <button
           onClick={handleOpen}
           hidden={!selectedFileId}
           className="bg-blue-500 w-full p-2 text-sm text-white font-medium hover:bg-blue-600 transition duration-500 disabled:bg-blue-500"
        >
           Show scenario
        </button>
    )
}

export default ScenarioButton