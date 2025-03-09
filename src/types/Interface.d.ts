export interface MessageOld {
   id: string;
   report: string;
   changes: string;
   originalText: string;
   filename: string;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface IDocument {
   id: string, 
   filename: string, 
   originalText: string,
}

export interface Message {
   id: string;
   report: string;
   documents: IDocument[];
   patientId: string;
   filename: string;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface UploadFileResponse {
   data: MessageOld;
   successful: boolean;
   error?: {
      message: string;
   } | null;
}

export interface UploadFilesResponse {
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

export interface Chat {
   id: string;
   reportId: string;
   author: string;
   text: string;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface GetChatMessagesResponse {
   data: {
      data: Chat[];
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

export interface SendMessageRequest {
   text: string;
}

export interface SendMessageResponse {
   data: Chat;
   successful: boolean;
   error: {
      message: string;
   };
}

export interface UploadConsultReport {
   data: string;
   successful: boolean;
   error?: {
      message: string;
   } | null;
}