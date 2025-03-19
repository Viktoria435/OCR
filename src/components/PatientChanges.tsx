// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import { useFileUpload } from "../context/fileContext";

// const PatientChanges = () => {
//   const { fileChanges, setEditingChanges, setIsEdited } = useFileUpload();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(fileChanges || "");

//   useEffect(() => {
//     setEditText(fileChanges || "");
//   }, [fileChanges]);

//   const handleEditClick = () => {
//     setIsEditing((prev) => !prev);
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setEditText(event.target.value);
//     setIsEdited(true);
//   };

//   const handleBlur = () => {
//     setIsEditing(false);
//     setEditingChanges(editText);
//   };

//   return (
//     <div className="bg-white prose relative text-black rounded-md text-start px-4 text-lg flex-grow overflow-auto h-full flex flex-col">
//       <div className="pb-2 relative">
//         {fileChanges && (
//           <button
//             className="absolute top-2 right-2 text-xl text-gray-500"
//             onClick={handleEditClick}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="size-6 text-blue-700"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
//               />
//             </svg>
//           </button>
//         )}
//       </div>

//       <div className="flex-1">
//         {isEditing ? (
//           <textarea
//             value={editText}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full h-full resize-none focus:outline-none"
//           />
//         ) : fileChanges ? (
//           <ReactMarkdown className="overflow-auto h-full w-full">
//             {fileChanges}
//           </ReactMarkdown>
//         ) : (
//           <div className="flex justify-center items-center h-full">
//             <p className="text-black opacity-50">No changes data</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientChanges;
