import api from ".";
import {
   DeleteReportRequest,
   GetChatMessagesResponse,
   GetMessagesResponse,
   SendMessageRequest,
   SendMessageResponse,
   UploadConsultReport,
   UploadFileResponse,
   UploadFilesResponse,
} from "../types/Interface";
import Cookies from "js-cookie";

// export const uploadFileRequest = async (
//    file: File
// ): Promise<UploadFileResponse> => {
//    const formData = new FormData();
//    formData.append("file", file);

//    try {
//       const response = await api.post<UploadFileResponse>(
//          "/api/report",
//          formData,
//          {
//             headers: {
//                "Content-Type": "multipart/form-data",
//             },
//          }
//       );

//       return response.data;
//    } catch (error: unknown) {
//       console.error("Error uploading file:", error);
//       throw new Error("File upload failed");
//    }
// };

export const uploadFilesRequest = async (
   files: File[]
): Promise<UploadFilesResponse> => {
   const formData = new FormData();
   files.forEach((file) => {
      formData.append("files", file);
   });
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }

   try {
      const response = await api.post<UploadFilesResponse>(
         "/api/report",
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
   }
};

export const uploadFilesToReportRequest = async (
   files: File[],
   reportId: string
): Promise<UploadFilesResponse> => {
   const formData = new FormData();
   files.forEach((file) => {
      formData.append("files", file);
   });
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }

   try {
      const response = await api.post<UploadFilesResponse>(
         `/api/report/${reportId}/documents/add`,
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
   }
};

// export const getAllReportsRequest = async (
//    pageSize: number,
//    pageIndex: number
// ): Promise<GetMessagesResponse> => {
//    try {
//       const response = await api.get<GetMessagesResponse>("/api/report/all", {
//          params: { pageSize, pageIndex },
//       });

//       return response.data;
//    } catch (error: unknown) {
//       console.error("Error fetching messages:", error);
//       throw new Error("Failed to fetch messages");
//    }
// };

export const getAllReportsRequest = async (
   pageSize: number,
   pageIndex: number
): Promise<GetMessagesResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.get<GetMessagesResponse>("/api/report/all", {
         params: { pageSize, pageIndex },
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

export const getSearchReportsRequest = async (
   pageSize: number,
   pageIndex: number,
   searchValue: string
): Promise<GetMessagesResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.get<GetMessagesResponse>(
         `/api/report/${searchValue}/search`,
         {
            params: { pageSize, pageIndex },
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

export const getReportByIdRequest = async (
   reportId: string
): Promise<UploadFilesResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.get<UploadFilesResponse>(
         `/api/report/${reportId}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
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

export const deleteFileFromReportRequest = async (
   reportId: string,
   documentId: string
): Promise<UploadFilesResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.delete<UploadFilesResponse>(
         `/api/report/${reportId}/${documentId}/delete`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error deleting message:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to send message");
   }
};

export const deleteReportRequest = async (
   reportId: string,
): Promise<DeleteReportRequest> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.delete<DeleteReportRequest>(
         `/api/report/${reportId}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error deleting report:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to delete report");
   }
};

export const getChatMessagesRequest = async (
   reportId: string
): Promise<GetChatMessagesResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.get<GetChatMessagesResponse>(
         `/api/message/${reportId}/all`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
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
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   const requestData: SendMessageRequest = {
      text: userMessage,
   };

   try {
      const response = await api.post<SendMessageResponse>(
         `/api/message/${reportId}`,
         requestData,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
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
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.delete("/api/report/all", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
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
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.get<UploadConsultReport>(
         `/api/consult/${reportId}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

export const replaceReport = async (
   reportId: string,
   text: string
): Promise<UploadFileResponse> => {
   const token = Cookies.get("accessToken");
   if (!token) {
      throw new Error("Error getting token");
   }
   try {
      const response = await api.patch<UploadFileResponse>(
         `/api/report/${reportId}/report`,
         { text },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
   }
};

// export const replaceReportChanges = async (
//    reportId: string,
//    text: string
// ): Promise<UploadFileResponse> => {
//    try {
//       const response = await api.patch<UploadFileResponse>(
//          `/api/report/${reportId}/changes`,
//          { text }
//       );
//       return response.data;
//    } catch (error: unknown) {
//       console.error("Error fetching messages:", error);
//       throw new Error("Failed to fetch messages");
//    }
// };
