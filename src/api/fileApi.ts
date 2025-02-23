import api from ".";
import {
   GetChatMessagesResponse,
   GetMessagesResponse,
   SendMessageRequest,
   SendMessageResponse,
   UploadConsultReport,
   UploadFileResponse,
} from "../types/Interface";

export const uploadFileRequest = async (
   file: File
): Promise<UploadFileResponse> => {
   const formData = new FormData();
   formData.append("file", file);

   try {
      const response = await api.post<UploadFileResponse>(
         "/api/report",
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
   }
};

export const getAllReportsRequest = async (
   pageSize: number,
   pageIndex: number
): Promise<GetMessagesResponse> => {
   try {
      const response = await api.get<GetMessagesResponse>("/api/report/all", {
         params: { pageSize, pageIndex },
      });

      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

export const getReportByIdRequest = async (
   reportId: string
): Promise<UploadFileResponse> => {
   try {
      const response = await api.get<UploadFileResponse>(
         `/api/report/${reportId}`
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error sending message:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to send message");
   }
};

export const getChatMessagesRequest = async (
   reportId: string
): Promise<GetChatMessagesResponse> => {
   try {
      const response = await api.get<GetChatMessagesResponse>(
         `/api/message/${reportId}/all`
      );
      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

export const sendMessageRequest = async (
   reportId: string,
   userMessage: string
): Promise<SendMessageResponse> => {
   const requestData: SendMessageRequest = {
      text: userMessage,
   };
   try {
      const response = await api.post<SendMessageResponse>(
         `/api/message/${reportId}`,
         requestData
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error sending message:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to send message");
   }
};

export const deleteFilesHistoryRequest = async (): Promise<unknown> => {
   try {
      const response = await api.delete("/api/report/all");
      if (response.data.successful) {
         return response.data.data;
      } else {
         throw new Error(response.data.error.message);
      }
   } catch (error: unknown) {
      console.error("Error deleting all messages:", error);
   }
};

export const generateConsultReport = async (
   reportId: string
): Promise<UploadConsultReport> => {
   try {
      const response = await api.post<UploadConsultReport>(
         `/api/consult/${reportId}/generate`
      );
      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};
