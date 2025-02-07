import { createContext, useContext, ReactNode, useState } from "react";
import { getMessagesRequest, Message, uploadFileRequest } from "../api/fileApi";

interface FileUploadContextType {
   uploadFile: (file: File) => void;
   uploadedData: string | null;
   error: string | null;
   uploadedFiles: Message[];
   isLoading: boolean;
   fetchMessages: (pageSize: number, pageIndex: number) => void;
   selectedFileText: string | null;
   setSelectedFileText: (text: string) => void;
   selectedFileId: string | null;
   setSelectedFileId: (text: string) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
   undefined
);

export const FileUploadProvider = ({ children }: { children: ReactNode }) => {
   const [uploadedData, setUploadedData] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [uploadedFiles, setUploadedFiles] = useState<Message[]>([]);
   const [selectedFileText, setSelectedFileText] = useState<string | null>(
      null
   );
   const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

   const uploadFile = async (file: File) => {
      setIsLoading(true);
      try {
         const response = await uploadFileRequest(file);
         if (!response.successful) {
            setError(response.error?.message || "Unknown error occurred");
            setUploadedData(null);
         } else {
            setUploadedData(response.data.text);
            setError(null);
            setSelectedFileText(null);
            setSelectedFileId(response.data.id);
            await fetchMessages(100, 0);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error uploading file:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("File upload failed");
         setUploadedData(null);
      } finally {
         setIsLoading(false);
      }
   };

   const fetchMessages = async (pageSize: number, pageIndex: number) => {
      try {
         const response = await getMessagesRequest(pageSize, pageIndex);
         if (!response.successful) {
            setError(response.error?.message || "Failed to load messages");
            return;
         }
         setUploadedFiles(response.data.data);
      } catch (err: unknown) {
         console.error("Error fetching messages:", err);
         setError("Failed to fetch messages");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <FileUploadContext.Provider
         value={{
            uploadFile,
            uploadedData,
            error,
            uploadedFiles,
            isLoading,
            fetchMessages,
            setSelectedFileText,
            selectedFileText,
            selectedFileId,
            setSelectedFileId,
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
