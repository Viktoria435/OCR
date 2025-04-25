import api from ".";
import {
   DeleteFilesResponse,
   DeleteReportRequest,
   GetChatMessagesResponse,
   GetDetailsResponse,
   GetMessagesResponse,
   SendMessageRequest,
   SendMessageResponse,
   UpdateDocumentPayload,
   UploadConsultReport,
   UploadFileResponse,
   UploadFilesResponse,
} from "../types/Interface";
import { checkToken, handleApiError } from "../utils/ApiUtils";

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
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to upload files to report");
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
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to upload files to report");
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
   const token = checkToken();
   try {
      const response = await api.get<GetMessagesResponse>("/api/report/all", {
         params: { pageSize, pageIndex },
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to get all reports");
   }
};

export const getSearchReportsRequest = async (
   pageSize: number,
   pageIndex: number,
   searchValue: string
): Promise<GetMessagesResponse> => {
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to get search reports");
   }
};

export const getReportByIdRequest = async (
   reportId: string
): Promise<UploadFilesResponse> => {
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to get report by id");
   }
};

export const deleteFileFromReportRequest = async (
   reportId: string,
   documentId: string,
   vsFileId: string
): Promise<DeleteFilesResponse> => {
   const token = checkToken();
   try {
      const response = await api.delete<DeleteFilesResponse>(
         `/api/report/${reportId}/${documentId}/delete`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               vsFileId,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to delete file from report");
   }
};

export const deleteConsultFromReportRequest = async (
   reportId: string,
   consultId: string,
): Promise<DeleteFilesResponse> => {
   const token = checkToken();
   try {
      const response = await api.delete<DeleteFilesResponse>(
         `/api/report/${consultId}/consult`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               reportId,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to delete file from report");
   }
};


export const deleteReportRequest = async (
   reportId: string
): Promise<DeleteReportRequest> => {
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to delete report");
   }
};

export const getChatMessagesRequest = async (
   reportId: string
): Promise<GetChatMessagesResponse> => {
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to get chat messages");
   }
};

export const sendMessageRequest = async (
   reportId: string,
   userMessage: string
): Promise<SendMessageResponse> => {
   const token = checkToken();
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
      handleApiError(error);
      throw new Error("Failed to send message");
   }
};

export const sendAudioRequest = async (
   file: Blob,
   reportId: string
): Promise<SendMessageResponse> => {
   const formData = new FormData();
   formData.append("file", file, "audio.mp4");

   const token = checkToken();

   try {
      const response = await api.post<SendMessageResponse>(
         `/api/message/voice/${reportId}`,
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
      handleApiError(error);
      throw new Error("Failed to send audio");
   }
};

export const deleteFilesHistoryRequest = async (): Promise<unknown> => {
   const token = checkToken();

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
      handleApiError(error);
      throw new Error("Failed to delete all messages");
   }
};

export const generateConsultReport = async (
   reportId: string
): Promise<UploadConsultReport> => {
   const token = checkToken();

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
      handleApiError(error);
      throw new Error("Failed to generate consult report");
   }
};

export const replaceReport = async (
   reportId: string,
   text: string
): Promise<UploadFileResponse> => {
   const token = checkToken();

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
      handleApiError(error);
      throw new Error("Failed to replace report");
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

export const getDocumentDetailsById = async (
   documentId: string
): Promise<GetDetailsResponse> => {
   const token = checkToken();
   try {
      const response = await api.get<GetDetailsResponse>(
         `/api/report/document/${documentId}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to get document details by id");
   }
};

export const getConsultDetailsById = async (
   consultId: string
): Promise<GetDetailsResponse> => {
   const token = checkToken();
   try {
      const response = await api.get<GetDetailsResponse>(
         `/api/report/${consultId}/consult`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to get document details by id");
   }
};

export const updateDocument = async (
   payload: UpdateDocumentPayload
): Promise<GetDetailsResponse> => {
   const token = checkToken();
   try {
      const response = await api.patch<GetDetailsResponse>(
         `/api/report/${payload.documentId}/document`,
         {
            reportId: payload.reportId,
            documentId: payload.documentId,
            text: payload.text,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to update document");
   }
};

export const updateConsult = async (
   consultId: string,
   text: string
): Promise<GetDetailsResponse> => {
   const token = checkToken();
   try {
      const response = await api.patch<GetDetailsResponse>(
         `/api/report/${consultId}/document`,
         {
            consultId,
            text,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      handleApiError(error);
      throw new Error("Failed to update document");
   }
};
