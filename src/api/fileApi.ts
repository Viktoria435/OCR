import api from ".";

export interface Message {
   id: string;
   text: string;
   filename: string;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface UploadFileResponse {
   data: Message;
   successful: boolean;
   error?: {
      message: string;
   } | null;
}

export interface GetMessagesResponse {
   data: {
      data: Message[];
      paging: {
         pageSize: number;
         pageIndex: number;
         totalCount: number;
      };
   };
   successful: boolean;
   error?: {
      message: string;
   } | null;
}

export const uploadFileRequest = async (
   file: File
): Promise<UploadFileResponse> => {
   const formData = new FormData();
   formData.append("file", file);

   try {
      const response = await api.post<UploadFileResponse>(
         "/api/report/generate",
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

export const getMessagesRequest = async (
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
