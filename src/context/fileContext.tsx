import { createContext, useContext, ReactNode, useState } from "react";
import { Chat, Message } from "../types/Interface";
import {
   getChatMessagesRequest,
   getAllReportsRequest,
   sendMessageRequest,
   getReportByIdRequest,
   deleteFilesHistoryRequest,
   uploadFilesRequest,
   uploadFilesToReportRequest,
   deleteFileFromReportRequest,
   getSearchReportsRequest,
} from "../api/fileApi";

interface FileUploadContextType {
   error: string | null;
   uploadedFiles: Message[];
   isLoading: boolean;
   fileReport: string | null;
   fileChanges: string | null;
   selectedFileId: string | null;
   chatData: Chat[];
   setSelectedFileId: (text: string) => void;
   getChatDataById: (chatId: string) => void;
   getAllMessages: (chatId: string) => void;
   sendChatMessage: (chatId: string, text: string) => void;
   uploadFiles: (files: File[], reportId?: string) => void;
   DeleteFileFromReport: (reportId: string, documentId: string) => void;
   getReports: (pageSize: number, pageIndex: number, searchValue?:string) => void;
   setFileReport: (text: string) => void;
   setFileChanges: (text: string) => void;
   deleteFilesHistory: () => void;
   setIsLoading: (isLoading: boolean) => void; 
   isEdited: boolean;
   setIsEdited: (isEdited: boolean) => void;
   editingReport: string | null;
   setEditingReport: (text: string) => void;
   editingChanges: string | null;
   setEditingChanges: (text: string) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
   undefined
);

export const FileUploadProvider = ({ children }: { children: ReactNode }) => {
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [uploadedFiles, setUploadedFiles] = useState<Message[]>([]);
   const [chatData, setChatData] = useState<Chat[]>([]);
   const [isEdited, setIsEdited] = useState<boolean>(false);
   const [fileReport, setFileReport] = useState<string | null>(null);
   const [fileChanges, setFileChanges] = useState<string | null>(null);
   const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
   const [editingReport, setEditingReport] = useState<string | null>(null);
   const [editingChanges, setEditingChanges] = useState<string | null>(null);



   // const uploadFile = async (file: File) => {
   //    setIsLoading(true);
   //    try {
   //       const response = await uploadFileRequest(file);
   //       if (!response.successful) {
   //          setError(response.error?.message || "Unknown error occurred");
   //       } else {
   //          setError(null);
   //          setFileReport(response.data.report);
   //          setFileChanges(response.data.changes);
   //          setSelectedFileId(response.data.id);
   //          setIsEdited(false);
   //          getAllMessages(response.data.id);
   //          fetchMessages(100, 0);
   //       }
   //    } catch (err: unknown) {
   //       if (err instanceof Error) {
   //          console.error("Error uploading file:", err.message);
   //       } else {
   //          console.error("Unknown error:", err);
   //       }
   //       setError("File upload failed");
   //    } finally {
   //       setIsLoading(false);
   //    }
   // };

   const uploadFiles = async (files: File[], reportId?: string) => {
      setIsLoading(true);
      try {
         const response = reportId
         ? await uploadFilesToReportRequest(files, reportId)
         : await uploadFilesRequest(files);
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setFileReport(response.data.report);
            // setFileChanges(response.data.changes);
            setSelectedFileId(response.data.id);
            setIsEdited(false);
            getAllMessages(response.data.id);
            getReports(100, 0);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error uploading file:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("File upload failed");
      } finally {
         setIsLoading(false);
      }
   };

      const getReports = async (pageSize: number, pageIndex: number, searchValue?: string) => {
         try {
            const response = searchValue
            ? await getSearchReportsRequest(pageSize, pageIndex, searchValue)
            : await getAllReportsRequest(pageSize, pageIndex);
            if (!response.successful) {
               setError(response.error?.message || "Failed to load messages");
               return;
            }
            
            setUploadedFiles(response.data.data);
         }
         catch (err: unknown) {
            console.error("Error fetching messages:", err);
            setError("Failed to fetch messages");
            setUploadedFiles([]);
         } finally {
            setIsLoading(false);
         }
      };

   const getChatDataById = async (chatId: string) => {
      try {
         const response = await getReportByIdRequest(chatId);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }
         setFileReport(response.data.report);
         // setFileChanges(response.data.changes);
         getAllMessages(response.data.id);
         setIsEdited(false);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);
         setError("Failed to fetch messages");
      } finally {
         setIsLoading(false);
      }
   };

   const getAllMessages = async (chatId: string) => {
      try {
         const response = await getChatMessagesRequest(chatId);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }
         setChatData(response.data.data);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);
         setError("Failed to fetch messages");
      } finally {
         setIsLoading(false);
      }
   };

   const sendChatMessage = async (chatId: string, text: string) => {
      try {
         setChatData((prevChatData) => [
            ...prevChatData,
            {
               id: `temp-${Date.now()}`,
               reportId: chatId,
               author: "user",
               text: text,
               datetimeInserted: new Date().toISOString(),
               datetimeUpdated: new Date().toISOString(),
            },
         ]);
         const response = await sendMessageRequest(chatId, text);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }
         setChatData((prevChatData) => [...prevChatData, response.data]);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);

         setError("Failed to fetch messages");
      } finally {
         setIsLoading(false);
      }
   };

   const deleteFilesHistory = async () => {
      try {
         await deleteFilesHistoryRequest();
         getReports(100, 0);
         setFileChanges(null);
         setFileReport(null);
         setChatData([]);
      } catch (error) {
         console.error("Error delete history:", error);
      }
   };

   const DeleteFileFromReport = async (reportId: string, documentId: string) => {
      try {
         const response = await deleteFileFromReportRequest (reportId, documentId)
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setFileReport(response.data.report);
            setSelectedFileId(response.data.id);
            setIsEdited(false);
            getAllMessages(response.data.id);
            getReports(100, 0);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error deleting file:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("File delete failed");
      } finally {
         setIsLoading(false);
      }
   };


   return (
      <FileUploadContext.Provider
         value={{
            uploadFiles,
            error,
            uploadedFiles,
            isLoading,
            getReports,
            fileReport,
            setFileReport,
            fileChanges,
            setFileChanges,
            selectedFileId,
            setSelectedFileId,
            getAllMessages,
            chatData,
            sendChatMessage,
            getChatDataById,
            deleteFilesHistory,
            DeleteFileFromReport,
            setIsLoading,
            isEdited,
            setIsEdited,
            setEditingReport,
            editingReport,
            setEditingChanges,
            editingChanges
         }}
      >
         {children}
      </FileUploadContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFileUpload = (): FileUploadContextType => {
   const context = useContext(FileUploadContext);
   if (!context) {
      throw new Error("useFileUpload must be used within a FileUploadProvider");
   }
   return context;
};
