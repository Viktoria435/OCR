import {
   createContext,
   useContext,
   ReactNode,
   useState,
   useEffect,
} from "react";
import { Chat, IConsult, IDocument, Message } from "../types/Interface";
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
   deleteReportRequest,
   sendAudioRequest,
   getDocumentDetailsById,
   deleteConsultFromReportRequest,
   getConsultDetailsById,
   generateConsultReport,
} from "../api/fileApi";

interface FileUploadContextType {
   error: string | null;
   uploadedFiles: Message[];
   uploadedDocuments: IDocument[];
   consultNotes: IConsult[];
   isLoading: boolean;
   isFilesUpload: boolean;
   isMessageLoading: boolean;
   fileReport: string | null;
   documentText: string | null;
   consultText: string | null;
   scenario: string | null;
   //fileChanges: string | null;
   selectedFileId: string | null;
   selectedFiles: File[];
   setSelectedFiles: (files: File[]) => void;
   chatData: Chat[];
   setSelectedFileId: (text: string | null) => void;
   selectedDocumentId: string | null;
   selectedConsultId: string | null;
   setSelectedDocumentId: (docId: string | null) => void;
   setSelectedConsultId: (consId: string | null) => void;
   setDocumentText: (text: string) => void;
   setConsultText: (text: string) => void;
   getChatDataById: (chatId: string) => void;
   getAllMessages: (chatId: string) => void;
   sendChatMessage: (chatId: string, text: string) => void;
   sendAudioChatMessage: (chatId: string, file: Blob) => void;
   uploadFiles: (files: File[], reportId?: string) => void;
   deleteFileFromReport: (
      reportId: string,
      documentId: string,
      vsFileId: string
   ) => void;
   deleteConsultFromReport: (reportId: string, consultId: string) => void;
   deleteReport: (reportId: string) => void;
   getDocumentById: (documentId: string) => void;
   getConsultById: (consultId: string) => void;
   getReports: (
      pageSize: number,
      pageIndex: number,
      searchValue?: string
   ) => void;
   setFileReport: (text: string) => void;
   //setFileChanges: (text: string) => void;
   setScenario: (text: string) => void;
   generateConsult: (reportId: string) => void;
   deleteFilesHistory: () => void;
   setIsLoading: (isLoading: boolean) => void;
   isEdited: boolean;
   setIsEdited: (isEdited: boolean) => void;
   editingUploadedText: string | null;
   setEditingUploadedText: (text: string) => void;
   editingConsultText: string | null;
   setEditingConsultText: (text: string) => void;
   editingChanges: string | null;
   setEditingChanges: (text: string) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
   undefined
);

export const FileUploadProvider = ({ children }: { children: ReactNode }) => {
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
   const [uploadedFiles, setUploadedFiles] = useState<Message[]>([]);
   const [chatData, setChatData] = useState<Chat[]>([]);
   const [isEdited, setIsEdited] = useState<boolean>(false);
   const [fileReport, setFileReport] = useState<string | null>(null);
   const [scenario, setScenario] = useState<string | null>(null);
   //const [fileChanges, setFileChanges] = useState<string | null>(null);
   const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
   const [editingChanges, setEditingChanges] = useState<string | null>(null);
   const [isFilesUpload, setIsFilesUpload] = useState<boolean>(true);
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

   const [editingUploadedText, setEditingUploadedText] = useState<
      string | null
   >(null);
   const [editingConsultText, setEditingConsultText] = useState<string | null>(
      null
   );
   const [uploadedDocuments, setUploadedDocuments] = useState<IDocument[]>([]);
   const [consultNotes, setConsultNotes] = useState<IConsult[]>([]);
   const [documentText, setDocumentText] = useState<string | null>(null);
   const [consultText, setConsultText] = useState<string | null>(null);
   const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
      null
   );
   const [selectedConsultId, setSelectedConsultId] = useState<string | null>(
      null
   );

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

   useEffect(() => {
      if (selectedFileId === null) {
         setFileReport(null);
         setScenario(null);
         setConsultNotes([]);
         setUploadedDocuments([]);
         setChatData([]);
      }
      setEditingConsultText(null);
      setEditingUploadedText(null);
      setSelectedFiles([]);
   }, [selectedFileId]);

   const uploadFiles = async (files: File[], reportId?: string) => {
      setIsFilesUpload(false);
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
            setScenario(response.data.scenario);
            getAllMessages(response.data.id);
            getReports(100, 0);
            setFileReport(response.data.report);
         setUploadedDocuments(response.data.documents);
         setConsultNotes(response.data.consult_note);
         setIsEdited(false);
         const firstDocument = response.data.documents[0];
         if (firstDocument) {
            await getDocumentById(firstDocument.id);
            setSelectedDocumentId(firstDocument.id);
         }
         const firstConsult = response.data.consult_note[0];
         if (firstConsult) {
            await getConsultById(firstConsult.id);
            setSelectedConsultId(firstConsult.id);
         }
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
         setIsFilesUpload(true);
      }
   };

   const getReports = async (
      pageSize: number,
      pageIndex: number,
      searchValue?: string
   ) => {
      try {
         const response = searchValue
            ? await getSearchReportsRequest(pageSize, pageIndex, searchValue)
            : await getAllReportsRequest(pageSize, pageIndex);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }

         setUploadedFiles(response.data.data);
         console.log(response.data.data);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);
         setError("Failed to fetch messages");
         setUploadedFiles([]);
      } finally {
         setIsLoading(false);
      }
   };

   const getChatDataById = async (chatId: string) => {
      try {
         setIsLoading(true);
         const response = await getReportByIdRequest(chatId);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }
         setFileReport(response.data.report);
         setScenario(response.data.scenario);
         setUploadedDocuments(response.data.documents);
         setConsultNotes(response.data.consult_note);
         getAllMessages(response.data.id);
         setIsEdited(false);
         const firstDocument = response.data.documents[0];
         if (firstDocument) {
            await getDocumentById(firstDocument.id);
            setSelectedDocumentId(firstDocument.id);
         }
         const firstConsult = response.data.consult_note[0];
         if (firstConsult) {
            await getConsultById(firstConsult.id);
            setSelectedConsultId(firstConsult.id);
         }
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
         setIsMessageLoading(true);
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
         setIsMessageLoading(false);
      }
   };

   const sendAudioChatMessage = async (chatId: string, file: Blob) => {
      try {
         setIsMessageLoading(true);
         const response = await sendAudioRequest(file, chatId);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }

         const transcription = response.data.transcription || "Audio";
         setChatData((prevChatData) => [
            ...prevChatData,
            {
               id: `temp-${Date.now()}`,
               reportId: chatId,
               author: "user",
               text: transcription,
               datetimeInserted: new Date().toISOString(),
               datetimeUpdated: new Date().toISOString(),
            },
         ]);
         setChatData((prevChatData) => [...prevChatData, response.data]);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);

         setError("Failed to fetch messages");
      } finally {
         setIsMessageLoading(false);
      }
   };

   const deleteFilesHistory = async () => {
      try {
         await deleteFilesHistoryRequest();
         getReports(100, 0);
         // setFileChanges(null);
         setFileReport(null);
         setChatData([]);
      } catch (error) {
         console.error("Error delete history:", error);
      }
   };

   const deleteFileFromReport = async (
      reportId: string,
      documentId: string,
      vsFileId: string
   ) => {
      try {
      setIsLoading(true);

         const response = await deleteFileFromReportRequest(
            reportId,
            documentId,
            vsFileId
         );
         if (!response.successful || response.data === null) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setIsEdited(false);
            getReports(100, 0);
            getChatDataById(reportId);
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

   const deleteConsultFromReport = async (
      reportId: string,
      consultId: string
   ) => {

      try {
  
         const response = await deleteConsultFromReportRequest(
            reportId,
            consultId
         );
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setIsEdited(false);
            getReports(100, 0);
            getChatDataById(reportId);
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

   const deleteReport = async (reportId: string) => {
      try {
      setIsLoading(true);

         const response = await deleteReportRequest(reportId);
         if (!response.successful || response.data === null) {
            setError("Unknown error occurred");
         } else {
            setError(null);
            setIsEdited(false);
            getReports(100, 0);
            if (reportId === selectedFileId) {
               setFileReport(null);
               setScenario(null);
               setSelectedFileId(null);
               setChatData([]);
            }
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

   const getDocumentById = async (documentId: string) => {
      try {
         const response = await getDocumentDetailsById(documentId);
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setDocumentText(response.data.content);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error fetching document:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("Failed to fetch document");
      } finally {
         setIsLoading(false);
      }
   };

   const getConsultById = async (consultId: string) => {
      try {
         const response = await getConsultDetailsById(consultId);
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
         } else {
            setError(null);
            setConsultText(response.data.content);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error fetching document:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("Failed to fetch document");
      } finally {
         setIsLoading(false);
      }
   };

   const generateConsult = async (reportId: string) => {
      try {
         setIsLoading(true);
            await generateConsultReport(reportId);
            getChatDataById(reportId);
      } catch (error) {
         console.error("Error:", error);
      } finally {
         setIsLoading(false);
      }
   }
   

   return (
      <FileUploadContext.Provider
         value={{
            uploadFiles,
            error,
            uploadedFiles,
            isLoading,
            isFilesUpload,
            isMessageLoading,
            getReports,
            fileReport,
            setFileReport,
            selectedFiles,
            setSelectedFiles,
            // fileChanges,
            // setFileChanges,
            uploadedDocuments,
            getDocumentById,
            getConsultById,
            documentText,
            consultText,
            consultNotes,
            selectedDocumentId,
            selectedConsultId,
            setSelectedDocumentId,
            setSelectedConsultId,
            scenario,
            setScenario,
            selectedFileId,
            setSelectedFileId,
            setConsultText,
            setDocumentText,
            getAllMessages,
            generateConsult,
            chatData,
            sendChatMessage,
            sendAudioChatMessage,
            getChatDataById,
            deleteFilesHistory,
            deleteFileFromReport,
            deleteConsultFromReport,
            deleteReport,
            setIsLoading,
            isEdited,
            setIsEdited,
            setEditingUploadedText,
            setEditingConsultText,
            editingUploadedText,
            editingConsultText,
            setEditingChanges,
            editingChanges,
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
