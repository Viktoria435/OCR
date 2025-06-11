export const base64ToBytes = (base64String: string): Uint8Array => {
   const binaryString = atob(base64String);
   const bytes = new Uint8Array(binaryString.length);

   for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
   }

   return bytes;
};

export const formatDateToMDY = (isoDate: string): string => {
   const date = new Date(isoDate);
   if (isNaN(date.getTime())) return "Invalid Date";

   return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
   }).format(date);
};


 